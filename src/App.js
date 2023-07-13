import React from 'react'
import Navigation from './containers/Navigation'
import { BrowserRouter } from 'react-router-dom';
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'
import Router from './Router';
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css'
import { Box, Stack, useMediaQuery } from '@mui/material';

function App() {
  const mobileView = useMediaQuery('(max-width: 600px)');
  const space = mobileView ? 0 : 1;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box bgcolor="#0a0a0a">
          <Navigation />
          <Stack sx={{ minHeight: "95.7vh" }} direction="row" spacing={space}>
            <LeftBar />
            <Router />
            <RightBar />
          </Stack>
        </Box>
      </BrowserRouter>
    </Provider>
  );
}

export default App;