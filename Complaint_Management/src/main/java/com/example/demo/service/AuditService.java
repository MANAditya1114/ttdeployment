package com.example.demo.service;

public interface AuditService {

    void logAction(Long complaintId, String action, String performedBy);

}