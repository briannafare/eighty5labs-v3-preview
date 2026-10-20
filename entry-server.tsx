// Server entry used at build time only (see scripts/prerender.mjs).
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { prerender } from 'react-dom/static';
import App from './App';

export { PAGE_META, NOT_FOUND_META, canonicalFor, SITE_URL } from './seo/routes';
export { jsonLdFor } from './seo/schema';

/** Renders the whole app for one URL to an HTML string, waiting for lazy pages. */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return await new Response(prelude).text();
}
