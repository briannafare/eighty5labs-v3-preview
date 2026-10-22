import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';

// Redirect legacy hash URLs → real paths (one-time on load)
if (window.location.hash.startsWith('#/')) {
  const path = window.location.hash.slice(1); // '#/services' → '/services'
  window.history.replaceState(null, '', path);
}

const container = document.getElementById('root')!;
const app = (
  <BrowserRouter>
    <App />
    <Analytics />
  </BrowserRouter>
);

// Built pages ship prerendered HTML: attach to it. In dev the root is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
