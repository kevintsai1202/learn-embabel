# Embabel 進階功能參考

> 本文件涵蓋 Embabel 官方文件中的進階或特化功能。這些功能在特定場景下非常有用，
> 但一般 agent 開發不常用。**遇到對應需求時查閱**即可，不需要一次全部掌握。

---

## 1. Embabel Shell — 互動式命令列操作（§3）

開發階段最快測試 agent 的方式。加入 `embabel-agent-starter-shell` 依賴後，啟動 Spring Boot 即可進入 shell。

### 核心指令

| 指令 | 說明 |
|------|------|
| `help` | 列出所有可用指令 |
| `execute "文字"` | 將文字包裝為 `UserInput` 放上 Blackboard，planner 自動選 action |
| `execute -p "文字"` | 同上，但印出送給 LLM 的 prompt |
| `execute -r "文字"` | 同上，但印出 LLM 的原始回應 |
| `execute -p -r "文字"` | 同時印出 prompt 與回應——除錯最大能見度 |
| `!!` | 重複上一個指令——迭代 prompt 時特別好用 |

### 運作機制

`execute "some text"` 會將字串包裝為 `UserInput` 物件並放上 Blackboard。
Agent 的第一個 `@Action` 方法若接受 `UserInput` 作為參數，planner 就會自動選中它。
這個機制與 REST controller 或 webhook 完全相同——只是 `UserInput` 的來源不同（Shell vs HTTP request vs 事件）。

---

## 2. Reactive Triggers — 事件驅動的 Action 觸發（§4.6.7）

`@Action` 的 `trigger` 參數讓 action 只在**指定型別是最近新增到 Blackboard 的值**時才觸發。

### 核心用法

```java
// 只有在 UserMessage 是最新加入 Blackboard 的物件時才觸發
@AchievesGoal(description = "回應使用者訊息")
@Action(trigger = UserMessage.class)
public Response handleMessage(
    UserMessage message,       // 必須是 trigger 型別
    Conversation conversation  // 也必須在 Blackboard 上，但不需要是 trigger
) {
    return new Response("收到：" + message.content());
}
```

### 與一般 Action 的差異

| 模式 | 觸發條件 |
|------|---------|
| 無 `trigger` | 所有參數型別都在 Blackboard 上即觸發 |
| 有 `trigger` | 除了所有參數型別都在之外，**指定型別還必須是最近新增的** |

### 適用場景

- 多事件處理器：多個 action 處理不同事件型別（EventA vs EventB）
- 區分「資料已存在」與「事件剛發生」
- 事件驅動或 reactive 工作流
- **Chatbot 模式的基礎機制**：`@Action(trigger = UserMessage.class)` 確保 action 在每次新訊息時才觸發

---

## 3. @SecureAgentTool — 安全權限控管（§4.6.11）

宣告 `@Action` 方法或 `@Agent` 類別的安全合約。接受 Spring Security SpEL 表達式，
在 GOAP planner 執行 action body **之前**評估 `Authentication`。

### 核心用法

```java
// 類別層級——保護所有 @Action（包括中間步驟）
@Agent(description = "研究主題並產出新聞摘要")
@SecureAgentTool("hasAuthority('news:read')")
public class NewsDigestAgent {

    @Action
    public NewsTopic extractTopic(UserInput userInput, OperationContext context) { ... }

    @AchievesGoal(description = "產出新聞摘要",
        export = @Export(remote = true, name = "newsDigest",
                         startingInputTypes = {UserInput.class}))
    @Action
    public NewsDigest produceDigest(NewsTopic topic, OperationContext context) { ... }
}

// 方法層級——細粒度控制（優先於類別層級）
@SecureAgentTool("hasRole('ADMIN')")
@Action
public SensitiveReport generateReport(ReportRequest req) { ... }
```

### 注意事項

- 方法層級 annotation 優先於類別層級
- 不加 `@SecureAgentTool` 的中間 action 在沒有類別層級保護時會自由執行
- 主要用於暴露為遠端 MCP 工具的 Agent

---

