import React from 'react';
import { Routes, Route } from 'react-router';
import { Box } from "@mui/material";
import Upload from './containers/Upload';
import Limbo from './containers/Limbo';
import Profile from './containers/Profile';
import Landing from './components/Landing';
import ProfileCreation from './containers/ProfileCreation';

function Router() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/limbo' element={<Limbo/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/profilecreation' element={<ProfileCreation/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Box>
  )
};

export default Router;