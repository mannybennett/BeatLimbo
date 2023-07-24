import React from 'react';
import { Routes, Route } from 'react-router';
import { Box } from "@mui/material";
import Upload from './containers/Upload';
import Login from './components/Login';
import Limbo from './containers/Limbo';
import Profile from './containers/Profile';
import Landing from './components/Landing';
import ProfileCreation from './containers/ProfileCreation';
import grey from './images/grey.jpg';

function Router() {
  return (
    <Box bgcolor="#1f1f1f" flex={5}
      sx={{
        // backgroundImage: `url(${grey})`,
        backgroundImage: 'linear-gradient(to bottom right, #d91226, #5e0810)',
        backgroundAttachment: 'fixed'
      }}
    >
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/limbo' element={<Limbo/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profilecreation' element={<ProfileCreation/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Box>
  )
};

export default Router;