import React from 'react';
import LoginButton from './LoginButton';
import { Box, Typography, useMediaQuery } from '@mui/material';
import audioVisBlack from '../images/audioVisBlack.jpg';
import BLheader from '../images/BLheader.png';

const Landing = () => {
  const tabletView = useMediaQuery('(max-width: 1220px)');
  const mobileView = useMediaQuery('(max-width: 600px)');
  const tinyView = useMediaQuery('(max-width: 356px)');
  const height = tabletView ? '40%' : '25%'
  const width = mobileView ? '140px' : '185px'
  const padding = tinyView ? 0 : 3
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
      <Box marginBottom={10} width='100%' height={height} minHeight='293px' display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
        <Box marginLeft={1} width={width}>
          <img width='100%' alt='logo' src={BLheader} />
        </Box>
        {/* Desktop */}
        <Box display={tabletView ? 'none' : 'flex'} flexDirection='column' alignItems='center'>
          <Box paddingBottom={1} display='flex'>
            <Typography marginRight='3.5px' color='#e8e8e8' sx={{ fontSize: '4rem', lineHeight: 1 }}>
              Unfinished Beats.
            </Typography>
            <Typography marginLeft='3.5px' color='#e8e8e8' sx={{ fontSize: '4rem', lineHeight: 1 }}>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>          
          <Typography paddingBottom={1.2} fontWeight={500} color='#424242' sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, lineHeight: 1 }}>
            Get feedback on your incomplete tracks.
          </Typography>
        </Box>
        {/* Tablet */}                    
        <Box display={!tabletView ? 'none' : 'flex'} flexDirection='column' alignItems='center' padding={padding}>
          <Box paddingBottom={1} display={{ xs: 'none', sm: 'flex' }} flexDirection='column' alignItems='center'>
            <Typography color='#e8e8e8' sx={{ fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1 }}>
              Unfinished Beats.
            </Typography>
            <Typography color='#e8e8e8' sx={{ fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1 }}>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>
          <Typography display={{ xs: 'none', sm: 'flex' }} fontWeight={500} color='#424242' sx={{ fontSize: '1.5rem', lineHeight: 1 }}>
            Get feedback on your incomplete tracks.
          </Typography> 
          {/* Mobile */}  
          <Box paddingBottom={1} display={{ xs: 'flex', sm: 'none' }} flexDirection='column' alignItems='center'>
            <Typography color='#e8e8e8' sx={{ fontSize: '2rem', lineHeight: 1 }}>
              Unfinished Beats.
            </Typography>
            <Typography color='#e8e8e8' sx={{ fontSize: '2rem', lineHeight: 1 }}>
              <em>Unlimited Potential.</em>
            </Typography>
          </Box>                                 
          <Box display={{ xs: 'flex', sm: 'none' }} flexDirection='column' alignItems='center'>
            <Typography fontWeight={500} color='#424242' sx={{ fontSize: '1.25rem', lineHeight: 1 }}>
              Get feedback on your
            </Typography>
            <Typography fontWeight={500} color='#424242' sx={{ fontSize: '1.25rem', lineHeight: 1 }}>
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