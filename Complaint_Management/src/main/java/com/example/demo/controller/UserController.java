package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/test")
    public String userTest() {
        return "User access granted ✅";
    }

    @GetMapping("/dashboard")
    public String userDashboard() {
        return "Welcome to User Dashboard 👤";
    }
}