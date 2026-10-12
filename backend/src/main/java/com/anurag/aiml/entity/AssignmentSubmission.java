package com.anurag.aiml.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "assignment_submissions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"assignment_id", "student_id"}))
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "assignment_id", nullable = false)
    private Long assignmentId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();

    protected AssignmentSubmission() {
    }

    public AssignmentSubmission(Long assignmentId, User student, String content) {
        this.assignmentId = assignmentId;
        this.student = student;
        this.content = content;
    }

    public Long getId() { return id; }
    public Long getAssignmentId() { return assignmentId; }
    public User getStudent() { return student; }
    public String getContent() { return content; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
}
