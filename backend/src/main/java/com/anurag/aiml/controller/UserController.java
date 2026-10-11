package com.anurag.aiml.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me() {
        return ResponseEntity.ok(Map.of(
                "name", "Alex Morgan",
                "email", "student@campusflow.test",
                "phone", "+91 90000 00001",
                "department", "Computer Science",
                "program", "B.Tech Computer Science",
                "studentId", "CS21B042",
                "academicYear", "2023 - 2027",
                "semester", 5));
    }

    @PutMapping("/me")
    public ResponseEntity<Map<String, String>> updateProfile() {
        return ResponseEntity.ok(Map.of("message", "Profile updated"));
    }

    @PutMapping("/me/password")
    public ResponseEntity<Map<String, String>> changePassword() {
        return ResponseEntity.ok(Map.of("message", "Password updated"));
    }
}
