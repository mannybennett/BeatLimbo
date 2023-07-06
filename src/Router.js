import React from 'react';
import { Routes, Route } from 'react-router';
import Upload from './components/Upload';
import Login from './components/Login';
import Limbo from './components/Limbo';
import Profile from './components/Profile';

function Router() {
  return (
    <Routes>
      <Route path='/limbo' element={<Limbo/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
};

export default Router;