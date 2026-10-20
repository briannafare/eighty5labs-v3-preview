// Tells Bing and other IndexNow engines which URLs changed. No dependencies.
// Usage (after the site is deployed):
//   node scripts/indexnow.mjs              submit every URL in dist/sitemap.xml
//   node scripts/indexnow.mjs --live       read https://www.eighty5labs.com/sitemap.xml instead
//   node scripts/indexnow.mjs --dry-run    print what would be sent, send nothing
//   node scripts/indexnow.mjs /pricing /services    submit only these paths
// The key file in public/ is public by design: IndexNow checks it to prove we own the host.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const HOST = 'www.eighty5labs.com';
const SITE = `https://${HOST}`;
const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('no IndexNow key file (<32 hex>.txt) in public/');
const key = keyFile.replace('.txt', '');
if (fs.readFileSync(path.join(root, 'public', keyFile), 'utf8').trim() !== key) throw new Error('key file content must equal its name');

const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const live = args.includes('--live');
const paths = args.filter((a) => a.startsWith('/'));

let urls;
if (paths.length) {
  urls = paths.map((p) => SITE + p);
} else {
  const xml = live
    ? await (await fetch(`${SITE}/sitemap.xml`)).text()
    : fs.readFileSync(path.join(root, 'dist', 'sitemap.xml'), 'utf8');
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error('no URLs to submit');

const body = { host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls };
if (dry) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) process.exit(1);
