package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Default constructor
    public Department() {
    }

    // Constructor used by DataLoader
    public Department(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter
    public Long getId() {
        return id;
    }

    // Setter
    public void setId(Long id) {
        this.id = id;
    }

    // Getter
    public String getName() {
        return name;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }
}