// Local stand-in for Vercel's static serving, for checking a build with curl.
// Rules mirrored from the deployed setup: exact file, then <dir>/index.html,
// otherwise dist/404.html with status 404. There is no SPA catch-all.
// Usage: node scripts/serve-dist.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '..', 'dist');
const port = Number(process.argv[2] || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

const resolveFile = (urlPath) => {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const full = path.join(dist, clean);
  if (!full.startsWith(dist)) return null;
  if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  const idx = path.join(full, 'index.html');
  if (fs.existsSync(idx)) return idx;
  return null;
};

http.createServer((req, res) => {
  const urlPath = new URL(req.url, 'http://x').pathname;
  let file = resolveFile(urlPath);
  let status = 200;
  if (!file) { file = path.join(dist, '404.html'); status = 404; }
  res.writeHead(status, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving dist on http://localhost:${port}`));
