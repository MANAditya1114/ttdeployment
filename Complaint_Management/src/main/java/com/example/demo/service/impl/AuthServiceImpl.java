package com.example.demo.service.impl;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.entity.Department;
import com.example.demo.entity.Admin;
import com.example.demo.enums.RoleType;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.AdminRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.AuthService;
import com.example.demo.service.EmailService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthServiceImpl(
            UserRepository userRepository,
            AdminRepository adminRepository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    /*
    =============================
    LOGIN
    =============================
    */

    @Override
    public String login(LoginRequest request) {

        // check users table
        var userOpt = userRepository.findByEmail(request.getEmail());

        if(userOpt.isPresent()){

            User user = userOpt.get();

            if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
                throw new RuntimeException("Invalid password");
            }

            return jwtUtil.generateToken(user.getEmail(),user.getRole().name());
        }

        // check admins table
        var adminOpt = adminRepository.findByEmail(request.getEmail());

        if(adminOpt.isPresent()){

            Admin admin = adminOpt.get();

            if(!passwordEncoder.matches(request.getPassword(),admin.getPassword())){
                throw new RuntimeException("Invalid password");
            }

            return jwtUtil.generateToken(admin.getEmail(),"ADMIN");
        }

        throw new RuntimeException("User not found");
    }

    /*
    =============================
    REGISTER
    =============================
    */

    @Override
    public void register(RegisterRequest request) {

        if(request.getRole()!=null && request.getRole().equalsIgnoreCase("ADMIN")){

            Admin admin = new Admin();

            admin.setName(request.getName());
            admin.setEmail(request.getEmail());
            admin.setPassword(passwordEncoder.encode(request.getPassword()));

            if(request.getDepartmentId()!=null){

                Department department = departmentRepository
                        .findById(request.getDepartmentId())
                        .orElseThrow(() -> new RuntimeException("Department not found"));

                admin.setDepartment(department.getName());
            }

            adminRepository.save(admin);
            return;
        }

        // user registration

        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(RoleType.USER);
        user.setVerified(true);

        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);

        userRepository.save(user);

        String link = "http://localhost:5173/verify/" + token;

        emailService.sendEmail(
                user.getEmail(),
                "Verify your account",
                "Click to verify your account:\n" + link
        );

        emailService.sendEmail(
                user.getEmail(),
                "Welcome to Complaint System",
                "Hello " + user.getName() +
                        "\nYour account was created successfully."
        );
    }

    /*
    =============================
    VERIFY EMAIL
    =============================
    */

    @Override
    public void verifyAccount(String token) {

        User user = userRepository.findByVerificationToken(token);

        if(user == null){
            throw new RuntimeException("Invalid verification token");
        }

        user.setVerified(true);
        user.setVerificationToken(null);

        userRepository.save(user);
    }

    /*
    =============================
    FORGOT PASSWORD
    =============================
    */

    @Override
    public void forgotPassword(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();

        user.setResetToken(token);

        userRepository.save(user);

        String link = "http://localhost:5173/reset-password/" + token;

        emailService.sendEmail(
                email,
                "Reset Password",
                "Click to reset password:\n" + link
        );
    }

    /*
    =============================
    RESET PASSWORD
    =============================
    */

    @Override
    public void resetPassword(String token,String password){

        User user = userRepository.findByResetToken(token);

        if(user == null){
            throw new RuntimeException("Invalid reset token");
        }

        user.setPassword(passwordEncoder.encode(password));
        user.setResetToken(null);

        userRepository.save(user);
    }
}