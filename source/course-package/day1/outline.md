# Day 1（單日）: Embabel 心智模型到 Spring Boot 落地

## 學習目標
- 能夠 compare Embabel 與 Spring AI / spring-ai-agent-utils 的控制權差異。
- 能夠 model 一個 GOAP action / goal / world state。
- 能夠 design 一個 Java type-driven flow。
- 能夠 explain AgentProcess、Blackboard 與 replanning 的運作。
- 能夠 configure Spring Boot 3.5.x / Java 21 專案與 Embabel starter，並說明 Boot 4 的版本限制。
- 能夠 choose domain tool、MCP 或 Agentic RAG 的接入方式。
- 能夠 evaluate Embabel agent 的測試與上線檢查點。
- 能夠 use AI 輔助提示詞加速以上每個步驟。

## 時程
| 時段 | 單元 | 重點 |
|---|---|---|
| 09:00-09:35 | u-1 為什麼 Java 團隊需要 Embabel | 工程邊界、三框架比較、案例場景評估 |
| 09:35-10:25 | u-2 GOAP：可解釋規劃手法 | world state、pre/post conditions、案例拆 action |
| 10:35-11:15 | u-3 用 Java record 與 annotation 定義流程 | @Agent、@Action、案例 record 設計 |
| 11:15-12:00 | u-4 AgentProcess、Blackboard 與 Replanning | 案例執行軌跡與 replanning |
| 12:00-13:00 | 午休 | |
| 13:00-13:55 | u-5 在 Spring Boot 專案中落地 | Java 21、starter、版本相容性、案例專案建置 |
| 14:05-14:55 | u-6 Tool、MCP 與 Agentic RAG 怎麼分工 | 案例 @Tool 統計與接入決策 |
| 15:05-16:00 | u-7 測試、可維運性與結訓 | 案例 prompt 測試、觀測、測驗 |

## 單元細部
### u-1: 為什麼 Java 團隊需要 Embabel
- **學習目標**: 能說明 Embabel 把 agent flow 放回 JVM 工程邊界；能比較 Spring AI / spring-ai-agent-utils / Embabel。
- **案例推進**: 評估 Antechinus Travel 場景，確認適合 planner 路線。
- **AI 輔助**: 提示詞①「評估營運場景是否適合 agent 化」。
- **任務 (tasks)**: d1-u1-t1, d1-u1-t2
- **素材需求**: business-process-list-sample.md

### u-2: GOAP：Embabel 的可解釋規劃手法
- **學習目標**: 能用條件與目標描述 agent flow。
- **案例推進**: 把客戶摘要流程拆成 fetchActivity / summarize / proposeOffer / reviewOffer / escalateToHuman。
- **AI 輔助**: 提示詞②「把營運流程拆成 GOAP action 表」。
- **任務 (tasks)**: d1-u-goap-t1, d1-u-goap-t2
- **素材需求**: goap-action-table-sample.md

### u-3: 用 Java record 與 annotation 定義流程
- **學習目標**: 能把 flow 拆成 Java action method 與 record。
- **案例推進**: CustomerCareAgent 程式骨架（record × 5 + @Action × 4）。
- **AI 輔助**: 提示詞③「從 GOAP 表生成 Embabel 程式骨架」。
- **任務 (tasks)**: d1-u2-t1, d1-u2-t2
- **素材需求**: CustomerCareAgent.java

### u-4: AgentProcess、Blackboard 與 Replanning
- **學習目標**: 能說明 Embabel 執行時如何持續更新狀態並重新規劃。
- **案例推進**: 一次查詢的 blackboard 演進表 + reviewOffer 未過的 replanning。
- **AI 輔助**: 提示詞④「模擬 AgentProcess 執行軌跡」。
- **任務 (tasks)**: d1-u-runtime-t1, d1-u-runtime-t2
- **素材需求**: traveller-activity-sample.json

### u-5: 在 Spring Boot 專案中落地
- **學習目標**: 能檢查 Spring Boot / Java 版本與 Embabel 相容性（Embabel ≤0.4.0 需 Boot 3.5.x，Boot 4 等 Embabel 2.0）。
- **案例推進**: AntechinusApplication（@EnableAgents）與 application.yml 門檻參數。
- **AI 輔助**: 提示詞⑤「生成 pom.xml 與環境檢查清單」。
- **任務 (tasks)**: d2-u1-t1, d2-u1-t2
- **素材需求**: pom-sample.xml, application-sample.yml

### u-6: Tool、MCP 與 Agentic RAG 怎麼分工
- **學習目標**: 能選擇正確工具接入模式。
- **案例推進**: TravellerActivity 的 @Tool 統計（totalSpend / tripsPerYear）+ withToolObject 最小暴露。
- **AI 輔助**: 提示詞⑥「工具接入決策與 @Tool 設計」。
- **任務 (tasks)**: d2-u-tools-t1, d2-u-tools-t2
- **素材需求**: travel-policy.md

### u-7: 測試、可維運性與結訓
- **學習目標**: 能規劃 prompt 測試、action 測試與觀測資料。
- **案例推進**: summarize 的 prompt 組裝測試、reviewOffer 規則測試、ActionAudit 回溯。
- **AI 輔助**: 提示詞⑦「生成測試清單與上線檢查表」。
- **任務 (tasks)**: d2-u2-t1, d2-u2-t2
- **素材需求**: test-checklist-sample.md

> 註：task id 保留歷史前綴（d1-/d2-），與單元編號解耦；它們是學員進度的 localStorage 鍵，不可重編。
