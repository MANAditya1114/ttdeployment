package com.example.demo.entity;

import com.example.demo.enums.ComplaintStatus;
import com.example.demo.enums.PriorityLevel;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String userEmail;

    private String assignedTo;

    /* ⭐ NEW */
    private String assignedAdminEmail;

    private String attachmentPath;

    @ManyToOne
    @JoinColumn(name="department_id")
    private Department department;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    @Enumerated(EnumType.STRING)
    private PriorityLevel priority;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Complaint(){}

    /*
    =====================================
    ID
    =====================================
    */

    public Long getId(){ return id; }

    /* ⭐ SAFE ADDITION */
    public void setId(Long id){
        this.id = id;
    }

    /*
    =====================================
    TITLE
    =====================================
    */

    public String getTitle(){ return title; }

    public void setTitle(String title){
        this.title=title;
    }

    /*
    =====================================
    DESCRIPTION
    =====================================
    */

    public String getDescription(){ return description; }

    public void setDescription(String description){
        this.description=description;
    }

    /*
    =====================================
    USER EMAIL
    =====================================
    */

    public String getUserEmail(){ return userEmail; }

    public void setUserEmail(String userEmail){
        this.userEmail=userEmail;
    }

    /*
    =====================================
    ASSIGNED TO
    =====================================
    */

    public String getAssignedTo(){ return assignedTo; }

    public void setAssignedTo(String assignedTo){
        this.assignedTo=assignedTo;
    }

    /*
    =====================================
    ASSIGNED ADMIN EMAIL
    =====================================
    */

    public String getAssignedAdminEmail(){
        return assignedAdminEmail;
    }

    public void setAssignedAdminEmail(String assignedAdminEmail){
        this.assignedAdminEmail = assignedAdminEmail;
    }

    /*
    =====================================
    STATUS
    =====================================
    */

    public ComplaintStatus getStatus(){ return status; }

    public void setStatus(ComplaintStatus status){
        this.status=status;
    }

    /*
    =====================================
    PRIORITY
    =====================================
    */

    public PriorityLevel getPriority(){ return priority; }

    public void setPriority(PriorityLevel priority){
        this.priority=priority;
    }

    /*
    =====================================
    CREATED AT
    =====================================
    */

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }

    /* ⭐ AUTO TIMESTAMP */
    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }

    /*
    =====================================
    ATTACHMENT
    =====================================
    */

    public String getAttachmentPath(){
        return attachmentPath;
    }

    public void setAttachmentPath(String attachmentPath){
        this.attachmentPath=attachmentPath;
    }

    /*
    =====================================
    DEPARTMENT
    =====================================
    */

    public Department getDepartment(){
        return department;
    }

    public void setDepartment(Department department){
        this.department=department;
    }
}