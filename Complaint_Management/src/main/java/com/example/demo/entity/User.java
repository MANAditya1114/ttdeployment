package com.example.demo.entity;

import com.example.demo.enums.RoleType;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    /* =============================
       DEPARTMENT (FOR ADMINS)
    ============================= */

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    /* =============================
       EMAIL VERIFICATION
    ============================= */

    private boolean verified = false;

    private String verificationToken;

    /* =============================
       PASSWORD RESET
    ============================= */

    private String resetToken;

    public User(){}

    public User(String name,String email,String password,RoleType role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId(){ return id; }

    public String getName(){ return name; }

    public String getEmail(){ return email; }

    public String getPassword(){ return password; }

    public RoleType getRole(){ return role; }

    public boolean isVerified(){ return verified; }

    public String getVerificationToken(){ return verificationToken; }

    public String getResetToken(){ return resetToken; }

    public Department getDepartment(){ return department; }

    public void setId(Long id){ this.id=id; }

    public void setName(String name){ this.name=name; }

    public void setEmail(String email){ this.email=email; }

    public void setPassword(String password){ this.password=password; }

    public void setRole(RoleType role){ this.role=role; }

    public void setVerified(boolean verified){ this.verified=verified; }

    public void setVerificationToken(String verificationToken){
        this.verificationToken=verificationToken;
    }

    public void setResetToken(String resetToken){
        this.resetToken=resetToken;
    }

    public void setDepartment(Department department){
        this.department = department;
    }
}