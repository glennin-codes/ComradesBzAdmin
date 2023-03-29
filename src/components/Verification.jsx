import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

const override = css `display: block;
margin: 0 auto;
border-color: red; `;
   

const VerifyEmail = async ()=> {
  const navigate= useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const[succes,setSucces]=useState('');
  const[error,setError]=useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    if (!code) {
     navigate('/');
      return;
    }


    
    
  }, [location.search]);
 
    // Call an API to check if the verification code is valid and mark the user's email as verified
    // This could be done using axios or fetch
 try {
      const response= await axios.post('https://comradesbizapi.azurewebsites.net/api/verifyCode', { code,email })
      if( response ){
        console.log(response.data);
        const{data,status}=response
        if(status===200){
          setVerifying(false);
          setSucces(data.message);
    
          setTimeOut(()=>{
          
            navigate('/admin');
    
          },
          3000);
         
        }
      }
    
    } catch (error) {
     if(error && error.response){
        const{data,status}=error.response;
        if(status === 400){
          setVerifying(false);
          setError(data.error,'kindly register');
          setTimeOut(()=>{
           
            navigate('/auth/signup');
    
          },
          3000);
    
         
        }
        else if(status === 500){
          setVerifying(false);
          setError(data.error,'kindly try again later');
          setTimeOut(()=>{
            navigate('/auth/signup');
          },
          3000);
    
        }else{
          setVerifying(false);
          setError('network error check your connection and try again later');
          setTimeOut(()=>{
           
            navigate('/auth/signup');
    
          },
          3000);
        }
     }

  const handleRedirect = () => {
    if (!verifying) {
      navigate('/admin');
    }
  };
}

  return (
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10rem' }}>
      {verifying ? (
        <>
          <ClipLoader color={'#36D7B7'} loading={verifying} css={override} size={150} />
          <h2 css={{ marginTop: '2rem' }}>Verifying email, please wait...</h2>
        </>
      ) : (
        <>
          <h2>Email verified! You will be redirected shortly.</h2>
          <p>If you are not automatically redirected, click <a href="/" onClick={handleRedirect}>here</a>.</p>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
