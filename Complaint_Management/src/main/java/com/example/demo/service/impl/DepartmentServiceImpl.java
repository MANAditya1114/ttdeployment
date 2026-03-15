package com.example.demo.service.impl;

import com.example.demo.entity.Department;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.service.DepartmentService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(
            DepartmentRepository departmentRepository){

        this.departmentRepository=departmentRepository;
    }

    @Override
    public Department createDepartment(String name){

        if(departmentRepository.findByName(name).isPresent()){
            throw new RuntimeException("Department already exists");
        }

        Department d = new Department();
        d.setName(name);

        return departmentRepository.save(d);
    }

    @Override
    public List<Department> getAllDepartments(){
        return departmentRepository.findAll();
    }
}