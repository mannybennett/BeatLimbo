import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography } from '@mui/material';
import audioVis from '../images/audioVis.jpg';

const Landing = () => {
  return (
    <Box bgcolor='#0F0F0F' width='100vw' height='100vh' display='flex' flexDirection='column'>
      <Box width='100%' height='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end'>
        <Box display='flex' flexDirection='column'>
          <Typography color='#424242' sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, lineHeight: 1.2 }}>
            beatlimbo.com
          </Typography>
          <Typography color='#e8e8e8' sx={{ fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.2 }}>
            Unfinished Beats.
          </Typography>
          <Typography color='#e8e8e8' sx={{ fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.2 }}>
            <em>Unlimited Potential.</em>
          </Typography>
          <Typography color='#424242' sx={{ fontSize: { xs: '0.75rem', sm: '1.25rem', md: '1.75rem' }, lineHeight: 1.2, paddingBottom: '25px' }}>
            Get feedback on your tracks stuck in limbo.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${audioVis})`,
          backgroundSize: 'cover',
        }}
        paddingTop='25px'
        display='flex'
        alignItems='flex-start'
        justifyContent='center'
        width='100%'
        height='50%'
      >
        <LoginButton />
      </Box>
    </Box>
  );
};

export default Landing;