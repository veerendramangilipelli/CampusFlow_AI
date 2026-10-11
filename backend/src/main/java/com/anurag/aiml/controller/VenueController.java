package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class VenueController {

    private final CampusFlowService campusFlowService;

    public VenueController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/venues")
    public ResponseEntity<List<Map<String, Object>>> getVenues() {
        return ResponseEntity.ok(campusFlowService.getVenues());
    }

    @PostMapping("/venues")
    public ResponseEntity<Map<String, String>> createVenue(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(Map.of("message", "Venue created"));
    }
}
