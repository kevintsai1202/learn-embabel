package com.example.care;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

/**
 * Spring Boot 4 相容橋接（embabel/embabel-agent#1052 社群解法）：
 * Boot 4 改用 Jackson 3，不再自動配置 Jackson2ObjectMapperBuilder，
 * 但 Embabel 0.x 仍依賴 Jackson 2；手動補上此 bean 讓兩者並存。
 * Embabel 2.0（Spring AI 2.0）發佈後移除。
 */
@Configuration
public class JacksonCompatConfig {

    /** 手動提供 Jackson 2 builder 給 Embabel 使用 */
    @Bean
    @SuppressWarnings("removal")
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        return new Jackson2ObjectMapperBuilder();
    }
}
