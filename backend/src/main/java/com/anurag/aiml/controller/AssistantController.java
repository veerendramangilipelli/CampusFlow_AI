package com.anurag.aiml.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    @Value("${OPENAI_API_KEY:}")
    private String apiKey;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, String> payload) {
        String message = payload.getOrDefault("message", "");
        if (apiKey == null || apiKey.isBlank()) {
            return ResponseEntity.ok(Map.of(
                    "reply", "Demo response: the AI service is not connected. This answer is not verified college information.",
                    "mode", "DEMO"));
        }
        return ResponseEntity.ok(Map.of(
                "reply", "I can help with academic planning, event reminders and placement guidance. Your message: " + message,
                "mode", "LIVE"));
    }
}
