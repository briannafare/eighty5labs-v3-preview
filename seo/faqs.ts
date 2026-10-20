// FAQ copy shared by the pages that show it and by the FAQPage JSON-LD,
// so the schema can never list a question the page does not display.
export const HOME_FAQS: { q: string; a: string }[] = [
  { q: 'How long does it take to set up eighty5labs?', a: 'Full setup takes 5-7 business days. Voice AI and review automation can be running within 48 hours.' },
  { q: 'Does eighty5labs integrate with my existing CRM and phone system?', a: 'Yes. eighty5.OS integrates with your existing CRM, calendar, and phone system. We layer on top — no rip-and-replace.' },
  { q: 'How does AI search optimization work for local businesses?', a: "When someone asks ChatGPT, Gemini, or Perplexity for a recommendation in your market, does your business appear? Our Content AI ensures it does, with structured data that AI engines can cite and recommend." },
  { q: 'Does eighty5labs require a long-term contract?', a: 'No. Month-to-month after any initial commitment period. We earn your business every month.' },
  { q: 'Can I use eighty5labs Voice AI if I already have a receptionist?', a: "Voice AI handles overflow and after-hours — it doesn't replace your team, it catches what they miss." },
  { q: 'What makes eighty5labs different from other AI marketing platforms?', a: "We don't sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps — visibility, capture, and conversion — with everything connected. One dashboard, one team, one system." },
];

