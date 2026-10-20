// Server entry used at build time only (see scripts/prerender.mjs).
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { prerender } from 'react-dom/static';
import App from './App';

export { PAGE_META, NOT_FOUND_META, canonicalFor, SITE_URL } from './seo/routes';
export { jsonLdFor } from './seo/schema';
export { POSTS } from './seo/posts';
export { default as lastmod } from './seo/lastmod.json';

/** Renders the whole app for one URL to an HTML string, waiting for lazy pages. */
export async function render(url: string): Promise<string> {
  let failure: unknown = null;
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    // Any render error must fail the build, never ship the "Loading…" fallback.
    {
      onError: (e) => { failure = failure ?? e; },
      // Never outline a boundary into a hidden segment: keep each page's text in place.
      progressiveChunkSize: Infinity,
    }
  );
  if (failure) throw failure;
  return await new Response(prelude).text();
}
