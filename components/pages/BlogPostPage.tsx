import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postByPath } from '../../seo/posts';

const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// Small markdown subset: ## / ### headings, - lists, paragraphs, **bold**, [links](url).
const inline = (text: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] ? <strong key={k++}>{m[1]}</strong> : <a key={k++} href={m[3]} style={{ color: '#1B4FFF' }}>{m[2]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

export const renderMarkdown = (md: string): React.ReactNode[] =>
  md.split(/\n{2,}/).map((b, i) => {
    const t = b.trim();
    if (t.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', margin: '28px 0 8px' }}>{inline(t.slice(4))}</h3>;
    if (t.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.375rem', margin: '36px 0 10px' }}>{inline(t.slice(3))}</h2>;
    if (/^- /.test(t)) return <ul key={i} style={{ paddingLeft: 22, margin: '0 0 16px', lineHeight: 1.75 }}>{t.split('\n').map((l, j) => <li key={j}>{inline(l.replace(/^- /, ''))}</li>)}</ul>;
    return <p key={i} style={{ margin: '0 0 16px', lineHeight: 1.75, color: '#334155' }}>{inline(t)}</p>;
  });

export default function BlogPostPage() {
  const { pathname } = useLocation();
  const post = postByPath(pathname)!; // App only mounts this for a known post
  return (
    <article style={{ paddingTop: 'var(--nav-h)', paddingBottom: 80, background: '#FFFFFF', color: '#0F172A' }}>
      <div className="wrap" style={{ maxWidth: 720, paddingTop: 48 }}>
        <p style={{ fontSize: '0.8125rem', marginBottom: 16 }}><Link to="/blog" style={{ color: '#1B4FFF', textDecoration: 'none' }}>← Blog</Link></p>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1B4FFF', marginBottom: 12 }}>{post.tag}</p>
        <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>{post.title}</h1>
        <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: 32 }}>
          By eighty5labs · Published {fmtDate(post.datePublished)}
          {post.dateModified !== post.datePublished && <> · Updated {fmtDate(post.dateModified)}</>}
        </p>
        {renderMarkdown(post.body)}
      </div>
    </article>
  );
}
