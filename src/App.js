import React from 'react'
import Navigation from './containers/Navigation'
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/App.css';
import { useMediaQuery } from '@mui/material';

function App() {
  const mobileView = useMediaQuery('(max-width: 600px)');
  const space = mobileView ? 0 : 1;

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Navigation />
          <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;