## 4. Agentic Tools — 工具內巢狀 LLM 編排（§4.9.7）

**Agentic Tool** 是使用 LLM 來編排其他工具的工具。與一般執行確定性邏輯的工具不同，
agentic tool 委派給 LLM 讓它決定呼叫哪些子工具。

### 三種 Agentic Tool 類型

| 類型 | 工具可用性 | 適用場景 | 範例 |
|------|-----------|---------|------|
| `SimpleAgenticTool` | 所有工具立即可用 | 簡單編排、探索任務 | 數學計算器（加/乘/除工具） |
| `PlaybookTool` | 條件式漸進解鎖 | 結構化工作流、引導式流程 | 研究流程：搜尋 → 分析 → 摘要 |
| `StateMachineTool` | 基於 enum 狀態的可用性 | 正式狀態機、多階段流程 | 訂單處理：草稿 → 確認 → 出貨 → 送達 |

### 核心用法（SimpleAgenticTool）

```java
import com.embabel.agent.api.tool.agentic.simple.SimpleAgenticTool;

// 建立 agentic tool
SimpleAgenticTool mathOrchestrator = new SimpleAgenticTool(
        "math-orchestrator", "編排數學運算")
    .withTools(addTool, multiplyTool, divideTool)
    .withParameter(Tool.Parameter.string("expression", "要計算的數學表達式"))
    .withLlm(LlmOptions.withModel("gpt-4"));

// 當作一般工具使用
context.ai()
    .withDefaultLlm()
    .withTool(mathOrchestrator)
    .generateText("5 + 3 * 2 是多少？");
```

### 共用 API（AgenticTool 介面）

| 方法 | 說明 |
|------|------|
| `withLlm(LlmOptions)` | 設定 LLM 模型 |
| `withSystemPrompt(String)` | 設定系統提示 |
| `withSystemPrompt(AgenticSystemPromptCreator)` | 動態系統提示（可存取 ExecutingOperationContext） |
| `withMaxIterations(int)` | 最大工具迴圈次數（預設 20） |
| `withToolObject(Object)` | 加入 `@LlmTool` 物件 |

> **設計建議**：複雜工作流（有定義輸出、分支、迴圈、狀態管理）應使用 GOAP planner、Utility AI、或 @State，
> 而非 LLM 驅動的 agentic tool 編排。

---

## 5. Progressive Tools / UnfoldingTool — 漸進式工具揭露（§4.9.8）

**Progressive Tools** 啟用動態工具揭露——先呈現簡化介面，再根據上下文或 LLM 意圖揭露更細粒度的工具。

### UnfoldingTool — 最常用的漸進式工具

`UnfoldingTool` 向 LLM 呈現一個高層描述，被呼叫後才展開內部工具。
像打開折疊的地圖——先看整體，需要時再看細節。

```java
import com.embabel.agent.api.tool.progressive.UnfoldingTool;

// 建立內部工具
Tool queryTool = Tool.create("query_table", "執行 SQL 查詢",
    Tool.InputSchema.of(Tool.Parameter.string("sql", "SQL 查詢語句")),
    input -> Tool.Result.text("{\"rows\": 5}")
);
Tool insertTool = Tool.create("insert_record", "插入新紀錄",
    Tool.InputSchema.of(Tool.Parameter.string("table", "資料表名稱")),
    input -> Tool.Result.text("{\"id\": 123}")
);

// 建立 UnfoldingTool 外觀
var databaseTool = UnfoldingTool.of(
    "database_operations",
    "使用此工具操作資料庫。呼叫後可看到具體操作。",
    List.of(queryTool, insertTool)
);
```

### 適用場景

- 大量相關工具可能讓 LLM 選擇困難
- 按類別分組工具（如「資料庫操作」、「檔案操作」）
- 讓 LLM 先表達意圖再揭露細節
- 減少工具描述的 token 消耗

### Fluent Builder API

```java
// 從多來源組合工具
var combined = UnfoldingTool.of("workspace", "工作區操作", List.of(baseTool))
    .withTools(searchTool, filterTool)             // 加入個別工具
    .withToolObject(new DatabaseOperations())      // 加入 @LlmTool 類別
    .withToolObject(new FileOperations());         // 鏈式加入
```

