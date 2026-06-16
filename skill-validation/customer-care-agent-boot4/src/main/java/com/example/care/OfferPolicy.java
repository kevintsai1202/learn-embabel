package com.example.care;

import org.springframework.stereotype.Service;

/**
 * 公司方案政策規則；審核 gate 由 Java 規則控制，不交給 LLM。
 */
@Service
public class OfferPolicy {

    /** 檢查方案草稿是否合規，違規時丟出例外讓流程走失敗路徑 */
    public void assertAllowed(OfferDraft draft) {
        if (draft.offer() == null || draft.offer().isBlank()) {
            throw new IllegalStateException("Offer must not be empty");
        }
        if (draft.offer().toLowerCase().contains("free unlimited")) {
            throw new IllegalStateException("Offer violates policy: unlimited freebies not allowed");
        }
    }
}
