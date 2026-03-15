package com.example.demo.repository;

import com.example.demo.entity.Complaint;
import com.example.demo.enums.ComplaintStatus;
import com.example.demo.enums.PriorityLevel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Page<Complaint> findByUserEmail(String email, Pageable pageable);

    Page<Complaint> findByStatus(ComplaintStatus status, Pageable pageable);

    Page<Complaint> findByPriority(PriorityLevel priority, Pageable pageable);

    Page<Complaint> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    long countByStatus(ComplaintStatus status);

    Page<Complaint> findByDepartmentId(Long departmentId, Pageable pageable);

    Page<Complaint> findByAssignedAdminEmail(String email, Pageable pageable);
}