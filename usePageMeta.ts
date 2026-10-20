import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_META, NOT_FOUND_META, canonicalFor, SITE_URL } from './seo/routes';
import { jsonLdFor } from './seo/schema';

const setMeta = (attr: string, value: string, isProperty = false) => {
  const selector = isProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.content = value;
};

const setCanonical = (url: string) => {
  const el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (el) el.href = url;
};

// Keeps <head> in step with the route during client-side navigation.
// The prerendered HTML already carries the right values for the first load;
// this keeps them right after the visitor clicks around.
export const usePageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const known = PAGE_META[pathname];
    const meta = known || NOT_FOUND_META;
    const url = known ? canonicalFor(pathname) : `${SITE_URL}${pathname}`;

    document.title = meta.title;
    setMeta('description', meta.description);
    setCanonical(url);
    setMeta('robots', known && !known.noindex
      ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      : 'noindex, follow');

    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:url', url, true);
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);

    // Swap the route's JSON-LD
    document.head.querySelectorAll('script[data-ld]').forEach(n => n.remove());
    for (const block of known ? jsonLdFor(pathname) : []) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-ld', '');
      s.textContent = JSON.stringify(block).replace(/</g, '\\u003c');
      document.head.appendChild(s);
    }
  }, [pathname]);
};
