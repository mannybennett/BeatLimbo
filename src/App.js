import React from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css'

function App() {
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