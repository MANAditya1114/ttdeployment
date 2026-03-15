package com.example.demo.repository;

import com.example.demo.entity.User;
import com.example.demo.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByRole(RoleType role);

    boolean existsByEmail(String email);

    User findByVerificationToken(String token);

    User findByResetToken(String token);

    // ⭐ NEW METHOD
    Optional<User> findByRoleAndDepartmentId(RoleType role, Long departmentId);
}