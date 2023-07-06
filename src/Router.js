import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import Upload from './components/Upload';
import Login from './components/Login';
import Limbo from './components/Limbo';
import Profile from './components/Profile';

// The Router component acts as an intermediary between the Profile and Upload components,
// passing the necessary data along the component hierarchy.

function Router() {
  const { user:auth0User } = useAuth0();
  const [user, setUser] = useState(auth0User);
  const [userCreated, setUserCreated] = useState(false);

  return (
    <Routes>
      <Route path='/limbo' element={<Limbo/>} />
      <Route path='/upload' element={<Upload user={user} userCreated={userCreated}/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile'
      element={<Profile user={user} setUser={setUser} userCreated={userCreated} setUserCreated={setUserCreated}/>} />
    </Routes>
  )
};

export default Router;