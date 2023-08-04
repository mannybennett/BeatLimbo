import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography, useMediaQuery } from '@mui/material';
import '../styles/Landing.css'
import BLheader from '../images/BLheader.png';

const Landing = () => {
  const tabletView = useMediaQuery('(max-width: 1220px)');
  const mobileView = useMediaQuery('(max-width: 600px)');
  const tinyView = useMediaQuery('(max-width: 356px)');
  const height = tabletView ? '40%' : '25%'
  const width = mobileView ? '140px' : '185px'
  const padding = tinyView ? 0 : 3

  return (
    <Box className='bodyBox'>
      <Box className='mainBox' height={height}>
        <Box className='logo' width={width}>
          <img width='100%' alt='logo' src={BLheader} />
        </Box>

        {/* Desktop */}
        <Box className='allTextContainer' display={tabletView ? 'none' : 'flex'}>
          <Box className='bigTextDesktopContainer'>
            <Typography className='ubDesktopText'>
              Unfinished Beats.
            </Typography>
            <Typography className='upDesktopText'>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>          
          <Typography className='feedbackDesktopText'>
            Get feedback on your incomplete tracks.
          </Typography>
        </Box>

        {/* Tablet */}                    
        <Box className='allTextContainer' display={!tabletView ? 'none' : 'flex'} padding={padding}>
          <Box className='bigTextTabletContainer' display={{ xs: 'none', sm: 'flex' }}>
            <Typography className='bigTextTablet' sx={{ fontSize: { sm: '3.5rem', md: '4rem' } }}>
              Unfinished Beats.
            </Typography>
            <Typography className='bigTextTablet' sx={{ fontSize: { sm: '3.5rem', md: '4rem' } }}>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>
          <Typography className='feedbackTabletText' display={{ xs: 'none', sm: 'flex' }}>
            Get feedback on your incomplete tracks.
          </Typography> 
          
          {/* Mobile */}  
          <Box className='allTextMobileContainer' display={{ xs: 'flex', sm: 'none' }}>
            <Typography className='bigTextMobile'>
              Unfinished Beats.
            </Typography>
            <Typography className='bigTextMobile'>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>                                 
          <Box className='allTextContainer' display={{ xs: 'flex', sm: 'none' }}>
            <Typography className='feedbackMobileText'>
              Get feedback on your
            </Typography>
            <Typography className='feedbackMobileText'>
              incomplete tracks.
            </Typography>
          </Box>             
        </Box>                
        <LoginButton />
      </Box>
    </Box>
  );
};

export default Landing;