/**
 * Static prerender for the Vite SPA.
 *
 * After `vite build`, this serves ./dist locally, loads each route in a real
 * (headless) browser so React runs, lets scroll-triggered animations settle,
 * then writes the fully-rendered HTML back to disk as static files. Google and
 * (crucially) AI crawlers that do NOT execute JavaScript then receive real,
 * readable content instead of an empty <div id="root">.
 *
 * It is intentionally FAIL-SOFT: if the browser can't launch (e.g. Chromium
 * missing in a CI image), it logs a warning and exits 0 so the SPA build is
 * still deployed.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

// This is a single-page site, so there is one route to prerender.
const ROUTES = ['/'];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml', '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json', '.map': 'application/json',
};

async function fileExists(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = join(DIST, urlPath);
      if (urlPath.endsWith('/')) filePath = join(filePath, 'index.html');
      if (!extname(filePath)) filePath = join(DIST, 'index.html');
      if (!(await fileExists(filePath))) filePath = join(DIST, 'index.html');
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(500); res.end('err');
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('[prerender] playwright not installed — skipping prerender (SPA build kept).');
    return;
  }

  const server = await startServer();
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // PLAYWRIGHT_CHROMIUM_PATH is only for local/dev overrides; in CI leave it
      // unset and let `npx playwright install chromium` provide the browser.
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
    });
  } catch (e) {
    console.warn('[prerender] could not launch Chromium — skipping prerender:', e.message);
    server.close();
    return;
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(20000);

  let ok = 0;
  for (const route of ROUTES) {
    try {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(
        () => { const r = document.getElementById('root'); return r && r.children.length > 0; },
        { timeout: 15000 },
      );
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            window.scrollTo(0, y);
            y += Math.max(300, window.innerHeight * 0.8);
            if (y < document.body.scrollHeight + window.innerHeight) setTimeout(step, 60);
            else { window.scrollTo(0, 0); setTimeout(resolve, 120); }
          };
          step();
        });
      });
      await page.evaluate(() => {
        document.querySelectorAll('*').forEach((el) => {
          const s = el.style;
          if (s && (parseFloat(s.opacity) === 0 || s.opacity === '0')) s.opacity = '1';
          if (s && /translate/.test(s.transform)) s.transform = 'none';
        });
      });
      await page.waitForTimeout(150);

      const html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
      const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, html, 'utf8');
      const words = (html.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
      console.log(`[prerender] ${route.padEnd(14)} -> ${outPath.replace(DIST, 'dist')}  (${words} words, ${(html.length / 1024).toFixed(1)} KB)`);
      ok++;
    } catch (e) {
      console.warn(`[prerender] FAILED ${route}: ${e.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done: ${ok}/${ROUTES.length} routes.`);
}

main().catch((e) => { console.warn('[prerender] error:', e.message); process.exit(0); });
