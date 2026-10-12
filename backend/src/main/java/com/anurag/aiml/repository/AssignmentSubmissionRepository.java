package com.anurag.aiml.repository;

import com.anurag.aiml.entity.AssignmentSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {
    Optional<AssignmentSubmission> findByAssignmentIdAndStudent_Id(Long assignmentId, Long studentId);
}
