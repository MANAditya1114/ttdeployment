package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.service.AuthService;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;   // ⭐ Added for validation

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /*
    =============================
    LOGIN
    =============================
    */

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request) {

        String token = authService.login(request);

        return new ApiResponse<>(
                true,
                "Login successful",
                token
        );
    }

    /*
    =============================
    REGISTER
    =============================
    */

    @PostMapping("/register")
    public ApiResponse<String> register(@Valid @RequestBody RegisterRequest request) {

        authService.register(request);

        return new ApiResponse<>(
                true,
                "User registered successfully. Check email for verification.",
                null
        );
    }

    /*
    =============================
    VERIFY EMAIL
    =============================
    */

    @GetMapping("/verify/{token}")
    public ApiResponse<String> verify(@PathVariable String token){

        authService.verifyAccount(token);

        return new ApiResponse<>(
                true,
                "Account verified successfully",
                null
        );
    }

    /*
    =============================
    FORGOT PASSWORD
    =============================
    */

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody Map<String,String> body){

        authService.forgotPassword(body.get("email"));

        return new ApiResponse<>(
                true,
                "Reset password email sent",
                null
        );
    }

    /*
    =============================
    RESET PASSWORD
    =============================
    */

    @PostMapping("/reset-password/{token}")
    public ApiResponse<String> resetPassword(
            @PathVariable String token,
            @RequestBody Map<String,String> body){

        authService.resetPassword(token, body.get("password"));

        return new ApiResponse<>(
                true,
                "Password updated successfully",
                null
        );
    }
}