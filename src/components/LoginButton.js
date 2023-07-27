import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button sx={{ height: 'auto', width: '30%', backgroundColor: '#d10e1f', borderRadius: 3 }} size='large' color='info' onClick={() => loginWithRedirect()}>Get Started</Button>
  );
}

export default LoginButton;