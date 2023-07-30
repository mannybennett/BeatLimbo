import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography, useMediaQuery } from '@mui/material';
import audioVis from '../images/audioVis.jpg';
import BLheader from '../images/BLheader.png';

const Landing = () => {
  const mobileView = useMediaQuery('(max-width: 600px)');
  const width = mobileView ? '140px' : '185px'
  return (
    <Box bgcolor='#0F0F0F' width='100vw' height='100vh' display='flex' flexDirection='column'>
      <Box width='100%' height='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end'>
        <Box display='flex' flexDirection='column'>
          <Box marginBottom={1}><img width={width} alt='logo' src={BLheader} /></Box>          
          <Box display='flex' flexDirection='column'>
            <Typography color='#e8e8e8' sx={{ fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.2 }}>
              Unfinished Beats.
            </Typography>
            <Typography color='#e8e8e8' sx={{ fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.2 }}>
              <em>Unlimited Potential.</em>
            </Typography>
            <Typography fontWeight={500} color='#424242' sx={{ fontSize: { xs: '0.85rem', sm: '1.25rem', md: '1.75rem' }, lineHeight: 1.2, paddingBottom: '25px' }}>
              Get feedback on your tracks stuck in limbo.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${audioVis})`,
          backgroundSize: 'cover',
        }}
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