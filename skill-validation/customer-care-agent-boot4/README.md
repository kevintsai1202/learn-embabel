# Boot 4 相容性重現專案（已知失敗，2026-06-12）

此專案用於重現 Embabel 在 Spring Boot 4 上的不相容問題，**目前無法啟動**，留作紀錄。
可運作的版本請看隔壁的 `customer-care-agent/`（Spring Boot 3.5.14 + Embabel 0.4.0，5/5 測試通過）。

## 實測矩陣（context 啟動結果）

| Embabel | Spring AI | Boot | 結果 |
|---|---|---|---|
| 0.4.0 | 1.1.5（傳遞） | 4.0.7 | ❌ `NoSuchMethodError: HttpHeaders.addAll`（spring-ai-openai 1.1.x vs Framework 7） |
| 0.4.0 | 2.0.0-RC2 | 4.0.7 | ❌ `ClassNotFoundException: o.s.ai.openai.api.OpenAiApi`（RC2 移除該類別） |
| 0.4.0 | 2.0.0-M2 / M1 | 4.0.7 | ❌ `NoSuchMethodError: OpenAiChatModel$Builder.retryTemplate(...)` |
| 0.3.5 | 2.0.0-M1 | 4.0.7 | ❌ 同上（與 issue #1052 留言的成功案例無法重現） |
| 0.4.0 | 1.1.5（傳遞） | **3.5.14** | ✅ 全部通過（見 `../customer-care-agent/`） |

## 官方狀態（embabel/embabel-agent#1052）

- Spring Boot 4 支援排在 **Embabel 2.0.0**（label：`release-2.0`、`waiting-on-3rd-party`），依賴 Spring AI 2.0 GA
- Spring AI 2.0 截至 2026-06-12 仍為 RC2；Embabel Maven Central 最新僅 0.4.0
- 結論：**正式專案請用 Spring Boot 3.5.x，等 Embabel 2.0 GA 再升 Boot 4**
