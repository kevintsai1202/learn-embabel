package com.example.care;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * 既有報表服務的最小替身；實務上會查資料庫或呼叫內部 API。
 */
@Service
public class TravelActivityReportingService {

    /** 依客戶 ID 取得期間內旅遊活動 */
    public TravellerActivity report(Long customerId) {
        Instant now = Instant.parse("2026-06-01T00:00:00Z");
        Instant from = now.minus(365, ChronoUnit.DAYS);
        return new TravellerActivity(
                "customer-" + customerId,
                from,
                now,
                List.of(
                        new Trip("TPE", "NRT", from.plus(30, ChronoUnit.DAYS), from.plus(33, ChronoUnit.DAYS), 1200f),
                        new Trip("TPE", "SIN", from.plus(120, ChronoUnit.DAYS), from.plus(124, ChronoUnit.DAYS), 950f)
                )
        );
    }
}
