package com.example.demo.controller;

import com.example.demo.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestEmailController {

    private final EmailService emailService;

    public TestEmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/email")
    public String sendTestEmail() {

        emailService.sendEmail(
                "cms.notifications.aditya@gmail.com",
                "Spring Boot Email Test",
                "Email system is working successfully."
        );

        return "Email Sent Successfully";
    }
}