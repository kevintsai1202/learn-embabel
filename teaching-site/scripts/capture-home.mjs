// capture-home.mjs — 擷取網站首屏（課程總覽＋講師介紹卡）與共用案例區截圖，可重跑
// 用法：node scripts/capture-home.mjs
// 輸出：../source/data/site-verify/home-top.png、home-top-mobile.png、shared-case.png

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, '..', 'source', 'data', 'site-verify');
const PORT = 4174;

// 簡易靜態伺服器（與 verify-site.mjs 相同作法，避免 file:// 擋 localStorage）
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/markdown; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    const data = await fs.readFile(file);
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('not found'); }
});
await new Promise(r => server.listen(PORT, r));

await fs.mkdir(OUT_DIR, { recursive: true });
// 使用系統 Chrome（避開防毒軟體對 Playwright 自帶 Chromium 的誤判）
const browser = await chromium.launch({ channel: 'chrome' });

// 桌機首屏
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: path.join(OUT_DIR, 'home-top.png') });
console.log('✓ home-top.png');

// 共用案例區（含情境目標／業務流程兩張資訊圖）
await desktop.locator('#shared-case').scrollIntoViewIfNeeded();
await desktop.locator('#shared-case').screenshot({ path: path.join(OUT_DIR, 'shared-case.png') });
console.log('✓ shared-case.png');

// u-1 三框架比較 concept 整塊（含三框架比較圖與比較表）
const compareConcept = desktop.locator('#day1-u-1 .concept', { hasText: 'Spring AI vs spring-ai-agent-utils' }).first();
await compareConcept.scrollIntoViewIfNeeded();
await compareConcept.screenshot({ path: path.join(OUT_DIR, 'compare-concept.png') });
console.log('✓ compare-concept.png');

// u-1 提示詞卡（展開範例輸入，含參考檔案連結）
const promptCard = desktop.locator('#day1-u-1 .prompt-card').first();
await promptCard.locator('.prompt-example summary').click();
await promptCard.scrollIntoViewIfNeeded();
await promptCard.screenshot({ path: path.join(OUT_DIR, 'prompt-card-example.png') });
console.log('✓ prompt-card-example.png');

// 手機首屏
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: path.join(OUT_DIR, 'home-top-mobile.png') });
console.log('✓ home-top-mobile.png');

await browser.close();
server.close();
