import puppeteer from 'puppeteer';
import { preview } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read blog slugs from posts.json
const posts = JSON.parse(readFileSync(resolve(__dirname, 'public/posts.json'), 'utf-8'));
const blogRoutes = posts.map((p) => `/blog/${p.slug}`);

const routes = ['/', '/blog', ...blogRoutes];

async function prerender() {
  const server = await preview({ preview: { port: 4173, open: false } });
  const baseUrl = 'http://localhost:4173';

  const browser = await puppeteer.launch({ headless: true });

  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for react-helmet-async to inject meta tags
    await page.waitForFunction(() => document.querySelector('title')?.textContent !== '', { timeout: 10000 }).catch(() => {});

    const html = await page.content();
    await page.close();

    // Write the pre-rendered HTML to the correct path in dist
    const filePath = route === '/'
      ? resolve(__dirname, 'dist/index.html')
      : resolve(__dirname, `dist${route}/index.html`);

    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, html, 'utf-8');
    console.log(`✅ Pre-rendered: ${route}`);
  }

  await browser.close();
  server.httpServer.close();
  console.log(`\n🎉 Pre-rendered ${routes.length} routes successfully!`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
