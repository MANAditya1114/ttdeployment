package com.example.demo.exception;

import com.example.demo.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<?>> handleRuntime(RuntimeException ex) {

        ApiResponse<?> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null
        );

        return ResponseEntity.badRequest().body(response);
    }

}