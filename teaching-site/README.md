# Embabel on Spring Boot — 教學網站

> **版本現況（2026-06）**：Embabel ≤0.4.0 建構於 Spring Boot 3.5.x + Spring AI 1.1.x，尚不支援 Spring Boot 4（Embabel 2.0 才會支援，追蹤 embabel/embabel-agent#1052）。課程內容已改以 Boot 3.5.x 落地。

由 `source/course-package/` 課程包整理而成的互動教學網站（vanilla HTML + JS，無框架、無建置步驟）。

## 啟動

```powershell
cd teaching-site
npm run serve   # → http://localhost:3000
```

> 務必走 HTTP 開啟。直接雙擊 `index.html`（file://）會被瀏覽器擋 localStorage，進度將無法保存。

## 檔案結構

| 路徑 | 角色 |
|---|---|
| `course-data.js` | **唯一資料權威**（`window.COURSE`）：課程 meta、單元、任務、素材、測驗。改課程內容只動這裡。 |
| `index.html` | 渲染器 + 互動層（sidebar/scrollspy、深淺色主題、RWD、quiz、進度持久化）。 |
| `course-package/materials/` | 8 份教學素材（來源網站擷取的 markdown）。 |
| `assets/illustrations/` | 16 張教學 PNG 插圖。 |
| `assets/illustrations/prompts.md` | 16 張插圖的 AI 生圖提示詞文件。 |
| `scripts/verify-site.mjs` | Playwright 行為驗證（渲染、quiz、RWD、console、資源 404），`node scripts/verify-site.mjs`。 |

## 維護鐵則

1. **task ID / unit ID 不可改名**——它們是學員 localStorage 進度鍵，改名會清空所有人進度。
2. **新增素材要三處同步**：實體檔放 `course-package/materials/`、`course-data.js:materials[]` 加條目、`index.html:getMaterialUrl()` 加路由規則。
3. **quiz 為 append-only**；題數顯示為動態計算，但及格訊息等邏輯改動後請重跑驗證腳本。
4. 插圖採 **PNG-only**：所有插圖皆使用 PNG 格式。若欲替換或修改，可使用 `assets/illustrations/prompts.md` 中的 AI 提示詞重新生成，並直接替換同名的 PNG 檔案。
5. **素材（.md 附件）以彈出視窗格式化呈現**：左鍵點素材 → modal 內以內建 markdown 渲染器顯示（XSS-safe、零 CDN 依賴）；右鍵/中鍵仍可開新分頁。新增非 md 檔型時依規則分流：html 用 iframe、pdf 用 download（見 `static-spa-interactions` 技能 Pattern 10）。
