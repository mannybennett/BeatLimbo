import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      sx={{
        height: 'auto',
        width: { xs: '110px', md: '150px' },
        backgroundColor: '#d10e1f',
        borderRadius: 1,
        fontFamily: 'Poppins',
        fontSize: { xs: '0.8rem', md: '1.1rem' },
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