package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EventsController {

    private final CampusFlowService campusFlowService;

    public EventsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/events")
    public ResponseEntity<List<Map<String, Object>>> listEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(campusFlowService.getEvents());
    }

    @PostMapping("/events/{id}/register")
    public ResponseEntity<Map<String, String>> register(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Registered for event " + id));
    }

    @DeleteMapping("/events/{id}/register")
    public ResponseEntity<Map<String, String>> unregister(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Unregistered from event " + id));
    }

    @PostMapping("/events/{id}/reminder")
    public ResponseEntity<Map<String, String>> reminder(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Reminder scheduled for event " + id));
    }
}
