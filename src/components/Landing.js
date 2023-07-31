import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography, useMediaQuery } from '@mui/material';
import audioVisBlack from '../images/audioVisBlack.jpg';
import BLheader from '../images/BLheader.png';

const Landing = () => {
  const mobileView = useMediaQuery('(max-width: 600px)');
  const width = mobileView ? '140px' : '185px'
  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundImage: `url(${audioVisBlack})`,
        backgroundSize: 'cover',
      }}
    >
      <Box marginBottom={10} width='100%' height='25%' display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
        <Box width='185px'>
          <img width='100%' alt='logo' src={BLheader} />
        </Box>          
        <Typography color='#e8e8e8' sx={{ fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1 }}>
          Unfinished Beats.<em>Unlimited Potential.</em>
        </Typography>
        <Typography fontWeight={500} color='#424242' sx={{ fontSize: { xs: '0.85rem', sm: '1.25rem', md: '1.75rem' }, lineHeight: 1 }}>
          Get feedback on your tracks stuck in limbo.
        </Typography>
        <LoginButton />
      </Box>
    </Box>
  );
};

export default Landing;