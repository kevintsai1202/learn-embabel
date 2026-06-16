// course-data.js — Embabel on Spring Boot 教學網站的唯一資料權威
// 版本現況（2026-06）：Embabel 建構於 Spring Boot + Spring AI，即將支援 Spring AI 2
//
// 規則：
//   - day key（day1）必須對應 meta.days[].id
//   - unit.id 與 task.id 是 localStorage 鍵，發布後絕不改名
//     （task id 保留歷史前綴 d1-/d2-，與單元編號解耦，勿對齊重編）
//   - 每個 unit 必須有 illustrations[]（1–3 張，PNG-only）
//   - 每個 unit 必須有：貫穿案例 concept（Antechinus Travel）+ prompts[]（AI 輔助開發提示詞）
//   - quiz 為 append-only

window.COURSE = {

  // ============================================================
  // meta — 課程整體資訊（來源：course-package/overview.md）
  // ============================================================
  meta: {
    title: 'Embabel on Spring Boot',
    subtitle: '把 agentic AI 放進 JVM 既有工程邊界：GOAP 規劃、type-driven flow 與可測試的 agent 系統（單日課程）',
    program: 'JVM Agentic AI 內訓課程',
    organizer: '專案維護者',
    dates: '自學或內訓皆可',
    location: '線上或公司內訓環境',
    format: '1 天 × 6 小時',
    instructor: '凱文大叔',
    completion: [
      '完成每個單元的操作任務',
      '結訓測驗 8 題（GOAP、A* 演算法與權重、Action/Goal、Blackboard、Spring Boot starter、工具分工、RAG與稽核、測試）'
    ],
    objectives: [
      '能夠說明 Embabel 與一般 LLM tool-calling / pipeline 的差異',
      '能夠用 GOAP、Action、Goal、Blackboard 描述 Embabel 的執行模型',
      '能夠用 Java record 與 annotation 設計一個 type-driven agent flow',
      '能夠在 Spring Boot / Java 21 專案中安排 Embabel starter、模型角色與測試邊界',
      '能夠判斷 domain tool、MCP、Agentic RAG 在系統中的分工與配置',
      '能夠說明 Agentic RAG 的動態檢索與 ActionAudit 稽核機制的運作原理',
      '能夠用 AI 輔助提示詞加速 Embabel agent 的設計與開發'
    ],
    days: [
      { id: 'day1', n: 1, title: 'Embabel 心智模型到 Spring Boot 落地', hours: 6 }
    ]
  },

  // ============================================================
  // instructor — 講師介紹（顯示於網站最前面；內容參考 ai-workshop 站
  // 的 instructor-data.js，來源：YouTube @pg-kt 頻道資料 2026-05）
  // 頭像：assets/instructor-avatar.png
  // ============================================================
  instructor: {
    name: '凱文大叔AI程式設計教室',
    handle: '@pg-kt',
    url: 'https://www.youtube.com/@pg-kt',
    avatar: 'assets/instructor-avatar.png',
    subscriberCount: '1.41萬',
    bio: '擁有超過 20 年的 Java 開發經驗，對 Java 生態系統了如指掌，擅長使用 Spring Boot 框架開發高效穩定的系統。除了全職軟體工程師的角色，也在 Amazing Talker 擔任程式語言講師，透過深入淺出的教學方式，幫助學員快速掌握技術。'
  },

  // ============================================================
  // sharedCase — 貫穿案例（來源：course-package/shared-scenario.md）
  // 每個單元都有「案例實作」concept，從同一條流程逐步推進
  // ============================================================
  sharedCase: {
    // 案例資訊圖（assets/ 下的手繪資訊圖，中文檔名由渲染器 URL-encode）
    goalImage: { file: '情境目標.png', caption: '情境目標詳情圖：案例背景、客服開啟帳戶看到什麼、系統希望產生的結果與情境目標' },
    flowImage: { file: '業務流程.png', caption: '業務流程圖：讀取資料 → 取用既有工具 → AI 整理摘要 → 標記客戶 → 產生方案 → 人工審核 → 回寫 CRM' },
    intro: 'Antechinus Travel 是一家旅遊公司（案例取自 Embabel 官方文章 Ground Your AI Transformation on What Works Today）。客服與行銷團隊希望：客服人員開啟客戶帳戶時，立即看到 AI 產生的活動摘要——標出高消費客戶（high spender）與常旅客（frequent traveler），並產生個人化服務方案（升等、優惠）供審核後回寫 CRM。公司不希望把 CRM、訂單與行銷流程交給單一 LLM 自由發揮：金額與次數必須由既有 domain object 的 @LlmTool 方法提供準確數字（不靠 LLM 心算）、優惠發放需要審核、每一步要可追蹤。本案例貫穿全部 9 個單元：u-1 評估場景 → u-2 拆 GOAP → u-3 建專案並定義 record / action → u-4 走一遍 runtime → u-5 進階配置 → u-6 接工具 → u-7 RAG 與稽核 → u-8 測試上線 → u-9 整合驗收。',
    dataShapes: [
      ['CustomerQuery', '客服人員的查詢請求，例如「客戶 4711 的近一年活動」'],
      ['TravellerActivity', '既有報表服務回傳的旅遊活動（trips 清單；@LlmTool 提供 totalSpend、tripsPerYear 等準確數字）'],
      ['ActivitySummary', 'LLM 產生的活動摘要，標出高消費 / 常旅客等重點'],
      ['OfferDraft', 'LLM 產生的個人化方案草稿（升等、優惠）'],
      ['ReviewedOffer', '經過規則檢查或強模型審核後可發送的方案'],
      ['ActionAudit', '每一步 action 的輸入、輸出、模型與工具資訊']
    ]
  },

  // ============================================================
  // day1 — 單日課程（9 個單元）
  // ============================================================
  day1: {
    id: 'day1',
    title: 'Embabel on Spring Boot：心智模型到落地（單日）',
    hours: '6 小時',
    learningGoal: '上午建立心智模型並動手建立可執行專案：控制權邊界、GOAP、最小專案建置、type-driven flow 與 runtime；下午深化落地：進階配置、工具分工、RAG 與稽核、測試與維運。全程以 Antechinus Travel 客戶活動摘要案例貫穿，每單元附 AI 輔助開發提示詞。',
    schedule: [
      ['09:00 – 09:35', 'u-1 為什麼 Java 團隊需要 Embabel', '工程邊界、三框架比較、案例場景評估'],
      ['09:35 – 10:25', 'u-2 GOAP：可解釋規劃手法', 'world state、pre/post conditions、案例拆 action'],
      ['10:35 – 11:15', 'u-3 建立專案並定義 Type-Driven Flow', '最小專案建置、@Agent、@Action、案例 record 設計'],
      ['11:15 – 12:00', 'u-4 AgentProcess、Blackboard 與 Replanning', '案例的一次執行軌跡與 replanning'],
      ['12:00 – 13:00', '午休', ''],
      ['13:00 – 13:40', 'u-5 Spring Boot 進階配置', 'starter 依賴規劃、權重設定、@ConfigurationProperties'],
      ['13:40 – 14:25', 'u-6 Tool 與 MCP 怎麼分工', '案例的 @LlmTool 統計、domain tool vs MCP 決策'],
      ['14:35 – 15:15', 'u-7 Agentic RAG 與 ActionAudit 稽核', '案例的政策文件 RAG 接入與 ActionAudit 稽核'],
      ['15:15 – 15:45', 'u-8 測試與可維運性', '案例的 prompt 測試、action 測試與觀測'],
      ['15:45 – 16:10', 'u-9 課程結訓與整合', '完課概念整合與結訓測驗驗收']
    ],
    units: [
      // ──────────────────────────────────────────────
      {
        id: 'u-1',
        title: 'u-1 為什麼 Java 團隊需要 Embabel',
        time: '09:00 – 09:35',
        goals: [
          '能說明 Embabel 不是單純聊天 API，而是把 agent flow 放回 JVM 工程邊界',
          '能說明 Spring AI、spring-ai-agent-utils 與 Embabel 的分層與路線差異',
          '能評估自己公司哪些營運場景適合 agent 化'
        ],
        concepts: [
          {
            heading: 'Embabel 的由來：Spring 之父的新挑戰',
            body: 'Embabel 由 **Rod Johnson** 創立——他正是 Spring Framework 的創始人。二十多年前他用 Spring 改變了 Java 企業開發的方式；現在他看到同樣的問題在 AI 領域重演：全球超過 70% 的生產系統跑在 JVM 上，但主流的 agentic AI 框架（LangChain、AutoGen）都以 Python 為主，讓 Java 團隊被迫在「重寫系統」和「放棄 AI」之間二選一。Embabel 的動機就是**讓 AI 直接融入既有的 JVM 企業系統——擴展它們的價值，而非取代它們**。',
            list: [
              ['創始人', 'Rod Johnson（Spring Framework 創始人）'],
              ['核心團隊', 'Rod Johnson、Alex Hein-Heifetz、Dr. Igor Dayen、Arjen Poutsma、Jasper Blues'],
              ['公司', 'Embabel Pty, Ltd（2024 年成立）'],
              ['開發動機', '把 agentic AI 帶進 JVM 生態——用熟悉的 Spring 方式開發 agent，而非另起爐灶用 Python'],
              ['核心主張', '「演算法管邏輯，LLM 管溝通，權重管偏好」——大局規劃交給 GOAP，不讓 LLM 自由決定整條流程']
            ],
            note: '延伸閱讀：Rod Johnson 的兩篇關鍵文章——[Embabel: A New Agent Platform For The JVM](https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014) 說明為什麼 JVM 需要自己的 agent 框架；[The Embabel Vision](https://medium.com/@springrod/the-embabel-vision-967654f13793) 描繪 Embabel 的長期願景。'
          },
          {
            heading: '把模型放進既有工程邊界',
            body: '企業 Java 團隊已經有穩定的 domain model、Spring service、資料庫、權限與測試流程。Agentic AI 的問題不是「能不能呼叫模型」，而是「如何把模型放進既有工程邊界」。如果只把所有工具交給 LLM，流程選擇、錯誤恢復與資料安全會變得難以解釋。Embabel 讓開發者用熟悉的 Java / Spring 方式定義 action、goal 與 domain object：LLM 可以在 action 裡做局部生成、分類或判斷，但 action chain 的選擇由 planner 根據條件推導。',
            illustration: 'day1-u1-boundary'
          },
          {
            heading: 'Spring AI vs spring-ai-agent-utils vs Embabel',
            image: { file: '三框架比較.png', caption: '三框架比較圖：同一生態系、不同層次與路線——關鍵差異是「誰決定下一步」（開發者 / LLM / Planner）' },
            body: '三者是同一個生態系的不同層次與路線。Spring AI 解決「讓程序能呼叫 LLM」的低層基礎設施（ChatClient、@LlmTool、MCP 協定、VectorStore）；[spring-ai-agent-utils](https://github.com/spring-ai-community/spring-ai-agent-utils) 是 Spring AI Community 的擴展函式庫，把 Claude Code 風格的工具帶進 ChatClient（FileSystem/Shell/Grep 工具、Skills 知識模組、AutoMemory 記憶、子代理），**agent 行為由 LLM 在迴圈中自主決定**；Embabel 則**建構在 Spring AI 之上**，由 **GOAP planner 依條件推導 action chain**——Rod Johnson 的說法是「更像 server 而不只是 framework」。三者的關鍵差異是「誰決定下一步」。',
            table: {
              head: ['面向', 'Spring AI', 'spring-ai-agent-utils', 'Embabel'],
              rows: [
                ['定位', '低層 LLM 基礎設施（讓程序呼叫 LLM）', 'Spring AI 的工具與能力擴展層', 'Agent 平台（規劃 + process 管理）'],
                ['誰決定下一步', '開發者手寫呼叫順序（pipeline）', 'LLM 在 agent loop 中自主選工具', 'GOAP planner 依 pre/postconditions 推導，可 replanning'],
                ['風格', 'API 呼叫', 'Claude Code 式自主 agent（涌現行為）', '可解釋、可測試的計畫式 agent'],
                ['提供的能力', 'ChatClient、@LlmTool、MCP、VectorStore', '檔案/Shell/搜尋工具、Skills、記憶、子代理', '@Agent / @Action / @AchievesGoal、Blackboard、Agentic RAG'],
                ['狀態管理', '無內建跨步驟狀態', '檔案型長期記憶（AutoMemory）', 'AgentProcess + Blackboard 管理 world state'],
                ['RAG 模型', 'Advisor / pipeline（固定步驟先檢索再生成）', '依工具組合（Web 搜尋 + 擷取）', 'Agentic RAG（ToolishRag 讓 LLM 自行決定怎麼搜）'],
                ['流程可解釋性', '取決於開發者', '低：路徑由模型即興決定', '高：每步有條件與目標可回溯'],
                ['測試', '低階 API，測試門檻較高', '同 LLM 自主行為，難以斷言路徑', 'action 可單元測試、prompt 可驗證、有整合測試支援'],
                ['適合場景', '單次 LLM 呼叫、自建流程', '開發助理、探索式任務、彈性優先', '企業流程、需審核 / 測試 / 合規的 agent']
              ]
            },
            note: '判斷準則：探索式任務（如 coding assistant）讓 LLM 自主選工具很合理；流程涉及生產系統、權限與審核時，Embabel 的 planner 路線讓每一步可解釋、可測試。三者並不互斥——agent-utils 與 Embabel 都站在 Spring AI 之上。'
          },
          {
            heading: 'Loop Engineering vs Embabel：兩種 Agent 路線',
            illustration: 'loop-vs-embabel',
            body: '2026 年業界主流的 agent 開發模式是 **Loop Engineering**（迴圈工程）——開發者設計一個「感知 → 推理 → 行動 → 觀察」的迴圈，讓 LLM 在迴圈中自主選擇工具並迭代，直到完成目標或觸發斷路器。Claude Code、LangGraph、CrewAI 等框架都以此為核心架構。Embabel 走的是完全不同的路線：**GOAP Planning**（目標導向行動規劃）——由非 LLM 的 A* 演算法依 preconditions / postconditions 推導 action chain，每一步執行後重新規劃（OODA loop），而不是讓 LLM 決定「下一步做什麼」。',
            table: {
              head: ['面向', 'Loop Engineering（迴圈工程）', 'Embabel（GOAP 規劃）'],
              rows: [
                ['核心機制', 'LLM 在迴圈中反覆推理 + 選工具（ReAct 模式）', '非 LLM 的 A* 演算法依型別條件搜尋最佳路徑'],
                ['誰決定下一步', 'LLM 自主判斷（涌現行為）', 'Planner 依 preconditions 推導（確定性行為）'],
                ['流程定義方式', '開發者寫迴圈邏輯、設定斷路器（MAX_LOOPS、token 預算）', '開發者定義 @Action 簽章與 @AchievesGoal，planner 自動組合路徑'],
                ['可解釋性', '低：LLM 每次迭代的選擇可能不同', '高：每步都能回答「為什麼選這個 action」——基於型別條件'],
                ['錯誤恢復', '靠 LLM 自我修正（重試 / 換工具）', 'Planner 自動 replanning：action 失敗後依剩餘條件重新搜尋路徑'],
                ['無窮迴圈風險', '需要開發者設定斷路器防止 runaway', '由 planner 保證：條件不滿足時流程停在可解釋的失敗點'],
                ['擴展性', '加工具 = 加入迴圈的候選清單', '加 @Action = planner 自動發現新路徑，不需改既有流程'],
                ['測試', '難以斷言路徑（LLM 即興決定）', 'action 可單元測試、prompt 可驗證組裝、plan 可斷言'],
                ['適合場景', '探索式任務（coding assistant、資料分析）', '企業流程（有審核、有合規、需追蹤的營運系統）'],
                ['代表框架', 'Claude Code、LangGraph、CrewAI、spring-ai-agent-utils', 'Embabel']
              ]
            },
            note: 'Loop Engineering 在探索式任務上表現出色——讓 LLM 自由嘗試、自我修正，適合結果開放的場景。但當流程涉及金額、權限與對外發送時，「LLM 即興決定下一步」會讓審核與除錯變得困難。Embabel 的 GOAP planner 讓每一步都有 preconditions 邏輯可追溯——Rod Johnson 的比喻是：Loop Engineering 像讓一個聰明人自由發揮，Embabel 像給這個人一張地圖和交通規則。兩者並非互斥：Embabel 的每個 action 內部仍然可以用 LLM 做局部推理（摘要、生成、分類），但 action 之間的編排由演算法負責。'
          },
          {
            heading: '案例實作①：評估 Antechinus Travel 的場景',
            body: '貫穿案例從這裡開始。Antechinus Travel 的需求——客服開啟帳戶看到 AI 活動摘要與個人化方案——正是「把 AI 加進既有系統」的典型：報表服務已存在（JDBC/JPA）、客戶資料有權限規範、優惠發放要審核。用本單元的判斷框架評估：這不是探索式任務，而是**有明確步驟、需要審核與追蹤的營運流程**，適合 planner 路線。',
            list: [
              ['既有資產', 'TravelActivityReportingService 報表服務、CRM、優惠規則'],
              ['LLM 的事', '摘要活動、產生方案草稿（局部推理）'],
              ['工程的事', '金額計算（@LlmTool）、審核 gate、流程選擇、稽核紀錄']
            ],
            illustration: 'day1-u1-jvm-agent'
          }
        ],
        prompts: [
          {
            id: 'd1-p1',
            title: 'AI 輔助：評估營運場景是否適合 agent 化',
            note: '把你公司的流程清單貼給 AI，產出 agent 化評估表',
            text: `角色 (Role): 你是熟悉 Embabel（JVM agent 框架）的企業架構師。
任務 (Task): 我會給你一份公司營運流程清單。請逐一評估是否適合做成 Embabel agent flow，判斷基準：
1. 是否有明確步驟與審核點（適合 planner 路線）
2. LLM 適合做哪些「局部推理」（摘要/分類/草稿）
3. 哪些計算必須由既有 domain object 提供準確數字（@LlmTool）
格式 (Format): 表格欄位：流程名稱｜適合度(高/中/低)｜LLM 負責｜工程負責｜風險點。
限制 (Constraint): 不要建議把整條流程交給 LLM 自由發揮；涉及金額、權限、發送對外內容的步驟一律標註需要審核 gate。

我的流程清單：
（在此貼上，例如：客戶活動摘要、退款申請初審、行銷文案產生…）`,
            example: `我的流程清單（Antechinus Travel 候選流程）：
1. 客戶活動摘要：客服開啟客戶帳戶時，需要快速了解近一年旅遊活動、消費水準與偏好。
2. 個人化方案產生：依客戶活動，產生升等、優惠或行程建議，經審核後發送。
3. 退款申請初審：依退改政策文件判斷退款申請是否符合條件，產生初審意見供主管覆核。
4. 行程異動通知撰寫：航班/飯店異動時，自動草擬通知信，由客服確認後寄出。
5. 客訴信件分類：把進線客訴依嚴重度與部門分流，附摘要。

已知限制：
- 金額、趟次等數字必須由既有系統計算，不可由 AI 推算。
- 任何對外發送（信件、優惠）都需要人工或規則審核。
- 客戶個資不可離開公司系統邊界。`,
            exampleFiles: ['business-process-list-sample.md']
          }
        ],
        tasks: [
          { id: 'd1-u1-t1', label: '閱讀 official-homepage 與 Embabel 動機文章，寫下你公司營運中三個適合 agent 化的工作（如客戶摘要、表單審核、整合判斷）' },
          { id: 'd1-u1-t2', label: '用「AI 輔助提示詞①」評估這三個工作，對照三方比較表確認該選哪條路線' }
        ],
        materials: [
          { id: 'd1-m1', name: '營運流程清單範例（business-process-list-sample.md）', type: 'MD', desc: '提示詞①的範例輸入：貼給 AI 練習產出評估表' }
        ],
        illustrations: [
          { name: 'day1-u1-jvm-agent', kind: 'hero', alt: 'JVM 服務、Spring bean、LLM 與工具被 agent flow 連接的工程場景', spec: 'JVM 工程場景' },
          { name: 'day1-u1-boundary', kind: 'diagram', alt: 'LLM 只在 action 內工作，整體流程由 planner 控制', spec: '控制權邊界' },
          { name: 'loop-vs-embabel', kind: 'diagram', alt: 'Loop Engineering vs Java Embabel 概念與架構對照圖', spec: '兩種 Agent 路線對照' }
        ],
        faq: [
          ['Embabel 會取代 Spring AI 嗎？', '不會。Embabel 建構在 Spring AI 之上：模型連線、@LlmTool、MCP 協定都沿用 Spring AI，Embabel 加上規劃與 agent process 管理。'],
          ['只想呼叫一次 LLM 也要用 Embabel 嗎？', '單次呼叫用 Spring AI 即可；當流程出現多步驟、條件分支、需要測試與審核時，Embabel 的價值才顯現。']
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-2',
        title: 'u-2 GOAP：Embabel 的可解釋規劃手法',
        time: '09:35 – 10:25',
        goals: ['能用條件與目標描述 agent flow', '能把案例拆成帶 pre/postconditions 的 action 集合'],
        concepts: [
          {
            heading: 'GOAP 是什麼',
            body: 'GOAP（Goal-Oriented Action Planning）源自遊戲 AI，但適合 agent 系統：它不是讓模型自由決定整條流程，而是讓系統在明確 action 集合中找出可解釋路徑。',
            illustration: 'day1-u2-goap-map'
          },
          {
            heading: 'GOAP 的核心：A* 最短路徑演算法',
            body: '你可以把 GOAP 想像成「打開 Google Maps 導航」——系統會自動幫你找出從出發地到目的地的最佳路線。Embabel 的 GOAP 規劃器底層使用 A*（A-star）搜尋演算法，這是一個在遊戲 AI 與導航系統中廣泛使用的最短路徑演算法。它維護一個 open list（優先佇列）與 closed set（已探索狀態），依 f-score 排序，每一步取出成本最低的狀態展開，直到找到一條從起點到目標的最優行動序列。',
            illustration: 'day1-u2-goap-a',
            list: [
              ['節點 (Nodes)', '系統當前的「城市/狀態」——blackboard 上目前有哪些物件（例如「已有 TravellerActivity」）'],
              ['邊 (Edges)', 'AI 可以走的「道路/行動 (Actions)」——必須滿足 preconditions 才能走這條路'],
              ['成本 (Cost)', '走這條路的「油錢」——每個 @Action 可設定 cost（0.0–1.0），planner 會累加各步成本找總成本最低的路徑'],
              ['g-score（開發者可控）', '從起點到目前節點的已累積 action cost——這就是 @Action(cost=...) 與 @Cost 動態成本被加總的地方'],
              ['h-score（框架內建）', '從目前節點到目標的啟發式估計——由 Embabel 內部的 heuristic function 自動計算，開發者不需配置'],
              ['f-score', '總估計成本（g + h），open list 依此排序，最小的優先展開']
            ],
            note: '核心觀念：把大局規劃的權力從 LLM 手中拿回來，交給 100% 準確的「最短路徑演算法」。開發者透過 @Action 的 cost 與 @Cost 動態成本影響 g-score（已知成本），h-score 則由框架自動估算剩餘距離——兩者合成 f-score 找出最佳路徑。找到初步路徑後，A* 還會做兩階段優化：後向優化從目標回推刪除不必要的 action，前向優化模擬執行確認每步都真正推進目標。'
          },
          {
            heading: 'world state、conditions 與 goal',
            illustration: 'day1-u2-condition-flow'
          },
          {
            heading: '案例實作②：把客戶摘要流程拆成 GOAP',
            body: '把 Antechinus Travel 的需求拆成 action 集合。好的 GOAP 設計不會只有一個終點——除了正常完成的 goal（ReviewedOffer），還需要「安全失敗終點」（EscalationTicket）。如果只設一個 goal，當 review 持續不通過時，planner 會不斷 replanning 直到系統強制中止——這不是可控的行為。設計兩個 goal 讓 planner 在正常路徑走不通時，有明確的替代終點可以收斂。',
            table: {
              head: ['Action', 'Preconditions（需要）', 'Postconditions（產生）'],
              rows: [
                ['fetchActivity', 'CustomerQuery', 'TravellerActivity'],
                ['summarize', 'TravellerActivity', 'ActivitySummary'],
                ['proposeOffer', 'ActivitySummary', 'OfferDraft'],
                ['reviewOffer', 'OfferDraft', 'ReviewedOffer（goal ✓ 正常終點）'],
                ['escalateToHuman', 'OfferDraft（審核未過）', 'EscalationTicket（goal ✓ 安全失敗終點）']
              ]
            },
            note: '設計原則：每條企業流程至少要有兩個 goal——「正常完成」與「安全收斂」。查無客戶時 fetchActivity 不產生 TravellerActivity，後續 action 的 preconditions 不滿足，planner 自然停在可解釋的失敗點。審核不過時，escalateToHuman 產生 EscalationTicket 作為安全失敗終點，而不是讓 planner 無限重試。'
          }
        ],
        prompts: [
          {
            id: 'd1-p2',
            title: 'AI 輔助：把營運流程拆成 GOAP action 表',
            note: '描述你的流程，讓 AI 產出 pre/postconditions 表與失敗路徑',
            text: `角色 (Role): 你是 Embabel GOAP 建模專家。
任務 (Task): 我會描述一個企業營運流程。請拆成 4–6 個 action，每個 action 給：名稱（動詞開頭的 Java method 名）、preconditions（需要哪些型別在 blackboard 上）、postconditions（產生哪個型別）、由 LLM 還是純程式執行。最後指出 goal 條件與至少一條失敗時的替代路徑（replanning 情境）。
格式 (Format): Markdown 表格 + 一段 replanning 說明。
限制 (Constraint): 型別名用 Java record 命名慣例（PascalCase）；涉及金額或對外發送的 action 前必須有審核 action；必須設計至少兩個 goal——正常完成終點與安全失敗終點（如人工處理），避免 replanning 無窮迴圈。

我的流程：
（在此描述，建議拿提示詞①評估為高適合度的那條流程。例如：客服開啟客戶帳戶 → 看到活動摘要 → 產生優惠方案 → 審核 → 回寫 CRM）`,
            example: `我的流程：
客服在 CRM 開啟客戶帳戶 → 系統從既有報表服務撈取近一年旅遊活動 → AI 產生活動摘要（標出高消費 / 常旅客）→ AI 依摘要產生個人化優惠方案草稿 → 依公司政策審核（超過折扣上限要退回重做或轉人工）→ 審核通過後回寫 CRM 供客服使用。
補充限制：查無客戶資料時流程要明確停下，不可讓 AI 編造活動內容。`
          }
        ],
        tasks: [
          { id: 'd1-u-goap-t1', label: '把共用案例「客戶活動摘要與個人化方案」拆成 4–5 個 action（取數據、摘要、產生方案、審核、回寫），寫出每個 action 的 pre/postconditions' },
          { id: 'd1-u-goap-t2', label: '指出其中一個 action 失敗時（如報表服務查無客戶），planner 可能改走的替代路徑；可用「AI 輔助提示詞②」對照你的答案' }
        ],
        materials: [
          { id: 'd1-m3', name: 'GOAP Action 表範例（goap-action-table-sample.md）', type: 'MD', desc: '提示詞②的期望輸出範例；可直接餵給提示詞③' }
        ],
        illustrations: [
          { name: 'day1-u2-goap-map', kind: 'hero', alt: '從 current state 到 goal state 的路徑搜尋視覺', spec: '路徑搜尋' },
          { name: 'day1-u2-goap-a', kind: 'diagram', alt: 'A* 演算法的節點（狀態）、邊（行動）、成本（cost）與 f-score 排序示意', spec: 'A* 最短路徑' },
          { name: 'day1-u2-condition-flow', kind: 'diagram', alt: 'preconditions、action、postconditions、goal 的關係', spec: '條件流動' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-3',
        title: 'u-3 建立專案並定義 Type-Driven Flow',
        time: '10:35 – 11:15',
        goals: ['能在本機建立可啟動的 Embabel + Spring Boot 專案', '能把 flow 拆成 Java action method 與 record', '能為案例寫出可被 planner 掃描的程式骨架'],
        concepts: [
          {
            heading: '官方建議的三種建專案方式',
            body: 'Embabel 官方提供三種建立專案的方式，依熟悉度選擇：',
            list: [
              ['方式一：GitHub Template（最快）', '直接從官方模板建立 repo——[Java 模板](https://github.com/embabel/java-agent-template) 或 [Kotlin 模板](https://github.com/embabel/kotlin-agent-template)，內含可直接執行的 WriteAndReviewAgent 範例'],
              ['方式二：Project Creator（可客製）', '用命令列工具產生客製化專案結構：`uvx --from git+https://github.com/embabel/project-creator.git project-creator`（需安裝 [uv](https://docs.astral.sh/uv/)）'],
              ['方式三：手動加 Starter（融入既有專案）', '在既有的 Spring Boot 專案中加入 embabel-agent-starter 依賴即可——不需要從頭建專案，適合漸進式導入']
            ],
            note: '本課程採用方式三（手動加 Starter），因為企業實務中最常見的情境就是在既有專案上加入 AI 能力，而非從頭建立。',
            promptAfter: 'd1-p3a'
          },
          {
            heading: '最小可啟動專案（動手優先）',
            body: '不論用哪種方式建立專案，最終都需要四個關鍵元件就位，專案才能正常啟動：',
            illustration: 'day2-u1-env',
            list: [
              ['簽約與開通（Java 21 + Spring Boot）', 'IT 確認伺服器已安裝 Java 21 並部署 Spring Boot——這是整套系統的運行基礎'],
              ['安裝核心模組（embabel-agent-starter）', '在專案中加入 Embabel starter，planner、blackboard、@Agent 掃描隨即就位；Spring AI 由它自動帶入，不必額外設定'],
              ['接通 AI 供應商（模型 starter，如 OpenAI）', '設定模型供應商的 API 金鑰，讓 action 中的 AI 呼叫能順利送達對應的 LLM 服務'],
              ['啟動專案（@SpringBootApplication）', '標準的 Spring Boot 啟動流程——Embabel 透過 auto-configuration 自動掃描所有 @Agent 類別，將它們的能力註冊到 planner']
            ],
            code: `// 標準 Spring Boot 主類別——不需要額外的啟用註解
// Embabel 透過 auto-configuration 自動掃描所有 @Agent 類別
@SpringBootApplication
public class AntechinusApplication {
  public static void main(String[] args) {
    SpringApplication.run(AntechinusApplication.class, args);
  }
}`,
            note: 'Windows 檢查：`java -version` 與 `mvn -v` 都要指到 Java 21+。API key 放環境變數（如 OPENAI_API_KEY），不寫進設定檔。進階配置（starter 全覽、權重設定、@ConfigurationProperties）留到 u-5。'
          },
          {
            heading: '方法簽章就是流程宣告',
            body: 'Embabel 的 type-driven flow 來自方法簽章。以共用案例為例：`summarize(TravellerActivity activity)` 代表這個 action 需要 `TravellerActivity`；回傳 `ActivitySummary` 代表執行後 blackboard 會有 `ActivitySummary`。下一個 action（如產生方案的 `proposeOffer`）如果需要 `ActivitySummary`，planner 就知道它要等 summarize action 之後才能執行。',
            illustration: 'day1-u3-type-flow'
          },
          {
            heading: 'Action 可注入參數速查表',
            body: '`@Action` 方法的參數由 Embabel 框架自動注入（依 Blackboard 型別匹配或 Spring DI）。了解可注入的參數型別，能讓你在設計 action 時知道「我可以拿到什麼」。',
            table: {
              head: ['參數型別', '來源', '說明'],
              rows: [
                ['Domain object（如 `CustomerQuery`）', 'Blackboard', '型別匹配——同時作為 precondition'],
                ['`Ai`', '框架注入', 'LLM 操作入口，提供 `withDefaultLlm()` / `withAutoLlm()` 等'],
                ['`ActionContext`', '框架注入', '可存取 Blackboard、發送訊息、啟動子流程'],
                ['`OperationContext`', '框架注入', '較低層級的上下文（含 Blackboard 存取、process audit）'],
                ['`Blackboard`', '框架注入', '直接存取共享狀態區'],
                ['`PromptRunner`', '框架注入', '需要更細緻的 LLM 操作控制時使用'],
                ['Spring bean（如 `TravelActivityReportingService`）', 'Spring DI', '自動注入——就像 @Autowired 一樣'],
                ['`@ConfigurationProperties` record', 'Spring DI', '業務門檻設定（見 u-5）']
              ]
            },
            note: '設計 action 時的思考順序：先決定 precondition（需要哪個 domain object）→ 再看需不需要 Ai（LLM 呼叫）或 Spring service（純程式呼叫）→ 最後考慮 ActionContext（子流程、訊息）。'
          },
          {
            heading: 'record 當資料邊界、annotation 宣告能力',
            illustration: 'day1-u3-annotation'
          },
          {
            heading: '案例實作③：CustomerCareAgent 程式骨架',
            body: '把 u-2 的 GOAP 表直接翻成 Java。注意每個 @Action 的簽章如何對應表中的 pre/postconditions——這份程式碼就是 planner 的規劃依據，不需要另外寫流程設定檔。',
            code: `record CustomerQuery(Long customerId, String question) {}
record TravellerActivity(String name, Instant from, Instant to, List<Trip> trips) { /* @LlmTool 統計見 u-6 */ }
record ActivitySummary(String text, boolean highSpender, boolean frequentTraveler) {}
record OfferDraft(String offer, String rationale) {}
record ReviewedOffer(String offer, String approvedBy) {}
record EscalationTicket(String reason, String customerId) {}  // 安全失敗終點的資料型別

@Agent(description = "客戶活動摘要與個人化方案")
public class CustomerCareAgent {

  @Action  // CustomerQuery → TravellerActivity（純程式，呼叫既有報表服務）
  TravellerActivity fetchActivity(CustomerQuery query, TravelActivityReportingService svc) {
    return svc.report(query.customerId());
  }

  @Action  // TravellerActivity → ActivitySummary（LLM 摘要）
  ActivitySummary summarize(TravellerActivity activity, Ai ai) { /* 見 u-6 的 withToolObject */ }

  @Action  // ActivitySummary → OfferDraft（LLM 產生方案草稿）
  OfferDraft proposeOffer(ActivitySummary summary, Ai ai) { /* ... */ }

  @AchievesGoal(description = "產出可發送的個人化方案")
  @Action  // OfferDraft → ReviewedOffer（正常終點：規則檢查通過）
  ReviewedOffer reviewOffer(OfferDraft draft) { /* ... */ }

  @AchievesGoal(description = "無法自動處理，轉交人工")
  @Action  // OfferDraft → EscalationTicket（安全失敗終點：審核未過或異常）
  EscalationTicket escalateToHuman(OfferDraft draft) { /* ... */ }
}`,
            note: '上面為了方便閱讀把所有 record 與 @Agent 放在同一段。實際專案中，每個 record 應各自一個檔案——TravellerActivity 有 @LlmTool 統計方法、可能被多個 Agent 共用，擠在一起會很亂。'
          },
          {
            heading: '實際專案的檔案組織',
            body: 'Embabel 的 domain object 不只是資料容器——它可以帶 @LlmTool 方法、被多個 Agent 共用、需要獨立測試。所以每個 record 應該有自己的檔案，按職責分 package：',
            code: `// 建議的 package 結構
com.antechinus.care/
├── domain/                              // record 們住這裡，每個一個檔案
│   ├── CustomerQuery.java
│   ├── TravellerActivity.java           // 含 @LlmTool totalSpend(), tripsPerYear()
│   ├── ActivitySummary.java
│   ├── OfferDraft.java
│   ├── ReviewedOffer.java
│   └── EscalationTicket.java
├── agent/
│   └── CustomerCareAgent.java           // @Agent + @Action 方法
└── config/
    └── ActivitySummarizerProperties.java // @ConfigurationProperties 門檻參數`
          }
        ],
        prompts: [
          {
            id: 'd1-p3a',
            title: 'AI 輔助：在既有 Spring Boot 專案中加入 Embabel',
            note: '直接在 IDE 的 AI 助手中使用——AI 會自動讀取專案檔案，不需要手動貼上專案資訊',
            text: `角色 (Role): 你是 Embabel + Spring Boot 整合工程師。
任務 (Task): 請讀取當前專案的 pom.xml（或 build.gradle）與 application.yml，在不更改任何既有依賴與設定的前提下，幫我加入 Embabel agent 能力。請產出：
1. 需要新增的 Embabel starter 依賴（只新增，不修改或移除既有依賴）——Spring AI 由 Embabel starter 傳遞帶入，勿另加 BOM
2. application.yml 中需要新增的 Embabel 與模型供應商設定（API key 走環境變數）
3. 檢查當前專案是否滿足最低需求（Java 21、Spring Boot 版本），不滿足則提出升級建議
4. 如果既有依賴與 Embabel 有潛在衝突，提出警告與解法
格式 (Format): 四個區塊，每個附一行說明。標示哪些是「新增」、哪些是「既有不動」。
限制 (Constraint): 禁止修改或移除專案中任何既有的依賴、設定或程式碼。只做最小幅度的新增，讓 Embabel 在既有專案中跑起來。版本號以 Embabel 官方文件為準。`
          },
          {
            id: 'd1-p3',
            title: 'AI 輔助：從 GOAP 表生成 Embabel 程式骨架',
            note: '把提示詞②產出的 action 表貼進來，產生可編譯的 Java 骨架',
            text: `角色 (Role): 你是 Embabel（JVM agent 框架）資深 Java 開發者。
任務 (Task): 我會給你一份 GOAP action 表（action / preconditions / postconditions / 執行者）。請生成：
1. 每個型別的 Java record 定義
2. 一個 @Agent 類別，內含對應的 @Action 方法（簽章的參數與回傳型別必須對應表中的 pre/postconditions）
3. 終點 action 加上 @AchievesGoal
格式 (Format): 單一 Java 檔案的程式碼區塊，方法本體可用註解佔位，但簽章必須完整。
限制 (Constraint): 不要用 Map<String,Object> 傳資料；LLM 步驟注入 Embabel 的 Ai 介面；純程式步驟注入既有 Spring service。

我的 GOAP 表：
（在此貼上）`,
            example: `我的 GOAP 表：
| Action | Preconditions（需要） | Postconditions（產生） | 執行者 |
|---|---|---|---|
| fetchActivity | CustomerQuery | TravellerActivity | 純程式（既有報表服務） |
| summarize | TravellerActivity | ActivitySummary | LLM |
| proposeOffer | ActivitySummary | OfferDraft | LLM |
| reviewOffer | OfferDraft | ReviewedOffer（goal ✓ 正常終點） | 純程式（政策規則） |
| escalateToHuman | OfferDraft（審核未過） | EscalationTicket（goal ✓ 安全失敗終點） | 純程式 |`,
            exampleFiles: ['goap-action-table-sample.md']
          }
        ],
        tasks: [
          { id: 'd1-u2-t0', label: '檢查本機 java -version 與 mvn -v 皆為 Java 21 以上；用「AI 輔助提示詞③a」在既有 Spring Boot 專案中加入 Embabel starter 依賴，確認 mvn spring-boot:run 可啟動' },
          { id: 'd1-u2-t1', label: '用 Java record 定義 CustomerQuery、TravellerActivity、ActivitySummary、OfferDraft、ReviewedOffer 五個資料邊界' },
          { id: 'd1-u2-t2', label: '用「AI 輔助提示詞③」生成 @Agent 骨架，檢查每個 @Action 簽章是否對應 u-2 的 GOAP 表' }
        ],
        materials: [
          { id: 'd1-m4', name: '案例程式骨架（CustomerCareAgent.java）', type: 'JAVA', desc: '提示詞③的期望輸出範例；提示詞④的演練輸入' }
        ],
        illustrations: [
          { name: 'day1-u3-type-flow', kind: 'hero', alt: 'Java record 在 action 之間流動', spec: 'record 流動' },
          { name: 'day1-u3-annotation', kind: 'diagram', alt: '@Agent、@Action、@AchievesGoal 對應 planner metadata', spec: 'annotation 對應' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-4',
        title: 'u-4 AgentProcess、Blackboard 與 Replanning',
        time: '11:15 – 12:00',
        goals: ['能說明 Embabel 執行時如何持續更新狀態並重新規劃', '能描述案例一次完整執行的 blackboard 變化'],
        concepts: [
          {
            heading: 'AgentProcess：一次任務的容器',
            body: 'AgentProcess 是 Embabel 執行一次 agent 任務的容器。它包含 user input、選到的 goal、目前 plan、blackboard 中的物件、事件與終止狀態。',
            illustration: 'day1-u4-runtime'
          },
          {
            heading: 'Blackboard 與 replanning loop（OODA 循環）',
            body: 'Blackboard 是 action 之間共享的狀態區——不是隨便塞字串的全域 map，而是讓 Embabel 依型別與名稱把物件綁定到 method parameters。Replanning 是運作上的關鍵：系統不假設 action 一定達成預期；它執行一步後重新看狀態，再判斷 goal 是否已達成或是否需要其他 action。官方文件把這個機制稱為動態的 [OODA loop](https://en.wikipedia.org/wiki/OODA_loop)（源自軍事決策理論）：**Observe** 觀察 blackboard 目前狀態與 action 結果 → **Orient** 理解上一輪之後發生了什麼變化 → **Decide** 依新資訊重新規劃 → **Act** 執行計畫中的下一個 action。這讓 agent 能適應非預期的 action 結果、從部分失敗中恢復。',
            illustration: 'day1-u4-ooda'
          },
          {
            heading: '案例實作④：一次查詢的執行軌跡',
            body: '客服輸入「客戶 4711 的近一年活動」後，AgentProcess 的 blackboard 逐步累積物件。下表展示正常路徑、replanning 改走安全失敗終點的完整對照：',
            illustration: 'day1-u4-blackboard',
            table: {
              head: ['步驟', 'Blackboard 內容', 'Planner 決策'],
              rows: [
                ['開始', 'CustomerQuery', '推導出 fetchActivity → summarize → proposeOffer → reviewOffer'],
                ['fetchActivity 完成', '+ TravellerActivity', '照計畫執行 summarize'],
                ['summarize 完成', '+ ActivitySummary（標記 high spender）', '照計畫執行 proposeOffer'],
                ['proposeOffer 完成', '+ OfferDraft（升等方案）', '照計畫執行 reviewOffer'],
                ['reviewOffer 未通過', '（沒有 ReviewedOffer）', 'Replanning：改走 escalateToHuman（安全失敗終點）'],
                ['escalateToHuman 完成', '+ EscalationTicket', 'Goal 達成（安全失敗終點），AgentProcess 終止'],
                ['── 或 ──', '', ''],
                ['reviewOffer 通過', '+ ReviewedOffer', 'Goal 達成（正常終點），AgentProcess 終止並留下事件紀錄']
              ]
            },
            note: '關鍵：reviewOffer 失敗時 planner 不是無限重試，而是改走 escalateToHuman 這條替代路徑——因為它也標了 @AchievesGoal，planner 知道走這條路也能「收工」。這就是為什麼 u-2 強調每條流程至少要有兩個 goal。'
          },
          {
            heading: '防止無窮迴圈：Embabel 的三層安全機制',
            body: '如果設計不當（例如只有一個 goal 且該路徑反覆失敗），replanning 理論上會無窮迴圈。Embabel 提供三層防護：',
            list: [
              ['第一層：多 Goal 設計（開發者責任）', '如案例所示，設計「正常終點」與「安全失敗終點」兩個 @AchievesGoal，讓 planner 在主路徑走不通時有替代出口可收斂'],
              ['第二層：StuckHandler 介面（agent 自救）', '當 planner 找不到任何可執行的 action 時，框架呼叫 StuckHandler.handleStuck()——agent 可以自行補資料到 blackboard 後請求 REPLAN，或直接回報失敗'],
              ['第三層：EarlyTerminationPolicy（平台硬停機）', '透過 ProcessOptions 設定最大 action 數量或最大成本上限，超過就強制終止——這是最後的保險絲，防止設計缺陷導致的無窮迴圈']
            ],
            note: '好的 agent 設計應在第一層就解決問題（多 Goal 設計），第二、三層是防禦性保護。如果你的 agent 經常觸發 StuckHandler 或被 EarlyTerminationPolicy 中止，代表 GOAP 模型需要重新設計。'
          },
          {
            heading: 'Agent 委派：用 RunSubagent 呼叫子 Agent',
            body: '目前案例的 CustomerCareAgent 是一條線性流程，所有 @Action 都在同一個 @Agent 裡。但如果「活動分析」將來要被行銷 Agent、風控 Agent 共用呢？Embabel 支援在一個 @Action 裡啟動另一個 @Agent 作為子流程（nested process）——子 Agent 有自己的 GOAP 規劃，但共享父 Agent 的 blackboard。',
            code: `// 子 Agent：有自己的多步驟規劃
@Agent(description = "活動分析專家")
public class ActivityAnalyzer {

  @Action
  TravellerActivity fetch(CustomerQuery q, TravelActivityReportingService svc) {
    return svc.report(q.customerId());
  }

  @AchievesGoal(description = "完成活動摘要")
  @Action
  ActivitySummary summarize(TravellerActivity a, Ai ai) { /* ... */ }
}

// 父 Agent：在 @Action 中委派給子 Agent
@Agent(description = "客戶服務總控")
public class CustomerCareOrchestrator {

  private final ActivityAnalyzer analyzer;  // Spring 注入

  @Action
  ActivitySummary analyze(CustomerQuery query) {
    // 委派給子 Agent，共享 blackboard
    return RunSubagent.fromAnnotatedInstance(analyzer, ActivitySummary.class);
  }

  @AchievesGoal(description = "產出可發送的方案")
  @Action
  ReviewedOffer review(OfferDraft draft) { /* ... */ }
}`,
            list: [
              ['RunSubagent.fromAnnotatedInstance()', '最常用——傳入 Spring 注入的 @Agent 實例，指定期望的回傳型別'],
              ['RunSubagent.instance()', '傳入程式化建立的 Agent 物件（如透過 AgentMetadataReader）'],
              ['ActionContext.asSubProcess()', '需要存取 ActionContext 做額外操作時使用']
            ],
            note: '什麼時候該拆子 Agent？單一線性流程不需要拆；當某段子流程會被多個 Agent 共用、或子流程有自己的 GOAP 規劃需求時才值得拆。子 Agent 與父 Agent 共享 blackboard，框架會追蹤 parent ID。'
          },
          {
            heading: 'AgentInvocation：從 REST Controller 程式化呼叫 Agent',
            illustration: 'day1-u4-invocation',
            body: '到目前為止我們都透過 Embabel Shell 測試 agent。在實際生產系統中，你需要從 REST controller 或 service 程式化呼叫 agent。Embabel 提供 `AgentInvocation` API 做同步呼叫，以及 `Autonomy` API 讓 LLM 動態選擇最適合的 agent。',
            code: `// 方式一：AgentInvocation——指定目標型別，同步呼叫\n@PostMapping("/analyze")\nResponseEntity<ReviewedOffer> analyze(@RequestBody CustomerQuery query) {\n  var invocation = AgentInvocation.builder(agentPlatform)\n      .build(ReviewedOffer.class);  // 指定 goal 型別\n\n  ReviewedOffer result = invocation.invoke(query);  // 同步執行\n  return ResponseEntity.ok(result);\n}\n\n// 方式二：Autonomy——讓 LLM 動態選擇 agent\n// Closed mode：LLM 從已註冊的 agent 中選最適合的\nvar result = autonomy.chooseAndRunAgent(userIntent, ProcessOptions.DEFAULT);\n\n// Open mode：LLM 選最適合的 goal，可跨 agent 組合 action\nvar result = autonomy.chooseAndAccomplishGoal(userIntent, ProcessOptions.DEFAULT);`,
            list: [
              ['AgentInvocation', '開發者明確指定 agent 與 goal 型別——適合 REST API 端點、確定性流程'],
              ['Autonomy（Closed mode）', 'LLM 從已註冊的 agent 中選最適合的——適合多 agent 系統的統一入口'],
              ['Autonomy（Open mode）', 'LLM 選最適合的 goal 並自動組合 action——適合最大彈性的探索式呼叫']
            ],
            note: '大多數生產場景用 AgentInvocation 就夠——REST 端點 → 指定 goal 型別 → 同步拿結果。Autonomy 適合「使用者意圖不確定、需要 LLM 挑 agent」的場景，例如統一的自然語言入口。'
          },
          {
            heading: '@State 與迴圈狀態——超越線性 GOAP',
            illustration: 'day1-u4-state-loop',
            body: '到目前為止案例都是線性流程。但如果流程需要**迴圈**（修改-審核反覆）、**分支**（依分類走不同路徑）、或**等待人工輸入**（Human-in-the-Loop），單純的 GOAP 就不夠了。Embabel 的 `@State` 機制讓 agent 可以在 GOAP 規劃中定義狀態機行為：action 回傳一個 `@State` 標註的類別時，系統會隱藏前一個 state、綁定新 state、然後在新 state 內重新規劃。',
            code: `// 迴圈模式：修改-審核循環\n@State\ninterface Stage {}  // 所有 state 的 parent interface\n\n@State\nrecord AssessStory(Story story) implements Stage {\n  @Action(clearBlackboard = true)  // 啟用迴圈——允許重訪 state\n  Stage assess(HumanFeedback feedback, Ai ai) {\n    if (ai.isAcceptable(story, feedback)) {\n      return new Done(story);          // 終止條件\n    }\n    return new ReviseStory(story, feedback);  // 迴圈\n  }\n}\n\n// Human-in-the-Loop：暫停等待人工輸入\n@Action\nHumanFeedback getFeedback() {\n  return WaitFor.formSubmission(\n      "Please provide feedback on the story",\n      HumanFeedback.class);  // agent 暫停直到表單提交\n}`,
            list: [
              ['`@State`', '標註在 class/interface 上，子類別自動繼承 state 行為'],
              ['`clearBlackboard = true`', '迴圈必備——清除 blackboard 讓 planner 允許重訪已存在的 state 型別'],
              ['`WaitFor.formSubmission()`', 'Human-in-the-Loop——agent 暫停執行，等待使用者提交表單後繼續'],
              ['`return this` + `canRerun = true`', '停留在當前 state 不轉換——適合 chatbot 的多輪對話']
            ],
            note: '本課程案例用線性 GOAP 就能完成。@State 適合進階場景：修改-審核迴圈（clearBlackboard）、人工審核暫停（WaitFor）、chatbot 多輪對話（return this）。注意 state class 限制：Java 必須是 static nested class（record 隱含 static）、Kotlin 必須是 top-level class。詳見官方文件 §4.19。'
          }
        ],
        prompts: [
          {
            id: 'd1-p4',
            title: 'AI 輔助：模擬 AgentProcess 執行軌跡（桌面演練）',
            note: '在寫程式前，先讓 AI 幫你沙盤推演 blackboard 變化與 replanning',
            text: `角色 (Role): 你是 Embabel runtime 模擬器。
任務 (Task): 我會給你一個 @Agent 類別骨架（或 GOAP action 表）與一個使用者輸入。請逐步模擬 AgentProcess 執行：每一步列出（1）blackboard 目前有哪些物件（2）planner 為什麼選這個 action（3）執行結果。然後加演一次異常：指定某個 action 失敗，展示 replanning 後的新路徑。
格式 (Format): 步驟表格 + replanning 情節說明。
限制 (Constraint): 不要跳步；每一步都要能回答「為什麼是這個 action」；失敗情境要符合 preconditions 邏輯（缺什麼型別就不能執行什麼）。

我的 agent 與輸入：
（在此貼上 u-3 的骨架與一句使用者輸入）`,
            example: `我的 agent 與輸入：
agent 骨架：（貼上下方參考檔案 CustomerCareAgent.java 全文）
使用者輸入：「客戶 4711 的近一年活動」
加演異常：reviewOffer 規則檢查未通過（折扣超過上限），請展示 replanning 後的新路徑`,
            exampleFiles: ['CustomerCareAgent.java', 'traveller-activity-sample.json']
          },
          {
            id: 'd1-p4b',
            title: 'AI 輔助：生成 REST Controller 呼叫 Agent（AgentInvocation）',
            note: '貼上你的 @Agent 類別，讓 AI 產出可直接部署的 REST 端點',
            text: `角色 (Role): 你是 Embabel + Spring Boot 整合工程師，熟悉 AgentInvocation 與 Autonomy API。
任務 (Task): 我會給你一個 Embabel @Agent 類別。請產出：
1. 一個 @RestController 類別，用 AgentInvocation 從 HTTP 端點同步呼叫 agent——包含 @PostMapping、輸入驗證、錯誤處理
2. 說明 AgentInvocation.builder(agentPlatform).build(GoalType.class).invoke(input) 每一步做了什麼
3. 額外產出一個使用 Autonomy（Closed mode）的端點範例——適合「使用者輸入不確定要用哪個 agent」的場景
4. 整合注意事項：AgentPlatform 的 Spring bean 注入方式、ProcessOptions 的常用設定（contextId、verbosity、test mode）
格式 (Format): 兩個 Java 檔案（Controller + 說明），附程式碼區塊與行內註解。
限制 (Constraint): Controller 方法必須有明確的回傳型別（不要 Object）；錯誤處理要考慮 agent 執行失敗的情況；不要把 agent 邏輯寫在 controller 裡。

我的 @Agent 程式：
（在此貼上 u-3 完成的 @Agent 類別）`,
            example: `我的 @Agent 程式：
（貼上下方參考檔案 CustomerCareAgent.java 全文）
補充：endpoint 路徑為 /api/customer-care，輸入是 CustomerQuery JSON，輸出是 ReviewedOffer JSON`,
            exampleFiles: ['CustomerCareAgent.java']
          },
          {
            id: 'd1-p4c',
            title: 'AI 輔助：設計 @State 迴圈與 Human-in-the-Loop 流程',
            note: '描述你的迴圈或審核場景，讓 AI 設計 state 轉換結構',
            text: `角色 (Role): 你是 Embabel @State 機制專家，熟悉 state machine 模式與 Human-in-the-Loop 設計。
任務 (Task): 我會描述一個需要迴圈、分支、或人工審核的業務場景。請設計：
1. State 介面與實作類別的繼承結構（parent state interface + concrete state records）
2. 每個 state 的 @Action 方法：回傳型別決定下一個 state、clearBlackboard 控制迴圈
3. 若有人工審核環節，用 WaitFor.formSubmission() 設計暫停點——說明 agent 如何暫停、前端如何提交、agent 如何恢復
4. 畫出 state 轉換表：[當前 state] → [條件] → [下一個 state]
格式 (Format): State 轉換表 + Java 程式碼區塊 + 文字說明。
限制 (Constraint): state class 必須是 Java static nested class 或 record；@State 的 parent interface 必須宣告在 @Agent 類別內；clearBlackboard = true 只加在需要迴圈的 action；WaitFor 回傳的型別要對應表單欄位。

我的場景：
（描述需要迴圈或人工審核的流程）`,
            example: `我的場景：
文件審核流程：員工提交報銷單 → AI 初審（金額合理性、政策合規）→ 若初審不通過，退回修改（迴圈）；若金額超過 5000 元，暫停等待主管在審核頁面按「核准」或「退回」（Human-in-the-Loop）；核准後產出核銷紀錄。
補充：需要支援最多 3 次修改迴圈，超過 3 次自動轉人工處理。`
          }
        ],
        tasks: [
          { id: 'd1-u-runtime-t1', label: '描述一次 AgentProcess 的生命週期：客服輸入 CustomerQuery 後，plan、blackboard 變化與終止狀態' },
          { id: 'd1-u-runtime-t2', label: '用「AI 輔助提示詞④」演練一個 replanning 情境：OfferDraft 未通過規則檢查時 planner 改走哪條路' }
        ],
        materials: [
          { id: 'd1-m5', name: '客戶 4711 範例資料（traveller-activity-sample.json）', type: 'JSON', desc: '本單元用於提示詞④的執行軌跡演練；同一份資料在 u-8 也會作為測試 mock 使用' }
        ],
        illustrations: [
          { name: 'day1-u4-runtime', kind: 'hero', alt: 'AgentProcess 執行迴圈', spec: '執行迴圈' },
          { name: 'day1-u4-ooda', kind: 'diagram', alt: 'OODA 迴圈：觀察 Blackboard → 理解變化 → 重新規劃 → 執行下一個 action，結果寫回狀態板', spec: 'OODA replanning 迴圈' },
          { name: 'day1-u4-blackboard', kind: 'diagram', alt: 'action output 寫入 blackboard 後被下一個 action binding', spec: 'blackboard binding' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-5',
        title: 'u-5 Spring Boot 進階配置',
        time: '13:00 – 13:40',
        goals: ['能規劃 starter 依賴並把業務門檻參數走 @ConfigurationProperties', '能區分靜態權重（cost/value）與動態權重（@Cost）的適用場景，並為案例 action 配置合理的成本與價值'],
        concepts: [
          {
            heading: 'Embabel starter 總覽與依賴原則',
            body: 'u-3 已經建好最小專案，現在深入 starter 的完整配置。Embabel 建構於 Spring Boot + Spring AI，所有 AI 相關依賴由 Embabel starter 自動傳遞帶入——開發者不需要自行管理 Spring AI 的版本，也不要另外加 Spring AI BOM，避免版本衝突。',
            illustration: 'day2-u1-env'
          },
          {
            heading: 'Embabel starter 依賴規劃',
            body: '真實 Embabel 專案會依需求加入對應 starter（Maven Central 提供）。Spring AI 由 Embabel starter 傳遞帶入，不要自行加 Spring AI BOM。',
            illustration: 'day2-u1-boot4',
            list: [
              ['embabel-agent-starter', '核心 agent 能力'],
              ['embabel-agent-starter-shell', '互動式 shell 操作 agent'],
              ['embabel-agent-starter-openai', 'OpenAI 模型接入（Anthropic、Gemini 等凡 Spring AI 支援皆可）'],
              ['MCP server starter', '把 agent 能力匯出為 MCP 工具'],
              ['embabel-agent-starter-observability', '觀測 action / LLM / tool 執行']
            ],
            note: 'Windows 檢查指令：`java -version` 與 `mvn -v` 都要指到 Java 21+。'
          },
          {
            heading: 'LlmOptions：控制 LLM 的模型與參數',
            body: '在 action 中透過 `Ai` 介面選擇 LLM 與調整生成參數。Embabel 提供多種取得 LLM 的方式，從「框架自動選」到「開發者指定模型名稱」都有。',
            table: {
              head: ['方法', '說明', '典型場景'],
              rows: [
                ['`ai.withDefaultLlm()`', '使用 `embabel.models.default-llm` 設定的模型', '大部分 action 的預設選擇'],
                ['`ai.withAutoLlm()`', '框架根據 action 需求自動選擇最適模型', '不確定該用哪個模型時'],
                ['`ai.withLlm(LlmOptions.withAutoLlm().withTemperature(0.7))`', '自訂 temperature 等參數', '需要創意生成的摘要 / 草稿'],
                ['`ai.withLlm("gpt-4o")`', '指定模型名稱', '特定 action 需要特定模型能力'],
                ['`ai.withLlmByRole("best")`', '依角色名稱對應模型（在 application.yml 定義）', '區分 best / fast / cheap 等角色']
              ]
            },
            code: `// 案例：summarize action 用自訂 temperature\n@Action\nActivitySummary summarize(TravellerActivity activity, Ai ai) {\n  return ai\n    .withLlm(LlmOptions.withAutoLlm().withTemperature(0.3))  // 低 temperature = 更一致\n    .withToolObject(activity)  // 最小工具暴露（u-6 會詳細說明）\n    .createObject("幫客戶產生活動摘要...", ActivitySummary.class);\n}\n\n// application.yml 中定義模型角色對應\n// embabel:\n//   models:\n//     roles:\n//       best: gpt-4o\n//       fast: gpt-4o-mini\n//       cheap: gpt-3.5-turbo`,
            note: '建議在 application.yml 中用角色（role）對應模型名稱，而非在程式碼中寫死。這樣切換供應商只需改設定檔，不必改程式。'
          },
          {
            heading: 'Embabel 內建 Planner 選擇',
            illustration: 'day1-u5-planner-choice',
            body: 'GOAP 是預設 planner，但不是唯一選擇。Embabel 提供四種規劃策略，透過 `@Agent(planner = PlannerType.XXX)` 設定。大部分業務場景用 GOAP 即可。',
            table: {
              head: ['Planner', '適用場景', '說明'],
              rows: [
                ['**GOAP**（預設）', '有明確輸出的業務流程', '從目前狀態規劃到目標的路徑——確定性最高，本課程全程使用'],
                ['**Utility**', '探索型 / 事件驅動 / Chatbot', '每步選淨值（value − cost）最高的 action，不預先知道終點'],
                ['**Hybrid**', 'Reducer 管線（收集 → 合成 → 停）', '類似 Utility 選 action，但一旦 goal 滿足即停止'],
                ['**Supervisor**', '彈性多步驟', 'LLM 根據型別 schema 和已收集的 artifact 選擇 action']
              ]
            },
            note: '判斷準則：「我知道我要什麼」→ GOAP；「我不確定要什麼、先探索再說」→ Utility AI。Chatbot、GitHub issue 分流等事件反應系統特別適合 Utility AI（搭配 `@EmbabelComponent`）。Utility planner 的 action 選擇依據是 u-5 教的 cost/value 淨值。'
          },
          {
            heading: '@Condition 與 SpEL 動態條件——精細控制 action 可用性',
            body: '除了型別匹配（preconditions），Embabel 提供 `@Condition` 方法和 SpEL 表達式讓開發者加入布林門檻。例如：「只有高消費客戶才跑升等方案」這種邏輯不是型別問題（ActivitySummary 都有），而是業務條件。',
            code: `// 方式一：@Condition 方法（寫在 @Agent 或 @EmbabelComponent 中）\n@Condition\nboolean isHighSpender(TravellerActivity activity) {\n  return activity.totalSpend() > 5000;  // 不靠 LLM 判斷\n}\n\n// 方式二：SpEL 表達式（直接寫在 @Action 的 pre 陣列）\n@Action(pre = {"spel:activitySummary.highSpender == true"})\nOfferDraft proposeUpgrade(ActivitySummary summary, Ai ai) {\n  // 只有高消費客戶才會觸發這個 action\n  return ai.withDefaultLlm().createObject("...", OfferDraft.class);\n}`,
            list: [
              ['`@Condition` 方法', '寫在 @Agent 或 @EmbabelComponent 中的布林方法——planner 在規劃階段呼叫'],
              ['SpEL 表達式', '直接在 `@Action(pre = {"spel:..."})`——以 camelCase 類別名稱參照 Blackboard 物件'],
              ['參數可為 null', '@Condition 方法的 domain object 參數若不在 Blackboard 上，自動回傳 false']
            ],
            note: '@Condition 方法不應有副作用——planner 可能多次呼叫。SpEL 支援屬性比較、型別檢查（`instanceof T(...)`）、Collection 過濾等。這讓同一個型別的不同實例可以走不同路徑。'
          },
          {
            heading: '靜態權重——為 Action 設定基本偏好',
            body: '在 u-2 我們學過 A* 演算法會找「總成本最低」的路徑。那成本從哪來？每個 @Action 都可以設定 cost（執行代價，0.0–1.0）和 value（執行價值，0.0–1.0）。例如：本地資料庫查詢既快又免費，可將 cost 設為 0.1；呼叫 GPT-4o 雖然聰明但昂貴且緩慢，可將 cost 設為 0.9。規劃器為了找「最短路徑」，自然會優先選擇低成本的 action。在 Utility AI planner 中，淨價值（net value = value - cost）是選擇 action 的唯一依據。',
            code: `// 靜態權重：直接在 @Action 上標註 cost 與 value
@Action(cost = 0.1, value = 0.8)   // 低成本、高價值——優先被選中
TravellerActivity fetchActivity(CustomerQuery query, TravelActivityReportingService svc) {
  return svc.report(query.customerId());
}

@Action(cost = 0.6, value = 0.9)   // 較高成本（LLM 呼叫）但價值也高
ActivitySummary summarize(TravellerActivity activity, Ai ai) { /* ... */ }`,
            illustration: 'day1-u5-static-cost',
            note: 'cost 與 value 的範圍都是 0.0–1.0。GOAP planner 用 cost 累加找最低路徑；Utility planner 用 value - cost 找最高淨價值。兩者都透過數學而非 LLM 來做決策，保證可解釋性。'
          },
          {
            heading: '動態權重——具備環境感知的聰明 GPS',
            body: '現實環境是會改變的。Embabel 的 @Cost annotation 可以在規劃階段（planning time）根據 blackboard 的即時狀態動態計算成本。你可以把它想像成 GPS 的即時路況：如果發現某條路大塞車（例如某 API 回應緩慢、LLM 額度快用光），那條路的成本會瞬間飆高，迫使規劃器自動繞道選擇替代方案。',
            code: `@Agent(description = "具備動態成本的客戶處理 Agent")
public class SmartCustomerCareAgent {

  // 動態成本方法：根據 blackboard 狀態計算
  @Cost(name = "summarizeCost")
  public double computeSummarizeCost(@Nullable TravellerActivity activity) {
    if (activity != null && activity.trips().size() > 100) {
      return 0.9;  // 資料量大時成本高——規劃器可能選擇先篩選再摘要
    }
    return 0.1;  // 資料量小時成本低
  }

  // 用 costMethod 引用動態成本
  @Action(costMethod = "summarizeCost")
  ActivitySummary summarize(TravellerActivity activity, Ai ai) { /* ... */ }

  // 動態價值方法：高優先任務的價值更高
  @Cost(name = "urgencyValue")
  public double computeUrgency(@Nullable CustomerQuery query) {
    if (query != null && query.question().contains("VIP")) {
      return 1.0;  // VIP 客戶的任務價值最高
    }
    return 0.5;
  }

  @Action(valueMethod = "urgencyValue")
  OfferDraft proposeOffer(ActivitySummary summary, Ai ai) { /* ... */ }
}`,
            illustration: 'day1-u5-dynamic-cost',
            list: [
              ['@Cost(name = "xxx")', '標記一個方法為成本計算函式，name 是識別名稱'],
              ['@Action(costMethod = "xxx")', '指定 action 在規劃時使用哪個 @Cost 方法計算動態成本'],
              ['@Action(valueMethod = "xxx")', '指定 action 在規劃時使用哪個 @Cost 方法計算動態價值'],
              ['參數必須 @Nullable', '@Cost 方法的 domain object 參數必須可為 null（物件可能還不在 blackboard 上）'],
              ['回傳值 0.0–1.0', '成本方法回傳 double，值域 0.0 到 1.0']
            ],
            note: '動態成本在 Utility planning（PlannerType.UTILITY）中特別強大：Utility planner 每一步都用 value - cost 選 action，動態成本讓它能根據即時狀態做出聰明決策。但在 GOAP planner 中同樣有效——A* 搜尋的 g-score 會累加每個 action 的 cost。'
          },
          {
            heading: '案例實作⑤：門檻參數走 @ConfigurationProperties',
            body: 'u-3 已建好最小專案與 @Agent 骨架，現在為 CustomerCareAgent 補上進階設定：application.yml 設定模型供應商與門檻參數（高消費門檻、字數上限走 @ConfigurationProperties，不寫死在 prompt 裡）。',
            code: `@SpringBootApplication
@EnableConfigurationProperties
// Embabel 透過 auto-configuration 自動啟用 agent 掃描
public class AntechinusApplication {
  public static void main(String[] args) {
    SpringApplication.run(AntechinusApplication.class, args);
  }
}

// application.yml（節錄）
// example.activity-summarizer:
//   max-words: 80
//   high-spender-threshold: 2000.0
//   high-trips-per-year-threshold: 10`
          },
          {
            heading: '進階流程編排：ScatterGather 與 Consensus',
            body: '當案例需要更高的可靠度時——例如「產生的方案是否合規」不能只靠單一模型判斷——Embabel 提供了 ScatterGatherBuilder（並行 fan-out + 結果整合）和 ConsensusBuilder（多來源共識）兩種進階編排模式。它們都透過 ActionContext.asSubProcess() 作為子流程執行。',
            code: `// 案例延伸：同一份 OfferDraft 丟給 3 個模型各自審核，取共識結果
@Action
ReviewedOffer multiModelReview(OfferDraft draft, ActionContext context) {

  // 每個模型各自產生一份審核結果
  var reviewTasks = List.of("gpt-4o", "claude-sonnet", "gemini-flash")
      .stream()
      .map(model -> (Function<OperationContext, SingleReview>) ctx ->
          ctx.promptRunner()
              .withLlm(LlmOptions.fromModel(model))
              .create("審核此優惠方案是否合規：" + draft))
      .toList();

  // ScatterGatherBuilder：並行執行，再整合
  return ScatterGatherBuilder
      .returning(ReviewedOffer.class)      // 最終回傳型別
      .fromElements(SingleReview.class)    // 每個子任務的產出型別
      .generatedBy(reviewTasks)            // 並行執行的函式清單
      .consolidatedBy(this::mergeReviews)  // 整合函式：多數決或加權
      .asSubProcess(context);              // 作為子流程執行
}`,
            list: [
              ['ScatterGatherBuilder', '並行 fan-out + 結果整合——同一任務丟給多個模型或策略，各自獨立執行，最後由整合函式合併結果'],
              ['ConsensusBuilder', 'ScatterGather 的特化版——專門用於「多來源取共識」的場景，框架處理投票與衝突解決']
            ],
            note: '這兩種模式適合需要多模型交叉驗證的高風險場景（合規審核、金額判斷）。一般場景用單一模型 + 規則檢查就夠，不要為了用而用。'
          }
        ],
        prompts: [
          {
            id: 'd1-p5',
            title: 'AI 輔助：生成 pom.xml 與環境檢查清單',
            note: '延續提示詞③a 的最小 Embabel 設定，本提示詞擴充完整 starter（含 observability / shell）並加入 @ConfigurationProperties 門檻參數',
            text: `角色 (Role): 你是 Spring Boot + Embabel 專案的建置工程師。
任務 (Task): 依我的條件生成（1）pom.xml 的 dependencies 區塊（Spring Boot parent + spring-boot-starter-web + Embabel starter + 指定模型供應商 starter；Spring AI 由 Embabel 傳遞帶入，勿另加 BOM）（2）一份 Windows PowerShell 環境檢查清單（Java 21、JAVA_HOME、mvn 指向、API key 環境變數）（3）application.yml 樣板，把業務門檻參數放 @ConfigurationProperties 而非寫死在 prompt。
格式 (Format): 三個程式碼區塊，附一行說明。
限制 (Constraint): 版本號以 Embabel 官方文件為準（不要憑空指定）；Spring AI 由 Embabel starter 傳遞帶入，勿另加 BOM。

我的條件：
模型供應商：（OpenAI / Anthropic / …）
部署環境：（Windows 內訓機 / Linux …）`,
            example: `我的條件：
模型供應商：OpenAI（API key 放環境變數 OPENAI_API_KEY，不寫進設定檔）
部署環境：Windows 11 內訓機、PowerShell 7、Maven 3.9、JDK 21 安裝於 D:\\java\\jdk-21（注意系統預設可能是 Java 8）
業務門檻：摘要字數上限 80 字、高消費門檻 2000、常旅客門檻每年 10 趟（這三個值要走 @ConfigurationProperties）`,
            exampleFiles: ['pom-sample.xml', 'application-sample.yml']
          },
          {
            id: 'd1-p5b',
            title: 'AI 輔助：為 action 配置合理的 cost / value 權重',
            note: '貼上你的 @Agent 骨架，讓 AI 分析每個 action 的特性並建議靜態權重與 @Cost 動態成本',
            text: `角色 (Role): 你是 Embabel GOAP 規劃最佳化顧問。
任務 (Task): 我會給你一個 @Agent 的所有 @Action 方法。請為每個 action：
1. 建議靜態 cost（0.0–1.0）與 value（0.0–1.0），附一句理由（例：純程式呼叫既有服務 → 低 cost；LLM 呼叫 → 高 cost）
2. 判斷是否需要 @Cost 動態成本——若 action 的成本取決於 blackboard 上某個物件的狀態（如資料量大小），設計 @Cost 方法簽章
3. 說明在這組權重下，A* planner 會優先選擇哪條路徑，以及 Utility planner 會如何用 value - cost 做選擇
格式 (Format): 每個 action 一節，附程式碼片段。
限制 (Constraint): cost 和 value 的值域是 0.0–1.0；@Cost 方法的 domain object 參數必須 @Nullable（物件可能還不在 blackboard 上）；路徑選擇的解釋要用 g-score（已累積成本）的概念，不可讓 LLM 決定路徑選擇。

我的 @Agent 程式：
（在此貼上 u-3 的 @Agent 骨架）`,
            example: `我的 @Agent 程式：
（貼上下方參考檔案 CustomerCareAgent.java 全文）
補充：fetchActivity 是純程式呼叫既有報表服務；summarize 是 LLM 呼叫；proposeOffer 是 LLM + RAG；reviewOffer 是純規則檢查`,
            exampleFiles: ['CustomerCareAgent.java']
          },
          {
            id: 'd1-p5c',
            title: 'AI 輔助：分析場景並推薦 Planner 類型',
            note: '描述你的 agent 場景特性，讓 AI 分析適合用哪種 planner',
            text: `角色 (Role): 你是 Embabel Planner 選型顧問，熟悉 GOAP、Utility AI、Hybrid、Supervisor 四種 planner 的差異。
任務 (Task): 我會描述我的 agent 場景。請分析：
1. 場景特性分類：是確定性流程（有明確起點→終點）、事件驅動（回應各種事件）、收集型（匯聚多來源再處理）、還是探索型（LLM 自主決定路徑）
2. 推薦 planner 類型並說明理由：
   - GOAP（預設）：適合有明確 goal、可用 A* 規劃最短路徑的場景
   - Utility AI：適合 chatbot、事件驅動、每步選「當下價值最高」的 action
   - Hybrid：適合 reducer 管線——收集多項目直到停止條件滿足
   - Supervisor：適合最大彈性——LLM 從可用 action 中自主選擇
3. 若推薦非 GOAP planner，提供對應的 ProcessOptions 配置程式碼
4. 邊界提醒：什麼情況下推薦的 planner 可能不適合，需要換用另一種
格式 (Format): 場景分析 + 推薦理由 + 配置程式碼 + 邊界提醒。
限制 (Constraint): 不要無條件推薦 GOAP；每種 planner 都有最適合的場景。Utility AI 的 value-cost 計算要解釋；Supervisor 的 LLM 選擇要說明 prompt 如何影響。

我的場景：
（描述你的 agent 業務場景與互動模式）`,
            example: `我的場景：
場景一：客服 chatbot，使用者可以隨時問不同問題（查訂單、改行程、問退費政策），每次回應都是獨立的，沒有固定流程。
場景二：資料品質檢查管線，從 5 個資料源各拉一份報告，全部到齊後合併產出品質總表。
請分別分析兩個場景適合哪種 planner。`
          }
        ],
        tasks: [
          { id: 'd2-u1-t1', label: '為 u-3 建好的專案補上 application.yml，把高消費門檻、常旅客門檻、摘要字數上限走 @ConfigurationProperties' },
          { id: 'd2-u1-t2', label: '用「AI 輔助提示詞⑤」生成完整 pom.xml 依賴區塊（含 observability / shell starter），確認版本號與官方文件一致' },
          { id: 'd2-u1-t3', label: '為案例的 fetchActivity（純程式）與 summarize（LLM）設定靜態 cost/value，說明為什麼 fetchActivity 的 cost 應低於 summarize' },
          { id: 'd2-u1-t4', label: '為 summarize action 實作一個 @Cost 動態成本方法：當 TravellerActivity 的 trips 數量超過 50 筆時成本提高，說明規劃器會如何反應' }
        ],
        materials: [
          { id: 'd2-m1', name: '依賴範本（pom-sample.xml）', type: 'XML', desc: '提示詞⑤的期望輸出範例；版本號以官方文件為準' },
          { id: 'd2-m2', name: '設定範本（application-sample.yml）', type: 'YML', desc: '門檻參數走 @ConfigurationProperties 的示範' }
        ],
        illustrations: [
          { name: 'day2-u1-boot4', kind: 'hero', alt: 'Spring Boot 專案與 Embabel starter 的依賴關係', spec: '依賴關係' },
          { name: 'day1-u5-static-cost', kind: 'diagram', alt: '靜態 cost/value 如何影響 A* 規劃器選路——低成本路徑優先', spec: '靜態權重' },
          { name: 'day1-u5-dynamic-cost', kind: 'diagram', alt: '@Cost 方法在規劃階段根據 blackboard 狀態動態調整 action 成本', spec: '動態權重' },
          { name: 'day2-u1-env', kind: 'diagram', alt: 'PowerShell、JAVA_HOME、Maven、application.yml', spec: '環境檢查' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-6',
        title: 'u-6 Tool 與 MCP 怎麼分工',
        time: '13:40 – 14:25',
        goals: ['能區分 domain tool、MCP 與 Subagent 三種接入模式的適用場景', '能為案例的每個 action 配置最小工具'],
        concepts: [
          {
            heading: 'Domain Tool vs MCP vs Subagent：三種接入模式',
            body: 'Embabel 有三種方式讓 action 取得外部能力。Domain tool 適合直接掛在 Java domain object 上（用 Spring AI 的 @LlmTool annotation）；MCP 適合跨應用、跨 runtime 的工具；Subagent 則是把「另一個完整的 Agent」當工具暴露給 LLM——LLM 可以自行決定何時啟動子 Agent。至於大量文件或知識庫的檢索（Agentic RAG），會在 u-7 完整介紹。',
            illustration: 'day2-u2-choice',
            table: {
              head: ['模式', '適用', '成本'],
              rows: [
                ['Domain tool', '工具需要物件內部狀態、同 JVM 內', '最低：加 @LlmTool annotation 即可'],
                ['MCP', '跨應用、跨 runtime 發現與重用', '中：需要 server / client 與授權管理'],
                ['Subagent Tool', '子任務有自己的多步驟 GOAP 規劃', '高：啟動完整的子 Agent process']
              ]
            }
          },
          {
            heading: 'Subagent Tool：讓 LLM 決定何時委派子 Agent',
            body: '在 u-4 我們學過用 RunSubagent 在程式碼裡明確委派子 Agent。Subagent Tool 則更進一步——它把子 Agent 包裝成一個 tool 暴露給 LLM，由 LLM 在推理過程中自行判斷「需不需要叫這個專家來幫忙」。子 Agent 啟動後有自己的 GOAP 規劃、多步驟執行，但共享父 Agent 的 blackboard。',
            code: `// 案例延伸：讓 LLM 決定是否需要「政策檢查 Agent」
@Action
OfferDraft proposeOffer(ActivitySummary summary, Ai ai) {
  return ai
      .withDefaultLlm()
      // 把 PolicyChecker 當工具暴露——LLM 自行決定要不要啟動
      .withTool(Subagent.ofClass(PolicyChecker.class)
              .consuming(PolicyQuery.class))
      .creating(OfferDraft.class)
      .fromPrompt("依客戶摘要產生優惠方案，如需確認政策限制可呼叫政策檢查工具：" + summary);
}

// PolicyChecker 是完整的 @Agent，有自己的多步驟規劃
@Agent(description = "政策合規檢查專家")
public class PolicyChecker {
  @Action
  PolicyResult checkDiscount(PolicyQuery query, Ai ai) { /* 檢查折扣上限 */ }

  @AchievesGoal(description = "完成政策合規檢查")
  @Action
  PolicyVerdict verdict(PolicyResult result) { /* ... */ }
}`,
            list: [
              ['Subagent.ofClass(Agent.class).consuming(Input.class)', '從 @Agent 類別建立，指定 LLM 啟動時傳入的資料型別'],
              ['Subagent.byName("name").consuming(Input.class)', '按名稱在 runtime 解析——適合動態配置'],
              ['Subagent.ofAnnotatedInstance(bean).consuming(Input.class)', '傳入 Spring bean 實例——適合需要注入的 Agent']
            ],
            note: 'RunSubagent（u-4）是「開發者寫死委派」，Subagent Tool 是「LLM 自主決定是否委派」。簡單確定性邏輯用 @LlmTool 方法就好，只有子任務需要完整 GOAP 規劃時才用 Subagent。'
          },
          {
            heading: '最小工具暴露',
            body: 'Embabel 的重點是最小工具暴露：每個 action 只給它需要的工具與參考資料，降低 prompt 噪音與工具誤用。這也讓測試可以檢查——這個 action 是否帶了正確模型、正確 prompt、正確工具。',
            illustration: 'day2-u2-tools'
          },
          {
            heading: '案例實作⑥：@LlmTool 讓 LLM 拿到準確數字',
            body: 'LLM 不擅長算數，但案例要判斷高消費與常旅客。解法（取自來源文章）：`TravellerActivity` 用 @LlmTool 暴露統計方法，summarize action 以 `withToolObject(activity)` 只把這個物件的工具給 LLM——金額由 Java 算，LLM 負責敘事。CRM 回寫若要供其他系統重用，才考慮 MCP。旅遊政策文件（退改規則）的檢索將在 u-7 用 Agentic RAG 實作。',
            code: `record TravellerActivity(String name, Instant from, Instant to, List<Trip> trips) {

  @LlmTool  // 由 Java 計算，LLM 不心算
  public float totalSpend() {
    return trips.stream().map(Trip::amount).reduce(0f, Float::sum);
  }

  @LlmTool(description = "Trips per year")
  public float tripsPerYear() {
    long days = Duration.between(from, to).toDays();
    return days == 0 ? trips.size() : (trips.size() * 365f) / days;
  }
}

// summarize action 內：最小工具暴露
var report = ai.withDefaultLlm()
    .withToolObject(activity)   // 只給這個物件的 @LlmTool
    .generateText("""
        幫 Antechinus Travel 的同仁理解這位客戶。
        高消費門檻 %f、常旅客門檻每年 %f 趟，字數上限 %s。
        # 客戶活動
        %s
        """.formatted(threshold, tripsThreshold, maxWords, activity));`
          }
        ],
        prompts: [
          {
            id: 'd1-p6',
            title: 'AI 輔助：工具接入決策與 @LlmTool 設計',
            note: '列出 action 與資料來源，讓 AI 給 domain tool vs MCP 建議與 @LlmTool 方法設計',
            text: `角色 (Role): 你是 Embabel 工具整合顧問。
任務 (Task): 我會列出 agent 的 action 與它們需要的資料/能力。請為每個 action：
1. 建議接入模式（domain tool / MCP）並說明理由（涉及大量文件檢索的標註「待 RAG 評估」）
2. 若是 domain tool，設計 @LlmTool 方法簽章（含 description），凡涉及數字計算一律由 Java 方法提供
3. 給出該 action 的「最小工具清單」，並指出哪些工具是多餘的
格式 (Format): 每個 action 一節：模式｜理由｜@LlmTool 簽章（如適用）｜最小工具清單。
限制 (Constraint): 不要為了方便就把所有工具給所有 action；LLM 不可負責金額計算。

我的 action 與資料來源：
（action 清單請取自提示詞②的 GOAP 表或提示詞③骨架的 @Action 方法，再為每個 action 補上它需要的資料/能力。例如：summarize 需要旅遊活動統計；proposeOffer 需要優惠政策文件…）`,
            example: `我的 action 與資料來源：
- fetchActivity：呼叫既有 TravelActivityReportingService 取得旅遊活動，純程式，不需要 LLM 工具
- summarize：需要旅遊活動統計（總消費 totalSpend、年化旅遊次數 tripsPerYear）——數字必須準確，原始資料都在 TravellerActivity 物件上
- proposeOffer：需要查詢公司優惠政策文件（travel-policy.md，內容會持續更新）——標註「待 RAG 評估」
- reviewOffer：需要折扣上限與發送規則——固定政策，不可由 LLM 判斷`,
            exampleFiles: ['travel-policy.md']
          }
        ],
        tasks: [
          { id: 'd2-u-tools-t1', label: '為案例的每個 action 選擇接入模式（domain tool / MCP），TravellerActivity 統計為什麼選 domain tool？CRM 回寫為什麼可能需要 MCP？寫下理由' },
          { id: 'd2-u-tools-t2', label: '用「AI 輔助提示詞⑥」列出每個 action 的最小工具清單，檢查有沒有多給的工具' }
        ],
        materials: [],
        illustrations: [
          { name: 'day2-u2-tools', kind: 'hero', alt: 'domain object 與 MCP server 分別提供工具', spec: '兩種工具來源' },
          { name: 'day2-u2-choice', kind: 'diagram', alt: 'domain tool vs MCP decision tree', spec: 'decision tree' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-7',
        title: 'u-7 Agentic RAG 與 ActionAudit 稽核',
        time: '14:35 – 15:15',
        goals: [
          '能說明 Agentic RAG 的動態檢索機制與配置',
          '能透過 ActionAudit 回溯 Agent 的決策鏈、使用的 prompt 與 tool 歷程'
        ],
        concepts: [
          {
            heading: 'Agentic RAG：第三種工具接入——讓 LLM 自主決定檢索關鍵字',
            body: 'u-6 介紹了 domain tool 與 MCP 兩種接入模式，現在補上第三種：Agentic RAG（又稱 ToolishRAG）。它不是在 prompt 之前固定檢索並全部塞入 context，而是將搜尋操作（SearchOperations）包裝成工具暴露給 LLM。LLM 可以根據推理進度，自主決定何時呼叫搜尋、用什麼關鍵字搜尋。這在 Antechinus 案例中，能讓 `proposeOffer` 動作主動去 `travel-policy.md` 法規庫查找最新的「滑雪促銷優惠」或「高消費折扣限制」，大幅降低 token 消耗並提高精準度。',
            illustration: 'day2-u2-tools'
          },
          {
            heading: 'ActionAudit：透明可解釋的執行稽核',
            body: '為了應對生產環境的審計與客訴，Embabel 提供了 `ActionAudit` 機制。ActionAudit 會記錄任務的執行軌跡（Execution Trace），包含每一個步驟（Action）的輸入與輸出、執行的 Executor（Code 或 LLM）、使用的模型、具體的 Prompt、呼叫的 Tool 參數及結果，以及精確的 Token 消耗。這讓 Agent 系統不再是無法除錯的黑箱。學會 ActionAudit 之後，下一個單元（u-8 測試）就能完整涵蓋所有功能的測試與觀測。',
            illustration: 'day2-u3-observe'
          },
          {
            heading: '案例實作⑦：Antechinus 的合規檢索與稽核紀錄',
            body: '實戰部分：我們為 `proposeOffer` 配置 `travelPolicySearch` 工具。當 Lin Wei-Chen 被判定為高消費客戶後，LLM 呼叫該工具檢索 `travel-policy.md`，得到折扣上限 10% 的限制並產生折扣碼。最後，我們透過 `ActionAudit` 輸出完整的 JSON 軌跡以核實整條決策鏈。',
            code: `// proposeOffer 需要存取 process().audit()，所以用 OperationContext
@Action
OfferDraft proposeOffer(ActivitySummary summary, OperationContext context) {
  // 1. 啟用 RAG 搜尋工具
  var proposed = context.ai().withDefaultLlm()
      .withTool(travelPolicySearch) // 暴露 Agentic RAG 檢索工具
      .generateText("依政策為 Lin Wei-Chen 規劃個人化方案。");

  // 2. 獲取執行期的稽核軌跡（需要 OperationContext）
  ActionAudit audit = context.process().audit();
  System.out.println("總共消耗 Token: " + audit.totalTokens().total());
  audit.executionTrace().forEach(step -> {
      System.out.printf("步驟 %d [%s]: %s%n", step.step(), step.executorType(), step.actionName());
  });
}`
          }
        ],
        prompts: [
          {
            id: 'd1-p7',
            title: 'AI 輔助：設計 RAG 提示詞與解讀 ActionAudit',
            note: '讓 AI 幫你寫出精確的 RAG 提示詞，並解析複雜的 ActionAudit JSON 紀錄（建議分兩次使用：先完成任務 1 的 RAG 設計，再做任務 2 的 Audit 分析，效果更好）',
            text: `角色 (Role): 你是 Embabel RAG 與維運稽核顧問。
任務 (Task): 請協助我完成以下兩件事：
1. 為 CustomerCareAgent 的 proposeOffer 動作撰寫一段 Prompt，引導 LLM 主動調用合規搜尋工具 travelPolicySearch 查詢優惠限制，並在 rationale 中說明引用了哪條政策。
2. 我會給你一份 ActionAudit 的 JSON 稽核日誌。請幫我分析其執行步驟、列出所有 LLM 與 Code 動作的分工、說明使用了哪些 Tools 與其回傳值，並計算總 Token 消耗與可能優化的步驟。
格式 (Format): 兩部分說明加上 Markdown 步驟分析表格。
限制 (Constraint): RAG 提示詞必須明確要求 LLM 僅使用搜尋工具的結果，不可編造無中生有的促銷條款。

我的 ActionAudit JSON 日誌：
（在此貼上素材中的 action-audit-sample.json 內容）`,
            example: `我的 ActionAudit JSON 日誌：
（貼上下方參考檔案 action-audit-sample.json 全文）`,
            exampleFiles: ['action-audit-sample.json', 'travel-policy.md']
          }
        ],
        tasks: [
          { id: 'd2-u3-t1', label: '配置 RAG 搜尋工具，使 proposeOffer 在產生優惠時，能主動搜尋並遵循 travel-policy.md 的折扣上限' },
          { id: 'd2-u3-t2', label: '閱讀素材 action-audit-sample.json，使用「AI 輔助提示詞⑦」分析其執行軌跡與 LLM/Code 的工具調用歷程' }
        ],
        materials: [
          { id: 'd2-m3', name: '服務政策文件（travel-policy.md）', type: 'MD', desc: 'Agentic RAG 檢索對象（u-7）' },
          { id: 'd2-m5', name: '稽核日誌範例（action-audit-sample.json）', type: 'JSON', desc: '提示詞⑦演練與稽核分析輸入' }
        ],
        illustrations: [
          { name: 'day2-u2-tools', kind: 'hero', alt: 'RAG 工具在規劃中的整合架構', spec: 'RAG 整合' },
          { name: 'day2-u3-observe', kind: 'diagram', alt: 'ActionAudit 執行期稽核軌跡輸出', spec: '稽核軌跡' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-8',
        title: 'u-8 測試與可維運性',
        time: '15:15 – 15:45',
        goals: ['能規劃 prompt 測試、action 測試與觀測資料', '能為案例設計上線檢查表'],
        concepts: [
          {
            heading: '把測試帶回 Java 團隊熟悉的方式',
            body: 'Embabel 把 Gen AI application 拆成 action 與 domain object，讓測試回到 Java 團隊熟悉的方式。純程式 action 可以用一般單元測試；需要 LLM 的 action 則可測 prompt 是否帶齊重要資料、是否使用正確模型角色、是否暴露正確工具。',
            illustration: 'day2-u3-test'
          },
          {
            heading: '上線後的觀測資料',
            body: '上線時需要記錄 action execution、LLM call、tool invocation、token cost 與失敗原因。u-7 學過的 ActionAudit 正是這些觀測資料的來源——現在我們從測試角度看如何利用它。這些資訊不只是 observability，也能用來改善 action granularity、調整模型角色與補 guardrail。',
            illustration: 'day2-u3-observe',
            list: [
              ['action execution', '每步輸入輸出與耗時'],
              ['LLM call', '模型、prompt、token cost'],
              ['tool invocation', '哪個工具、參數、結果'],
              ['失敗原因', '用於 replanning 分析與 guardrail 補強']
            ]
          },
          {
            heading: 'Guardrails——LLM 輸入/輸出驗證護欄',
            illustration: 'day2-u8-guardrails',
            body: '上線後最擔心的是 LLM 產生不安全或不合規的輸出。Embabel 提供標準化的 Guardrails 框架，在 LLM 呼叫前後注入驗證邏輯。`UserInputGuardRail` 在呼叫前攔截，`AssistantMessageGuardRail` 在回應後檢查。嚴重程度 `CRITICAL` 會拋出 `GuardRailViolationException` 直接阻止 LLM 執行。',
            code: `// 自訂 UserInputGuardRail：阻止違規輸入\nclass SafetyGuardRail implements UserInputGuardRail {\n  @Override\n  public String getName() { return "SafetyGuardRail"; }\n  @Override\n  public String getDescription() { return "安全政策檢查"; }\n\n  @Override\n  public ValidationResult validate(String input, Blackboard blackboard) {\n    if (containsProhibitedContent(input)) {\n      return new ValidationResult(true, List.of(\n        new ValidationError("safety", "包含違規內容",\n            ValidationSeverity.CRITICAL)  // CRITICAL → 阻止執行\n      ));\n    }\n    return ValidationResult.VALID;\n  }\n}\n\n// 掛載到 PromptRunner（可串接多個）\nvar runner = ai.withDefaultLlm()\n    .withGuardRails(new SafetyGuardRail(), new AuditGuardRail());`,
            list: [
              ['`UserInputGuardRail`', 'LLM 呼叫前驗證使用者輸入——CRITICAL 嚴重度阻止執行'],
              ['`AssistantMessageGuardRail`', 'LLM 回應後驗證輸出（含 thinking blocks）'],
              ['全域 Guardrails', '在 `application.properties` 宣告，套用到所有 LLM 操作——適合 PII 過濾、字數限制等 cross-cutting 政策'],
              ['Budget Guardrail 模式', '結合 `AgenticEventListener`（計數費用）+ `UserInputGuardRail`（超預算阻止）——見官方文件 §4.29.3']
            ],
            note: 'Guardrail 的 `validate()` 方法可存取 `Blackboard`，讓驗證邏輯能根據工作流程中的其他實體做決策。測試時可驗證：這個 action 是否掛載了正確的 guardrails（prompt 組裝測試的一部分）。'
          },
          {
            heading: '案例實作⑧：summarize action 的測試與觀測',
            body: '案例收尾：fetchActivity 是純程式，用一般單元測試 + mock 報表服務即可。summarize 是 LLM action，重點不是斷言輸出字串，而是驗證 prompt 組裝：門檻參數有沒有帶入、@LlmTool 統計有沒有暴露、模型角色對不對。上線後若客訴「方案發錯」，靠 u-7 學過的 ActionAudit 回溯是哪一步、哪個 prompt、哪次 tool call 出的問題。',
            table: {
              head: ['對象', '測法', '斷言重點'],
              rows: [
                ['fetchActivity', '單元測試 + mock TravelActivityReportingService', '查無客戶時不產生 TravellerActivity'],
                ['summarize（prompt）', 'prompt 組裝測試', '帶入 maxWords / 高消費門檻；暴露 activity 的 @LlmTool；用預設 LLM 角色'],
                ['proposeOffer（RAG）', 'RAG 工具暴露測試', '確認只暴露 travelPolicySearch，未多給其他工具'],
                ['reviewOffer', '規則單元測試', '超出折扣上限的 OfferDraft 必須被擋下'],
                ['整條 flow', 'Embabel 整合測試', 'CustomerQuery 進、ReviewedOffer 出；ActionAudit 事件齊全']
              ]
            }
          }
        ],
        prompts: [
          {
            id: 'd1-p8',
            title: 'AI 輔助：生成測試清單與上線檢查表',
            note: '貼上你的 @Agent 程式，讓 AI 產出測試案例與觀測檢查表',
            text: `角色 (Role): 你是 Gen AI 應用的測試與 SRE 顧問，熟悉 Embabel 的 action 測試模式。
任務 (Task): 我會給你一個 Embabel @Agent 類別。請產出：
1. 每個 action 的測試計畫：純程式 action 給 JUnit 測試重點；LLM action 給 prompt 組裝驗證清單（必帶資料、模型角色、暴露的工具）；RAG action 驗證搜尋工具暴露
2. 上線檢查表：要記錄哪些 ActionAudit 事件（action execution / LLM call / tool invocation / token cost）、誰負責看、客訴時的回溯步驟
3. 至少 2 個 guardrail 建議（如折扣上限、字數上限）
格式 (Format): Markdown 清單，分「測試」「觀測」「guardrail」三節。
限制 (Constraint): LLM action 不要寫「斷言輸出完全相等」這種不可行的測試；每個 guardrail 要說明放在哪個 action 的哪一側（輸入檢查或輸出檢查）。

我的 @Agent 程式：
（在此貼上 u-3 / u-6 / u-7 完成的程式）`,
            example: `我的 @Agent 程式：
（貼上下方參考檔案 CustomerCareAgent.java 全文；連同 TravellerActivity 的 @LlmTool 統計方法與 u-7 的 RAG 設定一起貼）
補充情境：上線後最常見的客訴是「方案發錯」，回溯步驟請以這個情境示範`,
            exampleFiles: ['CustomerCareAgent.java']
          }
        ],
        tasks: [
          { id: 'd2-u2-t1', label: '為摘要 action 寫 prompt 測試清單：是否帶入 maxWords / 高消費門檻、是否用對模型角色、是否暴露 @LlmTool 統計' },
          { id: 'd2-u2-t2', label: '用「AI 輔助提示詞⑧」產出上線檢查表：要記錄哪些 ActionAudit 事件、誰看、客訴「方案發錯」時怎麼回溯' }
        ],
        materials: [
          { id: 'd2-m4', name: '測試與上線檢查表範例（test-checklist-sample.md）', type: 'MD', desc: '提示詞⑧的期望輸出範例；案例驗收清單' }
        ],
        illustrations: [
          { name: 'day2-u3-test', kind: 'hero', alt: 'action method、PromptRunner、mock service 的測試場景', spec: '測試場景' },
          { name: 'day2-u3-observe', kind: 'diagram', alt: 'AgentEvent、action span、LLM call、tool call', spec: '觀測資料' }
        ]
      },
      // ──────────────────────────────────────────────
      {
        id: 'u-9',
        title: 'u-9 課程結訓與整合',
        time: '15:45 – 16:10',
        goals: [
          '能回顧並整合本課程的所有 Embabel 核心概念（GOAP、Blackboard、OODA、RAG、Audit）',
          '完成結訓測驗以檢驗學習成效'
        ],
        concepts: [
          {
            heading: 'JVM Agentic AI 落地全景圖',
            body: '在經歷了 9 個單元的學習後，我們將所有的 Embabel 核心積木拼接在一起。從一開始的控制權邊界評估，到利用 GOAP 規劃器拆解 Pre/Postconditions，利用 Java Record 作為強型別的資料傳遞載體，在 Spring Boot 專案中安排模型與 domain @LlmTool，並接入 Agentic RAG 檢索優惠政策，最後利用 ActionAudit 輸出完整的稽核日誌。這整套系統，讓 AI 在 JVM 安全且可預測的工程邊界內發揮最大的推理價值。',
            illustration: 'day1-u1-jvm-agent'
          },
          {
            heading: '下一步學習與架構重構指引',
            body: '完課後，建議將此 Antechinus Travel 案例的架構帶回您的實際業務場景。在設計新的 Agent 系統時，請始終遵循「最小工具暴露」與「強型別流程聲明」原則。以下是本課程介紹過但未深入的進階功能，供您下一步研究：',
            illustration: 'day2-u3-test',
            list: [
              ['Chatbot 模式', '用 `@EmbabelComponent` + `@Action(trigger = UserMessage.class, canRerun = true)` 定義對話 action，搭配 `AgentProcessChatbot.utilityFromPlatform()` 建立 chatbot bean——自動使用 Utility AI planner。支援 Jinja prompt template、Conversation 持久化、`@State` 跨訊息狀態管理。見官方文件 §4.13'],
              ['@State 迴圈與 Human-in-the-Loop（u-4 進階）', '`clearBlackboard = true` 啟用迴圈狀態、`WaitFor.formSubmission()` 暫停等待人工輸入——適合修改-審核循環與多輪對話。見官方文件 §4.19'],
              ['Guardrails（u-8 進階）', '`UserInputGuardRail` / `AssistantMessageGuardRail` 在 LLM 前後注入驗證——全域設定可套用到所有 LLM 操作。見官方文件 §4.30'],
              ['進階 Planner（u-5 進階）', 'Utility AI 適合 chatbot / 事件系統、Hybrid 適合 reducer 管線、Supervisor 讓 LLM 選 action。見官方文件 §4.20']
            ]
          },
          {
            heading: '官方文件進階探索',
            illustration: 'day1-u9-advanced-map',
            body: '除了上述進階功能，Embabel 官方文件還包含以下特化主題。這些功能在特定場景下非常有用，建議在需要時查閱 [Embabel GitHub 文件](https://github.com/embabel/embabel-agent)：',
            table: {
              head: ['分類', '主題', '說明與適用場景'],
              rows: [
                ['互動與操作', 'Embabel Shell（§3）', '互動式命令列操作 agent——適合開發階段快速測試與除錯'],
                ['安全', '@SecureAgentTool（§4.6.11）', '標記需要安全權限的工具方法——適合有角色權限控管需求的系統'],
                ['工具進階', 'Agentic Tools / SimpleAgenticTool（§4.9.7）', '工具內部可巢狀呼叫 LLM——適合工具本身需要推理能力的場景'],
                ['工具進階', 'Progressive Tools / UnfoldingTool（§4.9.8）', '漸進式揭露工具給 LLM——適合 chatbot 中依對話進度開放工具'],
                ['模板', 'Templates / Jinja（§4.11）', 'Jinja 風格的 prompt 模板引擎——適合複雜的 prompt 管理與重用'],
                ['觸發器', 'Reactive Triggers（§4.6.7）', 'action 的 `trigger` 參數讓 action 回應特定事件——Chatbot 模式的基礎機制'],
                ['執行模式', 'ConcurrentAgentProcess（§4.15）', '並行執行多個 action——適合需要效能優化的高吞吐場景'],
                ['LLM 進階', '串流與推理模式（§4.26-4.27）', 'Streaming 回應與 Extended Thinking——適合需要即時輸出或深度推理的場景'],
                ['LLM 進階', 'Callbacks / Interceptors（§4.28）', 'Tool Loop Callbacks 攔截 LLM 與工具互動——SPI 層級的擴展點'],
                ['營運', 'Cost Tracking / Budget Guardrail（§4.29）', 'LLM 費用追蹤與預算控制——適合需要精確控管 AI 支出的生產環境'],
                ['雲端整合', 'LLM Providers / Bedrock / MiniMax（§4.23-4.25）', '各雲端 LLM 供應商的整合細節——Spring AI 支援的供應商都可用'],
                ['跨系統', 'A2A 整合 / Observability（§4.33）', 'Agent-to-Agent 協議與觀測整合——適合多系統協作的企業級部署']
              ]
            },
            note: '這些進階功能不在本課程範圍內，但知道它們的存在能幫助你在遇到特定需求時快速找到對應的官方文件。建議依「遇到問題再查」的原則學習，不需要一次全部掌握。'
          },
          {
            heading: '案例實作⑨：系統重構與完課驗收',
            body: '本單元不包含新的 Java 代碼編寫。請您點擊側邊欄的「結訓測驗」，挑戰 8 題核心概念選擇題，作為本次內訓的完課驗收。答錯的題目會提供回到對應單元複習的超連結。祝您順利取得滿分！',
            note: '恭喜完成《Embabel on Spring Boot：心智模型到落地》課程！'
          }
        ],
        prompts: [
          {
            id: 'd1-p9',
            title: 'AI 輔助：專案重構與整體架構評查',
            note: '將您想落地或已完成的 Agent 程式架構貼給 AI，進行整體工程性評審',
            text: `角色 (Role): 你是 Embabel 企業架構重構顧問。
任務 (Task): 我會提供一個我計劃寫成 Embabel Agent Flow 的實際業務場景，或是我現有的 Java 程式骨架。請幫我評審此架構並給出重構建議：
1. 評估資料載體（Record）的邊界劃分是否清晰、是否符合強型別設計。
2. 檢查各 Action 的 Pre/Postconditions 聲明是否足夠讓 GOAP Planner 推導，有無潛在的規劃死胡同（dead end）。
3. 檢查 Domain @LlmTool 是否有被過度暴露，如何優化為最小工具集。
4. 提供一個合適的 ActionAudit 監控指標建議。
格式 (Format): 結構化重構報告，包含「架構優點」「待重構點」「具體程式碼建議」。
限制 (Constraint): 不要寫空泛的 AI 建議，必須針對 Java/Spring Boot 生態與 Embabel 規劃器的特性給出實質代碼級重構指標。

我的業務場景或 Java 程式碼：
（在此貼上，例如 CustomerCareAgent.java 或您公司的業務描述）`,
            example: `我的業務場景或 Java 程式碼：
（貼上下方參考檔案 CustomerCareAgent.java 全文）`,
            exampleFiles: ['CustomerCareAgent.java']
          }
        ],
        tasks: [
          { id: 'd2-u3-t3', label: '點選側邊欄「結訓測驗」，完成 8 題核心概念題並順利交卷' },
          { id: 'd2-u3-t4', label: '使用「AI 輔助提示詞⑨」對 CustomerCareAgent 進行架構評審演練，規劃您公司流程的落地重構' }
        ],
        materials: [
          { id: 'd1-m4', name: '案例程式骨架（CustomerCareAgent.java）', type: 'JAVA', desc: '架構評查與重構演練輸入（u-3 / u-9）' }
        ],
        illustrations: [
          { name: 'day1-u1-jvm-agent', kind: 'hero', alt: 'Embabel 系統落地全景圖', spec: '落地全景圖' },
          { name: 'day2-u3-test', kind: 'diagram', alt: '完課整合與系統測試驗收', spec: '完課整合' }
        ]
      }
    ]
  },

  // ============================================================
  // materials — 跨單元素材總覽（與 getMaterialUrl 路由三處同步）
  // ============================================================
  materials: [
    { id: 'd1-m1', name: '營運流程清單範例（business-process-list-sample.md）', type: 'MD', desc: '提示詞①的範例輸入（u-1）' },
    { id: 'd1-m3', name: 'GOAP Action 表範例（goap-action-table-sample.md）', type: 'MD', desc: '提示詞②的期望輸出（u-2）' },
    { id: 'd1-m4', name: '案例程式骨架（CustomerCareAgent.java）', type: 'JAVA', desc: '提示詞③的期望輸出（u-3）' },
    { id: 'd1-m5', name: '客戶 4711 範例資料（traveller-activity-sample.json）', type: 'JSON', desc: '演練輸入與測試 mock（u-4 / u-8）' },
    { id: 'd2-m1', name: '依賴範本（pom-sample.xml）', type: 'XML', desc: '提示詞⑤的期望輸出（u-5）' },
    { id: 'd2-m2', name: '設定範本（application-sample.yml）', type: 'YML', desc: '@ConfigurationProperties 示範（u-5）' },
    { id: 'd2-m3', name: '服務政策文件（travel-policy.md）', type: 'MD', desc: 'Agentic RAG 檢索對象（u-7）' },
    { id: 'd2-m4', name: '測試與上線檢查表範例（test-checklist-sample.md）', type: 'MD', desc: '提示詞⑧的期望輸出（u-8）' },
    { id: 'd2-m5', name: '稽核日誌範例（action-audit-sample.json）', type: 'JSON', desc: '提示詞⑦演練與稽核分析輸入（u-7）' }
  ],

  // ============================================================
  // furtherReading — 課程內容出處（外部連結，新分頁開啟）
  // 課程講解內容已整理進各單元，原文僅供延伸閱讀
  // ============================================================
  furtherReading: [
    { title: 'Embabel: A New Agent Platform For The JVM（動機與 JVM 主張）', url: 'https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014' },
    { title: 'AI for your Gen AI: How and Why Embabel Plans（GOAP）', url: 'https://medium.com/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6' },
    { title: 'Ground Your AI Transformation on What Works Today（本課案例出處）', url: 'https://medium.com/@springrod/ground-your-ai-transformation-on-what-works-today-bfc525418118' },
    { title: 'Building a Chatbot with Embabel: Agentic RAG', url: 'https://medium.com/@springrod/building-a-chatbot-with-embabel-agentic-rag-b26a8346cb16' },
    { title: 'Yes, You Can Unit Test Gen AI Applications', url: 'https://medium.com/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45' },
    { title: 'Embabel GitHub（官方文件與範例）', url: 'https://github.com/embabel/embabel-agent' },
    { title: 'OODA Loop — Wikipedia（Embabel replanning 的理論基礎，官方文件指定背景閱讀）', url: 'https://en.wikipedia.org/wiki/OODA_loop' }
  ],

  // ============================================================
  // quiz — 結訓測驗 8 題（append-only）
  // ============================================================
  quiz: [
    {
      id: 'q1',
      type: 'single',
      q: 'GOAP 規劃中，planner 找出 action chain 的依據是什麼？',
      options: [
        '由 LLM 在每一步自由選擇下一個工具',
        '依 action 的 preconditions / postconditions 與 goal，從目前 world state 搜尋路徑',
        '依開發者硬編碼的固定執行順序'
      ],
      answer: 1,
      sourceUnit: 'day1-u-2'
    },
    {
      id: 'q2',
      type: 'single',
      q: '在 Embabel 中，@Action 方法簽章 `ActivitySummary summarize(TravellerActivity activity)` 表達了什麼？',
      options: [
        '這個 action 需要 blackboard 上有 TravellerActivity，執行後 blackboard 會出現 ActivitySummary',
        '這個 action 會直接回覆使用者一段文字',
        '這個 action 只能被 @AchievesGoal 的方法呼叫'
      ],
      answer: 0,
      sourceUnit: 'day1-u-3'
    },
    {
      id: 'q3',
      type: 'single',
      q: '關於 Blackboard 的描述，何者正確？',
      options: [
        '它是一個全域字串 map，action 用魔法字串存取',
        '它只儲存最後一個 action 的輸出',
        '它是 action 間共享的狀態區，Embabel 依型別與名稱把物件綁定到 method parameters'
      ],
      answer: 2,
      sourceUnit: 'day1-u-4'
    },
    {
      id: 'q4',
      type: 'single',
      q: '關於 Embabel 專案的依賴管理，何者正確？',
      options: [
        'Spring AI 需要開發者自行加 BOM 管理版本',
        'Spring AI 由 Embabel starter 自動傳遞帶入，不要另外加 BOM；Java 最低需求為 21',
        '只能用 Kotlin 開發'
      ],
      answer: 1,
      sourceUnit: 'day1-u-5'
    },
    {
      id: 'q5',
      type: 'single',
      q: '案例中「判斷客戶是否為高消費」的正確做法是？',
      options: [
        'TravellerActivity 用 @LlmTool 暴露 totalSpend() 等統計方法，由 Java 計算、LLM 引用',
        '把 trips 清單貼進 prompt，請 LLM 自己加總',
        '先寫進向量資料庫再用 RAG 查回來'
      ],
      answer: 0,
      sourceUnit: 'day1-u-6'
    },
    {
      id: 'q6',
      type: 'single',
      q: '對需要 LLM 的 action，Embabel 建議的可測試重點是什麼？',
      options: [
        '無法測試，只能上線後人工抽查',
        '只測最終輸出字串是否完全相等',
        '測 prompt 是否帶齊重要資料、是否使用正確模型角色、是否暴露正確工具'
      ],
      answer: 2,
      sourceUnit: 'day1-u-8'
    },
    {
      id: 'q7',
      type: 'single',
      q: '關於 Embabel 的 Agentic RAG 與 ActionAudit 的描述，下列何者正確？',
      options: [
        'Agentic RAG 會在流程開始前將整份法規庫硬塞入 context；ActionAudit 只記錄 Token 總數而不記錄步驟',
        'Agentic RAG 允許 LLM 依推理需求主動決定何時與如何檢索；ActionAudit 能記錄每步 Prompt、Tool 呼叫及 Token 以實現可解釋性',
        '兩者都是傳統的硬編碼機制，與 AI 模型規劃無關'
      ],
      answer: 1,
      sourceUnit: 'day1-u-7'
    },
    {
      id: 'q8',
      type: 'single',
      q: '關於 Embabel 的 A* 演算法與權重設定，下列何者正確？',
      options: [
        'GOAP 規劃器使用 A* 最短路徑演算法，依每個 action 的 cost 累加找出最低總成本路徑；@Cost annotation 可在規劃階段根據 blackboard 狀態動態調整成本',
        '@Action 的 cost 只能在程式碼中硬編碼，無法根據即時狀態動態調整',
        'A* 演算法由 LLM 執行搜尋，所以路徑選擇可能出現幻覺'
      ],
      answer: 0,
      sourceUnit: 'day1-u-5'
    }
  ]
};
