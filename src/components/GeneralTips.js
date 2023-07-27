import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const tips = ['melody', 'drums', 'mixing', 'arrangement', 'tempo', 'sound selection', 'effects', 'transitions', 'bassline']

const GeneralTips = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1f1f1f',
        width: '100%',
        height: 'auto',
        borderRadius: 1,
        boxShadow: "0px 3px 10px black",
        display: 'flex',
        flexDirection: 'column',
        padding: 2
      }}
    >
      <Typography marginBottom={1} variant='h5' fontWeight='500' color='#e8e8e8'>General Tips</Typography>
      <Typography marginBottom={2} variant='subtitle1' color='#919191'>To achieve quality beats, keep the following components in mind:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {tips.map((tip, idx) => {
          return <Chip key={idx} sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label={tip}/>
        })}
      </Box>
    </Box>
  )
};

export default GeneralTips;