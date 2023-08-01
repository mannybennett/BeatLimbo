import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, useMediaQuery } from '@mui/material';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  const mobileView = useMediaQuery('(max-width: 600px)');

  return (
    <Button
      sx={{
        height: 'auto',
        width: mobileView ? '80%' : '150px',
        backgroundColor: '#d91226',
        borderRadius: 1,
        fontFamily: 'Poppins',
        fontSize: { xs: '1rem', md: '1.1rem' },
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.2)'
        }
      }}
      size='large'
      color='info'
      onClick={() => loginWithRedirect()}
    >
      Get Started
    </Button>
  )
};

export default LoginButton;