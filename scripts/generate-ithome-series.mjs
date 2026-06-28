import fs from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("ithome");

const sourceNotes = [
  "teaching-site/course-data.js",
  "skills/embabel-spring-ai-dev/SKILL.md",
  "skills/embabel-generative-ui/SKILL.md",
  "source/embabel.com/embabel-documentation.md",
  "source/Embabel進階用法.md"
];

const days = [
  {
    theme: "series",
    title: "先把路鋪好：30 天把兩個技能串成一個專案",
    subtitle: "Embabel 的起點，以及 json-render 為什麼要把 AI 關在可控邊界內",
    source: "teaching-site/course-data.js meta / sharedCase",
    tags: ["鐵人賽", "Embabel", "json-render"],
    keyPoints: ["Embabel 把 AI 放回 JVM / Spring 邊界", "企業流程需要可測試、可稽核、可觀測", "json-render 讓 AI 選 UI，但由前端白名單渲染"],
    content: [
      "Embabel 的起點，不是再做一個讓模型自由亂跑的聊天框，而是把 AI 放進現有 Java / Spring 系統。它面對的真實場景是：企業已經有 domain model、service、交易邊界、權限與審核流程，新的 AI 能力要接上去，而不是推倒重來。",
      "所以你會看到 Embabel 很重視 action、goal、world state、blackboard 這些詞。它要解決的不是「模型會不會說話」，而是「流程怎麼被拆開、怎麼被推導、怎麼被測試、怎麼被稽核」。這也是為什麼它對 JVM 團隊特別有吸引力：你不用放棄既有程式邊界，只是把推理與決策放進可控的位置。",
      "json-render / embabel-generative-ui 的想法則是把同一件事再往前推一步：AI 不只產出文字，還能決定要用哪些 UI 元件呈現資料。但它不能直接亂生前端程式，而是輸出受限的 JSON UI spec，由前端的 component registry 依白名單渲染。這樣 AI 有自主性，前端仍維持安全邊界與一致性。"
    ],
    exercise: "整理一張對照表：Embabel 負責哪些後端決策，json-render 負責哪些前端決策，以及哪些東西絕對不能交給模型自由生成。"
  },
  {
    theme: "embabel",
    title: "為什麼要換一種做事方法",
    subtitle: "Embabel 的問題意識：不要為了 AI 重寫既有系統",
    source: "teaching-site/course-data.js u-1 / source/embabel.com Overview",
    tags: ["JVM", "Spring", "Agentic AI"],
    keyPoints: ["JVM 是企業系統主場", "LLM 應該進入工程邊界", "Embabel 建構在 Spring 生態上"],
    content: [
      "很多 agentic AI 展示都像是從空白專案開始：丟一個 prompt、接幾個工具、讓模型自己想下一步。但企業 Java 團隊面對的是另一種現實：既有系統已經有 domain model、Spring service、資料庫、權限、交易邊界與測試流程。",
      "Embabel 的切入點就是這個落差。它不是要你把 CRM、ERP、訂單與客服流程搬去 Python agent sandbox，而是讓 AI 能被嵌入 JVM 既有工程邊界。LLM 可以做摘要、分類、草稿、判斷，但流程選擇、資料邊界、工具暴露與審核點仍由工程系統管理。",
      "這也是本系列的第一個立場：AI agent 不只是模型能力問題，而是軟體架構問題。當流程牽涉金額、個資、審核與對外發送，能不能說清楚每一步為什麼發生，比能不能讓模型看起來很聰明更重要。"
    ],
    exercise: "列出你目前系統中 3 個可能導入 AI 的流程，標註哪些部分適合 LLM，哪些必須由既有 Java 程式或資料庫負責。"
  },
  {
    theme: "embabel",
    title: "先搞懂三種角色",
    subtitle: "先分清楚基礎設施、工具型 agent 與 planner 型 agent",
    source: "teaching-site/course-data.js u-1 framework comparison",
    tags: ["Spring AI", "GOAP", "Agent Framework"],
    keyPoints: ["Spring AI 是低層 LLM 基礎設施", "Agent Utils 偏探索式工具迴圈", "Embabel 偏可解釋流程規劃"],
    content: [
      "Spring AI 解決的是低層問題：讓 Spring 應用能用 ChatClient、模型 provider、tool calling、VectorStore 與 MCP。它很適合單次 LLM 呼叫，或由開發者明確寫死順序的 pipeline。",
      "spring-ai-agent-utils 走的是工具型 agent 路線，讓 LLM 在迴圈中選工具、讀檔案、跑 shell、搜尋資料。這種模式適合探索式任務，例如 coding assistant 或資料分析，因為目標可能開放，路徑也可能需要模型臨場判斷。",
      "Embabel 不同，它關心的是『流程本身』。開發者宣告 action 的輸入輸出、條件與 goal，planner 根據目前 world state 推導路徑。這讓企業流程可以被測試、被稽核、被解釋，而不是每一次都由 LLM 即興決定下一步。"
    ],
    exercise: "用表格比較一個你熟悉的流程：如果用 Spring AI、agent-utils、Embabel 各會怎麼做，誰決定下一步？"
  },
  {
    theme: "embabel",
    title: "讓事情自己走對路",
    subtitle: "讓 LLM 自主迴圈，還是讓演算法決定流程？",
    source: "teaching-site/course-data.js loop-vs-embabel",
    tags: ["Loop Engineering", "GOAP", "ReAct"],
    keyPoints: ["Loop Engineering 適合探索", "GOAP 適合有條件的企業流程", "Embabel 讓 LLM 做局部推理"],
    content: [
      "Loop Engineering 的核心是感知、推理、行動、觀察。LLM 看到目前狀態後決定要呼叫哪個工具，再根據工具結果繼續下一輪。這種模式彈性高，但也需要 MAX_LOOP、token budget、工具白名單與錯誤保護。",
      "GOAP Planning 則把流程拆成 action、preconditions、postconditions 與 goal。Planner 不是靠語言模型猜下一步，而是根據條件搜尋可以到達目標的路徑。Embabel 的特點是：action 內可以用 LLM，但 action 之間的編排交給 planner。",
      "因此兩者不是誰全面取代誰，而是適用情境不同。探索式工作可以讓模型多試；生產流程、合規流程、金額計算與審核工作，則更適合 GOAP 這種可解釋、可重跑、可測試的規劃方式。"
    ],
    exercise: "挑一個容易出錯的 agent loop，改寫成 GOAP 的 action 表：每步需要什麼輸入？產生什麼輸出？失敗時停在哪裡？"
  },
  {
    theme: "embabel",
    title: "把工作拆成幾個小步驟",
    subtitle: "用遊戲 AI 的規劃方法描述企業流程",
    source: "teaching-site/course-data.js u-2 / source/Embabel進階用法.md",
    tags: ["GOAP", "Action", "Goal"],
    keyPoints: ["world state 是已知事實", "action 有前置與後置條件", "goal 定義成功狀態"],
    content: [
      "GOAP 可以想成一張地圖。world state 是目前所在城市，action 是可走的道路，preconditions 是上路前必須滿足的條件，postconditions 是走完後世界狀態的改變，goal 則是想抵達的目的地。",
      "以客服摘要為例，使用者輸入 CustomerQuery 後，系統可能先 fetchActivity 取得 TravellerActivity，再 summarize 產生 ActivitySummary，接著 proposeOffer 產生 OfferDraft，最後 reviewOffer 取得 ReviewedOffer。每個 action 都只承諾自己能從哪些事實產生哪些新事實。",
      "這種描述方式的好處是擴充時不必重寫整條流程。你新增一個 action，planner 只要看到它的條件與效果，就能判斷是否可以放進路徑裡。流程從命令式 pipeline 變成可推導的能力網路。"
    ],
    exercise: "把 Antechinus Travel 的客服流程畫成 5 個 action，寫出每個 action 的輸入型別、輸出型別與失敗情境。"
  },
  {
    theme: "embabel",
    title: "學會算分數與排順序",
    subtitle: "演算法管邏輯，權重管偏好",
    source: "source/embabel.com Planning Module / teaching-site/course-data.js u-5",
    tags: ["A*", "Cost", "Planner"],
    keyPoints: ["A* 搜尋最低總成本路徑", "靜態成本表達基本偏好", "動態成本表達環境狀態"],
    content: [
      "Embabel 的 GOAP planner 背後可以用 A* 搜尋來理解：它會在可用 action 之間尋找能達成 goal 的低成本路徑。成本不只是錢，也可以是延遲、風險、模型品質、API 穩定性或人工審核負擔。",
      "靜態權重用來表達基本偏好。例如本地 Java 計算便宜且準確，成本低；呼叫大型模型昂貴且慢，成本高。當兩條路都能達成目標，planner 自然會偏向較低成本的路。",
      "進階做法是動態成本。當某個 provider 延遲升高、預算快用完、或某個資料來源暫時不可靠，就把該 action 的 cost 拉高，讓 agent 自動改走備援路徑。這比在流程中塞滿 if-else 更容易維運。"
    ],
    exercise: "為你的 action 表補上 cost 欄位，至少設計一個『正常時走快路、異常時走備援』的動態成本規則。"
  },
  {
    theme: "embabel",
    title: "讓記憶變成看得懂的東西",
    subtitle: "Agent 的記憶不是字串 Map，而是可推導的物件狀態",
    source: "teaching-site/course-data.js u-4 / embabel documentation Blackboard",
    tags: ["Blackboard", "Binding", "World State"],
    keyPoints: ["Blackboard 保存 action 產物", "方法參數是 precondition", "回傳型別是 postcondition"],
    content: [
      "在 Embabel 裡，action 之間不是用魔法字串互傳資料，而是透過 Blackboard 保存物件。當某個 action 回傳 ActivitySummary，Blackboard 就多了一個 ActivitySummary；下一個需要 ActivitySummary 參數的 action 才有機會被 planner 選中。",
      "這種 type-driven binding 是 JVM 生態的優勢。Java record、class 與方法簽章不只是程式碼，也成為 agent planning 的資料邊界。你不需要在 prompt 裡描述『下一步要拿上一步的摘要』，因為方法簽章已經說清楚了。",
      "設計時要避免把所有東西塞進 Map<String,Object>。那會讓 planner 看不到真正條件，也讓測試失去型別資訊。好的 Embabel agent 應該把重要中間結果設計成明確的 domain record。"
    ],
    exercise: "把 CustomerQuery、TravellerActivity、ActivitySummary、OfferDraft、ReviewedOffer 寫成資料邊界清單，標註它們由哪個 action 產生。"
  },
  {
    theme: "embabel",
    title: "用名字和標籤把流程說清楚",
    subtitle: "@Agent、@Action、@AchievesGoal 的工程語意",
    source: "teaching-site/course-data.js u-3 / skills/embabel-spring-ai-dev references",
    tags: ["Java Record", "@Action", "@Agent"],
    keyPoints: ["record 是資料邊界", "annotation 宣告能力", "方法簽章就是流程約束"],
    content: [
      "Embabel 的開發體驗很接近 Spring 團隊熟悉的風格：用 annotation 宣告元件，用方法簽章描述能力，用 record 定義資料。@Agent 標示一組能力，@Action 標示可被 planner 使用的步驟，@AchievesGoal 標示終端目標。",
      "最重要的是不要把 action 寫成『萬用 execute(String input)』。這樣雖然能跑，但 planner 無法理解中間狀態。更好的做法是讓每個 action 的參數與回傳值都具體化，例如 `ActivitySummary summarize(TravellerActivity activity)`。",
      "這種設計讓測試也自然切開。純 Java action 可以直接單元測試；LLM action 可以測 prompt 組裝、模型角色與工具暴露；整條 flow 可以用 input-to-goal 的整合測試驗證。"
    ],
    exercise: "用 5 個 record 與 4 個 action 寫出 CustomerCareAgent 的骨架，不需要先接真模型，先讓型別流動清楚。"
  },
  {
    theme: "embabel",
    title: "交給流程引擎去跑",
    subtitle: "從使用者輸入到 goal output 的生命周期",
    source: "teaching-site/course-data.js u-4 / embabel docs AgentProcess",
    tags: ["AgentProcess", "Lifecycle", "Replanning"],
    keyPoints: ["Process 保存輸入、計畫與事件", "每步後重新檢查 blackboard", "失敗點可被解釋"],
    content: [
      "AgentProcess 是一次 agent 任務的容器。它包含使用者輸入、初始 facts、目標、候選 actions、目前 plan、Blackboard、事件與終止狀態。當你要除錯 agent 為什麼走某條路時，AgentProcess 是最重要的觀察對象。",
      "Embabel 的流程不是一次排完就盲目跑到底。每個 action 執行後，Blackboard 狀態會更新，planner 可以根據新狀態重新規劃。這就是教學站中提到的 OODA loop：Observe、Orient、Decide、Act。",
      "這種設計讓錯誤恢復變得具體。如果 fetchActivity 找不到客戶，流程不會假裝摘要；如果 reviewOffer 擋下草稿，系統可以改走重新生成或人工審核。每個停點都有條件可解釋。"
    ],
    exercise: "寫一份 AgentProcess 執行軌跡表：每列包含 action、輸入物件、輸出物件、Blackboard 新增內容與可能的 replanning。"
  },
  {
    theme: "embabel",
    title: "計畫趕不上變化時怎麼辦",
    subtitle: "計畫趕不上變化時，重新規劃比硬寫降級流程更穩",
    source: "source/Embabel進階用法.md / teaching-site/course-data.js u-4",
    tags: ["OODA", "Replanning", "Failure Handling"],
    keyPoints: ["觀察 blackboard", "重新計算可行路徑", "把失敗變成狀態變化"],
    content: [
      "傳統 pipeline 最怕中途變化：API 掛了、資料缺失、模型超時、審核不通過。開發者通常會開始寫一串 try-catch 與 fallback if-else，最後流程變得難讀也難測。",
      "Embabel 的 replanning 觀念是把變化回寫成狀態。當某個 action 失敗，或某條路成本突然升高，planner 可以從目前 Blackboard 重新尋找可行路徑。你不需要預先把所有降級順序硬編進主流程。",
      "OODA loop 的價值在這裡很明顯：觀察目前狀態、理解變化、重新決策、執行下一步。對企業流程而言，這讓 agent 更像一個受控流程引擎，而不是一個只會一直重試的聊天機器人。"
    ],
    exercise: "為客服案例設計 3 個失敗事件：資料查無、優惠草稿違規、模型超時。逐一寫出 replanning 後應該走哪條路。"
  },
  {
    theme: "embabel",
    title: "先把家門口整理好",
    subtitle: "Embabel 實戰先從相容性開始",
    source: "teaching-site README / skill embabel-spring-ai-dev experience",
    tags: ["Spring Boot", "Java 21", "Maven"],
    keyPoints: ["Embabel 0.4.0 目前落在 Boot 3.5.x", "Java 21 是基準", "不要自行亂疊 Spring AI BOM"],
    content: [
      "教學站目前已明確標註版本現況：已發佈的 Embabel 0.4.0 建構於 Spring Boot 3.5.x 與 Spring AI 1.1.x，尚不支援 Spring Boot 4。這種資訊要在系列中提早說清楚，否則讀者很容易第一天就踩到啟動錯誤。",
      "實務上，第一個 Embabel 專案應該先固定 Java 21、Spring Boot 3.5.x、Embabel starter，並確認 OPENAI_API_KEY 或替代 provider 設定。Spring AI 多半由 Embabel starter 傳遞帶入，不要一開始就自行覆寫 BOM，除非你清楚知道二進位相容性。",
      "在 Windows 環境還要特別注意 JAVA_HOME。很多機器 shell 預設仍指向 Java 8，Maven compile 或 Spring context 啟動會出現看似奇怪的錯。環境檢查腳本比直接寫程式更重要。"
    ],
    exercise: "寫一份 PowerShell 環境檢查清單：Java 版本、Maven 版本、OPENAI_API_KEY、模型設定、Spring Boot 與 Embabel 版本。"
  },
  {
    theme: "embabel",
    title: "讓模型選擇變成設定",
    subtitle: "不要把模型名稱散落在 prompt 與 action 裡",
    source: "teaching-site/course-data.js u-5 / embabel docs LlmOptions",
    tags: ["PromptRunner", "LlmOptions", "LLM Mixing"],
    keyPoints: ["不同 action 可用不同模型", "模型角色應集中設定", "小模型適合 render 或分類"],
    content: [
      "Embabel 的一個重要優勢是 action 粒度夠小，因此每個 action 可以依任務選模型。摘要與判斷可能需要較強模型，分類與格式化可以用較快較便宜的模型，純 Java render action 則根本不需要模型。",
      "LlmOptions 應該被視為工程設定，而不是 prompt 裡的一句話。模型、temperature、token 限制、成本策略都應該集中管理，方便在測試、開發與生產環境切換。",
      "這點到了 generative UI 會更重要。當後端需要產生 UI spec 時，我們會把資料陣列交給 Java deterministic render，只把敘事文字交給 LLM。模型的任務邊界越清楚，越不容易出現空表格、數字竄改或 JSON 破碎。"
    ],
    exercise: "把你的 action 分成三類：必須強模型、可用小模型、不需要模型。為每類寫出 LlmOptions 管理策略。"
  },
  {
    theme: "embabel",
    title: "不是每件事都能馬上做",
    subtitle: "不是每個 action 在任何狀態都應該開放",
    source: "skills/embabel-spring-ai-dev/references/conditions-and-guardrails.md",
    tags: ["@Condition", "SpEL", "Guardrails"],
    keyPoints: ["Condition 是顯式前置條件", "SpEL 可做動態條件", "條件比 prompt 約束更可測"],
    content: [
      "Preconditions 不只來自型別，也可以來自顯式條件。當 action 需要滿足業務狀態、權限、設定開關或資料內容時，@Condition 與 SpEL 可以讓 planner 在規劃階段就知道某些 action 目前不可用。",
      "這比在 prompt 裡寫『如果不符合條件就不要做』更可靠。Prompt 是模型指令，Condition 是工程約束；前者可能被忽略，後者可以被測試，也能在流程圖與稽核資料中被看見。",
      "設計上要避免條件散落在 action 內部才爆錯。若某個 action 本來就不該被選中，就把條件往規劃層拉。讓 planner 少走錯路，比事後用例外修流程更乾淨。"
    ],
    exercise: "為 reviewOffer 加上條件設計：哪些情況可以審核？哪些情況必須先補資料或走人工？"
  },
  {
    theme: "embabel",
    title: "讓工具幫你做該做的事",
    subtitle: "金額、次數、規則由 Java 算，LLM 負責敘事",
    source: "teaching-site/course-data.js u-6 / embabel docs Domain Objects",
    tags: ["@Tool", "Domain Object", "Deterministic"],
    keyPoints: ["Domain object 可暴露行為", "最小工具暴露", "避免 LLM 心算數值"],
    content: [
      "好的 agentic system 不應該把所有資料塞進 prompt 後要求 LLM 自己計算。以 TravellerActivity 為例，總消費、旅遊次數、是否高消費，這些應由 Java domain object 或 service 計算，再透過工具方法暴露給 LLM。",
      "這就是 domain tool 的價值。LLM 不需要知道資料庫細節，也不需要重算金額；它只需要在適當情境呼叫工具，取得準確數字後用自然語言整理結果。",
      "但工具暴露要克制。不要把整個 service 全開給模型，也不要暴露能改資料的危險方法。每個 LLM action 只拿它需要的最小工具集，這是安全、測試與成本控制的共同基礎。"
    ],
    exercise: "為 TravellerActivity 設計 3 個可暴露給 LLM 的 @Tool 方法，並列出 3 個不該暴露的方法。"
  },
  {
    theme: "embabel",
    title: "把工作分給對的人",
    subtitle: "工具不是越多越好，重點是邊界是否正確",
    source: "teaching-site/course-data.js u-6 / advanced-features.md",
    tags: ["MCP", "Subagent", "Agentic Tool"],
    keyPoints: ["Domain tool 用於本地物件", "MCP 用於跨系統工具", "Subagent 用於可委派的專門能力"],
    content: [
      "當工具越來越多，真正的問題不是怎麼全部接上，而是怎麼分類。Domain tool 適合本地 domain object 的精準行為；MCP 適合跨應用、跨語言、可重用的工具；Subagent 則適合把一段專門能力封裝成另一個 agent。",
      "Agentic Tool 更進一步，工具內部本身也可能需要 LLM 推理。這在複雜查詢、資料探索或多步工具操作時有用，但也會增加成本與不可預測性，因此要搭配 observability 與 guardrail。",
      "本系列後面接 generative UI 時，這個分類仍然成立：後端 agent 可以用 MCP 或 subagent 拿資料，但最後輸出的 UI spec 必須遵守前端可渲染的 catalog contract。"
    ],
    exercise: "把你系統中的外部能力分成 domain tool、MCP tool、subagent 三類，並說明每類的安全邊界。"
  },
  {
    theme: "embabel",
    title: "需要資料時再去找",
    subtitle: "讓 Agent 依推理需求決定何時搜尋文件",
    source: "teaching-site/course-data.js u-7 / embabel docs RAG",
    tags: ["Agentic RAG", "ToolishRag", "Retrieval"],
    keyPoints: ["傳統 RAG 是固定 pipeline", "Agentic RAG 把搜尋變成工具", "文件檢索也需要稽核"],
    content: [
      "傳統 RAG 常見流程是先檢索再生成：使用者問問題，系統先查向量庫，把片段塞進 prompt，再請模型回答。這對 FAQ 類型問題有效，但對多步流程不一定夠。",
      "Agentic RAG 的想法是把檢索能力變成工具，讓 LLM 在 action 內根據推理需求決定何時搜、搜什麼、搜幾次。以旅遊政策為例，只有 proposeOffer 或 reviewOffer 需要政策依據時才查，不必每個流程都先塞一堆文件。",
      "但越動態就越需要稽核。你要記錄查了哪些關鍵字、拿到哪些文件、引用到哪個段落、最後如何影響 action output。否則 RAG 只會從『查不到』變成『不知道怎麼查到的』。"
    ],
    exercise: "設計一個政策文件 RAG action：列出可搜尋欄位、工具輸入、工具輸出，以及 ActionAudit 要記錄的內容。"
  },
  {
    theme: "embabel",
    title: "讓每一步都能回頭看",
    subtitle: "生產環境不是只看最終答案，而是看每一步的證據",
    source: "teaching-site/course-data.js u-7 u-8 / observability references",
    tags: ["ActionAudit", "Observability", "Cost"],
    keyPoints: ["記錄 action input/output", "記錄 LLM call 與 tool call", "費用與 token 是營運資料"],
    content: [
      "企業導入 AI 最常遇到的追問不是『它答得像不像人』，而是『它為什麼這樣答』。如果優惠方案發錯、摘要漏掉重要客訴、政策判讀錯誤，團隊需要回溯每個 action 的輸入、輸出、prompt、工具呼叫與模型資訊。",
      "ActionAudit 的價值就是把 agent flow 變成可檢查的工程事件。每一步不是黑盒，而是一段有時間、有成本、有資料依據的執行紀錄。",
      "到了前端 generative UI，observability 也會成為使用者體驗的一部分。不是只顯示最後 dashboard，而是讓使用者看到 agent 正在做意圖判斷、規劃、執行哪個 action、花了多少 token。"
    ],
    exercise: "設計一份 ActionAudit JSON 範例，至少包含 actionName、inputType、outputType、model、toolCalls、durationMs、cost。"
  },
  {
    theme: "embabel",
    title: "測試不要只看結果長什麼樣",
    subtitle: "測 prompt 組裝、工具暴露與 guardrail，而不是測文案一字不差",
    source: "teaching-site/course-data.js u-8 / testing-and-troubleshooting.md",
    tags: ["Testing", "PromptRunner", "Guardrails"],
    keyPoints: ["純 Java action 用單元測試", "LLM action 測 prompt 與工具", "整合測試看 input-to-goal"],
    content: [
      "測試 Gen AI 應用時，一個常見錯誤是期待模型每次輸出完全相同。這不符合 LLM 的特性，也會讓測試脆弱。更合理的測法是檢查 prompt 組裝是否帶齊資料、是否使用正確模型角色、是否暴露正確工具與 guardrail。",
      "純 Java action 還是用一般單元測試。fetchActivity、reviewOffer、成本計算、資料轉換都應該 deterministic。LLM action 則測邊界：有沒有把 TravellerActivity 放入 prompt、有沒有掛 withToolObject、有沒有保留折扣上限與審核要求。",
      "整條 flow 的測試則看從輸入到 goal output 是否能完成，並檢查中間 ActionAudit 是否存在。測試策略反映了本系列主張：讓不可預測的語言能力只待在小範圍內。"
    ],
    exercise: "為 summarize action 寫一份測試清單：prompt 必含欄位、暴露工具、模型角色、guardrail、預期 output type。"
  },
  {
    theme: "embabel",
    title: "有些流程就是要等人",
    subtitle: "當流程不是線性一次完成，就要進入狀態設計",
    source: "teaching-site/course-data.js u-9 / states-and-loops.md",
    tags: ["@State", "Human-in-the-Loop", "Chatbot"],
    keyPoints: ["State 可表達迴圈狀態", "WaitFor 可等待人工輸入", "Chatbot 需要跨訊息狀態"],
    content: [
      "不是所有 agent flow 都是輸入一次、輸出一次。文件審核、方案修改、客服對話、主管補件，都可能需要等待人類回覆，再回到流程中繼續。",
      "Embabel 的 @State 與 WaitFor 概念就是為這類流程準備的。State 讓流程可以保留在某個互動階段，WaitFor 則讓 agent 等待表單、人工確認或下一則訊息，而不是硬把所有決策一次完成。",
      "這個主題適合放在系列中段偏後，因為讀者已經理解 GOAP、Blackboard 與 action flow。此時再談 chatbot 模式，會更容易分清楚：多輪對話不是讓模型亂聊，而是把對話事件納入受控狀態機。"
    ],
    exercise: "設計一個 OfferDraft 需要人工審核的流程：哪些狀態要保留？人工回覆後如何回到 planner？"
  },
  {
    theme: "embabel",
    title: "多條路一起走",
    subtitle: "當單一路徑不夠用，開始考慮 Utility、Hybrid、Scatter-Gather",
    source: "advanced-features.md / embabel docs planners and execution modes",
    tags: ["Planner", "Concurrent", "Multi-Agent"],
    keyPoints: ["Planner 可依情境選擇", "並行適合獨立子任務", "融合結果需要明確輸出型別"],
    content: [
      "Embabel 官方文件與技能參考中還有多個進階題目：不同 planner、並行 execution mode、Scatter-Gather、Consensus、多 agent 融合。這些不一定是第一個專案需要的能力，但適合在鐵人賽中挑一篇整理，讓讀者知道往後可以怎麼擴充。",
      "並行模式適合彼此獨立的子任務，例如同時分析多個客戶、同時查多個資料源、同時產生多個候選方案。但並行不是萬靈丹，因為融合結果、成本累計、錯誤處理與 audit 都會更複雜。",
      "多 agent 編排時，輸出型別要特別清楚。若每個子 agent 都吐相同或模糊型別，Autonomy 可能不知道該用哪個目標收斂。工程上要用明確 record 表示 SubResult、FusedResult 或 FinalDashboard。"
    ],
    exercise: "把一個『比較 3 個客戶』的需求拆成 3 個子分析與 1 個融合 action，列出每個輸出型別。"
  },
  {
    theme: "json",
    title: "讓資料自己變成畫面",
    subtitle: "讓 AI 不只生成文字，也決定資料該用什麼元件呈現",
    source: "skills/embabel-generative-ui/SKILL.md",
    tags: ["Generative UI", "json-render", "Dashboard"],
    keyPoints: ["後端產生 UI spec", "前端依 registry 渲染", "使用者看到的是動態 dashboard"],
    content: [
      "前 20 天我們談的是 Embabel 後端如何規劃、執行、稽核。接下來的問題是：agent 最後產出的結果要怎麼給使用者看？如果永遠只是回一段文字，很多企業資料其實被浪費了。",
      "embabel-generative-ui 的主張是讓後端 agent 產生 UI spec。使用者輸入自然語言，後端分析意圖與資料，決定要用 MetricCard、DataTable、BarChart、Alert 或 Stack，再輸出一份 JSON spec 給前端渲染。",
      "這不是讓 LLM 寫 React code。前端仍然只渲染白名單 registry 裡的元件；後端只能產生受約束的 JSON。AI 決定的是『資料適合用什麼元件呈現』，不是直接取得執行任意前端程式碼的能力。"
    ],
    exercise: "挑一份客戶資料，設計它在 dashboard 上應該有的 5 種元件：指標、表格、圖表、摘要與警示。"
  },
  {
    theme: "json",
    title: "先把畫面骨架搭起來",
    subtitle: "不是巢狀 JSX，而是 root + elements map",
    source: "skills/embabel-generative-ui/references/spec-and-catalog.md",
    tags: ["JSON Spec", "Flat Tree", "Renderer"],
    keyPoints: ["頂層只有 root 與 elements", "children 是 key 字串陣列", "每個元素都有 type props children"],
    content: [
      "生成式 UI 的第一個硬規則是 spec 形狀。後端與前端必須共同接受一種格式：`{ root, elements }`。root 是根元素 key，elements 是 key 到 element 的 map。每個 element 包含 type、props、children。",
      "這裡最容易犯的錯是讓 LLM 產生巢狀 JSX 風格 JSON，例如 `{ layout, children: [{ component: ... }] }`。這看起來直覺，但不利於串流、修補、引用與 sanitize。",
      "Flat element tree 的好處是局部元素可以先出現、children 可以用 key 指向其他元素、前端可以在半截 JSON 時過濾不存在的 child ref。這個契約是後面所有漸進渲染與容錯的基礎。"
    ],
    exercise: "手寫一份最小 DashboardSpec：root 是 Stack，下面有 Heading、MetricCard、DataTable 三個元素。"
  },
  {
    theme: "json",
    title: "讓可用元件和可渲染元件對上",
    subtitle: "LLM 能用哪些元件，前端真的有沒有實作？",
    source: "skills/embabel-generative-ui/references/spec-and-catalog.md",
    tags: ["Catalog", "Registry", "Drift"],
    keyPoints: ["Catalog 約束 LLM", "Registry 負責真實渲染", "兩份清單要對帳"],
    content: [
      "動態 UI 的結構性弱點是：後端 catalog 與前端 registry 可能漂移。Catalog 告訴 LLM 可以使用哪些元件與 props；Registry 則是前端實際能渲染的 React 元件。兩者不同步時，LLM 可能產出前端不認得的元件。",
      "正確做法是把 catalog 當成資料契約管理。後端提供 `/api/catalog`，前端啟動時抓取並與本地 REGISTERED_COMPONENTS 比對。缺的元件不能讓整頁崩潰，而是用 Placeholder 呈現並在 console 或管理頁標示。",
      "新增元件時要走固定流程：後端 catalog 加定義、前端 componentMap 實作、registry 註冊、props schema 對齊、測試一份 spec。這比任由 LLM 猜元件名稱可靠得多。"
    ],
    exercise: "列一份第一版 catalog：Heading、Text、Stack、MetricCard、DataTable、BarChart、Alert，為每個元件寫 props schema。"
  },
  {
    theme: "json",
    title: "數字交給程式算",
    subtitle: "避免空表格、空圖與數字竄改",
    source: "skills/embabel-generative-ui/references/spec-and-catalog.md deterministic render",
    tags: ["Deterministic Render", "DataTable", "Chart"],
    keyPoints: ["rows/data 由 Java 組", "LLM 只產敘事文字", "混合 dashboard 也可走 Java render"],
    content: [
      "這是 embabel-generative-ui 技能最重要的鐵律：凡是資料陣列，DataTable rows、chart data、清單、排行，都應由後端 Java 確定性組進 spec，不要交給 LLM 重抄。",
      "原因很實際。LLM 在串流中產大型 JSON 陣列時，常會漏列、截斷、破壞格式，前端 sanitize 後就只剩空表格或空圖。更糟的是，LLM 可能把數字改寫成看似合理但其實錯誤的值。",
      "比較好的切法是 compute-then-compose：Java 負責查資料、算指標、組 rows/data；LLM 只負責 summary、risk、recommendation 這類敘事欄位。最後由純 Java render action 組成完整 DashboardSpec。"
    ],
    exercise: "把一份客戶清單 spec 分成 Java 必須組的 props 與 LLM 可以產的 props，標出原因。"
  },
  {
    theme: "json",
    title: "邊做邊看得到進度",
    subtitle: "POST body、進度事件、chunk 串流與半截 JSON 容錯",
    source: "skills/embabel-generative-ui/references/streaming-and-rendering.md",
    tags: ["SSE", "ReadableStream", "POST"],
    keyPoints: ["EventSource 不支援 POST body", "用 \\n\\n 切事件", "半截 JSON 需 lenientParse + sanitize"],
    content: [
      "Generative UI 通常不是一次回完整 JSON，而是邊跑 agent 邊推進度，最後逐段吐出 spec。這很適合 SSE，但前端不能直接用 EventSource，因為 EventSource 不支援 POST body，無法帶自然語言查詢與設定。",
      "技能建議用 fetch + ReadableStream 手動解析 SSE。每次讀取 chunk 後把 CRLF 正規化成 LF，用空行分隔事件，解析 event 與 data。status、intent、plan、step、chunk、complete、error 都可以走同一條連線。",
      "chunk 進來後不能假設 JSON 完整。前端要把字串累積到 jsonAccumulator，先用 lenientParseSpec 嘗試補閉合，再用 sanitizeSpec 補 `props:{}`、補 `children:[]`、過濾不存在的 child ref。這樣前端不只是等待結果，而是能安全顯示 agent 正在分析、規劃、執行哪一步。"
    ],
    exercise: "設計一份 SSE 事件表，並寫 3 個破碎 spec 範例，說明 sanitize 後應該保留哪些元素、丟棄哪些 child ref。"
  },
  {
    theme: "project",
    title: "先決定要看什麼",
    subtitle: "最後五天開始把兩個技能合成一個前後端專案",
    source: "embabel-spring-ai-dev + embabel-generative-ui skills",
    tags: ["Project", "Spec", "Full Stack"],
    keyPoints: ["先定義使用者問題", "再定義資料與元件", "最後才寫 agent"],
    content: [
      "最後五天的目標是完成一個最小但完整的前後端專案：使用者輸入自然語言，例如『列出高價值客戶並指出風險』，後端 Embabel agent 分析意圖、查資料、組 DashboardSpec，前端用 json-render 呈現。",
      "第一天先不要急著寫 code，而是定義產品規格。使用者有哪些查詢？系統有哪些資料？哪些結果應該用表格、圖表、指標卡、警示或文字摘要？哪些資料必須 deterministic？哪些文字可以由 LLM 生成？",
      "這一步會決定後面架構是否乾淨。若一開始沒有定義 catalog 與資料邊界，很容易變成後端亂吐 JSON、前端到處補例外。"
    ],
    exercise: "寫出專案 README 的 MVP 範圍：3 個自然語言查詢、5 個元件、3 種資料物件、1 條 SSE 成功流程。"
  },
  {
    theme: "project",
    title: "把資料整理成畫面",
    subtitle: "用 GOAP action 產生前端可渲染的 JSON UI spec",
    source: "skills/embabel-spring-ai-dev references + spec-and-catalog.md",
    tags: ["Backend", "DashboardSpec", "GOAP"],
    keyPoints: ["UserInput 到 ListQuery", "Java 查資料與算指標", "render action 純 Java 組 spec"],
    content: [
      "專案第二天落在後端。先定義 DashboardSpec record：root 與 elements；再定義 ElementSpec：type、props、children。這份型別是前後端契約，也是 agent terminal goal。",
      "GOAP flow 可以切成三段：extractParams 用 LLM 從自然語言擷取查詢條件；buildData 用 Java 查資料並計算指標；renderDashboard 用 Java 把資料與少量 LLM analysis 組成 flat element tree。",
      "重點是 render action 不一定要帶 Ai。只要前一步已經產生結構化分析，最後 render 可以是純 Java，這樣 rows、chart data、metric values 都精準，也更容易測試。"
    ],
    exercise: "建立 DashboardSpec / ElementSpec 型別草稿，並為一個『高價值客戶清單』查詢寫出 3 個 action 的輸入輸出。"
  },
  {
    theme: "project",
    title: "讓進度一路跑到前端",
    subtitle: "讓使用者看見 agent 正在規劃與執行",
    source: "streaming-and-rendering.md / observability-and-interaction.md",
    tags: ["SSE", "Controller", "Progress"],
    keyPoints: ["status / plan / step / chunk / complete", "全域 listener broker", "沒有即時 chunk 時補送完整 spec"],
    content: [
      "第三天處理 API 與串流。Controller 收 POST request，建立 SseEmitter，先送 status，再觸發 Embabel agent。當 planner 產生 plan、action 開始或完成時，透過 listener broker 轉成 SSE 事件。",
      "實作時有一個關鍵點：GOAP plan/action 生命週期事件走平台層全域 listener，不是每次 invocation 都自然拿得到。因此需要 active connection broker，把目前這條 SSE 連線掛上去，請求結束時務必 clear。",
      "如果 render action 是純 Java，可能沒有 token chunk。這時 Controller 可以把完整 spec 分段補送 chunk，前端仍用同一套 lenient/sanitize 流程處理。"
    ],
    exercise: "定義 Controller 串流流程圖，標出 try/finally 中哪些資源一定要清理。"
  },
  {
    theme: "project",
    title: "讓畫面慢慢長出來",
    subtitle: "把半截 spec 安全變成可看的 dashboard",
    source: "embabel-generative-ui references",
    tags: ["Frontend", "Renderer", "Registry"],
    keyPoints: ["componentMap 白名單", "unknown component fallback", "partial spec 不崩潰"],
    content: [
      "第四天做前端。先建立 componentMap：Heading、Text、Stack、MetricCard、DataTable、BarChart、Alert。再建立 registry，讓 Renderer 只能使用這些受控元件。",
      "串流 hook 會處理 fetch、ReadableStream、SSE parser、jsonAccumulator、lenientParseSpec、sanitizeSpec。每次成功得到 partial spec，就更新畫面；失敗就保留上一個畫面與進度面板。",
      "前端還要做 catalog consistency check。若後端 catalog 有元件但前端未實作，不能讓整頁爆掉。未知元件應該變成 Placeholder，並在管理頁或 console 顯示缺口。"
    ],
    exercise: "手寫一個 Renderer 測試 spec，刻意放入 UnknownWidget，確認畫面能顯示 fallback 而不是白屏。"
  },
  {
    theme: "project",
    title: "收尾，讓它真的能用",
    subtitle: "從一次生成走向可探索的資料應用",
    source: "observability-and-interaction.md / testing references",
    tags: ["Drill Down", "Testing", "Finish"],
    keyPoints: ["drillTemplate 由後端資料決定", "busy 時避免重入", "用測試守住契約"],
    content: [
      "最後一天把 dashboard 從靜態結果變成可探索應用。DataTable row 可以帶 drillTemplate，例如 `{公司} 這個客戶的綜合分析`。使用者點列後，前端把 row 值代入模板，再呼叫同一條 generate 流程。",
      "這裡的好處是前端不用硬編業務邏輯。要鑽到哪裡由後端 spec 決定，前端只提供通用 onDrill callback。busy 時要停用點擊，避免同時觸發多條 SSE。",
      "系列收束時，要把測試也補上：後端測 DashboardSpec shape、資料陣列是否 deterministic；前端測 sanitize、unknown component、SSE parser；整合測試跑一次自然語言查詢到畫面渲染。這才是從技能走到專案的閉環。"
    ],
    exercise: "完成一份驗收清單：3 個查詢都能回 DashboardSpec、前端無 404/白屏、進度事件可見、下鑽可再生成。"
  }
];

