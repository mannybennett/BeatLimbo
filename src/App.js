import React from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Router />
    </BrowserRouter>
  );
}

export default App;