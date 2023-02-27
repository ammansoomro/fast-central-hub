import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Import React Routers
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './authContext/AuthContext';
import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);