export const INDUSTRY_FAQS: Record<string, { q: string; a: string }[]> = {
  homeservices: [
    {
      q: 'How do I get my home service business into the Google Maps top 3?',
      a: "Google Maps top-3 ranking (the Map Pack) requires three things: a fully optimized Google Business Profile with the right primary category and services listed, consistent review velocity with recent and responded-to reviews, and regular posting activity that signals your business is active and relevant. eighty5labs runs all three systematically.",
    },
    {
      q: 'Does AI search send leads to home service businesses?',
      a: "Increasingly yes. Homeowners ask ChatGPT, Gemini, and Perplexity questions like 'best plumber in [city]' or 'who should I call for emergency HVAC repair near me.' These platforms look at your GBP, review profile, website content, and online consistency to make recommendations. Businesses with rich, structured content and strong review profiles are being recommended daily. Most contractors aren't building that — which is an opportunity.",
    },
    {
      q: 'How does automated estimate follow-up work?',
      a: "When an estimate is marked as sent in your CRM, eighty5labs triggers a follow-up sequence: SMS on Day 1, email on Day 3, SMS on Day 7, final follow-up on Day 14. Each message is personalized and specific to the job — not a generic 'just checking in.' Most contractors follow up once. This sequence follows up four times automatically — and it closes a meaningful percentage of estimates that would otherwise go cold.",
    },
  ],
  medical: [
    {
      q: 'How do medical practices rank in Google Maps?',
      a: "Google Maps ranks practices based on relevance, distance, and prominence. Your GBP needs to be optimized with the right primary category (be specific — 'dental clinic' outperforms 'healthcare'), services listed, consistent NAP, and a steady stream of recent reviews with responses. Practices that post weekly GBP updates and maintain review velocity consistently outrank competitors with static profiles.",
    },
    {
      q: 'Are patients using AI search to find healthcare providers?',
      a: "Yes, and it's accelerating. Patients ask ChatGPT and Perplexity questions like 'best chiropractor near me' or 'top-rated med spa in [city].' These platforms recommend practices with strong review profiles, educational FAQ content that answers patient questions, and consistent GBP activity. Practices building this infrastructure now are capturing patients before competitors even know the search happened.",
    },
    {
      q: 'How does automated appointment follow-up reduce no-shows?',
      a: "eighty5labs sends a series of personalized reminders via SMS and email before each appointment — 48 hours out, 24 hours out, and same-day morning. Each message includes a direct link to reschedule if needed. The reschedule option captures intent to return rather than just a no-show.",
    },
  ],
  legal: [
    {
      q: 'How do law firms rank in Google Maps for practice-area searches?',
      a: "Google Maps ranks firms based on relevance to the specific search, distance, and prominence. For practice-area searches like 'personal injury lawyer [city],' your GBP primary category, services listed, and review profile all need to be optimized specifically for that practice area. Firms that maintain regular GBP posts, earn consistent reviews, and respond to every review systematically outrank competitors who treat their profile as static.",
    },
    {
      q: 'Can AI search platforms generate legal leads?',
      a: "Yes — and the volume is growing. Prospective clients increasingly ask ChatGPT, Gemini, and Perplexity questions like 'best DUI attorney in [city]' or 'who should I hire for a personal injury case in [neighborhood].' These platforms recommend firms with strong review profiles, authoritative practice-area content, and consistent GBP activity. Firms building this infrastructure now are capturing cases before competing firms are even in the conversation.",
    },
    {
      q: 'How does after-hours intake actually work with Voice AI?',
      a: "Your Voice AI agent is configured specifically for your practice areas — it knows which questions to ask for a DUI vs. a divorce vs. a personal injury matter. It captures the caller's name, contact information, case details, and urgency level, and can schedule a consultation directly into your calendar. You receive an SMS summary the moment the call ends. By the time you wake up, the intake is done and the consultation is booked.",
    },
  ],
  realestate: [
    {
      q: 'How do real estate agents rank higher in Google Maps?',
      a: "Google Maps ranks agents based on relevance, distance, and prominence. Your GBP needs to be optimized with the right primary category, service areas, photos, posts, and a steady stream of recent reviews. Agents who consistently publish local content and earn reviews systematically outrank competitors who treat their profile as a static listing.",
    },
    {
      q: 'Will AI search platforms recommend my real estate services?',
      a: "AI platforms like ChatGPT and Perplexity recommend agents who have strong review profiles, neighborhood-specific content, and optimized GBP listings. An agent who publishes educational content about local markets, maintains a 4.8+ rating with fresh reviews, and has consistent business information across the web will be recommended. Most agents aren't building that — which is an opportunity.",
    },
    {
      q: 'What does automated follow-up look like for real estate?',
      a: "eighty5labs configures follow-up sequences by lead type: new buyer inquiry, seller valuation request, open house registration, past client anniversary, and referral ask. Each sequence uses SMS and email with personalized, contextual messaging. Your past clients hear from you on their closing anniversary and throughout the year — without you scheduling a single message.",
    },
  ],
  mortgage: [
    {
      q: 'How do mortgage lenders show up in Google Maps?',
      a: "Google Maps ranks lenders based on relevance, distance, and prominence. Your Google Business Profile needs to be fully optimized with the right primary category, services listed, consistent NAP information, and a steady stream of recent reviews. Most lenders treat their GBP as an afterthought — which is exactly why ranking in the top 3 is achievable for businesses that take it seriously.",
    },
    {
      q: 'Can AI search really generate mortgage leads?',
      a: "Yes — and it's growing fast. Borrowers increasingly start their search by asking ChatGPT or Perplexity questions like 'best mortgage lender in [city]' or 'who has the best rates for first-time buyers near me.' AI platforms recommend lenders with strong review profiles, educational content, and optimized GBP listings. eighty5labs builds that infrastructure for you.",
    },
    {
      q: 'How does automated follow-up work without feeling spammy?',
      a: "The key is timing and relevance. eighty5labs configures follow-up sequences that trigger based on where someone is in the process — new inquiry, submitted application, closing completed, anniversary date. Each message is personalized and contextual. The result feels attentive, not aggressive.",
    },
  ],
};

export const PRICING_FAQS: { q: string; a: string }[] = [
  { q: 'Is there a setup fee?', a: 'No setup fees on Visibility or Growth plans. Enterprise includes a custom onboarding and build process scoped into the monthly retainer. You pay for results, not for getting started.' },
  { q: 'What happens if I cancel?', a: 'Cancel anytime with 30 days notice — no penalties. Your GBP optimizations, reviews, and content remain yours. Annual clients receive a prorated refund for unused months.' },
  { q: 'How long until I see results?', a: 'Results depend on your market and where you start. Voice AI and lead capture produce results from day one — every call that would\'ve gone to voicemail now gets answered.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes — upgrade anytime. We prorate the difference and extend your billing cycle.' },
  { q: 'Do I need to sign a contract?', a: 'No contracts required. Month-to-month or annual (save 17%). We\'re confident enough in results that we don\'t need to lock you in.' },
  { q: "What's included in the free audit?", a: 'Your free AI Visibility Audit covers GBP health, Map Pack rankings, review velocity, website AI-readability, and your current presence across ChatGPT, Gemini, and Perplexity. Yours to keep regardless of whether you sign up.' },
];
