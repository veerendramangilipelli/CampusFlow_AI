package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AssignmentsController {

    private final CampusFlowService campusFlowService;

    public AssignmentsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/assignments/me")
    public ResponseEntity<List<Map<String, Object>>> studentAssignments() {
        return ResponseEntity.ok(campusFlowService.getAssignmentsForStudent());
    }

    @GetMapping("/assignments")
    public ResponseEntity<List<Map<String, Object>>> listAssignments() {
        return ResponseEntity.ok(campusFlowService.getAssignmentsForStudent());
    }
}