---

## 6. Templates / Jinja — Prompt 模板引擎（§4.11）

Embabel 支援 Jinja 模板生成 prompt。透過 `PromptRunner.rendering(String)` 方法使用。

### 核心用法

```java
// 從 classpath:/prompts/factchecker/consolidate_assertions.jinja 載入模板
DistinctFactualAssertions result = context.ai()
    .withLlm(properties.deduplicationLlm())
    .rendering("factchecker/consolidate_assertions")  // 自動加 .jinja 副檔名
    .createObject(
        DistinctFactualAssertions.class,
        Map.of(
            "assertions", allAssertions,
            "reasoningWordCount", properties.reasoningWordCount()
        )
    );
```

### 自訂模板渲染器

```java
// 從不同來源載入模板（如每用戶目錄、資料庫）
TemplateRenderer perUserRenderer = createRendererForUser(userId);
String result = context.ai()
    .rendering("user-greeting")
    .withTemplateRenderer(perUserRenderer)  // 覆寫預設渲染器
    .generateText(Map.of("userName", userName));
```

### 設計建議

> 不要急著把 prompt 外部化。現代語言的多行字串通常更容易維護。
> 外部化可能犧牲型別安全並增加複雜度。——官方文件建議

---

## 7. Execution Modes — 並行執行模式（§4.15）

透過 `embabel.agent.platform.process-type` 設定控制 agent 執行模式。

### 兩種模式

| 模式 | 行為 | 適用場景 | 取捨 |
|------|------|---------|------|
| `SIMPLE`（預設） | 每次選一個最佳 action，循序執行 | 大多數 agent；action 順序重要時 | 可預測；易除錯；無並行開銷 |
| `CONCURRENT` | 每次並行執行**所有可達成的 action** | 獨立的平行子任務；fan-out/fan-in | 高吞吐；需確保 action 對共享 Blackboard 安全 |

### 啟用並行模式

```yaml
# application.yml
embabel:
  agent:
    platform:
      process-type: CONCURRENT
```

### 並行模式的 Replanning

- 多個並行 action 可能同時拋出 `ReplanRequestedException`
- 只有**第一個**請求會被接受——其 Blackboard 更新被套用、觸發 action 被暫時列入黑名單
- 黑名單在成功規劃後自動清除

---

## 8. Working with Streams — 串流回應（§4.26）

支援從 LLM 漸進式接收資料，包括原始文字串流、推理事件（thinking）、和結構化物件串流。

### 核心概念

| 概念 | 說明 |
|------|------|
| `StreamingEvent` | 包裝 Thinking 或使用者 Object |
| `StreamingPromptRunnerBuilder` | 具備串流能力的 runner |
| Spring Reactive | 基於 Spring AI ChatClient 的反應式支援 |

### 核心用法

```java
PromptRunner runner = ai.withDefaultLlm()
    .withToolObject(Tooling.class);

// 物件串流 + 推理（thinking）
Flux<StreamingEvent<MonthItem>> results = new StreamingPromptRunnerBuilder(runner)
    .streaming()
    .withPrompt("佛羅里達最熱的兩個月份與各自最高溫度")
    .createObjectStreamWithThinking(MonthItem.class);

results
    .timeout(Duration.ofSeconds(150))
    .doOnNext(event -> {
        if (event.isThinking()) {
            logger.info("推理中：{}", event.getThinking());
        } else if (event.isObject()) {
            logger.info("收到物件：{}", event.getObject().getName());
        }
    })
    .doOnComplete(() -> logger.info("串流完成"))
    .blockLast(Duration.ofSeconds(6000));

// 純文字串流
Flux<String> textStream = new StreamingPromptRunnerBuilder(runner)
    .streaming()
    .withPrompt("巴黎最高的建築是什麼？")
    .generateStream();
```

---

## 9. Working with LLM Reasoning / Thinking — 推理模式（§4.27）

取得 LLM 的推理過程（thinking blocks），用於驗證決策邏輯或理解失敗原因。

