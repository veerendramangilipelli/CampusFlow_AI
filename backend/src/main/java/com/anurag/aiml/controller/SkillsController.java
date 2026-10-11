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
public class SkillsController {

    private final CampusFlowService campusFlowService;

    public SkillsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/skills/me")
    public ResponseEntity<List<Map<String, Object>>> getSkills() {
        return ResponseEntity.ok(campusFlowService.getSkills());
    }

    @GetMapping("/skills/me/gaps")
    public ResponseEntity<List<String>> getSkillGaps() {
        return ResponseEntity.ok(campusFlowService.getSkillGaps());
    }

    @GetMapping("/learning-path/me")
    public ResponseEntity<List<Map<String, Object>>> getLearningPath() {
        return ResponseEntity.ok(campusFlowService.getLearningPath());
    }

    @GetMapping("/recommendations/practice")
    public ResponseEntity<List<Map<String, Object>>> getPracticeRecommendations() {
        return ResponseEntity.ok(campusFlowService.getRecommendedPractice());
    }
}
