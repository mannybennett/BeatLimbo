import React from "react";
import { Box, Typography } from "@mui/material";

const FeaturedBeat = () => {
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
        padding: 2,
        paddingBottom: '10px'
      }}
    >
      <Typography marginBottom={1} variant='h5' fontWeight='500' color='#e8e8e8'>Featured Beat</Typography>
      <Typography marginBottom={2} variant='subtitle1'color='#919191'>
        that made it out of&nbsp; 
        <span style={{color: '#d91226', fontWeight: 500}}>Limbo</span>
      </Typography>
      <div className="video-responsive">
        <iframe
          style={{ border: 'none', borderRadius: 4 }}
          width="100%"
          height="200px"
          src="https://www.youtube.com/embed/t8zhdv4ruK0"
          title="vid"
        />
      </div>         
    </Box>
  )
};

export default FeaturedBeat;