const palettes = {
  series: ["#0f172a", "#2563eb", "#0ea5e9", "#f8fafc"],
  embabel: ["#172554", "#2563eb", "#16a34a", "#f8fafc"],
  json: ["#312e81", "#7c3aed", "#0e7490", "#faf5ff"],
  project: ["#1f2937", "#d97706", "#dc2626", "#fff7ed"]
};

/** 將 XML 特殊字元轉義，避免 SVG 文字破壞結構。 */
function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** 以固定字數粗略切行，讓 SVG 標題與重點不超出 16:9 畫布。 */
function wrapText(value, max = 22) {
  const chars = Array.from(value);
  const lines = [];
  for (let i = 0; i < chars.length; i += max) {
    lines.push(chars.slice(i, i + max).join(""));
  }
  return lines;
}

/** 依文章天數補上程式碼段，讓每天都有可直接引用的官方風格範例。 */
function buildCodeSection(index) {
  if (index === 1) {
    return `## 程式碼補充

Day 01 只用兩段最小範例，把「流程在後端、畫面在前端、模型只在邊界內活動」這件事說清楚。

### Embabel 先把流程收進可控邊界

- action 只做一件事
- 方法簽章就是資料邊界
- goal 代表最後要達成的結果

\`\`\`java
@Agent(description = "Handle a travel inquiry with bounded AI steps")
public class TravelInquiryAgent {

    @Action
    public TripFacts collect(TripRequest request) {
        return travelService.findFacts(request);
    }

    @Action
    public TravelSummary summarize(TripFacts facts) {
        return summarizer.createSummary(facts);
    }

    @AchievesGoal(description = "Produce a safe UI spec for the frontend")
    @Action
    public DashboardSpec buildUi(TravelSummary summary) {
        return dashboardSpecFactory.fromSummary(summary);
    }
}
\`\`\`

### json-render 只讓 AI 產生受限 UI spec

- AI 可以選元件，但不能直接寫任意前端程式碼
- 前端只渲染白名單中的元件
- 產出的 JSON 保持在界線內，才方便檢查與升級

\`\`\`json
{
  "root": "dashboard",
  "elements": {
    "header": {
      "type": "PageHeader",
      "props": { "title": "Travel Overview" },
      "children": []
    },
    "summary": {
      "type": "StatCard",
      "props": { "label": "Trips", "value": "12" },
      "children": []
    }
  }
}
\`\`\`
`;
  }

  let title = "";
  let intro = "";
  let lang = "java";
  let body = "";
  let points = [];

  if (index >= 2 && index <= 5) {
    title = "用 annotation 宣告一個最小 Agent";
    intro = "這段對應官方文件的 @Agent / @Action / @AchievesGoal 寫法。重點不是語法炫技，而是把流程邊界說清楚。";
    body = `@Agent(description = "Find news based on a person's star sign")
public class HoroscopeAgent {

    @Action
    public StarSign findStarSign(UserInput input) {
        return new StarSign(input.text());
    }

    @Action
    public NewsArticle fetchNews(StarSign sign) {
        return newsService.findByStarSign(sign);
    }

    @AchievesGoal(description = "Write an amusing writeup based on horoscope and news")
    @Action
    public Writeup write(StarSign sign, NewsArticle article) {
        return new Writeup(sign.value(), article.headline());
    }
}`;
    points = ["每個 action 只做一件事", "參數是前置條件", "終端 action 代表 goal"];
    lang = "java";
  } else if (index >= 6 && index <= 10) {
    title = "讓 planner 看到成本、輸出與安全退出";
    intro = "A* 規劃最值得講的地方，就是成本不是裝飾。你可以讓主路徑便宜、備援路徑昂貴，planner 就會自然偏向正常路徑。";
    body = `@Agent(description = "Offer draft review")
public class OfferFlowAgent {

    @Action(cost = 0.2)
    public Summary summarizeFast(Dataset dataset, Ai ai) {
        return ai.withLlm("gpt-4o-mini").createObject("Summarize: " + dataset, Summary.class);
    }

    @Cost
    double processingCost(Dataset dataset) {
        return dataset.rows() > 1000 ? 0.1 : 0.9;
    }

    @Action(costMethod = "processingCost")
    public ReviewedOffer approve(OfferDraft draft, OfferPolicy policy) {
        policy.assertAllowed(draft);
        return new ReviewedOffer(draft.offer(), "approved");
    }
}`;
    points = ["靜態 cost 表達基本偏好", "動態 cost 可看資料量", "安全退出目標避免死迴圈"];
    lang = "java";
  } else if (index >= 11 && index <= 14) {
    title = "把模型選擇、條件與工具集中管理";
    intro = "Day 11 到 Day 14 要讓讀者看到：Spring Boot 啟動、LlmOptions、@Condition、@Tool 都是在同一套工程邊界內運作。";
    body = `@SpringBootApplication
@EnableConfigurationProperties(ActivitySummarizerProperties.class)
public class AntechinusApplication {
    public static void main(String[] args) {
        SpringApplication.run(AntechinusApplication.class, args);
    }
}

@Condition
boolean isHighSpender(TravellerActivity activity) {
    return activity.totalSpend() > 5000;
}

public record TravellerActivity(String name, Instant from, Instant to, List<Trip> trips) {
    @Tool(description = "Total travel spend in the selected period")
    public float totalSpend() {
        return trips.stream().map(Trip::amount).reduce(0f, Float::sum);
    }
}`;
    points = ["入口與設定分離", "Condition 是顯式布林前置條件", "@Tool 暴露 domain method 給 LLM"];
    lang = "java";
  } else if (index >= 15 && index <= 18) {
    title = "把檢索、觀測與測試拉到工程層";
    intro = "Day 15 到 Day 18 可以把 RAG、事件觀測與測試放在一起看。重點是所有能力都能回到同一條可驗證的流程。";
    body = `@Bean
McpToolExport ragTools(SearchOperations searchOperations) {
    var toolishRag = new ToolishRag("docs", "Embabel 文件", searchOperations);
    return McpToolExport.fromLlmReference(toolishRag);
}

public class OrganizationCostTracker implements AgenticEventListener {
    private final ConcurrentMap<String, DoubleAdder> costPerAgent = new ConcurrentHashMap<>();

    @Override
    public void onProcessEvent(AgenticEvent event) {
        if (event instanceof LlmInvocationEvent llm) {
            costPerAgent
                .computeIfAbsent(llm.getAgentProcess().getAgent().getName(), k -> new DoubleAdder())
                .add(llm.getInvocation().cost());
        }
    }
}`;
    points = ["RAG 也可以包成工具", "事件流可追蹤成本", "營運與稽核共用同一套資料"];
    lang = "java";
  } else if (index >= 19 && index <= 20) {
    title = "State、WaitFor 與 planner 模式一起看";
    intro = "Day 19 與 Day 20 正好適合放在一起：前者處理人機協作，後者處理 planner 與執行模式的選擇。";
    body = `@State
record AssessStory(UserInput userInput, Story story) implements Stage {

    @Action
    HumanFeedback getFeedback() {
        return WaitFor.formSubmission("Please provide feedback on the story", HumanFeedback.class);
    }

    @Action(clearBlackboard = true)
    Stage assess(HumanFeedback feedback, Ai ai) {
        var assessment = ai.withDefaultLlm().createObject(
            "Is this story acceptable? " + story.text(),
            AssessmentOfHumanFeedback.class);
        return assessment.acceptable()
            ? new Done(userInput, story)
            : new ReviseStory(userInput, story, feedback);
    }
}

@Agent(description = "Multi-step document processing", planner = PlannerType.SUPERVISOR)
public class DocumentAgent { }`;
    points = ["WaitFor 支援人機協作", "State 可保留流程上下文", "planner 可以顯式切換"];
    lang = "java";
  } else if (index >= 21 && index <= 25) {
    title = "flat spec、catalog 與漸進渲染";
    intro = "Day 21 到 Day 25 是 json-render 的核心：先把 UI 契約定成扁平結構，再處理 catalog、SSE 與漸進解析。";
    body = `public record DashboardSpec(String root, Map<String, ElementSpec> elements) {
    public record ElementSpec(String type, Map<String, Object> props, List<String> children) {}
}

DashboardSpec spec = new DashboardSpec(
    "root",
    Map.of(
        "root", new DashboardSpec.ElementSpec("Stack", Map.of("direction", "vertical"), List.of("title")),
        "title", new DashboardSpec.ElementSpec("Heading", Map.of("text", "客戶清單"), List.of())
    )
);`;
    points = ["root + elements 是扁平契約", "children 只放 key", "catalog 對帳與前端一致性在後續文章展開"];
    lang = "java";
  } else if (index >= 26 && index <= 30) {
    title = "專案收尾：參數、SSE、Renderer 與下鑽";
    intro = "最後五天把前後端串起來：自然語言先變成參數，再變成 DashboardSpec，最後由前端安全渲染與下鑽。";
    body = `export interface AnalysisParams {
  comparison: "month" | "quarter" | "year";
  periods: string[];
  tiers: string[];
  statuses: string[];
}

function onDrill(row: Record<string, string>) {
  if (busy) return;
  const query = drillTemplate.replace("{公司}", row.company);
  void generateDashboard(query);
}

test("unknown component falls back", () => {
  expect(renderNode({ type: "UnknownWidget", props: {}, children: [] })).toBeTruthy();
});`;
    points = ["先有分析參數，再有資料計算", "下鑽動作要避免重入", "測試要確認 fallback 與渲染契約"];
    lang = "ts";
  } else {
    return "";
  }

  const bulletLines = points.map((point) => `- ${point}`).join("\n");
  return `## 程式碼補充

${intro}

### ${title}

${bulletLines}

\`\`\`${lang}
${body}
\`\`\`
`;
}

