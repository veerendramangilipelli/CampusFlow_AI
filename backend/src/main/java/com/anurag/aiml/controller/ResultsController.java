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
public class ResultsController {

    private final CampusFlowService campusFlowService;

    public ResultsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/results/me")
    public ResponseEntity<List<Map<String, Object>>> results() {
        return ResponseEntity.ok(campusFlowService.getResults());
    }

    @GetMapping("/results/me/gpa-by-semester")
    public ResponseEntity<List<Map<String, Object>>> gpaBySemester() {
        return ResponseEntity.ok(campusFlowService.getSemesterGpa());
    }
}
