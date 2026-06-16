# Patterns And Templates

## GOAP Table Prompt

```text
角色 (Role): 你是 Embabel + Spring AI 架構師。
任務 (Task): 將下列業務流程拆成 Embabel GOAP action 表。每個 action 需列出 Java method 名稱、preconditions、postconditions、執行者（Java service / LLM / rule / RAG / MCP）、失敗或 replanning 路徑。
格式 (Format): Markdown 表格 + terminal goal + 風險清單。
限制 (Constraint): 不可讓 LLM 自由決定整條流程；金額、權限、審核、對外發送必須由 Java 規則或審核 gate 控制。

業務流程：
```

## Action 可注入參數速查表

`@Action` 方法的參數由框架自動注入，不需手動繫接：

| 參數型別 | 說明 |
|----------|------|
| Domain object（如 `CustomerQuery`） | Blackboard 上的型別匹配物件（同時作為 precondition） |
| `Ai` | LLM 操作入口，提供 `withDefaultLlm()` / `withAutoLlm()` 等 |
| `ActionContext` | 可存取 Blackboard、發送訊息、啟動子流程 |
| `OperationContext` | 較低層級的上下文（含 Blackboard 存取） |
| `Blackboard` | 直接存取共享狀態區 |
| `PromptRunner` | 若需更細緻的 LLM 操作控制 |
| Spring bean（如 `TravelActivityReportingService`） | Spring DI 自動注入 |
| `@ConfigurationProperties` record | 業務門檻設定 |

範例：
```java
@Action
ActivitySummary summarize(
    TravellerActivity activity,  // Blackboard 上的 domain object
    Ai ai,                       // LLM 操作入口
    ActivitySummarizerProperties props  // Spring 設定
) { ... }
```

## Agent Skeleton

```java
/**
 * 客戶照護 Agent，負責把查詢請求轉成經審核的個人化方案。
 */
@Agent(description = "客戶活動摘要與個人化方案")
public class CustomerCareAgent {

    /**
     * 讀取既有報表服務中的旅遊活動資料。
     */
    @Action
    TravellerActivity fetchActivity(CustomerQuery query, TravelActivityReportingService service) {
        return service.report(query.customerId());
    }

    /**
     * 使用 LLM 摘要旅遊活動，但統計數字由 TravellerActivity 的 @Tool 方法提供。
     */
    @Action
    ActivitySummary summarize(TravellerActivity activity, Ai ai, ActivitySummarizerProperties props) {
        return ai.withDefaultLlm()
            .withToolObject(activity)
            .createObject("""
                Summarize the customer activity for internal service staff.
                Max words: %d
                High spender threshold: %.2f
                Frequent traveler threshold: %.2f trips per year
                Customer activity: %s
                """.formatted(
                    props.maxWords(),
                    props.highSpenderThreshold(),
                    props.highTripsPerYearThreshold(),
                    activity
                ), ActivitySummary.class);
    }

    /**
     * 根據摘要產生方案草稿；政策資料可由 RAG 或明確工具提供。
     */
    @Action
    OfferDraft proposeOffer(ActivitySummary summary, Ai ai) {
        return ai.withDefaultLlm()
            .createObject("Create an offer draft for this summary: " + summary, OfferDraft.class);
    }

    /**
     * 檢查方案是否符合公司規則，通過後才達成目標。
     */
    @AchievesGoal(description = "產出可發送的個人化方案")
    @Action
    ReviewedOffer reviewOffer(OfferDraft draft, OfferPolicy policy) {
        policy.assertAllowed(draft);
        return new ReviewedOffer(draft.offer(), "policy");
    }
}
```

Adjust method names and imports to match the actual Embabel version in the project.

## Domain Tool Pattern

```java
/**
 * 旅遊活動資料；統計數字由 Java 計算，避免 LLM 心算。
 */
public record TravellerActivity(String name, Instant from, Instant to, List<Trip> trips) {

    /**
     * 回傳期間內總消費。
     */
    @Tool(description = "Total travel spend in the selected period")
    public float totalSpend() {
        return trips.stream().map(Trip::amount).reduce(0f, Float::sum);
    }

    /**
     * 回傳年化旅遊次數。
     */
    @Tool(description = "Trips per year in the selected period")
    public float tripsPerYear() {
        long days = Duration.between(from, to).toDays();
        return days == 0 ? trips.size() : (trips.size() * 365f) / days;
    }
}
```

## RunSubagent Delegation Pattern

Use when a sub-workflow has its own GOAP planning needs and may be reused by multiple parent agents. The subagent shares the parent's Blackboard.

```java
/**
 * 子 Agent：活動分析專家，有自己的多步驟規劃。
 */
@Agent(description = "活動分析專家")
public class ActivityAnalyzer {

    /** 從報表服務讀取旅遊活動。 */
    @Action
    TravellerActivity fetch(CustomerQuery q, TravelActivityReportingService svc) {
        return svc.report(q.customerId());
    }

    /** 使用 LLM 摘要活動。 */
    @AchievesGoal(description = "完成活動摘要")
    @Action
    ActivitySummary summarize(TravellerActivity a, Ai ai) { /* ... */ }
}

/**
 * 父 Agent：在 @Action 中委派給子 Agent。
 */
@Agent(description = "客戶服務總控")
public class CustomerCareOrchestrator {

    private final ActivityAnalyzer analyzer;  // Spring 注入

    /** 委派給子 Agent 完成活動分析。 */
    @Action
    ActivitySummary analyze(CustomerQuery query) {
        return RunSubagent.fromAnnotatedInstance(analyzer, ActivitySummary.class);
    }

    /** 審核方案。 */
    @AchievesGoal(description = "產出可發送的方案")
    @Action
    ReviewedOffer review(OfferDraft draft) { /* ... */ }
}
```

