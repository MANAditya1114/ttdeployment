package com.example.demo.controller;

import com.example.demo.dto.DashboardSummaryResponse;
import com.example.demo.enums.ComplaintStatus;
import com.example.demo.repository.ComplaintRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class DashboardController {

    private final ComplaintRepository complaintRepository;

    public DashboardController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @GetMapping("/dashboard")
    public DashboardSummaryResponse getDashboard() {

        long total = complaintRepository.count();

        long pending = complaintRepository.countByStatus(ComplaintStatus.PENDING);

        long inProgress = complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS);

        long resolved = complaintRepository.countByStatus(ComplaintStatus.RESOLVED);

        return new DashboardSummaryResponse(
                total,
                pending,
                inProgress,
                resolved
        );
    }
}