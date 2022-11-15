import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlertMessageProvider from './components/alert/AlertMessageProvider';
import LoadingProvider from './components/loading/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertMessageProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </AlertMessageProvider>
  </React.StrictMode>
);
