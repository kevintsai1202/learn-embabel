// generate-illustrations.mjs — 產出教學網站全部手繪 SVG 插圖
// 用法：node scripts/generate-illustrations.mjs
// 風格：800×400 視圖、淺色底 #f8fafc、tailwind 色票、system-ui 中文字型
// 所有插圖由此腳本生成，改圖請改這裡再重跑（不要直接編輯 SVG）。

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'illustrations');

// ---- 風格常數（沿用 learn-spring 教學站 SVG 規格） ----
const FONT = `system-ui,'PingFang TC','Microsoft JhengHei',sans-serif`;
const C = {
  bg: '#f8fafc', card: '#ffffff', border: '#e2e8f0', dark: '#0f172a',
  slate: '#64748b', blue: '#2563eb', purple: '#7c3aed', green: '#16a34a',
  amber: '#d97706', red: '#dc2626', cyan: '#0e7490',
  blueSoft: '#dbeafe', purpleSoft: '#ede9fe', greenSoft: '#dcfce7',
  amberSoft: '#fef3c7', redSoft: '#fee2e2', cyanSoft: '#cffafe'
};

// ---- SVG 片段 helpers ----
/* 形狀語彙（shape vocabulary）：
 *   box     = 矩形       → Action（處理步驟）
 *   pill    = 膠囊形     → 條件 / 狀態 / 資料物件（world state、pre/postconditions、record）
 *   hexagon = 六邊形     → Goal（目標）
 *   diamond = 菱形       → 決策 / 判斷點
 * 同時保留顏色區分，但形狀才是主要語意載體（色盲與黑白列印仍可讀）。 */

