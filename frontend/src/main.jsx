import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';
import './index.css';

// Minimal path-based split for /admin — deliberately not pulling in a router
// dependency for one extra screen (keeps the bundle lean, per the project's
// "avoid unnecessary dependencies" guideline). The public site and the admin
// dashboard are otherwise fully independent trees.
const isAdminRoute = window.location.pathname.startsWith('/admin');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </React.StrictMode>
);
