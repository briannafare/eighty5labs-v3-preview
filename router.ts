import { NavigateFunction } from 'react-router-dom';

// Global navigate reference — set by AppShell on mount
let _navigate: NavigateFunction | null = null;

export const setNavigateRef = (fn: NavigateFunction) => {
  _navigate = fn;
};

/**
 * Drop-in replacement for the old hash-based navigate().
 * Accepts either '/path' or '#/path' (for any legacy calls).
 */
export const navigate = (to: string) => {
  // Strip hash prefix if present (legacy compat)
  const path = to.startsWith('#/') ? to.slice(1) : to.startsWith('#') ? to.slice(1) || '/' : to;
  if (_navigate) {
    _navigate(path);
  } else {
    window.location.pathname = path;
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
};
