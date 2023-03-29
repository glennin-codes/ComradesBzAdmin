import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width:100vw;
  
  background-color: #f7f7f7;
`;

const Message = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const LandingPage = ({ name }) => {
  return (
    <Container>
      <Message variant="h5">
        Hey, {name}!
      </Message>
      <div >
        <Typography variant="body1" align="center">
          A verification link has been sent to your email.
        </Typography>
        <Typography variant="body1">
          Kindly visit your email to complete the registration process.
        </Typography>
      </div>
    </Container>
  );
};

export default LandingPage;
