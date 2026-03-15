package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;

public interface AuthService {

    String login(LoginRequest request);

    void register(RegisterRequest request);

    void verifyAccount(String token);

    void forgotPassword(String email);

    void resetPassword(String token, String password);
}