# Day 1 Content（單日 7 單元）

> 貫穿案例：Antechinus Travel 客戶活動摘要與個人化方案（見 shared-scenario.md）。每單元含「案例實作」與「AI 輔助開發提示詞」（RTFC 結構），完整內容見 teaching-site/course-data.js（資料權威）。

## u-1: 為什麼 Java 團隊需要 Embabel

**對應任務**: d1-u1-t1, d1-u1-t2
**對應素材**: business-process-list-sample.md
**圖片需求 (illustrations)**:
- `day1-u1-jvm-agent.png` — hero：JVM 服務、Spring bean、LLM 與工具被 agent flow 連接的工程場景。
- `day1-u1-boundary.png` — diagram：LLM 只在 action 內工作，整體流程由 planner 控制。

企業 Java 團隊已經有穩定的 domain model、Spring service、資料庫、權限與測試流程。Agentic AI 的問題不是「能不能呼叫模型」，而是「如何把模型放進既有工程邊界」。Embabel 讓開發者用熟悉的 Java / Spring 方式定義 action、goal 與 domain object；LLM 在 action 裡做局部生成，action chain 的選擇由 planner 根據條件推導。

本單元含「Spring AI vs spring-ai-agent-utils vs Embabel」三方比較表，軸心是「誰決定下一步」：開發者手寫順序（Spring AI）、LLM 自主選工具（agent-utils）、GOAP planner 推導（Embabel）。

**案例實作①**: 評估 Antechinus Travel 場景——既有報表服務、需審核與追蹤，適合 planner 路線。
**AI 輔助提示詞①**: 評估營運場景是否適合 agent 化（輸出：流程｜適合度｜LLM 負責｜工程負責｜風險點）。

## u-2: GOAP：Embabel 的可解釋規劃手法

**對應任務**: d1-u-goap-t1, d1-u-goap-t2
**對應素材**: goap-action-table-sample.md
**圖片需求 (illustrations)**:
- `day1-u2-goap-map.png` — hero：從 current state 到 goal state 的路徑搜尋視覺。
- `day1-u2-condition-flow.png` — diagram：preconditions、action、postconditions、goal 的關係。

GOAP 源自遊戲 AI：world state 表示已知事實；action 有 preconditions 與 postconditions；goal 定義成功條件。Planner 找出 action chain，每執行一步重新檢查並 replanning。

**案例實作②**: 拆成 fetchActivity / summarize / proposeOffer / reviewOffer / escalateToHuman，goal 是 blackboard 出現 ReviewedOffer；查無客戶時 planner 停在可解釋的失敗點。
**AI 輔助提示詞②**: 把營運流程拆成 GOAP action 表（pre/postconditions + replanning 情境）。

## u-3: 用 Java record 與 annotation 定義流程

**對應任務**: d1-u2-t1, d1-u2-t2
**對應素材**: CustomerCareAgent.java
**圖片需求 (illustrations)**:
- `day1-u3-type-flow.png` — hero：Java record 在 action 之間流動。
- `day1-u3-annotation.png` — diagram：@Agent、@Action、@AchievesGoal 對應 planner metadata。

Embabel 的 type-driven flow 來自方法簽章。以共用案例為例：`summarize(TravellerActivity activity)` 代表這個 action 需要 `TravellerActivity`；回傳 `ActivitySummary` 代表執行後 blackboard 會有 `ActivitySummary`。record 是資料邊界；@Agent / @Action / @AchievesGoal 讓 Embabel 掃描 capability。

**案例實作③**: CustomerCareAgent 程式骨架——5 個 record + 4 個 @Action，簽章直接對應 u-2 的 GOAP 表。
**AI 輔助提示詞③**: 從 GOAP 表生成可編譯的 Embabel Java 骨架。

## u-4: AgentProcess、Blackboard 與 Replanning

**對應任務**: d1-u-runtime-t1, d1-u-runtime-t2
**對應素材**: traveller-activity-sample.json
**圖片需求 (illustrations)**:
- `day1-u4-runtime.png` — hero：AgentProcess 執行迴圈。
- `day1-u4-ooda.png` — diagram：OODA 迴圈四站（觀察→理解→決策→行動）與中央 Blackboard 回饋（中文資訊圖）。
- `day1-u4-blackboard.png` — diagram：action output 寫入 blackboard 後被下一個 action binding。

