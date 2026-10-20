// Per-route JSON-LD. Pure data builders, safe to run on server and client.
import { PAGE_META, SITE_URL, canonicalFor } from './routes';

type Json = Record<string, unknown>;

const HOME_BLOCKS: Json[] = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.eighty5labs.com/#organization",
    "name": "eighty5labs",
    "alternateName": "eighty5 labs",
    "url": "https://www.eighty5labs.com",
    "logo": "https://www.eighty5labs.com/logo.png",
    "description": "eighty5labs is an AI operating system for local service businesses, closing the visibility, reputation, and conversion gaps through AI-powered automation built on eighty5.OS.",
    "foundingDate": "2024",
    "foundingLocation": {
      "@type": "Place",
      "name": "Portland, Oregon, US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      "AI Search Visibility",
      "Answer Engine Optimization",
      "Generative Engine Optimization",
      "Google Business Profile Optimization",
      "Online Reputation Management",
      "Voice AI for Local Business",
      "Marketing Automation",
      "Local SEO",
      "Lead Capture Automation",
      "Conversion Rate Optimization"
    ],
    "sameAs": [
      "https://www.facebook.com/eighty5labs/",
      "https://www.instagram.com/eighty5labs/",
      "https://www.youtube.com/@eighty5labs",
      "https://www.linkedin.com/company/eighty5labs",
      "https://x.com/eighty5labs",
      "https://share.google/4EpBRm13SY89EdhkK"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.eighty5labs.com/#website",
    "name": "eighty5labs \u2014 AI Operating System for Local Business",
    "description": "eighty5labs helps local service businesses close the visibility, reputation, and conversion gaps using AI-powered tools built on eighty5.OS.",
    "url": "https://www.eighty5labs.com",
    "publisher": {
      "@id": "https://www.eighty5labs.com/#organization"
    },
    "inLanguage": "en-US",
    "datePublished": "2025-11-01",
    "dateModified": "2026-03-06"
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.eighty5labs.com/#service",
    "name": "eighty5labs",
    "description": "AI-powered operating system that closes the visibility, lead capture, and conversion gaps for local service businesses. Includes AI search optimization, voice AI, review automation, and full marketing automation.",
    "url": "https://www.eighty5labs.com",
    "provider": {
      "@id": "https://www.eighty5labs.com/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "AI Search Visibility Optimization",
      "Google Business Profile Management",
      "Voice AI Receptionist",
      "Review Management Automation",
      "Lead Capture Automation",
      "Marketing Automation",
      "Answer Engine Optimization",
      "Generative Engine Optimization"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "eighty5.OS Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Visibility Audit",
            "description": "Comprehensive analysis of AI search visibility, Google Maps position, review velocity, and conversion gaps against local competitors."
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to set up eighty5labs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses are fully deployed in 5-7 business days. Voice AI and review automation can be running within 48 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Does eighty5labs integrate with my existing CRM and phone system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. eighty5.OS integrates with your existing CRM, calendar, and phone system. We layer on top \u2014 no rip-and-replace."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI search optimization work for local businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When someone asks ChatGPT, Gemini, or Perplexity for a recommendation in your market, does your business appear? Our Content AI ensures it does, with structured data that AI engines can cite and recommend."
        }
      },
      {
        "@type": "Question",
        "name": "Does eighty5labs require a long-term contract?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Month-to-month after any initial commitment period. We earn your business every month."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use eighty5labs Voice AI if I already have a receptionist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Voice AI handles overflow and after-hours \u2014 it doesn't replace your team, it catches what they miss. Most businesses use it as a safety net that pays for itself in recovered leads."
        }
      },
      {
        "@type": "Question",
        "name": "What makes eighty5labs different from other AI marketing platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "eighty5labs doesn't sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps \u2014 visibility, capture, and conversion \u2014 with everything connected. One dashboard, one team, one system."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.eighty5labs.com/#service-contentai",
    "name": "Content AI \u2014 AEO & GEO Optimization",
    "description": "AI-powered content creation engine that structures website pages, blog posts, Google Business Profile updates, and FAQ content for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). Ensures local businesses are the answer ChatGPT, Gemini, and Perplexity recommend.",
    "provider": {
      "@id": "https://www.eighty5labs.com/#organization"
    },
    "serviceType": "Answer Engine Optimization",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "category": "AI Search Visibility"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.eighty5labs.com/#service-voiceai",
    "name": "Voice AI \u2014 24/7 AI Receptionist",
    "description": "AI-powered voice agent that answers every call, qualifies leads by service type, books appointments, and handles after-hours inquiries. Sounds natural, integrates with existing phone systems and CRMs. Pays for itself in recovered leads from missed calls.",
    "provider": {
      "@id": "https://www.eighty5labs.com/#organization"
    },
    "serviceType": "Voice AI Receptionist",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "category": "Lead Capture"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.eighty5labs.com/#service-reputationai",
    "name": "Reputation AI \u2014 Review Management Automation",
    "description": "Automated review request system that builds Google review velocity, responds to reviews with AI within minutes, and monitors reputation across platforms. Optimizes Google Business Profile for local Map Pack dominance.",
    "provider": {
      "@id": "https://www.eighty5labs.com/#organization"
    },
    "serviceType": "Online Reputation Management",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "category": "Reputation & Visibility"
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.eighty5labs.com/#localbusiness",
    "name": "eighty5labs",
    "description": "AI-powered operating system for local service businesses in the Portland metro area and nationwide. Closes visibility, lead capture, and conversion gaps through automation.",
    "url": "https://www.eighty5labs.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.5152,
      "longitude": -122.6784
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "City",
        "name": "Portland"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/eighty5labs/",
      "https://www.instagram.com/eighty5labs/",
      "https://www.youtube.com/@eighty5labs",
      "https://www.linkedin.com/company/eighty5labs",
      "https://x.com/eighty5labs"
    ]
  }
];

export const jsonLdFor = (pathname: string): Json[] => {
  if (pathname === '/') return HOME_BLOCKS;
  const meta = PAGE_META[pathname];
  if (!meta) return [];
  return [{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonicalFor(pathname) + '#webpage',
    url: canonicalFor(pathname),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': SITE_URL + '/#website' },
    publisher: { '@id': SITE_URL + '/#organization' },
  }];
};
