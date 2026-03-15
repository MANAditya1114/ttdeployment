package com.example.demo.service;

import com.example.demo.dto.ComplaintResponse;
import com.example.demo.dto.DashboardSummaryResponse;
import com.example.demo.enums.ComplaintStatus;
import org.springframework.data.domain.Page;

public interface ComplaintService {

    Page<ComplaintResponse> getUserComplaints(String email, int page, int size);

    Page<ComplaintResponse> getAllComplaints(int page, int size);

    Page<ComplaintResponse> filterByStatus(ComplaintStatus status, int page, int size);

    Page<ComplaintResponse> searchByTitle(String keyword, int page, int size);

    DashboardSummaryResponse getDashboardSummary();
}