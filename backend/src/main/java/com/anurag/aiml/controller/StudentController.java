package com.anurag.aiml.controller;

import com.anurag.aiml.entity.User;
import com.anurag.aiml.repository.UserRepository;
import com.anurag.aiml.service.CampusFlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final CampusFlowService campusFlowService;
    private final UserRepository userRepository;

    public StudentController(CampusFlowService campusFlowService, UserRepository userRepository) {
        this.campusFlowService = campusFlowService;
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        User user = currentUser();
        return ResponseEntity.ok(campusFlowService.dashboardForUser(user));
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return null;
        }
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
