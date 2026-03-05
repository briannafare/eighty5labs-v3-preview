import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

type Tag = 'Google Maps'|'AI Search'|'Voice AI'|'Reviews'|'Lead Capture'|'Strategy';

interface Post {
  tag: Tag;
  title: string;
  desc: string;
  read: string;
  featured?: boolean;
  author?: string;
  stat?: { val: string; label: string }[];
}

const TAG_COLOR: Record<Tag, string> = {
  'Google Maps': '#1B4FFF',
  'AI Search': '#A78BFA',
  'Voice AI': '#10B981',
  'Reviews': '#F59E0B',
  'Lead Capture': '#EC4899',
  'Strategy': '#6B7280',
};

const TAGS: Tag[] = ['Google Maps','AI Search','Voice AI','Reviews','Lead Capture','Strategy'];

const POPULAR: { title: string; tag: Tag; read: string }[] = [
  { title: 'Why ChatGPT Is Recommending Your Competitor', tag: 'AI Search', read: '8 min read' },
  { title: 'The 3 Revenue Gaps Killing Local Service Businesses', tag: 'Strategy', read: '8 min read' },
  { title: 'Review Velocity vs. Review Count', tag: 'Google Maps', read: '6 min read' },
  { title: 'How Much Revenue Are You Losing to Voicemail?', tag: 'Voice AI', read: '5 min read' },
  { title: 'Database Reactivation: Revenue From Leads You Already Have', tag: 'Lead Capture', read: '7 min read' },
];

const POSTS: Post[] = [
  {
    tag: 'Google Maps',
    title: "Why You're Not in the Map Pack — And the Exact Fix",
    desc: "Three specific reasons most local businesses disappear from the Google Map Pack — and what needs to change in your Google Business Profile to get there within 30–60 days.",
    read: '5 min read',
  },
  {
    tag: 'Google Maps',
    title: 'Review Velocity vs. Review Count: Which One Actually Moves Your Ranking?',
    desc: "Most businesses chase total reviews. Google rewards something completely different. Here's the data behind what actually moves your Map Pack position — and how to build it systematically.",
    read: '6 min read',
  },
  {
    tag: 'Google Maps',
    title: "Google Business Profile: The 12 Fields That Actually Move the Needle",
    desc: "Your GBP has dozens of fields. Most don't matter. These 12 are the ones Google actually uses to rank your Map Pack position — and most local businesses have filled them out wrong.",
    read: '7 min read',
  },
  {
    tag: 'Google Maps',
    title: "How to Rank in Google Maps for Multiple Service Areas Without Violating Guidelines",
    desc: "Serving multiple cities doesn't mean you need multiple GBP listings. Here's the Google-compliant strategy that actually expands your Map Pack footprint — without risking suspension.",
    read: '8 min read',
  },
  {
    tag: 'AI Search',
    title: 'What ChatGPT Looks for When Someone Asks "Best Plumber Near Me"',
    desc: "AI search engines use a completely different algorithm than Google. We reverse-engineered how ChatGPT selects local business recommendations — and built the exact content structure that gets you cited.",
    read: '9 min read',
  },
  {
    tag: 'AI Search',
    title: 'AEO vs. SEO: Why Answer Engine Optimization Is the New Local SEO',
    desc: "Traditional SEO gets your website ranked on Google. AEO gets your business recommended by AI. They require completely different strategies — and most local businesses are only doing one of them.",
    read: '7 min read',
  },
  {
    tag: 'AI Search',
    title: 'Perplexity vs. Gemini vs. ChatGPT: Which AI Search Engine Matters Most for Local Business?',
    desc: "Not all AI search engines recommend local businesses the same way. We tested how each one handles local queries — and where you should focus your optimization effort first.",
    read: '6 min read',
  },
  {
    tag: 'AI Search',
    title: 'The Content Structure That Gets Your Business Cited by AI Search Engines',
    desc: "AI systems pull answers from content structured a specific way — direct answers first, then evidence, then context. Here's the exact template we use for every page we write for clients.",
    read: '10 min read',
  },
  {
    tag: 'Voice AI',
    title: 'How Much Revenue Are You Losing to Voicemail? (The Math Will Surprise You)',
    desc: "Most local businesses have no idea how many calls go unanswered. We built a calculator based on 200+ client audits — and the numbers are consistently shocking. Here's how to run the math on your own business.",
    read: '5 min read',
  },
  {
    tag: 'Voice AI',
    title: 'AI Voice Agent vs. Live Receptionist: The Real Cost Comparison',
    desc: "A full-time receptionist costs $42,000/year and works 40 hours a week. A Voice AI agent costs a fraction of that and works every hour of every day. Here's the real breakdown — including what AI can and can't handle.",
    read: '6 min read',
  },
  {
    tag: 'Lead Capture',
    title: 'The 5-Minute Follow-Up Rule: Why Speed to Lead Is the Most Important KPI You\'re Not Tracking',
    desc: "Research shows that responding to a lead within 5 minutes makes you 100x more likely to connect than waiting 30 minutes. Here's how to make sub-2-minute response time your standard — without adding to your workload.",
    read: '5 min read',
  },
  {
    tag: 'Lead Capture',
    title: 'Database Reactivation: How to Generate Revenue From Leads You Already Have',
    desc: "Most local businesses are sitting on hundreds of past customers who haven't heard from them in months. A single reactivation campaign can generate $10,000–$50,000 in booked revenue within 30 days — here's exactly how it works.",
    read: '7 min read',
  },
  {
    tag: 'Strategy',
    title: 'The 3 Revenue Gaps Killing Local Service Businesses (And How to Plug Them)',
    desc: "Every local service business that isn't growing is leaking revenue through the same three holes. Identify which gaps are bleeding your business — and the specific systems that close each one permanently.",
    read: '8 min read',
  },
  {
    tag: 'Strategy',
    title: 'Why "More Marketing" Is the Wrong Answer for Most Local Businesses',
    desc: "Before you spend another dollar on ads, answer this: what happens when a lead actually calls you? Most businesses are spending money to drive traffic to a leaky bucket. Here's how to fix the bucket first.",
    read: '6 min read',
  },
];

