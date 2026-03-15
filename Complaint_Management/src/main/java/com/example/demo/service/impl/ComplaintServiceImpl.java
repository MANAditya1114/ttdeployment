package com.example.demo.service.impl;

import com.example.demo.dto.ComplaintResponse;
import com.example.demo.dto.DashboardSummaryResponse;
import com.example.demo.entity.Complaint;
import com.example.demo.entity.Department;
import com.example.demo.entity.User;
import com.example.demo.enums.ComplaintStatus;
import com.example.demo.enums.RoleType;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ComplaintService;
import com.example.demo.service.EmailService;
import com.example.demo.service.EmailTemplateService;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository repository;
    private final EmailService emailService;

    // ⭐ NEW
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    public ComplaintServiceImpl(
            ComplaintRepository repository,
            EmailService emailService,
            UserRepository userRepository,
            DepartmentRepository departmentRepository) {

        this.repository = repository;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }

    // Convert Entity → DTO
    private ComplaintResponse mapToDTO(Complaint c) {
        return new ComplaintResponse(
                c.getId(),
                c.getTitle(),
                c.getDescription(),
                c.getUserEmail(),
                c.getStatus(),
                c.getCreatedAt()
        );
    }

    /*
    ======================================
    CREATE COMPLAINT + AUTO ASSIGN ADMIN
    ======================================
    */

    public Complaint createComplaint(Complaint complaint) {

        complaint.setStatus(ComplaintStatus.PENDING);

        // ⭐ FIND ADMIN OF DEPARTMENT
        Department department = complaint.getDepartment();

        User admin = userRepository
                .findByRoleAndDepartmentId(RoleType.ADMIN, department.getId())
                .orElseThrow(() ->
                        new RuntimeException("No admin assigned for this department"));

        // ⭐ AUTO ASSIGN
        complaint.setAssignedTo(admin.getEmail());

        Complaint savedComplaint = repository.save(complaint);

        // Generate email template
        String emailBody =
                EmailTemplateService.complaintCreatedTemplate(savedComplaint);

        // Send email
        emailService.sendHtmlEmail(
                savedComplaint.getUserEmail(),
                "Complaint Created Successfully",
                emailBody
        );

        return savedComplaint;
    }

    /*
    ======================================
    USER COMPLAINTS
    ======================================
    */

    @Override
    public Page<ComplaintResponse> getUserComplaints(String email, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        return repository
                .findByUserEmail(email, pageable)
                .map(this::mapToDTO);
    }

    /*
    ======================================
    ADMIN COMPLAINTS
    ======================================
    */

    @Override
    public Page<ComplaintResponse> getAllComplaints(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        return repository
                .findAll(pageable)
                .map(this::mapToDTO);
    }

    /*
    ======================================
    FILTER BY STATUS
    ======================================
    */

    @Override
    public Page<ComplaintResponse> filterByStatus(ComplaintStatus status, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return repository
                .findByStatus(status, pageable)
                .map(this::mapToDTO);
    }

    /*
    ======================================
    SEARCH
    ======================================
    */

    @Override
    public Page<ComplaintResponse> searchByTitle(String keyword, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return repository
                .findByTitleContainingIgnoreCase(keyword, pageable)
                .map(this::mapToDTO);
    }

    /*
    ======================================
    DASHBOARD
    ======================================
    */

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        long total = repository.count();
        long pending = repository.countByStatus(ComplaintStatus.PENDING);
        long inProgress = repository.countByStatus(ComplaintStatus.IN_PROGRESS);
        long resolved = repository.countByStatus(ComplaintStatus.RESOLVED);

        return new DashboardSummaryResponse(
                total,
                pending,
                inProgress,
                resolved
        );
    }
}