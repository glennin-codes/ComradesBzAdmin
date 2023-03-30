import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { getAuthData } from '../cookies/SetCookies';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const{_id,token}=getAuthData();
  const config={
   
        headers: { Authorization: `Bearer ${token}` },

  }

  useEffect(() => {
    // Fetch user data from API
    
    axios.get(`https://comradesbizapi.azurewebsites.net/api/user/${_id}`)
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setLocation(response.data.location);
        setSchool(response.data.school);
      })
      .catch(error => console.error(error));
  }, []);

  const handleUpdate = () => {
    // PUT updated user data to API
    axios.put(`https://comradesbizapi.azurewebsites.net/api/user/${_id}`, {
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
      {user && (
        <>
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
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </>
      )}
    </Container>
  );
};

export default UserProfile;
