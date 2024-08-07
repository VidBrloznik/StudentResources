import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/contexts";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

