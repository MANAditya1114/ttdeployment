package com.example.demo.dto;

import com.example.demo.enums.PriorityLevel;

public class ComplaintRequest {

    private String title;
    private String description;
    private PriorityLevel priority;

    // ⭐ NEW FIELD
    private Long departmentId;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    // ⭐ NEW GETTER
    public Long getDepartmentId() {
        return departmentId;
    }

    // ⭐ NEW SETTER
    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}