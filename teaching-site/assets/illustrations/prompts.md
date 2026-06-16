# Embabel on Spring Boot 教學網站插圖 AI 生圖提示詞手冊

本文件彙整了教學網站中全部 16 張插圖（含課程封面與各單元插圖）的 AI 繪圖提示詞（Prompts）。您可以直接將這些提示詞輸入至 AI 繪圖模型（例如 Midjourney、DALL-E 3 等）中，用以生成專屬的教學插圖 PNG 檔案。

所有插圖皆應使用高質量的 PNG 格式，尺寸建議為 **16:9**（如 800×450 或 1600×900 像素）。

---

## 統一視覺風格設定

為了保持整個教學網站插圖的視覺一致性，在生成以下插圖時，請遵循以下風格定義：
- **風格基準 (Style)**：Premium editorial 3D/flat hybrid illustration, refined technical education style, clean geometric technical metaphor, soft depth, crisp shapes. (高質感社論 3D/扁平混合插畫，精緻的技術教育風格，乾淨的幾何技術隱喻，柔和的景深與清晰的形狀)。
- **背景與配色 (Color Palette)**：輕盈且現代的軟體工程配色，淺色底色為主，搭配藍色、紫色、綠色、琥珀色等模組化原色。
- **統一限制條件 (Constraints)**：No readable text, no letters, no logos, no brand marks, no watermarks, no realistic faces. (無可讀文字、無字母、無標誌、無商標、無浮水印、無真實人臉。避免生圖模型產生混亂的英文字母)。

*註：`day1-u4-ooda.png`（OODA 迴圈）為中文資訊圖版，其提示詞包含明確的中文標籤指示，適用於支援中文 CJK 輸出的現代生圖模型。*

---

## 16 張插圖 AI 提示詞列表

### 1. 課程封面
- **檔名**：`cover.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website cover hero illustration
- **Primary request**: Create a polished raster illustration for a course about Embabel on Spring Boot, showing JVM agentic AI engineering as a complete learning journey.
- **Style**: premium editorial 3D/flat hybrid illustration, refined technical education style, soft depth, crisp shapes.
- **Composition**: wide 16:9 overview with six zones for explainable planning, type-driven flow, blackboard/replanning, Spring Boot implementation, tools/RAG/MCP, and testing/observability.
- **Constraints**: no readable text, no letters, no logos, no brand marks, no watermarks, no realistic faces.

---

### 2. 把 agentic AI 放進 JVM 工程邊界
- **檔名**：`day1-u1-jvm-agent.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Show why Java teams need Embabel: keeping agentic AI inside existing JVM and Spring engineering boundaries.
- **Style**: premium editorial 3D/flat hybrid illustration, refined technical education style.
- **Composition**: wide 16:9, secure JVM/Spring boundary on one side, controlled agent bridge to AI model and approved tools on the other.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo code text.

---

### 3. 控制權邊界
- **檔名**：`day1-u1-boundary.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Show the concept of control boundary in an AI agent system where a central planner manages the overall workflow chain, and the LLM (Large Language Model) is strictly confined to executing specific actions inside the chain rather than directing the process.
- **Style**: premium editorial 3D/flat hybrid illustration, refined technical education style.
- **Composition**: wide 16:9. A large, prominent workflow runner (representing the central planner) overseeing a pipeline of three consecutive modular steps (Action 1, Action 2, Action 3). The LLM is represented as a localized glowing helper node enclosed inside Action 2 and Action 3, showing it only runs locally when triggered.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 4. GOAP：從現況到目標的路徑搜尋
- **檔名**：`day1-u2-goap-map.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Explain GOAP planning in Embabel as an explainable action plan from current world state to goal state.
- **Style**: premium editorial 3D/flat hybrid illustration, clear geometric technical metaphor.
- **Composition**: wide 16:9, left-to-right path with alternate routes subdued and one selected route highlighted.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo text.

---

