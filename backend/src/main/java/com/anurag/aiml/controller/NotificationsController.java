package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NotificationsController {

    private final CampusFlowService campusFlowService;

    public NotificationsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Map<String, Object>>> listNotifications() {
        return ResponseEntity.ok(campusFlowService.getNotifications());
    }

    @PatchMapping("/notifications/read-all")
    public ResponseEntity<Map<String, String>> markAllRead() {
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }
}
