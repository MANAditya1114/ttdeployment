package com.example.demo.dto;

import java.time.LocalDateTime;

public class AuditLogResponse {

    private String action;
    private String performedBy;
    private LocalDateTime createdAt;

    public AuditLogResponse(String action, String performedBy, LocalDateTime createdAt) {
        this.action = action;
        this.performedBy = performedBy;
        this.createdAt = createdAt;
    }

    public String getAction() {
        return action;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}