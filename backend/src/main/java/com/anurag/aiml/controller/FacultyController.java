package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final CampusFlowService campusFlowService;

    public FacultyController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        return ResponseEntity.ok(campusFlowService.getFacultyStats());
    }
}
