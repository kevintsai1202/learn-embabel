package com.example.care;

import com.embabel.agent.api.annotation.AchievesGoal;
import com.embabel.agent.api.annotation.Action;
import com.embabel.agent.api.annotation.Agent;
import com.embabel.agent.api.common.Ai;

/**
 * 客戶照護 Agent，負責把查詢請求轉成經審核的個人化方案。
 * （依 embabel-spring-ai-dev 技能 Agent Skeleton 範本撰寫）
 */
@Agent(description = "客戶活動摘要與個人化方案")
public class CustomerCareAgent {

    /**
     * 讀取既有報表服務中的旅遊活動資料（純 Java action）。
     */
    @Action
    TravellerActivity fetchActivity(CustomerQuery query, TravelActivityReportingService service) {
        return service.report(query.customerId());
    }

    /**
     * 使用 LLM 摘要旅遊活動；統計數字由 TravellerActivity 的 @Tool 方法提供。
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
     * 根據摘要產生方案草稿（LLM action，不暴露額外工具）。
     */
    @Action
    OfferDraft proposeOffer(ActivitySummary summary, Ai ai) {
        return ai.withDefaultLlm()
                .createObject("Create an offer draft for this summary: " + summary, OfferDraft.class);
    }

    /**
     * 檢查方案是否符合公司規則，通過後才達成目標（Java 規則 gate）。
     */
    @AchievesGoal(description = "產出可發送的個人化方案")
    @Action
    ReviewedOffer reviewOffer(OfferDraft draft, OfferPolicy policy) {
        policy.assertAllowed(draft);
        return new ReviewedOffer(draft.offer(), "policy");
    }
}
