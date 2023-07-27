import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const MostPlayed = ({ mostPlayedFile, handleScroll }) => (
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
    }}
  >
    <Typography marginBottom={1.5} variant='h5' fontWeight='500' color='#e8e8e8'>Most Played</Typography>
    {mostPlayedFile && 
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2.5 }}>
        <Avatar sx={{ width: 35, height: 35, marginRight: 1, borderRadius: 1 }} alt='user' src={mostPlayedFile.image} />
        <Typography variant="p" color="#919191">
          {mostPlayedFile.title} by <span style={{color: '#d91226', fontWeight: 500}}>{mostPlayedFile.user_name}</span>
        </Typography>
      </Box>
    }
    <Button onClick={handleScroll} variant="contained">
      Go to Post
    </Button>
  </Box>
);

export default MostPlayed;