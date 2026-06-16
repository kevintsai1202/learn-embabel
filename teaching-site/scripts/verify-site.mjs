// verify-site.mjs — 教學網站行為驗證（可重跑）
// 用法：node scripts/verify-site.mjs
// 驗證：渲染完整性、比較表、任務勾選持久化、quiz 交卷、RWD、console 錯誤、資源 404
// 截圖輸出：../source/data/site-verify/

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOT_DIR = path.join(ROOT, '..', 'source', 'data', 'site-verify');
const PORT = 4173;

// ---- 簡易靜態伺服器（避免 file:// 擋 localStorage） ----
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/markdown; charset=utf-8', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    const data = await fs.readFile(file);
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});
await new Promise(r => server.listen(PORT, r));

const results = [];
const assert = (name, cond, detail = '') => {
  results.push({ name, ok: !!cond, detail });
  console.log(`${cond ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

// 使用系統已安裝的 Chrome 瀏覽器 (避開卡巴斯基等防毒軟體對 Playwright 自帶 Chromium 的誤判與刪除)
const browser = await chromium.launch({ channel: 'chrome' });
const consoleErrors = [];
const failedRequests = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', m => {
  // PNG-only 設計：.png 載入失敗也視為錯誤
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('requestfailed', r => failedRequests.push(r.url()));
page.on('response', r => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`); });

await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

// 1. 渲染完整性
assert('課程標題渲染', await page.locator('h1').textContent() === 'Embabel on Spring Boot');
// 講師介紹卡（網站最前面）：頭像載入成功 + 名稱與頻道連結存在
assert('講師介紹卡渲染', await page.locator('.instructor-card .instructor-name').textContent() === '凱文大叔AI程式設計教室');
assert('講師頭像載入', await page.locator('.instructor-avatar').evaluate(img => img.complete && img.naturalWidth > 0));
assert('講師頻道連結', (await page.locator('.instructor-handle a').getAttribute('href')) === 'https://www.youtube.com/@pg-kt');
// u-4 OODA loop 連結真的渲染成 <a>（巢狀 markdown 不支援，防止退化成原始字串）
assert('OODA loop 渲染為超連結', (await page.locator('#day1-u-4 a[href*="OODA_loop"]').count()) === 1);

// 資料形狀為摺疊預覽（教學順序：u-2/u-3 才定義，首讀不展開）
assert('資料形狀預設摺疊', !(await page.locator('.case-shapes').first().evaluate(d => d.open)));
await page.locator('.case-shapes summary').click();
assert('資料形狀可展開且含 kv 總表', (await page.locator('.case-shapes[open] .kv-key').count()) === 6);
await page.locator('.case-shapes summary').click(); // 收回，不影響後續截圖
const unitCount = await page.locator('details.unit').count();
assert('9 個單元渲染', unitCount === 9, `實際 ${unitCount}`);
const navLinks = await page.locator('#nav a').count();
assert('sidebar 含主節點與單元子連結', navLinks === 5 + 9, `實際 ${navLinks}`);

// 單日結構 + 案例貫穿 + AI 提示詞（每單元都要有）
const caseConcepts = await page.locator('.concept-heading:has-text("案例實作")').count();
assert('案例實作貫穿全部 9 個單元', caseConcepts === 9, `實際 ${caseConcepts}`);
const promptCards = await page.locator('.prompt-card').count();
assert('所有單元共有 10 張 AI 輔助提示詞卡', promptCards === 10, `實際 ${promptCards}`);
// 提示詞範例輸入：9 張卡都有摺疊範例；需貼檔案的卡有參考檔連結
const exampleBlocks = await page.locator('.prompt-example').count();
assert('每張提示詞卡都有範例輸入', exampleBlocks === 9, `實際 ${exampleBlocks}`);
const fileLinks = await page.locator('.prompt-file-link').count();
assert('參考檔案連結存在', fileLinks >= 7, `實際 ${fileLinks}`);
// 參考檔連結開啟素材彈窗（抽驗提示詞③的 goap-action-table-sample.md）
await page.locator('#day1-u-3 > summary').click(); // 展開 u-3 單元（> 避免選到卡片內的範例 summary）
await page.locator('.prompt-file-link:has-text("goap-action-table")').click();
await page.waitForSelector('#modalBackdrop.open', { timeout: 5000 });
assert('參考檔連結開啟素材彈窗', true);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);
const codeBlocks = await page.locator('.code-block').count();
assert('案例 Java 程式範例渲染', codeBlocks >= 3, `實際 ${codeBlocks}`);

// 2. 比較表（使用者需求：Spring AI + spring-ai-agent-utils）
const bodyText = await page.locator('body').innerText();
assert('三方比較標題存在', bodyText.includes('Spring AI vs spring-ai-agent-utils vs Embabel'));
const compareCols = await page.locator('#day1-u-1 table th:has-text("spring-ai-agent-utils")').count();
assert('比較表只有一個且含三欄框架', compareCols === 1);

// 3. 任務勾選 + localStorage 持久化
await page.locator('[data-task-id="d1-u1-t1"]').click();
await page.reload({ waitUntil: 'networkidle' });
const persisted = await page.locator('[data-task-id="d1-u1-t1"]').getAttribute('class');
assert('任務勾選經 reload 後保留', persisted.includes('done'));
assert('進度列顯示 1 / 21', (await page.locator('#navProgress').innerText()).includes('1 / 21'));

