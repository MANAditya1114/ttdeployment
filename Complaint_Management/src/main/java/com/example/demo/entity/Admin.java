package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String department;

    private boolean verified = true;

    public Admin() {}

    public Admin(String name, String email, String password, String department) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
    }

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getDepartment() { return department; }

    public boolean isVerified() { return verified; }

    public void setId(Long id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setDepartment(String department) { this.department = department; }

    public void setVerified(boolean verified) { this.verified = verified; }
}