### 5. action 的條件結構
- **檔名**：`day1-u2-condition-flow.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Visualize the condition-based structure of an agent action. Show how preconditions lead to the action itself, producing postconditions, which are then evaluated against a goal.
- **Style**: premium editorial 3D/flat hybrid illustration, clean software engineering metaphor.
- **Composition**: wide 16:9. A linear horizontal flow: a blue capsule representing "Preconditions" feeding into a central purple "Action" module, which outputs a warm amber "Postconditions" state. A decision diamond branch evaluating if the postcondition matches the green hexagon "Goal". A fallback loop path indicates replanning if unmet.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 6. Type-driven flow：方法簽章就是流程宣告
- **檔名**：`day1-u3-type-flow.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Illustrate a type-driven agentic flow where strongly-typed data objects (such as Java records) flow between consecutive action methods, enabling the planner to auto-resolve execution order based on input/output types.
- **Style**: premium editorial 3D/flat hybrid illustration, refined software architecture style.
- **Composition**: wide 16:9. Modular code-like blocks representing functions with clear inputs and outputs. An input data object (capsule) enters the first action, transforms into an intermediate typed object, which then automatically hooks into the second action requiring that specific type. A clean flow from left to right.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 7. Annotation 對應 planner metadata
- **檔名**：`day1-u3-annotation.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Show the relationship between Java annotations (@Agent, @Action, @AchievesGoal) and the planner metadata model that scanning these entry points constructs.
- **Style**: premium editorial 3D/flat hybrid illustration, educational software engineering style.
- **Composition**: wide 16:9. Split screen composition. The left side shows a clean visual representation of a Java class file with labeled annotations. The right side shows the corresponding planner metadata structure (capabilities, execution steps, target goals). Dashed connector lines map the annotations on the left directly to the metadata components on the right.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 8. AgentProcess 執行迴圈
- **檔名**：`day1-u4-runtime.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Show AgentProcess, Blackboard, and replanning in Embabel runtime.
- **Style**: premium editorial 3D/flat hybrid illustration, refined software architecture visualization.
- **Composition**: wide 16:9, central blackboard/state board, action execution cards, event traces, and a circular replanning loop.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo text.

---

### 9. OODA 迴圈
- **檔名**：`day1-u4-ooda.png`
- **說明**：中文資訊圖表風格。
- **生圖提示詞**：
  請產生一張 16:9 的教學資訊圖，主題是「OODA 迴圈：Embabel Replanning 的運作原理」。
  整體風格：白色背景、現代扁平向量插畫（flat vector infographic）、圓角卡片與柔和陰影、配色以藍（#2563eb）紫（#7c3aed）綠（#16a34a）琥珀（#d97706）為主、乾淨的繁體中文標籤、無浮水印、無公司 logo、無真實人臉。
  版面構成：
  1. 頂部置中大標題（粗體深色）：「OODA 迴圈」
     副標題（小一號、灰色）：「每執行一步就重新規劃——Embabel Replanning 的理論基礎」
  2. 畫面中央是一個大型順時針圓形迴圈，四個圓角卡片站點均勻分布，卡片之間用粗箭頭相連成一圈，每張卡片含一個扁平圖示、編號與中文標籤：
     - ① 觀察 Observe（藍色）：放大鏡檢視一塊發光的狀態板，小字「看 Blackboard 目前有哪些物件」
     - ② 理解 Orient（紫色）：羅盤／對齊碎片的圖示，小字「上一步之後發生了什麼變化」
     - ③ 決策 Decide（琥珀色）：分岔路徑，一條路亮起、其餘變暗，小字「重新規劃：選下一個 action」
     - ④ 行動 Act（綠色）：機械臂把一張 action 卡放上輸送帶，小字「執行計畫中的下一步」
  3. 迴圈正中央放一塊「Blackboard 共享狀態板」圓角卡片（深色標題列），④ 行動站有一條回饋箭頭指回中央狀態板，標註「結果寫回」。
  4. 底部一排三個小膠囊（淺色底、小圖示）說明這個設計帶來的能力：「適應非預期結果」、「從部分失敗恢復」、「條件變化時改走新路徑」。
  文字規範：所有標籤使用繁體中文（專有名詞 Observe／Orient／Decide／Act／Blackboard／action 保留英文），字體乾淨無襯線，標題粗體，說明文字小而清晰。

