# Embabel on Spring Boot

> **版本現況（2026-06）**：已發佈的 Embabel（最新 0.4.0）建構於 Spring Boot 3.5.x + Spring AI 1.1.x，**尚不支援 Spring Boot 4**（啟動時 `NoSuchMethodError`，與 Spring Framework 7 二進位不相容）。Boot 4 支援將隨 Embabel 2.0（Spring AI 2.0 GA 後）推出，追蹤 issue：embabel/embabel-agent#1052。本課程一律以 Spring Boot 3.5.x 落地。

## 基本資訊
- **對象**: 熟悉 Java / Spring Boot 的工程師，想把 agentic AI 放進 JVM 既有系統。
- **總時數**: 6 小時（1 天）
- **上課時間**: 自學或內訓皆可。
- **教室**: 線上或公司內訓環境。
- **講師**: 專案維護者。

## 課程目標
- 能夠說明 Embabel 與一般 LLM tool-calling / pipeline 的差異。
- 能夠用 GOAP、Action、Goal、Blackboard 描述 Embabel 的執行模型。
- 能夠用 Java record 與 annotation 設計一個 type-driven agent flow。
- 能夠在 Spring Boot 3.5.x / Java 21 專案中安排 Embabel starter、模型角色與測試邊界，並說明 Boot 4 的版本限制。
- 能夠判斷 domain tool、MCP、Agentic RAG 在系統中的分工。
- 能夠用 AI 輔助提示詞加速 Embabel agent 的設計與開發。

## 每日主題
| Day | 主題 | 核心產出 |
|---|---|---|
| Day 1（單日） | Embabel 心智模型到 Spring Boot 落地 | 用案例完成 GOAP 拆解、@Agent 程式骨架、專案依賴、工具配置與測試清單 |

## 共用案例（貫穿全部單元）
本課使用「Antechinus Travel 客戶活動摘要與個人化方案」作為貫穿案例（取自 Embabel 官方文章 Ground Your AI Transformation on What Works Today）。案例在 7 個單元中逐步推進：u-1 評估場景 → u-2 拆 GOAP → u-3 定義 record / action → u-4 走一遍 runtime → u-5 建專案 → u-6 接工具（@Tool 統計）→ u-7 測試上線。

## AI 輔助開發
每個單元除案例範例外，附一份 RTFC 結構（角色/任務/格式/限制）的 AI 輔助開發提示詞，學員可直接複製給 AI 助手，產出場景評估表、GOAP 表、Java 骨架、執行軌跡模擬、pom.xml、@Tool 設計與測試清單。

## 評量方式
每個單元有操作任務，最後以 6 題測驗檢查 GOAP、Action/Goal、Blackboard、Spring Boot starter 與版本相容性、工具分工與測試概念。
