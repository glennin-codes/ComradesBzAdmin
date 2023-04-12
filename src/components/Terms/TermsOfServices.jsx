import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    padding: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  warning: {
    color: '#f44336',
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
const TermsOfServices = () => {
    return (
      <Container maxWidth='md'>
       <Typography variant='h4' gutterBottom>
        Terms and Conditions
      </Typography>

      <Typography variant='subtitle1' className={classes.attention} gutterBottom>
        Attention! By using this platform, you agree to the following terms and conditions. Failure to comply may result in immediate termination of your account.
      </Typography>

</Container>
            )}
export default TermsOfServices;