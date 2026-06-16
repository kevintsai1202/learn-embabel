package com.example.care;

import org.springframework.ai.tool.annotation.Tool;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

/**
 * 領域型別集合（Blackboard facts）；依技能要求全部使用 Java record，
 * 避免 Map<String,Object> 與魔法字串 key。
 */
final class Domain {
    private Domain() {}
}

/** 客戶查詢請求（流程輸入事實） */
record CustomerQuery(Long customerId, String question) {}

/** 單次旅程紀錄 */
record Trip(String from, String to, Instant departure, Instant arrival, float amount) {}

/**
 * 旅遊活動資料；統計數字由 Java 計算（domain @Tool），避免 LLM 心算。
 */
record TravellerActivity(String name, Instant from, Instant to, List<Trip> trips) {

    /** 回傳期間內總消費 */
    @Tool(description = "Total travel spend in the selected period")
    public float totalSpend() {
        return trips.stream().map(Trip::amount).reduce(0f, Float::sum);
    }

    /** 回傳年化旅遊次數 */
    @Tool(description = "Trips per year in the selected period")
    public float tripsPerYear() {
        long days = Duration.between(from, to).toDays();
        return days == 0 ? trips.size() : (trips.size() * 365f) / days;
    }
}

/** LLM 產出的活動摘要（結構化輸出） */
record ActivitySummary(String text, boolean highSpender, boolean frequentTraveler) {}

/** LLM 產出的方案草稿 */
record OfferDraft(String offer, String rationale) {}

/** 經規則審核後可發送的方案（terminal goal fact） */
record ReviewedOffer(String offer, String approvedBy) {}
