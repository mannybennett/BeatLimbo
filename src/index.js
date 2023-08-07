import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import App from './App';
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-0weh4iih7e30y5un.us.auth0.com'
      clientId='esiozAWvO6GWJobk96KcDZVkmL0a1KSJ'
      authorizationParams={{
        redirect_uri: "https://beatlimbo-frontend.onrender.com/profilecreation"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);