AgentProcess 是一次 agent 任務的容器（user input、goal、plan、blackboard、事件、終止狀態）。Blackboard 依型別與名稱把物件綁定到 method parameters。Replanning：執行一步後重新看狀態再決定下一步——官方文件稱這是一個動態的 **OODA loop**（Observe 觀察 blackboard → Orient 理解變化 → Decide 重新規劃 → Act 執行下一個 action），這也是 Embabel replanning 設計的理論基礎（延伸閱讀：Wikipedia OODA loop）。

**案例實作④**: 「客戶 4711」一次查詢的 blackboard 演進表；reviewOffer 未過時 replanning 改走重做或人工路徑。
**AI 輔助提示詞④**: 模擬 AgentProcess 執行軌跡（桌面演練 + 異常加演）。

## u-5: 在 Spring Boot 專案中落地

**對應任務**: d2-u1-t1, d2-u1-t2
**對應素材**: pom-sample.xml, application-sample.yml
**圖片需求 (illustrations)**:
- `day2-u1-boot4.png` — hero：Spring Boot 專案與 Embabel starter 的依賴關係（含版本相容性）。
- `day2-u1-env.png` — diagram：PowerShell、JAVA_HOME、Maven、application.yml。

**版本相容性（2026-06 現況）**：已發佈的 Embabel（最新 0.4.0）建構於 **Spring Boot 3.5.x + Spring AI 1.1.x**，MVC 用 `spring-boot-starter-web`，需 Java 21+（Windows 常見陷阱：系統預設 Java 8）。**尚不支援 Spring Boot 4**——編譯會過，但啟動時拋 `NoSuchMethodError: HttpHeaders.addAll`（與 Spring Framework 7 二進位不相容）；Boot 4 支援將隨 Embabel 2.0（待 Spring AI 2.0 GA）推出，追蹤 embabel/embabel-agent#1052。Spring AI 由 Embabel starter 傳遞帶入，不要自行加 Spring AI BOM；升級 Boot / Spring AI 大版本前先確認 Embabel 相容性。

**案例實作⑤**: AntechinusApplication 加 `@EnableAgents`；門檻參數（maxWords、高消費門檻）走 @ConfigurationProperties。
**AI 輔助提示詞⑤**: 生成 pom.xml、PowerShell 環境檢查清單與 application.yml 樣板。

## u-6: Tool、MCP 與 Agentic RAG 怎麼分工

**對應任務**: d2-u-tools-t1, d2-u-tools-t2
**對應素材**: travel-policy.md
**圖片需求 (illustrations)**:
- `day2-u2-tools.png` — hero：domain object、MCP server、RAG store 分別提供工具。
- `day2-u2-choice.png` — diagram：domain tool vs MCP vs RAG decision tree。

Domain tool 直接掛在 Java domain object（@Tool，零儀式）；MCP 適合跨應用重用；Agentic RAG 適合大量文件讓 LLM 自行搜尋。Embabel 強調最小工具暴露。

**案例實作⑥**: TravellerActivity 以 @Tool 暴露 totalSpend / tripsPerYear（金額由 Java 算、LLM 負責敘事）；summarize 以 withToolObject(activity) 最小暴露；政策文件走 RAG。
**AI 輔助提示詞⑥**: 工具接入決策與 @Tool 方法設計（含最小工具清單檢查）。

## u-7: 測試、可維運性與結訓

**對應任務**: d2-u2-t1, d2-u2-t2
**對應素材**: test-checklist-sample.md
**圖片需求 (illustrations)**:
- `day2-u3-test.png` — hero：action method、PromptRunner、mock service 的測試場景。
- `day2-u3-observe.png` — diagram：AgentEvent、action span、LLM call、tool call。

純程式 action 用一般單元測試；LLM action 測 prompt 是否帶齊重要資料、是否用正確模型角色、是否暴露正確工具。上線記錄 action execution、LLM call、tool invocation、token cost 與失敗原因。

**案例實作⑦**: fetchActivity 用 mock 測試；summarize 測 prompt 組裝（門檻參數、@Tool、模型角色）；reviewOffer 測折扣上限；客訴靠 ActionAudit 回溯。
**AI 輔助提示詞⑦**: 生成測試清單、上線檢查表與 guardrail 建議。
