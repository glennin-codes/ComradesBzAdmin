import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css `display: block;
margin: 0 auto;
border-color: red; `;
   

function VerifyEmail() {
  const navigate= useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // if (!code) {
    //  navigate('/');
    //   return;
    // }

    // Call an API to check if the verification code is valid and mark the user's email as verified
    // This could be done using axios or fetch

    // Here's an example of what the API call might look like using axios:
    // axios.post('/api/verify-email', { code })
    //   .then((response) => {
    //     setVerifying(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     history.push('/');
    //   });

    // For this example, we'll just simulate the API call with a timeout
    setTimeout(() => {
      setVerifying(false);
    }, 5000);
  }, [history, location.search]);

  const handleRedirect = () => {
    if (!verifying) {
      navigate('/');
    }
  };

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
