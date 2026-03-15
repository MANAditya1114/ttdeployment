package com.example.demo.config;

import com.example.demo.entity.Department;
import com.example.demo.repository.DepartmentRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadDepartments(DepartmentRepository repository) {

        return args -> {

            if(repository.count() == 0){

                repository.save(new Department(null,"Electrical"));
                repository.save(new Department(null,"IT Support"));
                repository.save(new Department(null,"Plumbing"));
                repository.save(new Department(null,"Internet / Network"));
                repository.save(new Department(null,"Hostel Maintenance"));
                repository.save(new Department(null,"Cleaning / Sanitation"));
                repository.save(new Department(null,"Security"));
                repository.save(new Department(null,"Water Supply"));

                System.out.println("Default departments inserted");
            }

        };
    }
}