### 核心概念

| 概念 | 說明 |
|------|------|
| `ThinkingBlock` | 攜帶推理細節（tag type、tag value、推理內容） |
| `ThinkingResponse<T>` | 包含結果物件和推理 blocks 的包裝器 |
| `ThinkingException` | 物件建立失敗時保留 thinking blocks，便於除錯 |
| `runner.thinking()` | 啟用推理萃取的核心 API |

### 核心用法

```java
// 啟用 thinking block 萃取
ThinkingResponse<MonthItem> response = runner
    .thinking()
    .createObject(prompt, MonthItem.class);

MonthItem result = response.getResult();                    // 結構化結果
List<ThinkingBlock> blocks = response.getThinkingBlocks();  // 推理過程

// 處理可能失敗的情況
ThinkingResponse<MonthItem> response = runner
    .thinking()
    .createObjectIfPossible(prompt, MonthItem.class);
if (response.getResult() == null) {
    // 物件建立失敗——檢查推理了解原因
    response.getThinkingBlocks().forEach(block ->
        logger.info("LLM 推理：{}", block.getContent()));
}
```

### 供應商注意事項

- Embabel 提供供應商中立的 API（`PromptRunner.thinking()` / `LlmOptions.thinking`）
- 底層會自動映射到各供應商的特定功能（如 Google GenAI 的 `includeThoughts`）
- 推理 blocks 的存在與格式可能因供應商和 Spring AI 版本略有差異

---

## 10. Callbacks / Interceptors — Tool Loop 攔截器（§4.28）

### Tool Loop Callbacks

LLM 調用發生在 `ToolLoop` 內部。Embabel 提供兩類擴展點：

| 類別 | 用途 | 說明 |
|------|------|------|
| **Inspector**（觀察者） | 日誌、指標、除錯 | 唯讀，不修改狀態 |
| **Transformer**（轉換器） | 截斷工具結果、滑動視窗、遮蔽敏感內容 | 改變 LLM 看到的內容 |

### Inspector 回呼點

- `beforeLlmCall` — LLM 呼叫前
- `afterLlmCall` — LLM 回應後、處理 tool call 前
- `afterToolResult` — 每個工具產生結果後
- `afterIteration` — 每次完整迭代後

### 內建 Callbacks

| 名稱 | 說明 |
|------|------|
| `ToolLoopLoggingInspector` | 記錄 LLM 呼叫與工具執行細節 |
| `ToolResultTruncatingTransformer` | 截斷過長的工具結果 |
| `SlidingWindowTransformer` | 維護滑動視窗管理上下文大小 |

### 核心用法

```java
var result = ai.withDefaultLlm()
    .withTools(tools)
    .withToolLoopInspectors(callbackTracker, loggingInspector)
    .withToolLoopTransformers(truncatingTransformer, slidingWindowTransformer)
    .creating(RestaurantRecommendation.class)
    .fromPrompt("推薦一家義大利餐廳...");
```

### Tool Call Interceptors（輕量版）

適用於串流和非串流模式，只關注個別工具呼叫（不需要完整 loop context）：

```java
PromptRunner runner = ai.withDefaultLlm()
    .withToolObject(new Tooling())
    .withToolCallInspectors(new ToolCallLoggingInspector(
        ToolLoopLoggingInspector.LogLevel.INFO, logger));
```

---

## 11. Cost Tracking / Budget Guardrail — LLM 費用追蹤與預算控制（§4.29）

### 費用追蹤事件

Embabel 為每次 LLM 和 embedding 呼叫發送事件：

| 事件 | 觸發時機 |
|------|---------|
| `LlmInvocationEvent` | 每次 LLM 呼叫後 |
| `EmbeddingInvocationEvent` | 每次 embedding 呼叫後 |

每個事件提供：模型名稱/供應商、token 數量、計算成本、agent process ID。

### 費用監聽器範例