// 4. 插圖載入（PNG 格式載入，不應有殘破圖）
await page.locator('details.unit').evaluateAll(els => els.forEach(e => e.open = true));
await page.waitForTimeout(800);
const brokenImgs = await page.locator('img').evaluateAll(imgs =>
  imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
assert('所有插圖載入成功（PNG 格式）', brokenImgs.length === 0, brokenImgs.join(', '));
// 防重：同一個單元內同一張插圖不得出現兩次（hero 與 concept 雙渲染的回歸防護）
const dupSrcs = await page.evaluate(() => {
  const dups = [];
  document.querySelectorAll('details.unit').forEach(unit => {
    const seen = {};
    unit.querySelectorAll('.illustration img').forEach(img => {
      const src = img.getAttribute('src');
      if (seen[src]) dups.push(src);
      seen[src] = true;
    });
  });
  return dups;
});
assert('無重複渲染的插圖', dupSrcs.length === 0, dupSrcs.join(', '));

// 4b. 提示詞複製按鈕
await page.locator('#day1-u-1 .prompt-copy-btn').first().click();
await page.waitForTimeout(200);
assert('提示詞複製按鈕回饋', (await page.locator('#day1-u-1 .prompt-copy-btn').first().innerText()).includes('已複製'));

// 4c. 素材彈出視窗：點 md 連結 → modal 開啟且為格式化內容（非原始文字）
await page.locator('#materials-overview .material-name').first().click();
await page.waitForSelector('#modalBackdrop.open', { timeout: 5000 });
await page.waitForFunction(() => document.querySelectorAll('#modalContent h1, #modalContent h2').length > 0, null, { timeout: 5000 });
const mdHeadings = await page.locator('#modalContent h1, #modalContent h2').count();
assert('素材彈窗開啟且 markdown 已格式化（含標題元素）', mdHeadings > 0, `headings=${mdHeadings}`);
const dlAttr = await page.locator('#modalDownload').getAttribute('download');
const dlHref = await page.locator('#modalDownload').getAttribute('href');
assert('彈窗下載按鈕指向正確檔案', dlAttr === 'business-process-list-sample.md' && dlHref.endsWith(dlAttr), `download=${dlAttr}`);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);
assert('ESC 關閉素材彈窗', !(await page.locator('#modalBackdrop').evaluate(n => n.classList.contains('open'))));

// 4d. 程式檔素材（.java）→ code 檢視
await page.locator('#materials-overview .material-name:has-text("CustomerCareAgent")').click();
await page.waitForSelector('#modalBackdrop.open', { timeout: 5000 });
await page.waitForFunction(() => document.querySelector('#modalContent pre')?.textContent.includes('@Agent'), null, { timeout: 5000 });
assert('程式檔素材以 code 檢視呈現', true);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);

// 4e. 延伸閱讀外部連結
const frLinks = await page.locator('#materials-overview a[href^="https://"]').count();
assert('延伸閱讀外部連結存在', frLinks >= 5, `實際 ${frLinks}`);

// 5. quiz 流程：全選正解 → 交卷 → 滿分
const quiz = await page.evaluate(() => window.COURSE.quiz.map(q => ({ id: q.id, answer: q.answer })));
for (const q of quiz) {
  await page.locator(`#${q.id} .quiz-opt[data-opt="${q.answer}"]`).click();
}
await page.locator('#quiz .btn-primary').click();
await page.waitForTimeout(300);
assert('quiz 滿分顯示', (await page.locator('.quiz-score').innerText()).includes(`${quiz.length} / ${quiz.length}`));

// 5b. 桌機選單收折：點選收折 → 主內容補滿 → reload 後保留 → 再點展開
await page.evaluate(() => window.scrollTo(0, 0));
await page.locator('#menuBtn').click();
await page.waitForTimeout(400);
assert('桌機選單收折後 sidebar 滑出', await page.locator('.sidebar').evaluate(s => s.getBoundingClientRect().right <= 0));
assert('收折後主內容補滿', await page.locator('.main').evaluate(m => getComputedStyle(m).marginLeft === '0px'));
await page.reload({ waitUntil: 'networkidle' });
assert('收折狀態經 reload 保留', await page.locator('#app').evaluate(a => a.classList.contains('sidebar-closed')));
await page.locator('#menuBtn').click();
await page.waitForTimeout(400);
assert('再點選單鈕可展開 sidebar', await page.locator('.sidebar').evaluate(s => s.getBoundingClientRect().left === 0));

// 6. 截圖（desktop / mobile）
await fs.mkdir(SHOT_DIR, { recursive: true });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: path.join(SHOT_DIR, 'desktop-home.png') });

// 7. RWD：375px 手機版 sidebar 預設隱藏、漢堡鍵可開
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(400);
const sidebarHidden = await page.locator('.sidebar').evaluate(s => s.getBoundingClientRect().right <= 0);
assert('手機版 sidebar 預設隱藏', sidebarHidden);
await page.locator('#menuBtn').click();
await page.waitForTimeout(400);
const sidebarShown = await page.locator('.sidebar').evaluate(s => s.getBoundingClientRect().left === 0);
assert('漢堡鍵開啟 sidebar', sidebarShown);
// backdrop 中心被 268px 寬的 sidebar 覆蓋，需點右側露出區域
await page.locator('#sidebarBackdrop').click({ position: { x: 340, y: 400 } });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(SHOT_DIR, 'iphone-13-home.png') });

// 8. 主題切換
await page.locator('#themeToggle').click();
assert('主題切換為 dark', await page.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark');

// 9. console / network 健康
assert('無 console error', consoleErrors.length === 0, consoleErrors.join(' | '));
const realFails = failedRequests; // PNG-only 模式下，所有失敗請求皆為非預期
assert('無非預期失敗請求', realFails.length === 0, realFails.join(' | '));

await browser.close();
server.close();

const failed = results.filter(r => !r.ok);
console.log(`\n結果：${results.length - failed.length} / ${results.length} 通過`);
process.exit(failed.length ? 1 : 0);
