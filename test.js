import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(10)}px;
`;

const Spinner = styled(CircularProgress)`
  margin: ${({ theme }) => theme.spacing(2)}px;
`;

function VerifyEmail() {
  // const classes = useStyles();
  // const history = useHistory();
  const Navigate=useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // if (code) {
    //   Navigate('/');
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
    }, 3000);
  }, [location.search]);

  return (
    <Container>
      {verifying ? (
        <>
          <Spinner size={60} />
          <Typography variant="h6">Verifying email...</Typography>
        </>
      ) : (
        <Typography variant="h6">Email verified! You can now log in.</Typography>
      )}
    </Container>
  );
}

export default VerifyEmail;
