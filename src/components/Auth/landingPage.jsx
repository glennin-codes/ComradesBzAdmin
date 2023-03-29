import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width:100%;
  
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
      <Message variant="h5" align="center">
        Hey, {name}!
      </Message>
      <div >
        <Typography variant="body1" align="center">
          A verification link has been sent to your email.
        </Typography>
        <Typography variant="body1" align="center" >
          Kindly visit your email to complete the registration process.
        </Typography>
      </div>
    </Container>
  );
};

export default LandingPage;
