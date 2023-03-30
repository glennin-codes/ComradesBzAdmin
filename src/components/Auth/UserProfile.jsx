import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from '@emotion/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const UserProfileButton = styled(Button)`
  margin-top: 20px;
  background-color: #6C63FF;
  color: #fff;
  &:hover {
    background-color: #514EC2;
  }
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const token=localStorage.getItem('token')
  const config={
    headers: { Authorization: `Bearer ${token}` },
  }

  const id =localStorage.getItem('id');
  console.log("id",id);

  useEffect(() => {
    setLoading(true);
    // Fetch user data from API
    axios.get(`https://comradesbizapi.azurewebsites.net/api/user/${id}`)
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setLocation(response.data.location);
        setSchool(response.data.school);
      })
      .catch(error => {
        setLoading(false)
        console.error(error);
        // if (error.response && error.response.status === 404) {
        //   setError("User not found");
        
        // } 
        //  else if (error.response.status === 401) {
        //   setError('You are not authorized to access this resource.');
        // }
        //  else if (error.response.status === 403) {
        //   setError('Access to this resource is forbidden. Please log in to continue.');
        //   setTimeout(()=>{
        //     navigate('/');
        //   }
        //   ,3000
        //   )
        // }else if (error.response.status === 500){
        //     console.log(error.response.data);
        //    setError("Server error!");
        // }
        // else {
        //   setError("network error!,check your connections and try again");
         
        // }

        
      });
  }, []);

  const handleUpdate = () => {
    // PUT updated user data to API
    axios.put(`https://comradesbizapi.azurewebsites.net/api/user/${id}`, {
      name,
      email,
      phone,
      location,
      school
    } ,
    config
    )
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setLocation(response.data.location);
        setSchool(response.data.school);
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
        {error && <Alert severity="error" >{error}</Alert>}
      {loading ?(
         <ClipLoader
         color={"#36D7B7"}
         loading={loading}
         css={override}
         size={150}
       />

      ):
      user &&
      (
        <>
          <Heading>{name} Profile</Heading>
          <InputContainer>
            <TextField
              label="Name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="Phone"
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="Location"
              value={location}
              onChange={event => setLocation(event.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="School"
              value={school}
              onChange={event => setSchool(event.target.value)}
            />
          </InputContainer>
          <UserProfileButton variant="contained" onClick={handleUpdate}>Update</UserProfileButton>
        </>
      )
}
    </Container>
  );
};

export default UserProfile;
