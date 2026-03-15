package com.example.demo.controller;

import com.example.demo.dto.AuditLogResponse;
import com.example.demo.entity.AuditLog;
import com.example.demo.repository.AuditLogRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/audit")
public class AuditController {

    private final AuditLogRepository auditRepository;

    public AuditController(AuditLogRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    @GetMapping("/{complaintId}")
    public List<AuditLogResponse> getAuditLogs(@PathVariable Long complaintId) {

        List<AuditLog> logs =
                auditRepository.findByComplaintIdOrderByCreatedAtAsc(complaintId);

        return logs.stream()
                .map(log -> new AuditLogResponse(
                        log.getAction(),
                        log.getPerformedBy(),
                        log.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}