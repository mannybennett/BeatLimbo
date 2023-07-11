import React from 'react';
import { Routes, Route } from 'react-router';
import Upload from './containers/Upload';
import Login from './components/Login';
import Limbo from './containers/Limbo';
import Profile from './containers/Profile';
import Landing from './components/Landing';
import ProfileCreation from './containers/ProfileCreation';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/limbo' element={<Limbo/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profilecreation' element={<ProfileCreation/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
};

export default Router;