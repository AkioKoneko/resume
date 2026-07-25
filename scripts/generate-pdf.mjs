import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const PORT = Number(process.env.PORT || 4173);
const HOST = '127.0.0.1';
const ROOT_DIR = process.cwd();
const OUTPUT_DIR = join(ROOT_DIR, 'output', 'pdf');
const OUTPUT_FILE = join(OUTPUT_DIR, 'Aleksandr_Detushev_Resume.pdf');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url || '/', `http://${HOST}:${PORT}`).pathname;
    const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
    const safePath = normalize(requestedPath).replace(/^\.(\/|\\|$)/, '');
    const filePath = join(ROOT_DIR, safePath);

    const content = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();

    res.statusCode = 200;
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    res.end(content);
  } catch {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(PORT, HOST, resolve));

let browser;

try {
  browser = await chromium.launch({ headless: true, channel: 'chrome' });
} catch {
  browser = await chromium.launch({ headless: true });
}

try {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
  });
  const resumeUrl = `http://${HOST}:${PORT}/index.html`;

  await page.goto(resumeUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUTPUT_FILE,
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });

  console.log(`Generated ${OUTPUT_FILE.replace(`${ROOT_DIR}\\`, '')}`);
} finally {
  await browser.close();
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
