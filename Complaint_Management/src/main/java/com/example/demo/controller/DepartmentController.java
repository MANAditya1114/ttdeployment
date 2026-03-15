package com.example.demo.controller;

import com.example.demo.entity.Department;
import com.example.demo.service.DepartmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    /*
    =============================
    CREATE DEPARTMENT
    =============================
    */

    @PostMapping
    public Department createDepartment(@RequestParam String name) {
        return departmentService.createDepartment(name);
    }

    /*
    =============================
    GET ALL DEPARTMENTS
    =============================
    */

    @GetMapping
    public List<Department> getDepartments() {
        return departmentService.getAllDepartments();
    }
}