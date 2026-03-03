import React, { Suspense, lazy } from 'react';
import { useRoute } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Eager load homepage
import { Homepage } from './components/pages/Homepage';

// Lazy load all other pages
const AboutPage     = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AuditPage     = lazy(() => import('./components/pages/AuditPage').then(m => ({ default: m.AuditPage })));
const OptInPage     = lazy(() => import('./components/pages/OptInPage').then(m => ({ default: m.OptInPage })));
const PricingPage   = lazy(() => import('./components/pages/PricingPage').then(m => ({ default: m.PricingPage })));
const PrivacyPage   = lazy(() => import('./components/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage     = lazy(() => import('./components/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ServicesPage  = lazy(() => import('./components/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const IndustriesPage = lazy(() => import('./components/pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const MortgagePage  = lazy(() => import('./components/pages/MortgagePage'));
const RealEstatePage = lazy(() => import('./components/pages/RealEstatePage'));
const HomeServicesPage = lazy(() => import('./components/pages/HomeServicesPage'));
const MedicalPage   = lazy(() => import('./components/pages/MedicalPage'));
const LegalPage     = lazy(() => import('./components/pages/LegalPage'));
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage'));
const BlogPage      = lazy(() => import('./components/pages/BlogPage'));
const GlossaryPage  = lazy(() => import('./components/pages/GlossaryPage'));

// Fallback for lazy-loaded pages
const PageLoader: React.FC = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--t4)',
    fontSize: '0.875rem',
    letterSpacing: '0.08em',
  }}>
    Loading…
  </div>
);

// 404
const NotFoundPage: React.FC = () => (
  <div style={{
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    textAlign: 'center',
    padding: '0 24px',
  }}>
    <span style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--fd)', color: 'var(--blue)' }}>404</span>
    <p style={{ color: 'var(--t3)', maxWidth: 400 }}>This page doesn't exist. Might be a broken link or you typed something creative.</p>
    <a href="#/" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}>← Back to home</a>
  </div>
);

// Pages that hide the footer (e.g. opt-in landing pages)
const NO_FOOTER_ROUTES = ['#/optin'];

// Pages that should have no top padding (handle their own hero)
const FULL_BLEED_ROUTES = ['#/', '#/optin'];

const App: React.FC = () => {
  const route = useRoute();

  // Normalize: strip trailing slash except root
  const normalizedRoute = route.endsWith('/') && route !== '#/'
    ? route.slice(0, -1)
    : route;

  const showFooter = !NO_FOOTER_ROUTES.includes(normalizedRoute);

  const renderPage = () => {
    switch (normalizedRoute) {
      case '#/':
      case '#':
        return <Homepage />;
      case '#/services':
        return <ServicesPage />;
      case '#/industries':
        return <IndustriesPage />;
      case '#/mortgage':
        return <MortgagePage />;
      case '#/realestate':
        return <RealEstatePage />;
      case '#/homeservices':
        return <HomeServicesPage />;
      case '#/medical':
        return <MedicalPage />;
      case '#/legal':
        return <LegalPage />;
      case '#/pricing':
        return <PricingPage />;
      case '#/resources':
        return <ResourcesPage />;
      case '#/about':
        return <AboutPage />;
      case '#/blog':
        return <BlogPage />;
      case '#/glossary':
        return <GlossaryPage />;
      case '#/audit':
        return <AuditPage />;
      case '#/optin':
        return <OptInPage />;
      case '#/privacy':
        return <PrivacyPage />;
      case '#/terms':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg0)' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: FULL_BLEED_ROUTES.includes(normalizedRoute) ? 0 : 'var(--nav-h)' }}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
