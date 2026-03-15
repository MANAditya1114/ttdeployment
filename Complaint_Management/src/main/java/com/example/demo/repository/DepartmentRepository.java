package com.example.demo.repository;

import com.example.demo.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find department by name
    Optional<Department> findByName(String name);

    // Check if department exists
    boolean existsByName(String name);

    // Get all departments ordered by name
    List<Department> findAllByOrderByNameAsc();
}