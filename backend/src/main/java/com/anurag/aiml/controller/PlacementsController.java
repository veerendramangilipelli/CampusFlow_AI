package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placements")
public class PlacementsController {

    private final CampusFlowService campusFlowService;

    public PlacementsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/readiness/me")
    public ResponseEntity<Map<String, Object>> readiness() {
        return ResponseEntity.ok(Map.of(
                "score", 72,
                "factors", campusFlowService.getReadinessFactors(),
                "missingData", List.of("Portfolio review", "Mock interview result")));
    }

    @GetMapping("/drives")
    public ResponseEntity<List<Map<String, Object>>> drives() {
        return ResponseEntity.ok(campusFlowService.getPlacements());
    }

    @PostMapping("/drives/{id}/register")
    public ResponseEntity<Map<String, String>> register(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Registration successful for drive " + id));
    }
}
