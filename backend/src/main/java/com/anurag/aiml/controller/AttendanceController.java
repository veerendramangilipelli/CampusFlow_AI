package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final CampusFlowService campusFlowService;

    public AttendanceController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/me/summary")
    public ResponseEntity<List<Map<String, Object>>> summary() {
        return ResponseEntity.ok(campusFlowService.getAttendanceByCourse());
    }

    @GetMapping("/me/history")
    public ResponseEntity<List<Map<String, Object>>> history() {
        return ResponseEntity.ok(campusFlowService.getAttendanceHistory());
    }
}
