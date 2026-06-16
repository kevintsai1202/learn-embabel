package com.example.care;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Spring context 啟動測試：驗證 Embabel + Spring Boot 4 在執行期是否相容。
 * 使用假 OPENAI_API_KEY 避免真實呼叫。
 */
@SpringBootTest(properties = {
        "OPENAI_API_KEY=sk-test-dummy"
})
class CustomerCareContextTest {

    @Autowired
    ApplicationContext context;

    /** context 能啟動且 agent bean 存在 */
    @Test
    void contextLoadsAndAgentRegistered() {
        assertNotNull(context.getBean(CustomerCareAgent.class));
    }
}
