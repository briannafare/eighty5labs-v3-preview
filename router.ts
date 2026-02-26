// Simple hash router

export const navigate = (route: string) => {
  window.location.hash = route.startsWith('#') ? route.slice(1) : route;
  window.scrollTo({ top: 0, behavior: 'instant' });
};

export const useRoute = () => {
  const [route, setRoute] = React.useState(() => window.location.hash || '#/');

  React.useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return route;
};

import React from 'react';
