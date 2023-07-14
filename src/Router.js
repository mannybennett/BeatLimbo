import React from 'react';
import { Routes, Route } from 'react-router';
import { Box } from "@mui/material";
import Upload from './containers/Upload';
import Login from './components/Login';
import Limbo from './containers/Limbo';
import Profile from './containers/Profile';
import Landing from './components/Landing';
import ProfileCreation from './containers/ProfileCreation';
import whitewavey from "./images/whitewavey.jpg"

function Router() {
  return (
    <Box bgcolor="#1f1f1f" flex={5}
    // sx={{
    //   backgroundImage: `url(${whitewavey})`,
    //   backgroundSize: "cover",
    //   backgroundRepeat: "repeat",
    //   // boxShadow: "-10px 0px 20px black, 10px 0px 20px black"
    // }}
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