---

### 10. Blackboard：型別綁定的共享狀態
- **檔名**：`day1-u4-blackboard.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Show how a shared "Blackboard" state container acts as the communication hub between actions, where objects are bound to next actions by type and name rather than string keys.
- **Style**: premium editorial 3D/flat hybrid illustration, refined technical style.
- **Composition**: wide 16:9. A central "Blackboard" container board holding several distinct typed data capsules. Action A on the left deposits a new data capsule into the blackboard. Action B on the right automatically binds another capsule from the blackboard into its parameter input slot.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 11. Spring Boot 專案與 Embabel starter
- **檔名**：`day2-u1-boot4.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Show implementing Embabel in a Spring Boot 4 and Java 21 project.
- **Style**: premium editorial 3D/flat hybrid illustration, clean technical training style.
- **Composition**: wide 16:9, central modular project stack, environment checks on one side, model/tool integration on the other.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo code text.

---

### 12. Windows 環境檢查流程
- **檔名**：`day2-u1-env.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Show a step-by-step developer environment checklist for verifying Java 21+, JAVA_HOME, Maven settings, and application.yml configuration for an Embabel project on Windows.
- **Style**: premium editorial 3D/flat hybrid illustration, clean developer checklist style.
- **Composition**: wide 16:9. A progressive checklist or pipeline of developer tasks: a terminal prompt checking version, a system path configuration panel pointing to JDK 21, and application configuration file options, highlighting a red warning box for Java 8 failures on one end, and a green success state on the other.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 13. 三種工具來源
- **檔名**：`day2-u2-tools.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Show choosing between domain tools, MCP, and Agentic RAG in an Embabel agent system.
- **Style**: premium editorial 3D/flat hybrid illustration, refined technical education style.
- **Composition**: wide 16:9, three source zones feeding a central controlled agent action through minimal tool exposure.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo text.

---

### 14. 接入模式 decision tree
- **檔名**：`day2-u2-choice.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: A decision tree workflow diagram helping developers choose between Java Domain Tool (@Tool), MCP Server, and Agentic RAG based on state location, reuse scope, and data volume.
- **Style**: premium editorial 3D/flat hybrid illustration, clean flowchart metaphor.
- **Composition**: wide 16:9. A top root question branching down into three separate decision paths. Each path evaluates specific requirements (JVM bound, cross-runtime reuse, large-scale document search) and ends with three distinctive output modules: a blue "Domain Tool", a purple "MCP Server", and a green "Agentic RAG" option.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.

---

### 15. 把 Gen AI 測試帶回 Java 團隊熟悉的方式
- **檔名**：`day2-u3-test.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit hero image
- **Primary request**: Show testing, observability, and production readiness for Embabel agent systems.
- **Style**: premium editorial 3D/flat hybrid illustration, professional engineering education style.
- **Composition**: wide 16:9, testing bench on the left, agent flow in the center, observability dashboard and guardrails on the right.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no faces, no pseudo text.

---

### 16. 上線後的觀測資料
- **檔名**：`day2-u3-observe.png`
- **Use case**: scientific-educational
- **Asset type**: teaching website unit diagram image
- **Primary request**: Show a timeline of observability data for an active agent run, visualizing the trace of an AgentProcess containing nested action spans, which in turn contain LLM calls and tool invocations.
- **Style**: premium editorial 3D/flat hybrid illustration, dashboard observability style.
- **Composition**: wide 16:9. A timeline trace visualization. An outer container box represents the "AgentProcess" lifespan. Inside, two sequential horizontal blocks represent "Action Spans". Underneath each span, nested sub-blocks represent specific "LLM call" and "Tool call" traces.
- **Constraints**: no readable text, no letters, no logos, no watermarks, no realistic faces.
