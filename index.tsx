import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Redirect legacy hash URLs → real paths (one-time on load)
if (window.location.hash.startsWith('#/')) {
  const path = window.location.hash.slice(1); // '#/services' → '/services'
  window.history.replaceState(null, '', path);
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