```java
public class OrganizationCostTracker implements AgenticEventListener {

    private final ConcurrentMap<String, DoubleAdder> costPerAgent = new ConcurrentHashMap<>();

    @Override
    public void onProcessEvent(AgentProcessEvent event) {
        if (event instanceof LlmInvocationEvent llm) {
            costPerAgent
                .computeIfAbsent(llm.getAgentProcess().getAgent().getName(),
                    k -> new DoubleAdder())
                .add(llm.getInvocation().cost());
        }
    }
}
```

### Budget Guardrail 模式

費用事件在呼叫**完成後**才觸發，無法阻止當次呼叫，但可以阻止**下一次**：

1. **監聽器計數**：訂閱 `LlmInvocationEvent`，按 agent/tenant/user 累計費用
2. **Guardrail 阻擋**：`UserInputGuardRail` 在下次 LLM 呼叫前讀取計數器，超預算則回傳 `CRITICAL` 阻止執行

```
LLM call ──► LlmInvocationEvent ──┐
                                   ▼
                     counter (per agent / tenant / user)
                                   │
next call ──► UserInputGuardRail reads counter ──────┘
                     │
            over budget? ──► CRITICAL ──► call blocked
```

---

## 12. Integrations — MCP Publishing / A2A / Observability（§4.33）

### MCP Server Publishing

把 Embabel Agent 暴露為 MCP server，讓 Claude Desktop、VS Code 等 MCP client 使用。

#### 設定

```yaml
spring:
  ai:
    mcp:
      server:
        type: SYNC    # 或 ASYNC
```

| 模式 | 說明 |
|------|------|
| `SYNC`（預設） | 阻塞式操作，簡單易除錯 |
| `ASYNC` | 非阻塞反應式，高並發吞吐 |

傳輸協議：SSE（`localhost:8080/sse`）。需要 Streamable HTTP 的 client 可用 `mcpo` proxy 橋接。

#### 自動發布

| 發布項目 | 機制 |
|---------|------|
| **Tools** | `@AchievesGoal` + `@Export(remote = true)` 的 action 自動發布為 MCP tool |
| **Prompts** | 根據 goal 的 `startingInputTypes` 自動生成 prompt 模板 |

#### 暴露 Agent Goal 為 MCP Tool

```java
@Agent(description = "提供天氣資訊")
public class WeatherAgent {

    @AchievesGoal(description = "取得天氣")
    @Export(remote = true)  // 自動成為 MCP tool
    @Action
    public String getWeather(
        @Param("location") String location,
        @Param("units") String units
    ) {
        return "天氣資訊：" + location + "（" + units + "）";
    }
}
```

#### 暴露既有工具/RAG 為 MCP Tool

```java
@Configuration
public class RagMcpTools {

    @Bean
    McpToolExport ragTools(SearchOperations searchOperations) {
        var toolishRag = new ToolishRag("docs", "Embabel 文件", searchOperations);
        return McpToolExport.fromLlmReference(toolishRag);
    }
}
```

### 命名策略

| 策略 | 範例 |
|------|------|
| Prefix | `name -> "myservice_" + name` |
| Uppercase | `name -> name.toUpperCase()` |
| Identity（預設） | 保持原名 |

---

## 快速索引：什麼時候該查哪一節

| 需求 | 查閱 |
|------|------|
| 開發階段快速測試 agent | §1 Shell |
| action 需要回應特定事件而非所有參數就緒 | §2 Reactive Triggers |
| 暴露為 MCP 工具的 agent 需要權限控管 | §3 @SecureAgentTool |
| 工具本身需要 LLM 編排子工具 | §4 Agentic Tools |
| 大量工具需要分組漸進揭露 | §5 Progressive Tools |
| 複雜的 prompt 需要模板化管理 | §6 Templates |
| 獨立子任務需要並行執行 | §7 Execution Modes |
| 需要漸進式回傳 LLM 輸出 | §8 Streaming |
| 需要驗證 LLM 的推理過程 | §9 Thinking |
| 需要監控或修改 LLM/工具互動 | §10 Callbacks |
| 需要追蹤或限制 LLM 費用 | §11 Cost Tracking |
| 需要把 agent 暴露為 MCP server 或跨系統整合 | §12 Integrations |
