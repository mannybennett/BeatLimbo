import React from 'react';
import LoginButton from './LoginButton';
import { Box } from '@mui/material';


const Landing = () => {
  return (
    <Box width='100vw' height='100vh' bgcolor='lightgray' display='flex' justifyContent='center'>
      <Box width='70%' height='100%' bgcolor='#bfbfbf'>{<LoginButton></LoginButton>}</Box>
    </Box>
  )
};

export default Landing;