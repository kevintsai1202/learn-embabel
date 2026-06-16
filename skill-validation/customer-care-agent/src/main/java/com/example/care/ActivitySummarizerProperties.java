package com.example.care;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 摘要與方案產生的業務門檻設定；依技能規則，門檻放設定檔而非寫死在 prompt。
 */
@ConfigurationProperties(prefix = "example.activity-summarizer")
public record ActivitySummarizerProperties(
        int maxWords,
        float highSpenderThreshold,
        float highTripsPerYearThreshold
) {}