const FEATURED_POST: Post = {
  tag: 'AI Search',
  title: "Why ChatGPT Is Recommending Your Competitor — And How to Change That",
  desc: "AI search engines don't rank websites the way Google does. They pull from a completely different set of signals — and most local businesses have zero of them. Here's what ChatGPT, Gemini, and Perplexity actually look for when recommending a local business, and exactly how to build that presence from scratch.",
  read: '8 min read',
  featured: true,
  author: 'David Chandler',
  stat: [
    { val: 'ChatGPT: 12% → 84%', label: 'AI Search Visibility Score' },
    { val: 'Gemini: 8% → 71%', label: '' },
    { val: '+340%', label: 'AI-referred traffic in 90 days' },
  ],
};

const TOPIC_COUNTS: Record<Tag, number> = {
  'Google Maps': 8, 'AI Search': 6, 'Voice AI': 4,
  'Reviews': 5, 'Lead Capture': 7, 'Strategy': 5,
};

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<Tag | 'All'>('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeTag === 'All' ? POSTS : POSTS.filter(p => p.tag === activeTag);

  return (
    <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 80, background: '#FFFFFF', color: '#0F172A' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(48px,5vw,80px) 0 40px', background: '#F7F9FF', borderBottom: '1px solid #DDE5F2' }}>
        <div className="wrap" style={{ maxWidth: 680, textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1B4FFF', marginBottom: 12 }}>Blog & Resources</p>
            <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0F172A', marginBottom: 16 }}>
              Insights for Local Businesses<br />That Want to Win.
            </h1>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7 }}>
              AI search, Google Maps rankings, Voice AI, and everything else your competitors don't know yet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tags */}
      <div style={{ borderBottom: '1px solid #DDE5F2', background: '#F7F9FF', position: 'sticky', top: 'var(--nav-h)', zIndex: 10 }}>
        <div className="wrap" style={{ padding: '0 var(--wrap-px)' }}>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {(['All', ...TAGS] as (Tag | 'All')[]).map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                style={{ padding: '14px 18px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTag === tag ? '#1B4FFF' : 'transparent'}`, color: activeTag === tag ? '#1B4FFF' : '#94A3B8', fontSize: '0.8375rem', fontWeight: activeTag === tag ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr min(300px,30%)', gap: 48, paddingTop: 48, paddingBottom: 48, alignItems: 'start' }}>

        {/* Main */}
        <div>
          {/* Featured */}
          {(activeTag === 'All' || activeTag === 'AI Search') && (
            <Reveal>
              <div style={{ marginBottom: 36, padding: '28px 32px', background: 'linear-gradient(135deg,rgba(167,139,250,0.08) 0%,rgba(27,79,255,0.06) 100%)', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: 'rgba(167,139,250,0.08)', transform: 'translate(30px,-30px)' }} />
                <span style={{ display: 'inline-block', background: 'rgba(167,139,250,0.15)', color: '#A78BFA', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6, marginBottom: 14 }}>⭐ Featured Article</span>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.25rem,2.5vw,1.625rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 12 }}>{FEATURED_POST.title}</h2>
                <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: 20, fontSize: '0.9375rem' }}>{FEATURED_POST.desc}</p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{FEATURED_POST.author} · {FEATURED_POST.read}</span>
                  <span style={{ display: 'inline-block', background: `${TAG_COLOR['AI Search']}18`, color: TAG_COLOR['AI Search'], fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 5 }}>AI Search</span>
                  <button style={{ background: 'none', border: 'none', color: '#A78BFA', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', padding: 0 }}>Read Article →</button>
                </div>
                {FEATURED_POST.stat && (
                  <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {FEATURED_POST.stat.map(s => (
                      <div key={s.val} style={{ background: '#F7F9FF', border: '1px solid #DDE5F2', borderRadius: 8, padding: '10px 14px', fontSize: '0.8rem' }}>
                        <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, color: '#0F172A' }}>{s.val}</span>
                        {s.label && <span style={{ color: '#94A3B8', marginLeft: 6 }}>{s.label}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* Post grid */}
          <div style={{ display: 'grid', gap: 20 }}>
            {filtered.map((post, i) => (
              <Reveal key={post.title} delay={i * 0.04}>
                <motion.div whileHover={{ x: 3 }} style={{ padding: '20px 24px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14, cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = TAG_COLOR[post.tag]}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#DDE5F2'}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ background: `${TAG_COLOR[post.tag]}18`, color: TAG_COLOR[post.tag], fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 5 }}>{post.tag}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{post.read}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1rem', color: '#0F172A', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: 8 }}>{post.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.65 }}>{post.desc}</p>
                  <button style={{ marginTop: 12, background: 'none', border: 'none', color: TAG_COLOR[post.tag], fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', padding: 0 }}>
                    Read Article →
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 'calc(var(--nav-h) + 60px)' }}>

          {/* Newsletter */}
          <div style={{ padding: '24px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14 }}>
            <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1rem', color: '#0F172A', marginBottom: 8, letterSpacing: '-0.02em' }}>Get the AI Edge.</h3>
            <p style={{ fontSize: '0.8375rem', color: '#64748B', marginBottom: 16, lineHeight: 1.6 }}>Weekly insights on Google Maps, AI search, and local business growth. No fluff.</p>
            {subscribed ? (
              <p style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>✓ You're in. Check your inbox.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  style={{ padding: '9px 12px', border: '1.5px solid #DDE5F2', borderRadius: 8, background: '#F7F9FF', color: '#0F172A', fontSize: '0.875rem', outline: 'none' }} />
                <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}
                  onClick={() => email && setSubscribed(true)} className="btn btn-primary">
                  Subscribe Free →
                </motion.button>
                <p style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Unsubscribe anytime. We don't spam.</p>
              </div>
            )}
          </div>

          {/* Browse by topic */}
          <div style={{ padding: '24px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14 }}>
            <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.9375rem', color: '#0F172A', marginBottom: 16, letterSpacing: '-0.02em' }}>Browse by Topic</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TAGS.map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer', borderBottom: '1px solid #DDE5F2' }}>
                  <span style={{ fontSize: '0.875rem', color: activeTag === tag ? TAG_COLOR[tag] : '#334155', fontWeight: activeTag === tag ? 700 : 400 }}>{tag}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{TOPIC_COUNTS[tag]} articles</span>
                </button>
              ))}
            </div>
          </div>

          {/* Most popular */}
          <div style={{ padding: '24px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14 }}>
            <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.9375rem', color: '#0F172A', marginBottom: 16, letterSpacing: '-0.02em' }}>Most Popular</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {POPULAR.map((p, i) => (
                <div key={p.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.125rem', color: '#94A3B8', minWidth: 20, lineHeight: 1.3 }}>0{i + 1}</span>
                  <div>
                    <p style={{ fontSize: '0.8375rem', color: '#334155', fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ background: `${TAG_COLOR[p.tag]}18`, color: TAG_COLOR[p.tag], fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>{p.tag}</span>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{p.read}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini CTA */}
          <div style={{ padding: '20px 24px', background: 'rgba(27,79,255,0.06)', border: '1.5px solid rgba(27,79,255,0.2)', borderRadius: 14, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.9375rem', color: '#0F172A', marginBottom: 8 }}>Stop Guessing. Get the Audit.</p>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: 16, lineHeight: 1.5 }}>Free AI Visibility Audit — 30 minutes, no pitch.</p>
            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('#/audit')} className="btn btn-primary">
              Book Free Visibility Audit →
            </motion.button>
          </div>
        </aside>
      </div>
    </div>
  );
}
