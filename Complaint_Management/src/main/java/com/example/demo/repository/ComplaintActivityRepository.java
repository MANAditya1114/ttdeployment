package com.example.demo.repository;

import com.example.demo.entity.ComplaintActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintActivityRepository
        extends JpaRepository<ComplaintActivity, Long> {

    List<ComplaintActivity> findByComplaintIdOrderByTimestampAsc(Long complaintId);

}