/** 產生單日文章 Markdown，包含封面、摘要、每日內容與投稿檢查點。 */
function buildArticle(day, index) {
  const dayNo = String(index).padStart(2, "0");
  const paragraphs = day.content.map((p) => `${p}`).join("\n\n");
  const keyPointList = day.keyPoints.map((p) => `- ${p}`).join("\n");
  const tagLine = day.tags.map((tag) => `#${tag}`).join(" ");
  const codeSection = buildCodeSection(index);

  return `---
day: ${index}
title: "${day.title}"
subtitle: "${day.subtitle}"
source: "${day.source}"
cover: "./cover.png"
tags: [${day.tags.map((tag) => `"${tag}"`).join(", ")}]
---

![Day ${dayNo} 封面](./cover.png)

# Day ${dayNo}：${day.title}

${day.subtitle}

## 今天要解決的問題

${keyPointList}

## 內容

${paragraphs}

${codeSection}

## 今日實作 / 思考任務

${day.exercise}

## 可引用素材

- 主要來源：\`${day.source}\`
- 系列素材：${sourceNotes.map((source) => `\`${source}\``).join("、")}

## 發文備註

- 建議標籤：${tagLine}
- 封面圖：\`cover.png\` 為 image2 生成；若要重新生成，請參考 \`cover.prompt.md\`。
`;
}

