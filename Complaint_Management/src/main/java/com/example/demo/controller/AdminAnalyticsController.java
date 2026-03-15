package com.example.demo.controller;

import com.example.demo.entity.Complaint;
import com.example.demo.enums.ComplaintStatus;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminAnalyticsController {

    private final ComplaintRepository complaintRepository;

    public AdminAnalyticsController(ComplaintRepository complaintRepository){
        this.complaintRepository = complaintRepository;
    }

    @GetMapping("/analytics")
    public Map<String,Object> getAnalytics(){

        List<Complaint> complaints = complaintRepository.findAll();

        int total = complaints.size();

        int pending = (int) complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.PENDING)
                .count();

        int resolved = (int) complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                .count();

        Map<String,Integer> departmentCount = new HashMap<>();

        for(Complaint c : complaints){

            String dept = c.getAssignedTo();

            if(dept == null){
                dept = "Unassigned";
            }

            departmentCount.put(
                    dept,
                    departmentCount.getOrDefault(dept,0) + 1
            );
        }

        Map<String,Object> result = new HashMap<>();

        result.put("total",total);
        result.put("pending",pending);
        result.put("resolved",resolved);
        result.put("departments",departmentCount);

        return result;
    }
}