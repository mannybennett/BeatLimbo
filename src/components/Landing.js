import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography } from '@mui/material';
import invertedGreyTopo from '../images/invertedGreyTopo.jpg';
import lightGreyTopo from '../images/lightGreyTopo.jpg';
import blackTopo from '../images/blackTopo.jpg';
import darkRedTopo from '../images/darkRedTopo.jpg';
import redTopo from '../images/redTopo.jpg';
import post from '../images/post.jpg';

const Landing = () => {
  return (
    <Box sx={{ backgroundImage: `url(${lightGreyTopo})` }} bgcolor='#0a0a0a' width='100vw' height='100vh' display='flex' justifyContent='center'>
      <Box width='50%' height='100%' display='flex' justifyContent='flex-end'>
        <Box marginTop='150px' display='flex' flexDirection='column'>
          <Typography color='#424242' variant='h3'>beatlimbo.com</Typography>
          <Typography color='#e8e8e8' variant='h1'>Unfinished Beats</Typography>
          <Typography color='#e8e8e8' variant='h1'>Unlimited Potential</Typography>
          <LoginButton />
        </Box>
      </Box>
      <Box padding={2} width='50%' height='100%' display='flex' justifyContent='flex-end'>
        <img alt='landing' src={post} width='40%' height='auto' style={{ borderRadius: '20px', position: 'absolute', right: '200px', top: '150px', maxWidth: '743px' }} />
        <img alt='landing' src={redTopo} width='50%' height='100%' style={{ borderRadius: '20px', objectFit: 'cover' }} />
      </Box>
    </Box>
  )
};

export default Landing;