/** 產生可交給 image2 或其他生圖工具的封面提示詞。 */
function buildPrompt(day, index) {
  return `請產生一張 16:9 橫幅封面圖，主題是「Day ${String(index).padStart(2, "0")}：${day.title}」。

視覺風格：
- 現代技術封面感，但更像章節海報，不像教學簡報
- 以「當天主題的意境」為主，不要把內容逐條畫出來
- 文字極少：只保留一個大標題與一行很短的副標，最多再加 1 個小標籤
- 大標題要用生活化說法，不要直接照搬技術名詞；優先用像「先把路鋪好」、「讓資料自己說話」、「把複雜變簡單」這種語氣
- 若需要保留技術詞，只能放在小角標或副標，不要當主標
- 不要把三個重點都寫在圖上，不要段落式文字，不要清單
- 主要畫面以象徵性場景、隱喻畫面、氛圍構圖為主
- 避免出現程式碼、API、JSON、流程圖、介面截圖等過度技術化元素
- 不要使用真實品牌 logo，不要人物臉部特寫

版面要求：
- 大標要非常醒目，置中或左上皆可
- 背景是主視覺，不是大量文字說明
- 留白要足夠，避免字擠滿整張圖

構圖方向：
- 直接根據當天標題與副標去找一個可視化比喻
- 若是「規劃 / 路線 / 走法」就用路徑、地圖、道路、指標牌
- 若是「狀態 / 等待 / 互動」就用舞台、對話窗、等候、轉場
- 若是「整合 / 專案 / 收束」就用拼圖、橋接、收束成一個完整場景

副標只保留一句話：${day.subtitle}
`;
}

