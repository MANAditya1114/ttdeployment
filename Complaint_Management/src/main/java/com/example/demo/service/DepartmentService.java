package com.example.demo.service;

import com.example.demo.entity.Department;
import java.util.List;

public interface DepartmentService {

    Department createDepartment(String name);

    List<Department> getAllDepartments();

}