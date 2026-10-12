package com.anurag.aiml.controller;

import com.anurag.aiml.service.CampusFlowService;
import com.anurag.aiml.entity.AssignmentSubmission;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AssignmentsController {

    private final CampusFlowService campusFlowService;

    public AssignmentsController(CampusFlowService campusFlowService) {
        this.campusFlowService = campusFlowService;
    }

    @GetMapping("/assignments/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Map<String, Object>>> studentAssignments(Authentication authentication) {
        return ResponseEntity.ok(campusFlowService.getAssignmentsForStudent(authentication.getName()));
    }

    @GetMapping("/assignments")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<Map<String, Object>>> listAssignments() {
        return ResponseEntity.ok(campusFlowService.getAssignmentsForStudent());
    }

    @GetMapping("/assignments/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, Object>> assignment(@PathVariable Long id) {
        return ResponseEntity.ok(campusFlowService.getAssignment(id));
    }

    @GetMapping("/assignments/{id}/submissions/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> mySubmission(@PathVariable Long id, Authentication authentication) {
        Optional<AssignmentSubmission> submission = campusFlowService.getSubmission(id, authentication.getName());
        if (submission.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        AssignmentSubmission value = submission.get();
        return ResponseEntity.ok(Map.of(
                "id", value.getId(),
                "assignmentId", value.getAssignmentId(),
                "content", value.getContent(),
                "submittedAt", value.getSubmittedAt()));
    }

    @PostMapping("/assignments/{id}/submissions")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, Object>> submit(
            @PathVariable Long id,
            @Valid @RequestBody SubmissionRequest request,
            Authentication authentication) {
        AssignmentSubmission submission = campusFlowService.submitAssignment(id, authentication.getName(), request.content());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", submission.getId(),
                "assignmentId", submission.getAssignmentId(),
                "content", submission.getContent(),
                "submittedAt", submission.getSubmittedAt()));
    }

    public record SubmissionRequest(@NotBlank @Size(max = 10000) String content) {}
}
