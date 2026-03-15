package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Complaint;
import com.example.demo.entity.ComplaintActivity;
import com.example.demo.entity.Department;
import com.example.demo.entity.User;
import com.example.demo.enums.ComplaintStatus;
import com.example.demo.enums.PriorityLevel;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.ComplaintActivityRepository;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;

import org.springframework.data.domain.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final ComplaintActivityRepository activityRepository;
    private final EmailService emailService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final DepartmentRepository departmentRepository;

    public ComplaintController(
            ComplaintRepository complaintRepository,
            ComplaintActivityRepository activityRepository,
            EmailService emailService,
            SimpMessagingTemplate messagingTemplate,
            UserRepository userRepository,
            AdminRepository adminRepository,
            DepartmentRepository departmentRepository) {

        this.complaintRepository = complaintRepository;
        this.activityRepository = activityRepository;
        this.emailService = emailService;
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.departmentRepository = departmentRepository;
    }

    /*
    =====================================
    ADMIN TEST
    =====================================
    */

    @GetMapping("/admin/test")
    public String adminTest() {
        return "Admin access granted ✅";
    }

    /*
    =====================================
    CREATE COMPLAINT
    =====================================
    */

    @PostMapping("/user/complaints")
    public ApiResponse<Complaint> createComplaint(@RequestBody ComplaintRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Complaint complaint = new Complaint();

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setUserEmail(email);
        complaint.setStatus(ComplaintStatus.PENDING);

        PriorityLevel priority =
                request.getPriority() != null ?
                        request.getPriority() :
                        PriorityLevel.MEDIUM;

        complaint.setPriority(priority);

        /*
        =====================================
        AUTO ASSIGN ADMIN BASED ON DEPARTMENT
        =====================================
        */

        if(request.getDepartmentId() != null){

            Optional<Department> departmentOptional =
                    departmentRepository.findById(request.getDepartmentId());

            if(departmentOptional.isPresent()){

                Department department = departmentOptional.get();

                complaint.setDepartment(department);

                Optional<Admin> adminOptional =
                        adminRepository.findByDepartment(department.getName());

                if(adminOptional.isPresent()){

                    Admin admin = adminOptional.get();

                    complaint.setAssignedAdminEmail(admin.getEmail());

                    complaint.setAssignedTo(department.getName());

                    complaint.setStatus(ComplaintStatus.IN_PROGRESS);
                }
            }
        }

        Complaint saved = complaintRepository.save(complaint);

        ComplaintActivity activity = new ComplaintActivity();
        activity.setComplaintId(saved.getId());
        activity.setAction("Complaint Created");
        activity.setPerformedBy(email);

        activityRepository.save(activity);

        messagingTemplate.convertAndSend("/topic/complaints", saved);

        emailService.sendEmail(
                "admin@test.com",
                "New Complaint Created",
                "New complaint created\n\nUser: "
                        + email + "\nTitle: " + saved.getTitle()
        );

        return new ApiResponse<>(true,"Complaint created successfully",saved);
    }

    /*
    =====================================
    USER COMPLAINTS
    =====================================
    */

    @GetMapping("/user/complaints")
    public Page<Complaint> getUserComplaints(
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Pageable pageable =
                PageRequest.of(page,size,Sort.by("id").descending());

        return complaintRepository.findByUserEmail(email,pageable);
    }

    /*
    =====================================
    ADMIN VIEW COMPLAINTS
    =====================================
    */

    @GetMapping("/admin/complaints")
    public Page<Complaint> getAllComplaints(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable =
                PageRequest.of(page, size, Sort.by("createdAt").descending());

        return complaintRepository
                .findByAssignedAdminEmail(principal.getName(), pageable);
    }

    /*
    =====================================
    FILTER BY STATUS
    =====================================
    */

    @GetMapping("/admin/complaints/status/{status}")
    public Page<Complaint> filterByStatus(
            @PathVariable ComplaintStatus status,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size){

        Pageable pageable = PageRequest.of(page,size);

        return complaintRepository.findByStatus(status,pageable);
    }

    /*
    =====================================
    FILTER BY PRIORITY
    =====================================
    */

    @GetMapping("/admin/complaints/priority/{priority}")
    public Page<Complaint> filterByPriority(
            @PathVariable PriorityLevel priority,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size){

        Pageable pageable = PageRequest.of(page,size);

        return complaintRepository.findByPriority(priority,pageable);
    }

    /*
    =====================================
    SEARCH COMPLAINT
    =====================================
    */

    @GetMapping("/admin/complaints/search")
    public Page<Complaint> searchComplaints(
            @RequestParam String keyword,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size){

        Pageable pageable = PageRequest.of(page,size);

        return complaintRepository
                .findByTitleContainingIgnoreCase(keyword,pageable);
    }

    /*
    =====================================
    ASSIGN COMPLAINT
    =====================================
    */

    @PutMapping("/admin/complaints/{id}/assign")
    public ApiResponse<Complaint> assignComplaint(
            @PathVariable Long id,
            @RequestBody Map<String,String> body){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String adminEmail = auth.getName();

        String assignedTo = body.get("assignedTo");

        if(assignedTo == null || assignedTo.trim().isEmpty()){
            return new ApiResponse<>(false,"Assigned department required",null);
        }

        Complaint complaint = complaintRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setAssignedTo(assignedTo.trim());
        complaint.setAssignedAdminEmail(adminEmail);
        complaint.setStatus(ComplaintStatus.IN_PROGRESS);

        Complaint updated = complaintRepository.save(complaint);

        ComplaintActivity activity = new ComplaintActivity();
        activity.setComplaintId(id);
        activity.setAction("Assigned to " + assignedTo);
        activity.setPerformedBy(adminEmail);

        activityRepository.save(activity);

        return new ApiResponse<>(true,"Complaint assigned successfully",updated);
    }

    /*
    =====================================
    RESOLVE COMPLAINT
    =====================================
    */

    @PutMapping("/admin/complaints/{id}/resolve")
    public ApiResponse<Complaint> resolveComplaint(@PathVariable Long id){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String adminEmail = auth.getName();

        Complaint complaint = complaintRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(ComplaintStatus.RESOLVED);

        Complaint updated = complaintRepository.save(complaint);

        ComplaintActivity activity = new ComplaintActivity();
        activity.setComplaintId(id);
        activity.setAction("Complaint Resolved");
        activity.setPerformedBy(adminEmail);

        activityRepository.save(activity);

        emailService.sendEmail(
                complaint.getUserEmail(),
                "Complaint Resolved",
                "Your complaint has been resolved\n\nTitle: "
                        + complaint.getTitle());

        return new ApiResponse<>(true,"Complaint resolved successfully",updated);
    }

    /*
    =====================================
    FILE UPLOAD
    =====================================
    */

    @PostMapping("/user/complaints/{id}/upload")
    public ApiResponse<String> uploadFile(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file){

        try{

            Authentication auth =
                    SecurityContextHolder.getContext().getAuthentication();

            String email = auth.getName();

            Complaint complaint = complaintRepository
                    .findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Complaint not found"));

            if(file.isEmpty()){
                return new ApiResponse<>(false,"File empty",null);
            }

            String newFile =
                    "complaint_"+id+"_"+System.currentTimeMillis();

            Path path = Paths.get("uploads");

            if(!Files.exists(path)){
                Files.createDirectories(path);
            }

            Path filePath = path.resolve(newFile);

            Files.copy(file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            complaint.setAttachmentPath(newFile);

            complaintRepository.save(complaint);

            return new ApiResponse<>(true,"File uploaded successfully",newFile);

        }catch(Exception e){

            return new ApiResponse<>(false,"File upload failed",null);
        }
    }

    /*
    =====================================
    TIMELINE
    =====================================
    */

    @GetMapping("/complaints/{id}/timeline")
    public List<ComplaintActivity> getComplaintTimeline(
            @PathVariable Long id){

        return activityRepository
                .findByComplaintIdOrderByTimestampAsc(id);
    }
}