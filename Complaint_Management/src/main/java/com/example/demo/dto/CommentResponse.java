package com.example.demo.dto;

import java.time.LocalDateTime;

public class CommentResponse {

    private Long id;
    private String userEmail;
    private String message;
    private LocalDateTime createdAt;

    public CommentResponse(Long id, String userEmail, String message, LocalDateTime createdAt) {
        this.id = id;
        this.userEmail = userEmail;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}