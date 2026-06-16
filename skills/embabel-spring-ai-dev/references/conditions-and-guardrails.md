# Conditions 與 Guardrails

## @Condition — 顯式布林前置條件

`@Condition` 標註的方法讓開發者在規劃時加入 boolean 門檻，影響 action 可用性。與 type-driven 的前置條件互補。

### 基本用法

```java
/**
 * 條件方法：判斷是否為高消費客戶。
 * 條件方法不應有副作用，可能被多次呼叫。
 */
@Condition
boolean isHighSpender(TravellerActivity activity) {
    return activity.totalSpend() > 5000;
}
```

- 參數若為 domain object，則在 Blackboard 上無該型別時自動回傳 `false`。
- 可接收 `OperationContext` 存取 Blackboard 和基礎設施。

### SpEL 動態條件

除了 `@Condition` 方法，也可在 `@Action` 的 `pre` 陣列中直接使用 SpEL 表達式：

```java
/**
 * 只在 urgency > 0.5 時執行。
 */
@Action(
    pre = {"spel:assessment.urgency > 0.5"}
)
public void handleUrgentIssue(Issue issue, IssueAssessment assessment) {
    // ...
}
```

SpEL 表達式以 `spel:` 前綴開始，以 camelCase 類別名稱參照 Blackboard 物件，需回傳 boolean。支援：

- 簡單屬性比較：`spel:issueAssessment.urgency > 0.0`
- 型別檢查：`spel:ghIssue instanceof T(org.kohsuke.github.GHPullRequest)`
- Collection 過濾：`spel:newEntity.newEntities.?[...].size() > 0`

---

## Guardrails — 輸入/輸出驗證框架

Guardrails 在 LLM 呼叫前後注入驗證邏輯，是 Embabel 的安全護欄標準框架。

### 核心概念

| 介面 | 驗證時機 | 說明 |
|------|---------|------|
| `UserInputGuardRail` | LLM 呼叫前 | 驗證使用者輸入或 prompt |
| `AssistantMessageGuardRail` | LLM 回應後 | 驗證 LLM 輸出（含 thinking blocks） |

### ValidationResult 與嚴重程度

```java
// 驗證結果包含一組 ValidationError
new ValidationResult(true, List.of(
    new ValidationError("policy-violation", "違反安全政策", ValidationSeverity.CRITICAL)
));
```

| 嚴重程度 | 行為 |
|---------|------|
| `INFO` | 記錄日誌，不阻止執行 |
| `WARN` | 記錄警告 |
| `CRITICAL` | 拋出 `GuardRailViolationException`，阻止 LLM 執行 |

### 實作範例 — 阻止執行

```java
/**
 * 偵測到違規內容時阻止 LLM 執行。
 */
class SafetyGuardRail implements UserInputGuardRail {

    @Override
    public @NotNull String getName() { return "SafetyGuardRail"; }

    @Override
    public @NotNull String getDescription() { return "安全政策檢查"; }

    @Override
    public @NotNull ValidationResult validate(
            @NotNull String input, @NotNull Blackboard blackboard) {
        if (containsProhibitedContent(input)) {
            return new ValidationResult(true, List.of(
                new ValidationError("safety", "包含違規內容",
                    ValidationSeverity.CRITICAL)
            ));
        }
        return ValidationResult.VALID;
    }
}
```

### 掛載 Guardrails

```java
// 在 PromptRunner 上掛載（可串接多個）
PromptRunner runner = ai.withDefaultLlm()
    .withGuardRails(new SafetyGuardRail(), new AuditGuardRail());
```

### 全域 Guardrails 設定

在 `application.properties` 中宣告全域 guardrail，套用到所有 LLM 操作：

```properties
# 所有使用者輸入都會經過這些 guardrails
embabel.agent.guardrails.user-input=com.example.ProfanityFilter,com.example.LengthValidator

# 所有 LLM 回應都會經過這些 guardrails
embabel.agent.guardrails.assistant-message=com.example.OutputValidator

# 啟動時建構失敗是否 fail-fast（預設 false）
embabel.agent.guardrails.fail-on-error=false
```

注意：全域 guardrails 是透過 `BeanUtils.instantiateClass()` 建構的 POJO，不是 Spring bean。若需存取 Spring 依賴，在 `validate()` 方法中透過 `SpringContextHolder` 延遲查找。

### 設計決策

- **Guardrail 的 `validate()` 可存取 `Blackboard`**，因此可根據工作流程中的其他實體做驗證。
- 全域 guardrail 與 per-call `withGuardRails()` 會自動合併。
- Budget Guardrail 模式：結合 `AgenticEventListener`（計數 LLM 費用）+ `UserInputGuardRail`（超預算時 CRITICAL 阻止），見官方文件 §4.29.3。