/** 寫入 30 天資料夾、文章、封面與總覽索引。 */
async function main() {
  const workspaceRoot = process.cwd();
  if (!outputRoot.startsWith(`${workspaceRoot}${path.sep}`)) {
    throw new Error(`Refuse to clean output outside workspace: ${outputRoot}`);
  }
  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  const overviewRows = [];
  for (const [i, day] of days.entries()) {
    const n = i + 1;
    const dayNo = String(n).padStart(2, "0");
    const folder = path.join(outputRoot, `day${dayNo}`);
    await fs.mkdir(folder, { recursive: true });
    await fs.writeFile(path.join(folder, "article.md"), buildArticle(day, n), "utf8");
    await fs.writeFile(path.join(folder, "cover.prompt.md"), buildPrompt(day, n), "utf8");
    overviewRows.push(`| Day ${dayNo} | [${day.title}](./day${dayNo}/article.md) | ${day.subtitle} | ${day.theme} |`);
  }

  const overview = `# iThome 鐵人賽 30 天文章規劃

主題：Embabel 後端 Agent 技能 × json-render / embabel-generative-ui 前端技能，最後完成一個自然語言生成 Dashboard 的前後端專案。

## 系列分段

- Day 01-20：Embabel / Spring AI / JVM Agentic AI 後端觀念與進階能力。
- Day 21-25：embabel-generative-ui / json-render 前端契約、catalog、SSE、漸進渲染。
- Day 26-30：整合兩個技能，完成前後端專案設計、後端、串流、前端與驗收。

## 每日目錄

| Day | 標題 | 摘要 | 分類 |
|---|---|---|---|
${overviewRows.join("\n")}

## 素材來源

${sourceNotes.map((source) => `- \`${source}\``).join("\n")}
`;
  await fs.writeFile(path.join(outputRoot, "README.md"), overview, "utf8");
}

await main();
