package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CampusFlowService campusFlowService;

    public AdminController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        return ResponseEntity.ok(campusFlowService.getAdminStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> listUsers() {
        return ResponseEntity.ok(campusFlowService.getUsers());
    }

    @PatchMapping("/users/{id}/approve")
    public ResponseEntity<Map<String, String>> approve(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Approved user " + id));
    }

    @PatchMapping("/users/{id}/reject")
    public ResponseEntity<Map<String, String>> reject(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Rejected user " + id));
    }
}
