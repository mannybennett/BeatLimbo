import React from 'react';
import { Routes, Route } from 'react-router';
import Upload from './components/Upload';
import Login from './components/Login';
import Limbo from './components/Limbo';

function Router() {
  return (
    <Routes>
      <Route path='/limbo' element={<Limbo/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
};

export default Router;