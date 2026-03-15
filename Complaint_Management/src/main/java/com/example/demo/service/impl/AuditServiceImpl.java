package com.example.demo.service.impl;

import com.example.demo.entity.AuditLog;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.AuditService;

import org.springframework.stereotype.Service;

@Service
public class AuditServiceImpl implements AuditService {

    private final AuditLogRepository auditRepository;

    public AuditServiceImpl(AuditLogRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    @Override
    public void logAction(Long complaintId, String action, String performedBy) {

        AuditLog log = new AuditLog();

        log.setComplaintId(complaintId);
        log.setAction(action);
        log.setPerformedBy(performedBy);

        auditRepository.save(log);
    }
}