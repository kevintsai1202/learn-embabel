package com.example.care;

import com.embabel.agent.api.common.Ai;
import com.embabel.agent.api.common.PromptRunner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * 依 embabel-spring-ai-dev 技能 testing-and-troubleshooting.md 的
 * Prompt Runner Test Strategy 撰寫的單元測試。
 */
class CustomerCareAgentTest {

    private final CustomerCareAgent agent = new CustomerCareAgent();
    private final ActivitySummarizerProperties props =
            new ActivitySummarizerProperties(80, 2000.0f, 10f);

    private Ai ai;
    private PromptRunner runner;

    /** 建立 Ai / PromptRunner 假物件 */
    @BeforeEach
    void setUp() {
        ai = Mockito.mock(Ai.class);
        runner = Mockito.mock(PromptRunner.class);
    }

    /** 範例活動資料 */
    private TravellerActivity sampleActivity() {
        Instant to = Instant.parse("2026-06-01T00:00:00Z");
        Instant from = to.minus(365, ChronoUnit.DAYS);
        return new TravellerActivity("alice", from, to,
                List.of(new Trip("TPE", "NRT", from, from.plus(3, ChronoUnit.DAYS), 1200f)));
    }

    /** 驗證 summarize action 只暴露 TravellerActivity 工具並送出含門檻的 prompt（技能範例測試） */
    @Test
    void summarizeExposesOnlyActivityTools() {
        TravellerActivity activity = sampleActivity();

        when(ai.withDefaultLlm()).thenReturn(runner);
        when(runner.withToolObject(activity)).thenReturn(runner);
        when(runner.createObject(anyString(), eq(ActivitySummary.class)))
                .thenReturn(new ActivitySummary("ok", true, false));

        agent.summarize(activity, ai, props);

        verify(runner).withToolObject(activity);
        verify(runner).createObject(contains("High spender threshold"), eq(ActivitySummary.class));
    }

    /** 純 Java action：審核通過產生 ReviewedOffer */
    @Test
    void reviewOfferApprovesCompliantDraft() {
        ReviewedOffer offer = agent.reviewOffer(
                new OfferDraft("10% off next trip", "loyal customer"), new OfferPolicy());
        assertEquals("10% off next trip", offer.offer());
        assertEquals("policy", offer.approvedBy());
    }

    /** 純 Java action：違規草稿不得達成 terminal goal */
    @Test
    void reviewOfferRejectsPolicyViolation() {
        assertThrows(IllegalStateException.class, () ->
                agent.reviewOffer(new OfferDraft("free unlimited flights", "x"), new OfferPolicy()));
    }

    /** domain @Tool 計算獨立於 LLM 可測（技能 Tool tests 層） */
    @Test
    void domainToolCalculationsAreCorrect() {
        TravellerActivity activity = sampleActivity();
        assertEquals(1200f, activity.totalSpend(), 0.001f);
        assertEquals(1f, activity.tripsPerYear(), 0.01f);
    }
}
