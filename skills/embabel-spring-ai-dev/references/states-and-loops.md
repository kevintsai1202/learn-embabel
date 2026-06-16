# States 與迴圈狀態

## 概述

GOAP 規劃在迴圈（looping）場景中較難表達。Embabel 的 `@State` 機制讓 agent 可以在 GOAP 計畫中定義狀態機行為，支援線性階段、分支工作流、迴圈模式、和 Human-in-the-Loop。

## @State 如何與 GOAP 共存

在每個 state 內部，GOAP 規劃正常運作。當 action 回傳一個 `@State` 標註的類別時：

1. **隱藏前一個 state 物件**（非 state 物件如使用者資料保留）
2. **綁定新 state** 到 Blackboard
3. **重新規劃**，只考慮新 state 內的 actions
4. 繼續執行直到達成目標

## 基本宣告

```java
/**
 * 使用 @State 標註 parent interface，所有實作類別自動繼承 state 行為。
 */
@State
interface Stage {}

/** 評估階段。 */
record AssessStory(String content) implements Stage {
    @Action
    Stage assess() {
        if (isAcceptable()) {
            return new Done(content);
        } else {
            return new ReviseStory(content);
        }
    }
}

/** 修改階段。 */
record ReviseStory(String content) implements Stage {
    @Action
    AssessStory revise() {
        return new AssessStory(improvedContent());
    }
}

/** 完成階段。 */
record Done(String content) implements Stage {
    @AchievesGoal(description = "Processing complete")
    @Action
    Output complete() {
        return new Output(content);
    }
}
```

重點：
- `@State` 可加在 interface、abstract class 或 concrete class 上，子類別自動繼承。
- Java record 宣告在 class 內部時是隱含 static 的，適合當 state class。
- Kotlin 的 data class 預設是 inner class，**必須宣告為 top-level**。

## 迴圈狀態（Looping States）

若 action 需要回傳到已經存在過的 state 型別，使用 `clearBlackboard = true`：

```java
/**
 * 迴圈處理：每次迭代清除 Blackboard 後重新進入同型別 state。
 */
@State
record ProcessingState(String data, int iteration) implements LoopOutcome {
    @Action(clearBlackboard = true)  // 啟用迴圈
    LoopOutcome process() {
        if (iteration >= 3) {
            return new DoneState(data);       // 終止條件
        }
        return new ProcessingState(data + "+", iteration + 1);  // 迴圈
    }
}
```

沒有 `clearBlackboard = true`，planner 會看到輸出型別已存在而跳過 action。

注意：避免在 `@AchievesGoal` 的 action 上使用 `clearBlackboard = true`，因為會移除 `hasRun` 追蹤。

## 停留在當前 State

回傳 `this` 可以讓 action 不轉換 state，適合 chatbot 的對話回應：

```java
@State
record ChitchatState(String context) {
    @Action(canRerun = true)  // 必須設為 true 才能重複執行
    ChitchatState respond(UserMessage message, Ai ai) {
        var response = ai.generateText("Respond to: " + message.content());
        // 傳送回應...
        return this;  // 停留在同一 state
    }
}
```

## Human-in-the-Loop — WaitFor

`WaitFor.formSubmission()` 讓 agent 暫停執行，等待人工輸入：

```java
record HumanFeedback(String comments) {}

@State
record AssessStory(UserInput userInput, Story story) implements Stage {

    /** 暫停等待人工回饋。 */
    @Action
    HumanFeedback getFeedback() {
        return WaitFor.formSubmission("""
                Please provide feedback on the story
                %s
                """.formatted(story.text()),
                HumanFeedback.class);
    }

    /** 根據回饋決定下一步。 */
    @Action(clearBlackboard = true)
    Stage assess(HumanFeedback feedback, Ai ai) {
        var assessment = ai.withDefaultLlm().createObject(
            "Is this story acceptable? " + story.text() + " Feedback: " + feedback.comments(),
            AssessmentOfHumanFeedback.class);
        if (assessment.acceptable()) {
            return new Done(userInput, story);
        } else {
            return new ReviseStory(userInput, story, feedback);
        }
    }
}
```

執行流程：
1. Action 呼叫 `WaitFor.formSubmission()` → agent 進入 `WAITING` 狀態
2. 框架根據 record 結構產生表單
3. 使用者填寫並提交 → `HumanFeedback` 加入 Blackboard
4. Agent 恢復執行

## 傳遞資料穿越 States

使用 `clearBlackboard = true` 時，所有必要資料必須透過 state record 欄位傳遞：

```java
@State
record ReviseStory(
    UserInput userInput,       // 原始請求
    Story story,               // 當前草稿
    HumanFeedback feedback,    // 修訂指示
    Properties properties      // 設定值
) implements Stage { ... }
```

建議用一個 `Properties` record 將設定值打包，避免跨 state 時重複個別欄位。

## State Class 限制

- Java：必須是 **static nested class**（record 隱含 static，可直接使用）
- Kotlin：必須是 **top-level class**（inner class 會因外部參照導致序列化問題）
- 違反此規則會拋出 `IllegalStateException`

## 使用時機

| 場景 | 建議 |
|------|------|
| 線性多步驟、每步自然銜接 | ✅ 適合 |
| 分支工作流（決策點導向不同處理路徑） | ✅ 適合 |
| 迴圈模式（修改-審核循環） | ✅ 適合（配合 `clearBlackboard`） |
| Human-in-the-Loop | ✅ 適合（配合 `WaitFor`） |
| 純線性 GOAP 無迴圈需求 | 不需要，用標準 `@Action` 即可 |
