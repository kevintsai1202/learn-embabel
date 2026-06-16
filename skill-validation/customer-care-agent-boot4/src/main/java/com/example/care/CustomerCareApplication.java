package com.example.care;

import com.embabel.agent.config.annotation.EnableAgents;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * 應用程式入口；啟用 Embabel agent 掃描與業務門檻設定綁定。
 * （依 embabel-spring-ai-dev 技能 patterns-and-templates.md 的 Wiring Checklist 撰寫）
 */
@SpringBootApplication
@EnableConfigurationProperties(ActivitySummarizerProperties.class)
@EnableAgents
public class CustomerCareApplication {

    /** 啟動 Spring Boot 應用 */
    public static void main(String[] args) {
        SpringApplication.run(CustomerCareApplication.class, args);
    }
}
