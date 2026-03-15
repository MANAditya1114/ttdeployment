package com.example.demo.controller;

import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.file.*;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {

        try {

            Path filePath;

            if (filename.toLowerCase().endsWith(".pdf")) {
                filePath = Paths.get("uploads/pdfs").resolve(filename);
            } else {
                filePath = Paths.get("uploads/images").resolve(filename);
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}