Three invocation styles:

| Method | Use when |
|---|---|
| `RunSubagent.fromAnnotatedInstance(bean, Type.class)` | Most common — Spring-injected `@Agent` |
| `RunSubagent.instance(agent)` | Programmatically built Agent |
| `ActionContext.asSubProcess()` | Need `ActionContext` access |

## Subagent Tool Pattern

Use when the LLM (not the developer) should decide whether to delegate to a subagent at runtime. Differs from `RunSubagent` which is developer-determined.

```java
/**
 * 將子 Agent 作為 Subagent Tool 暴露給 LLM，讓 LLM 自主決定是否委派。
 */
// 在 parent action 的 prompt runner 中：
var tool = Subagent.ofClass(ActivityAnalyzer.class)
    .consuming(CustomerQuery.class);

ai.withDefaultLlm()
    .withTool(tool)  // LLM 可自主決定是否呼叫
    .generateText("...");
```

Three styles: `Subagent.ofClass(Agent.class).consuming(Input.class)`, `Subagent.byName("name").consuming(Input.class)`, `Subagent.ofAnnotatedInstance(bean).consuming(Input.class)`.

Rule of thumb: `RunSubagent` = developer writes the delegation; `Subagent Tool` = LLM decides. Use simple `@LlmTool` for deterministic logic that does not need GOAP planning.

## Spring Boot Wiring Checklist

```java
/**
 * 應用程式入口；啟用 Embabel agent 掃描與設定綁定。
 */
@SpringBootApplication
@EnableConfigurationProperties(ActivitySummarizerProperties.class)
@EnableAgents
public class AntechinusApplication {
    public static void main(String[] args) {
        SpringApplication.run(AntechinusApplication.class, args);
    }
}
```

```java
/**
 * 摘要與方案產生的業務門檻設定。
 */
@ConfigurationProperties(prefix = "example.activity-summarizer")
public record ActivitySummarizerProperties(
    int maxWords,
    float highSpenderThreshold,
    float highTripsPerYearThreshold
) {}
```

```yaml
spring:
  application:
    name: customer-care-agent

example:
  activity-summarizer:
    max-words: 80
    high-spender-threshold: 2000.0
    high-trips-per-year-threshold: 10

logging:
  level:
    com.embabel: INFO
```

## AgentInvocation 程式化呼叫

在 REST controller 或 service 中程式化呼叫 agent（而非透過 Shell）：

```java
/**
 * 從 REST controller 程式化呼叫 agent。
 */
@PostMapping("/analyze")
ResponseEntity<ReviewedOffer> analyze(@RequestBody CustomerQuery query) {
    var invocation = AgentInvocation.builder(agentPlatform)
        .build(ReviewedOffer.class);  // 指定目標型別

    ReviewedOffer result = invocation.invoke(query);  // 同步執行
    return ResponseEntity.ok(result);
}
```

Kotlin 等價：
```kotlin
val invocation = AgentInvocation.builder(agentPlatform)
    .build<ReviewedOffer>()

val result = invocation.invoke(query)
```

也可以透過 `Autonomy` 讓 LLM 動態選擇 agent：
- **Closed mode**：`autonomy.chooseAndRunAgent(userIntent, ProcessOptions.DEFAULT)` — LLM 選最合適的 agent
- **Open mode**：`autonomy.chooseAndAccomplishGoal(...)` — LLM 選最合適的 goal，可跨 agent 組合 action

## Kotlin DSL 對照

Kotlin 可用 DSL 宣告 agent，作為 annotation model 的替代：

```kotlin
/**
 * Kotlin DSL 風格的 agent 宣告。
 */
val customerCareAgent = agent {
    name = "CustomerCareAgent"
    description = "客戶活動摘要與個人化方案"

    action<CustomerQuery, TravellerActivity>("fetchActivity") {
        // Spring service call
    }

    action<TravellerActivity, ActivitySummary>("summarize") {
        // LLM action
    }

    achievesGoal<OfferDraft, ReviewedOffer>("reviewOffer") {
        description = "產出可發送的個人化方案"
        // review logic
    }
}
```

兩種模式可混用，DSL 適合快速原型，annotation model 適合生產級專案。

## Maven Dependency Shape

Use this as a shape, not as a version authority. Verified working combo (2026-06-12): Spring Boot **3.5.14** parent + Embabel **0.4.0**. Do NOT use Spring Boot 4 with released Embabel (startup fails; see troubleshooting). Spring AI (1.1.x) comes in transitively from the Embabel starters — do not add a Spring AI BOM or starter yourself.

```xml
<!-- parent: spring-boot-starter-parent 3.5.x（Embabel 2.0 之前不可用 Boot 4） -->
<properties>
  <java.version>21</java.version>
  <embabel.version>CHECK-OFFICIAL-DOCS</embabel.version><!-- 2026-06 時為 0.4.0 -->
</properties>

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId><!-- Boot 3.x 名稱；webmvc 是 Boot 4 世代名稱 -->
  </dependency>
  <dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter</artifactId>
    <version>${embabel.version}</version>
  </dependency>
  <dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-openai</artifactId>
    <version>${embabel.version}</version>
  </dependency>
</dependencies>
```

## Review Checklist

- [ ] Each action has typed inputs and a typed return.
- [ ] Terminal action has `@AchievesGoal`.
- [ ] Business thresholds are in properties.
- [ ] Every LLM action has a prompt construction test.
- [ ] Domain calculations are Java methods, not prompt instructions.
- [ ] Tool exposure is minimal per action.
- [ ] A missing input fact cannot cause fabricated data.
- [ ] Logs/audit can reconstruct the action sequence.
