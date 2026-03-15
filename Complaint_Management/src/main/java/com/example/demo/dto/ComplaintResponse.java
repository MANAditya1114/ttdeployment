package com.example.demo.dto;

import com.example.demo.enums.ComplaintStatus;
import java.time.LocalDateTime;

public class ComplaintResponse {

    private Long id;
    private String title;
    private String description;
    private String userEmail;
    private ComplaintStatus status;
    private LocalDateTime createdAt;

    public ComplaintResponse() {
    }

    public ComplaintResponse(Long id, String title, String description,
                             String userEmail, ComplaintStatus status,
                             LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userEmail = userEmail;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}