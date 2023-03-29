import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import './landing.css';
import { useLocation } from 'react-router-dom';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//   height: 100%;
//   width:100%;

  
  background-color: #f1f1f1;
`;

const Message = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const LandingPage = () => {
    const { search } = useLocation();
    const name = new URLSearchParams(search).get('name');
  return (
    <Container sx={{backgroundColor:'#f1f1f1',padding:'2rem'}}> 
      <Message variant="h5" align="center">
        Hey, {name}!
      </Message>
      <div >
        <Typography variant="body1" align="center" >
          A verification link has been sent to your email.
        </Typography>
        <Typography variant="body1" align="center" >
          Kindly visit your email to complete the registration process.
        </Typography>
        <Typography variant="body1" component="p" align="center">
        We believe that together, we can achieve great things and make a positive impact in the world. Welcome to our community!
      </Typography>
      </div>
    </Container>
  );
};

export default LandingPage;