/** 置中多行標籤 */
function centerText(cx, cy, label, { color = C.dark, size = 13, bold = 700 } = {}) {
  const lines = label.split('\n');
  const lh = size + 4;
  const startY = cy - ((lines.length - 1) * lh) / 2;
  return lines.map((ln, i) =>
    `<text x="${cx}" y="${startY + i * lh}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${size}" font-weight="${bold}" fill="${color}">${esc(ln)}</text>`
  ).join('');
}
/** 矩形 = Action（處理步驟） */
function box(x, y, w, h, label, { fill = C.card, stroke = C.border, color = C.dark, size = 13, bold = 700 } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>${centerText(x + w / 2, y + h / 2, label, { color, size, bold })}`;
}
/** 膠囊形 = 條件 / 狀態 / 資料物件 */
function pill(x, y, w, h, label, { fill = C.blueSoft, stroke = C.blue, color = C.blue, size = 13, bold = 700 } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>${centerText(x + w / 2, y + h / 2, label, { color, size, bold })}`;
}
/** 六邊形 = Goal（目標） */
function hexagon(x, y, w, h, label, { fill = C.greenSoft, stroke = C.green, color = C.green, size = 13, bold = 700 } = {}) {
  const c = Math.min(18, w * 0.18); // 斜角寬
  const pts = `${x + c},${y} ${x + w - c},${y} ${x + w},${y + h / 2} ${x + w - c},${y + h} ${x + c},${y + h} ${x},${y + h / 2}`;
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>${centerText(x + w / 2, y + h / 2, label, { color, size, bold })}`;
}
/** 菱形 = 決策 / 判斷點 */
function diamond(cx, cy, w, h, label, { fill = C.amberSoft, stroke = C.amber, color = C.amber, size = 12, bold = 700 } = {}) {
  const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>${centerText(cx, cy, label, { color, size, bold })}`;
}
/** 形狀圖例（GOAP 核心圖使用） */
function legend(x, y) {
  return `
    ${pill(x, y, 76, 22, '條件/狀態', { size: 10 })}
    ${box(x + 90, y, 60, 22, 'Action', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 10 })}
    ${hexagon(x + 164, y, 60, 22, 'Goal', { size: 10 })}
    ${diamond(x + 268, y + 11, 56, 26, '決策', { size: 10 })}`;
}
/** 直線箭頭（使用 #arrow marker） */
function arrow(x1, y1, x2, y2, { color = C.slate, dash = '', width = 2 } = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ''} marker-end="url(#arrow)"/>`;
}
/** 小字標籤 */
function label(x, y, text, { color = C.slate, size = 11, anchor = 'middle', bold = 600 } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${bold}" fill="${color}">${esc(text)}</text>`;
}
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
/** 文件骨架：底色 + 標題 + 副標 + marker 定義 */
function doc(title, subtitle, body, h = 400) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 ${h}" role="img">
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><polygon points="0,0 10,5 0,10" fill="${C.slate}"/></marker></defs>
<rect width="800" height="${h}" rx="12" fill="${C.bg}"/>
<text x="400" y="30" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="700" fill="${C.dark}">${esc(title)}</text>
<text x="400" y="50" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="600" fill="${C.slate}">${esc(subtitle)}</text>
${body}
</svg>`;
}

// ---- 每張圖的構圖 ----
const images = {

  // D1-U1 hero：JVM 工程場景
  'day1-u1-jvm-agent': doc('把 agentic AI 放進 JVM 工程邊界', 'Embabel 連接既有 Spring 系統與 LLM / 工具', `
    <rect x="40" y="80" width="280" height="280" rx="10" fill="${C.blueSoft}" stroke="${C.blue}" stroke-width="1.5"/>
    ${label(180, 100, '既有 JVM / Spring Boot 系統', { color: C.blue, size: 13, bold: 700 })}
    ${box(70, 120, 220, 44, 'Spring Service / Bean')}
    ${box(70, 178, 220, 44, 'Domain Model')}
    ${box(70, 236, 220, 44, '資料庫・權限・測試流程')}
    ${box(340, 150, 160, 120, 'Embabel\nAgent Flow\n(GOAP Planner)', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${box(560, 100, 190, 70, 'LLM\n(局部生成・判斷)', { fill: C.amberSoft, stroke: C.amber, color: C.amber })}
    ${box(560, 230, 190, 70, 'Tools\n(@Tool / MCP / RAG)', { fill: C.greenSoft, stroke: C.green, color: C.green })}
    ${arrow(322, 210, 338, 210)}
    ${arrow(502, 185, 558, 140)}
    ${arrow(502, 235, 558, 260)}
    ${label(400, 350, '流程選擇・錯誤恢復・資料安全 仍在工程團隊掌控', { size: 12 })}
  `),

  // D1-U1 diagram：LLM 只在 action 內
  'day1-u1-boundary': doc('控制權邊界', 'LLM 只在 action 內工作，整體流程由 planner 控制', `
    ${box(60, 90, 680, 56, 'Planner（依條件推導 action chain・可 review・可測試）', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 14 })}
    ${box(80, 220, 180, 110, 'Action 1\n取得活動報告', {})}
    ${box(310, 220, 180, 110, 'Action 2\n摘要與方案草稿', {})}
    ${box(540, 220, 180, 110, 'Action 3\n審核輸出', {})}
    <rect x="330" y="285" width="140" height="34" rx="6" fill="${C.amberSoft}" stroke="${C.amber}"/>
    ${label(400, 302, 'LLM 在這裡', { color: C.amber, size: 12, bold: 700 })}
    <rect x="560" y="285" width="140" height="34" rx="6" fill="${C.amberSoft}" stroke="${C.amber}"/>
    ${label(630, 302, 'LLM 在這裡', { color: C.amber, size: 12, bold: 700 })}
    ${arrow(170, 148, 170, 216)}
    ${arrow(400, 148, 400, 216)}
    ${arrow(630, 148, 630, 216)}
    ${arrow(262, 275, 306, 275)}
    ${arrow(492, 275, 536, 275)}
    ${label(400, 370, 'LLM 不決定整條流程；它只在被 planner 選中的 action 內做局部推理', { size: 12 })}
  `),

  // D1-U2 hero：GOAP 路徑搜尋（膠囊=狀態、矩形=action、六邊形=goal）
  'day1-u2-goap-map': doc('GOAP：從現況到目標的路徑搜尋', 'planner 在明確的 action 集合中找出可解釋路徑', `
    ${pill(35, 175, 140, 56, 'Current\nWorld State', { size: 12 })}
    ${hexagon(625, 175, 140, 56, 'Goal State', {})}
    ${box(240, 90, 130, 56, 'Action A', {})}
    ${box(240, 180, 130, 56, 'Action B', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${box(240, 270, 130, 56, 'Action C', {})}
    ${box(440, 130, 130, 56, 'Action D', {})}
    ${box(440, 230, 130, 56, 'Action E', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${arrow(177, 190, 236, 122, { dash: '4 4' })}
    ${arrow(177, 205, 236, 207, { color: C.purple, width: 3 })}
    ${arrow(177, 222, 236, 295, { dash: '4 4' })}
    ${arrow(372, 115, 436, 150, { dash: '4 4' })}
    ${arrow(372, 215, 436, 252, { color: C.purple, width: 3 })}
    ${arrow(572, 155, 621, 190, { dash: '4 4' })}
    ${arrow(572, 255, 621, 212, { color: C.purple, width: 3 })}
    ${label(400, 352, '紫色＝planner 選出的 action chain；虛線＝可行但未選的路徑', { size: 12 })}
    ${legend(240, 368)}
  `),

  // D1-U2 diagram：條件流（形狀語彙示範圖：膠囊=條件、矩形=action、六邊形=goal、菱形=決策）
  'day1-u2-condition-flow': doc('action 的條件結構', 'preconditions → action → postconditions，planner 以此串出到 goal 的路', `
    ${pill(45, 160, 180, 80, 'Preconditions\n執行前必須滿足', { size: 12 })}
    ${box(290, 150, 170, 100, 'Action\n可執行步驟', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${pill(525, 160, 180, 80, 'Postconditions\n執行後產生的事實', { fill: C.amberSoft, stroke: C.amber, color: C.amber, size: 12 })}
    ${diamond(480, 320, 170, 64, '滿足 goal？', { size: 11 })}
    ${hexagon(180, 290, 170, 60, 'Goal 達成', {})}
    ${arrow(229, 200, 286, 200)}
    ${arrow(462, 200, 521, 200)}
    ${arrow(600, 244, 510, 292)}
    ${arrow(391, 320, 358, 320)}
    ${label(340, 300, '是', { size: 11, color: '#16a34a' })}
    ${label(580, 290, '否 → replanning', { size: 11 })}
    ${label(135, 140, 'world state 已知事實', { size: 11 })}
    ${legend(240, 370)}
  `),

  // D1-U3 hero：record 流動
  'day1-u3-type-flow': doc('Type-driven flow：方法簽章就是流程宣告', 'Java record 在 action 之間流動，planner 依型別推導順序', `
    ${pill(30, 160, 150, 56, 'TravellerActivity', { size: 12 })}
    ${box(230, 150, 160, 80, 'summarize(\nTravellerActivity a)\n→ ActivitySummary', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 11 })}
    ${pill(440, 160, 130, 56, 'ActivitySummary', { fill: C.amberSoft, stroke: C.amber, color: C.amber, size: 12 })}
    ${box(620, 150, 150, 80, 'proposeOffer(\nActivitySummary s)\n→ OfferDraft', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 11 })}
    ${arrow(182, 190, 226, 190)}
    ${arrow(392, 190, 436, 190)}
    ${arrow(572, 190, 616, 190)}
    ${pill(300, 290, 200, 50, 'OfferDraft → 審核', { fill: C.greenSoft, stroke: C.green, color: C.green })}
    ${arrow(695, 232, 504, 310)}
    ${label(400, 130, 'record＝資料邊界：表達形狀・支援 refactor・避免魔法字串', { size: 12 })}
    ${label(400, 380, '下一個 action 需要 ActivitySummary，planner 就知道它要等 summarize 之後執行', { size: 12 })}
  `),

  // D1-U3 diagram：annotation 對應
  'day1-u3-annotation': doc('Annotation 對應 planner metadata', '@Agent / @Action / @AchievesGoal 是 Embabel 掃描 capability 的入口', `
    <rect x="50" y="80" width="330" height="280" rx="10" fill="${C.card}" stroke="${C.border}" stroke-width="1.5"/>
    ${label(215, 102, 'Java 類別', { color: C.dark, size: 13, bold: 700 })}
    ${box(80, 120, 270, 44, '@Agent class SupportAgent', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 12 })}
    ${box(110, 180, 240, 44, '@Action draft(...)', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 12 })}
    ${box(110, 240, 240, 44, '@Action @AchievesGoal\nreview(...)', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 12 })}
    <rect x="470" y="80" width="280" height="280" rx="10" fill="${C.card}" stroke="${C.border}" stroke-width="1.5"/>
    ${label(610, 102, 'Planner metadata', { color: C.dark, size: 13, bold: 700 })}
    ${box(500, 120, 220, 44, '能力集合', { size: 12 })}
    ${box(500, 180, 220, 44, '可執行步驟\n(輸入/輸出＝條件)', { size: 12 })}
    ${box(500, 240, 220, 44, '終點 goal', { size: 12 })}
    ${arrow(354, 142, 496, 142, { dash: '4 4' })}
    ${arrow(354, 202, 496, 202, { dash: '4 4' })}
    ${arrow(354, 262, 496, 262, { dash: '4 4' })}
    ${label(400, 388, 'Embabel 掃描 annotation，產生 GOAP 規劃所需的 action / goal 模型', { size: 12 })}
  `),

  // D1-U4 hero：AgentProcess 迴圈
  'day1-u4-runtime': doc('AgentProcess 執行迴圈', '一次 agent 任務的容器：plan → 執行 → 更新 → 重新檢查', `
    ${box(320, 80, 160, 54, 'Plan\n(GOAP 規劃)', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${box(560, 170, 170, 54, 'Execute Action', { fill: C.blueSoft, stroke: C.blue, color: C.blue })}
    ${box(320, 270, 160, 54, 'Update\nBlackboard', { fill: C.amberSoft, stroke: C.amber, color: C.amber })}
    ${diamond(155, 197, 180, 70, 'Goal 達成？', { fill: C.greenSoft, stroke: C.green, color: C.green })}
    ${arrow(484, 120, 600, 166)}
    ${arrow(620, 228, 484, 285)}
    ${arrow(316, 290, 180, 228)}
    ${arrow(180, 166, 316, 112)}
    ${label(580, 135, '執行一步', { size: 11 })}
    ${label(560, 280, '結果寫回', { size: 11 })}
    ${label(215, 270, '重新檢查狀態', { size: 11 })}
    ${label(215, 130, '未達成 → replan', { size: 11 })}
    ${label(400, 375, 'AgentProcess 內含：user input・goal・plan・blackboard・事件・終止狀態', { size: 12 })}
  `),

  // D1-U4 diagram：blackboard binding
  'day1-u4-blackboard': doc('Blackboard：型別綁定的共享狀態', 'action 輸出寫入 blackboard，下一個 action 依型別與名稱 binding', `
    ${box(60, 120, 170, 70, 'Action A\nsummarize(...)', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    <rect x="300" y="90" width="200" height="240" rx="10" fill="${C.amberSoft}" stroke="${C.amber}" stroke-width="1.5"/>
    ${label(400, 112, 'Blackboard', { color: C.amber, size: 14, bold: 700 })}
    ${pill(325, 130, 150, 40, 'CustomerQuery', { fill: C.card, stroke: C.border, color: C.dark, size: 12 })}
    ${pill(325, 182, 150, 40, 'TravellerActivity', { fill: C.card, stroke: C.border, color: C.dark, size: 12 })}
    ${pill(325, 234, 150, 40, 'ActivitySummary ←新', { size: 11 })}
    ${box(570, 120, 170, 70, 'Action B\nproposeOffer(...)', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${arrow(232, 155, 296, 155)}
    ${label(264, 140, '輸出', { size: 11 })}
    ${arrow(477, 254, 600, 196)}
    ${label(560, 245, '依型別 binding 到參數', { size: 11 })}
    ${label(400, 375, '不是魔法字串 map：物件依型別與名稱綁定到 method parameters', { size: 12 })}
  `),

  // D2-U1 hero：依賴關係
  'day2-u1-boot4': doc('Spring Boot 專案與 Embabel starter', 'Embabel ≤0.4.0 需 Boot 3.5.x；Boot 4 等 Embabel 2.0', `
    ${box(290, 80, 220, 56, 'Spring Boot 3.5 / Java 21\n(Maven)', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 12 })}
    ${box(40, 200, 200, 50, 'spring-boot-starter-web', { size: 11 })}
    ${box(270, 200, 180, 50, 'embabel-agent-starter', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 11 })}
    ${box(480, 200, 130, 50, '...-starter-shell', { size: 11 })}
    ${box(640, 200, 130, 50, '...-starter-openai', { size: 11 })}
    ${box(270, 300, 180, 50, 'Spring AI\n(模型連線基礎)', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 11 })}
    ${arrow(330, 138, 160, 196)}
    ${arrow(395, 138, 370, 196)}
    ${arrow(450, 138, 540, 196)}
    ${arrow(490, 138, 690, 196)}
    ${arrow(360, 252, 360, 296)}
    ${label(400, 385, 'MCP server starter・embabel-agent-starter-observability 依需求另加', { size: 12 })}
  `),

  // D1-U5 diagram：靜態權重
  'day1-u5-static-cost': doc('靜態權重：A* 搜尋與成本累積', 'Planner 依據 Action 的 cost 累加，尋找總成本最低的路徑', `
    ${pill(35, 175, 120, 56, 'Current State\n(目前事實)', { size: 11 })}
    ${hexagon(645, 175, 120, 56, 'Goal State\n(目標狀態)', {})}
    ${box(210, 100, 160, 50, 'fetchActivity()\ncost = 0.1', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 11 })}
    ${box(430, 100, 160, 50, 'summarizeJava()\ncost = 0.2', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 11 })}
    ${box(320, 250, 160, 50, 'summarizeLLM()\ncost = 0.9', { fill: C.redSoft, stroke: C.red, color: C.red, size: 11 })}
    ${arrow(155, 180, 210, 135, { color: C.green, width: 2.5 })}
    ${arrow(370, 125, 430, 125, { color: C.green, width: 2.5 })}
    ${arrow(590, 135, 645, 180, { color: C.green, width: 2.5 })}
    ${arrow(155, 210, 320, 265, { dash: '4 4' })}
    ${arrow(480, 265, 645, 210, { dash: '4 4' })}
    ${label(400, 75, '路徑 A：Java 快速處理 → 總成本 0.3 (最佳解！)', { color: C.green, size: 12, bold: 700 })}
    ${label(400, 335, '路徑 B：直接呼叫大模型 → 總成本 0.9 (成本過高)', { color: C.slate, size: 12 })}
    ${label(400, 375, 'A* 演算法會選取綠色路徑，這完全由數學成本控制，不需 LLM 介入做路由', { size: 12 })}
  `),

  // D1-U5 diagram：動態權重
  'day1-u5-dynamic-cost': doc('動態權重與 @Cost 方法', '依即時 Blackboard 狀態計算成本/價值，提供動態路由能力', `
    <rect x="50" y="90" width="180" height="240" rx="10" fill="${C.amberSoft}" stroke="${C.amber}" stroke-width="1.5"/>
    ${label(140, 115, 'Blackboard 狀態', { color: C.amber, size: 13, bold: 700 })}
    ${pill(70, 140, 140, 34, 'CustomerQuery', { fill: C.card, stroke: C.border, color: C.dark, size: 11 })}
    ${label(140, 195, '包含資訊：\nquestion 含有 "VIP"\ntotalSpend = 5000', { size: 11, bold: 600 })}
    <rect x="280" y="90" width="240" height="240" rx="10" fill="${C.blueSoft}" stroke="${C.blue}" stroke-width="1.5"/>
    ${label(400, 115, '@Cost / 動態評估', { color: C.blue, size: 13, bold: 700 })}
    ${box(300, 145, 200, 60, 'computeUrgency()\nVIP 客戶 → 回傳 value=1.0', { fill: C.card, stroke: C.border, size: 11 })}
    ${box(300, 245, 200, 60, 'summarizeCost()\n大字數 → 回傳 cost=0.8', { fill: C.card, stroke: C.border, size: 11 })}
    <rect x="570" y="90" width="180" height="240" rx="10" fill="${C.purpleSoft}" stroke="${C.purple}" stroke-width="1.5"/>
    ${label(660, 115, 'Action 最終權重', { color: C.purple, size: 13, bold: 700 })}
    ${box(590, 145, 140, 60, 'proposeOffer()\nValue 提升為 1.0\n(優先度最高)', { fill: C.card, stroke: C.border, size: 11 })}
    ${box(590, 245, 140, 60, 'summarize()\nCost 提升為 0.8\n(避開大文件)', { fill: C.card, stroke: C.border, size: 11 })}
    ${arrow(232, 210, 278, 210)}
    ${arrow(522, 210, 568, 210)}
    ${label(400, 365, '在 @Action 上標記 valueMethod / costMethod，引導規劃器即時回應環境變化', { size: 12 })}
  `),

  // D2-U1 diagram：環境檢查
  'day2-u1-env': doc('Windows 環境檢查流程', '常見陷阱：系統預設 Java 8，但 Embabel 需要 Java 21+', `
    ${box(50, 120, 160, 90, 'PowerShell\njava -version\nmvn -v', { size: 12 })}
    ${box(280, 120, 160, 90, 'JAVA_HOME\n指向 JDK 21+', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 12 })}
    ${box(510, 120, 160, 90, 'Maven 使用\n正確 JDK', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 12 })}
    ${box(280, 270, 390, 60, 'application.yml：模型供應商 API key・模型角色設定', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 12 })}
    ${arrow(212, 165, 276, 165)}
    ${arrow(442, 165, 506, 165)}
    ${arrow(590, 212, 530, 266)}
    ${box(50, 270, 180, 60, '陷阱：java 8 啟動\n直接失敗 (需 21+)', { fill: C.redSoft, stroke: C.red, color: C.red, size: 12 })}
    ${label(400, 375, '檢查順序：Java 版本 → JAVA_HOME → Maven → 應用設定', { size: 12 })}
  `),

  // D2-U2 hero：三種工具來源
  'day2-u2-tools': doc('三種工具來源', 'domain object、MCP server、RAG store 各自提供不同性質的工具', `
    ${box(60, 100, 200, 90, 'Java Domain Object\n@Tool 方法\n(物件內部狀態)', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 12 })}
    ${box(60, 220, 200, 90, 'MCP Server\n(跨應用・跨 runtime\n發現與重用)', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 12 })}
    ${box(540, 160, 210, 90, 'Agent Action\n最小工具暴露', { fill: C.amberSoft, stroke: C.amber, color: C.amber, size: 13 })}
    ${box(300, 300, 200, 70, 'RAG Store (ToolishRag)\nLLM 自行決定怎麼搜', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 12 })}
    ${arrow(262, 145, 536, 185)}
    ${arrow(262, 265, 536, 225)}
    ${arrow(502, 320, 600, 254)}
    ${label(400, 395, '每個 action 只拿它需要的工具，降低 prompt 噪音與工具誤用', { size: 12 })}
  `, 420),

  // D2-U2 diagram：decision tree
  'day2-u2-choice': doc('接入模式 decision tree', '依「狀態位置・重用範圍・資料量」選擇 domain tool / MCP / RAG', `
    ${diamond(400, 107, 240, 70, '要接入什麼能力？', { size: 13 })}
    ${diamond(150, 240, 230, 96, '需要物件內部狀態？\n同一個 JVM？', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 11 })}
    ${diamond(400, 240, 230, 96, '要跨應用・跨 runtime\n發現與重用？', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 11 })}
    ${diamond(650, 240, 230, 96, '大量文件/知識庫，\n讓 LLM 自行搜尋？', { fill: C.greenSoft, stroke: C.green, color: C.green, size: 11 })}
    ${arrow(330, 125, 175, 190)}
    ${arrow(400, 142, 400, 188)}
    ${arrow(470, 125, 625, 190)}
    ${box(40, 320, 220, 50, 'Domain tool (@Tool)', { fill: C.blue, stroke: C.blue, color: '#ffffff', size: 13 })}
    ${box(290, 320, 220, 50, 'MCP', { fill: C.purple, stroke: C.purple, color: '#ffffff', size: 13 })}
    ${box(540, 320, 220, 50, 'Agentic RAG', { fill: C.green, stroke: C.green, color: '#ffffff', size: 13 })}
    ${arrow(150, 292, 150, 316)}
    ${arrow(400, 292, 400, 316)}
    ${arrow(650, 292, 650, 316)}
  `),

  // D2-U3 hero：測試場景
  'day2-u3-test': doc('把 Gen AI 測試帶回 Java 團隊熟悉的方式', '純程式 action 用單元測試；LLM action 驗 prompt・模型角色・工具', `
    <rect x="40" y="80" width="340" height="280" rx="10" fill="${C.card}" stroke="${C.border}" stroke-width="1.5"/>
    ${label(210, 102, 'JUnit 測試', { color: C.dark, size: 13, bold: 700 })}
    ${box(70, 120, 280 , 50, '純程式 action → 一般單元測試', { size: 12 })}
    ${box(70, 185, 280, 60, 'LLM action → PromptRunner\n+ mock service', { fill: C.purpleSoft, stroke: C.purple, color: C.purple, size: 12 })}
    ${box(70, 260, 280, 80, '整合測試：agentic flow\n是否如預期', { fill: C.blueSoft, stroke: C.blue, color: C.blue, size: 12 })}
    <rect x="440" y="80" width="320" height="280" rx="10" fill="${C.amberSoft}" stroke="${C.amber}" stroke-width="1.5"/>
    ${label(600, 102, 'LLM action 驗證清單', { color: C.amber, size: 13, bold: 700 })}
    ${box(470, 125, 260, 50, 'prompt 帶齊重要資料？', { size: 12 })}
    ${box(470, 190, 260, 50, '使用正確模型角色？', { size: 12 })}
    ${box(470, 255, 260, 50, '暴露正確工具？', { size: 12 })}
    ${arrow(384, 215, 436, 215, { dash: '4 4' })}
  `),

  // D2-U3 diagram：觀測資料
  'day2-u3-observe': doc('上線後的觀測資料', 'AgentEvent 時間軸：action span 內含 LLM call 與 tool call', `
    <rect x="60" y="100" width="680" height="50" rx="8" fill="${C.purpleSoft}" stroke="${C.purple}"/>
    ${label(400, 125, 'AgentProcess（一次任務）', { color: C.purple, size: 13, bold: 700 })}
    <rect x="80" y="180" width="280" height="44" rx="8" fill="${C.blueSoft}" stroke="${C.blue}"/>
    ${label(220, 202, 'action: draft  (span)', { color: C.blue, size: 12, bold: 700 })}
    <rect x="420" y="180" width="300" height="44" rx="8" fill="${C.blueSoft}" stroke="${C.blue}"/>
    ${label(570, 202, 'action: review  (span)', { color: C.blue, size: 12, bold: 700 })}
    <rect x="100" y="250" width="120" height="38" rx="6" fill="${C.amberSoft}" stroke="${C.amber}"/>
    ${label(160, 269, 'LLM call', { color: C.amber, size: 11, bold: 700 })}
    <rect x="240" y="250" width="100" height="38" rx="6" fill="${C.greenSoft}" stroke="${C.green}"/>
    ${label(290, 269, 'tool call', { color: C.green, size: 11, bold: 700 })}
    <rect x="440" y="250" width="120" height="38" rx="6" fill="${C.amberSoft}" stroke="${C.amber}"/>
    ${label(500, 269, 'LLM call', { color: C.amber, size: 11, bold: 700 })}
    ${label(400, 330, '記錄：action execution・LLM call・tool invocation・token cost・失敗原因', { size: 12 })}
    ${label(400, 360, '用途：改善 action granularity・調整模型角色・補 guardrail', { size: 12 })}
  `),

  // 課程封面
  'cover': doc('Embabel on Spring Boot', '把 agentic AI 放進 JVM 既有工程邊界', `
    ${box(110, 110, 160, 90, 'GOAP\n可解釋規劃', { fill: C.purpleSoft, stroke: C.purple, color: C.purple })}
    ${box(320, 110, 160, 90, 'Type-driven\nFlow', { fill: C.blueSoft, stroke: C.blue, color: C.blue })}
    ${box(530, 110, 160, 90, 'Blackboard\n+ Replanning', { fill: C.amberSoft, stroke: C.amber, color: C.amber })}
    ${box(110, 240, 160, 90, 'Spring Boot 3.5\nJava 21', { fill: C.greenSoft, stroke: C.green, color: C.green })}
    ${box(320, 240, 160, 90, 'Tool / MCP /\nAgentic RAG', { fill: C.cyanSoft, stroke: C.cyan, color: C.cyan })}
    ${box(530, 240, 160, 90, '測試與\n可維運性', { fill: C.redSoft, stroke: C.red, color: C.red })}
    ${label(400, 375, '2 天 × 3 小時・內部 AI 工程助理貫穿案例・結訓測驗 8 題', { size: 13 })}
  `)
};

// ---- 寫檔 ----
await fs.mkdir(OUT, { recursive: true });
for (const [name, svg] of Object.entries(images)) {
  await fs.writeFile(path.join(OUT, `${name}.svg`), svg, 'utf8');
  console.log(`✓ ${name}.svg`);
}
console.log(`\n共 ${Object.keys(images).length} 張，輸出至 ${OUT}`);
