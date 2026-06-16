# Shared Scenario: Antechinus Travel 客戶活動摘要與個人化方案

> 案例取自來源文章 `medium.com/ground-your-ai-transformation-on-what-works-today.md`（Rod Johnson），並延伸為多步驟 agent flow 以貫穿兩天課程。

## 背景
Antechinus Travel 是一家旅遊公司。客服與行銷團隊希望：客服人員開啟客戶帳戶時，立即看到 AI 產生的活動摘要——標出高消費客戶（high spender）與常旅客（frequent traveler），並產生個人化服務方案（升等、優惠）供審核後回寫 CRM。

## 核心問題
公司不希望把 CRM、訂單與行銷流程交給單一 LLM 自由發揮：
- 金額與次數必須由既有 domain object 的 `@Tool` 方法提供準確數字（`totalSpend()`、`tripsPerYear()` 等），不靠 LLM 心算。
- 優惠發放需要規則檢查或強模型審核，不能直接送到客戶面前。
- 每一步要可追蹤、可測試。

需求是：讓 LLM 做摘要與建議等局部推理，但整體流程必須可規劃、可測試、可追蹤。

## 資料形狀
- `CustomerQuery`: 客服人員的查詢請求，例如「客戶 4711 的近一年活動」。
- `TravellerActivity`: 既有報表服務（`TravelActivityReportingService`）回傳的旅遊活動，含 trips 清單；以 `@Tool` 暴露 `totalSpend`、`averageSpend`、`tripCount`、`tripsPerYear`、`destinations` 等統計。
- `ActivitySummary`: LLM 產生的活動摘要，標出高消費 / 常旅客等重點。
- `OfferDraft`: LLM 產生的個人化方案草稿（升等、優惠）。
- `ReviewedOffer`: 經過規則檢查或強模型審核後可發送的方案。
- `ActionAudit`: 每一步 action 的輸入、輸出、模型與工具資訊。
