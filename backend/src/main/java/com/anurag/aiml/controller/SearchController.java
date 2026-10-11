package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final CampusFlowService campusFlowService;

    public SearchController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String q) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("courses", campusFlowService.getSearchResults(q).stream().filter(item -> item.get("subtitle").toString().contains("·")).toList());
        result.put("assignments", campusFlowService.getSearchResults(q).stream().filter(item -> item.get("subtitle").toString().contains("Web") || item.get("subtitle").toString().contains("Database") || item.get("subtitle").toString().contains("Data")).toList());
        result.put("events", campusFlowService.getSearchResults(q).stream().filter(item -> item.get("subtitle").toString().contains("Workshop") || item.get("subtitle").toString().contains("Seminar")).toList());
        result.put("drives", campusFlowService.getSearchResults(q).stream().filter(item -> item.get("subtitle").toString().contains("Engineer") || item.get("subtitle").toString().contains("Analyst")).toList());
        return ResponseEntity.ok(result);
    }
}
