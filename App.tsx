import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { setNavigateRef } from './router';
import { usePageMeta } from './usePageMeta';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Eager load homepage
import { Homepage } from './components/pages/Homepage';

// Lazy load all other pages
const AboutPage      = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AuditPage      = lazy(() => import('./components/pages/AuditPage').then(m => ({ default: m.AuditPage })));
const OptInPage      = lazy(() => import('./components/pages/OptInPage').then(m => ({ default: m.OptInPage })));
const PricingPage    = lazy(() => import('./components/pages/PricingPage').then(m => ({ default: m.PricingPage })));
const PrivacyPage    = lazy(() => import('./components/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage      = lazy(() => import('./components/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ServicesPage   = lazy(() => import('./components/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const IndustriesPage = lazy(() => import('./components/pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const MortgagePage   = lazy(() => import('./components/pages/MortgagePage'));
const RealEstatePage = lazy(() => import('./components/pages/RealEstatePage'));
const HomeServicesPage = lazy(() => import('./components/pages/HomeServicesPage'));
const MedicalPage    = lazy(() => import('./components/pages/MedicalPage'));
const LegalPage      = lazy(() => import('./components/pages/LegalPage'));
const ResourcesPage  = lazy(() => import('./components/pages/ResourcesPage'));
const BlogPage       = lazy(() => import('./components/pages/BlogPage'));
const GlossaryPage   = lazy(() => import('./components/pages/GlossaryPage'));

const PageLoader: React.FC = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--t4)', fontSize: '0.875rem', letterSpacing: '0.08em',
  }}>Loading…</div>
);

const NotFoundPage: React.FC = () => (
  <div style={{
    minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 16, textAlign: 'center', padding: '0 24px',
  }}>
    <span style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--fd)', color: 'var(--blue)' }}>404</span>
    <p style={{ color: 'var(--t3)', maxWidth: 400 }}>This page doesn't exist. Might be a broken link or you typed something creative.</p>
    <a href="/" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}>← Back to home</a>
  </div>
);

const NO_FOOTER_ROUTES = ['/optin'];
const FULL_BLEED_ROUTES = ['/', '/optin'];

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // Wire up the global navigate() function
  useEffect(() => { setNavigateRef(nav); }, [nav]);

  // Dynamic SEO meta per route
  usePageMeta();

  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);
  const fullBleed = FULL_BLEED_ROUTES.includes(pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg0)' }}>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" role="main" style={{ flex: 1, paddingTop: fullBleed ? 0 : 'var(--nav-h)' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/realestate" element={<RealEstatePage />} />
            <Route path="/homeservices" element={<HomeServicesPage />} />
            <Route path="/medical" element={<MedicalPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/optin" element={<OptInPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
