package com.anurag.aiml.service;

import com.anurag.aiml.entity.AssignmentSubmission;
import com.anurag.aiml.entity.User;
import com.anurag.aiml.entity.UserRole;
import com.anurag.aiml.repository.AssignmentSubmissionRepository;
import com.anurag.aiml.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CampusFlowServiceTest {
    private UserRepository userRepository;
    private AssignmentSubmissionRepository submissionRepository;
    private CampusFlowService service;
    private User student;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        submissionRepository = mock(AssignmentSubmissionRepository.class);
        service = new CampusFlowService(userRepository, submissionRepository);
        student = new User("Test Student", "student@test.invalid", "hashed", null, "Computer Science", UserRole.STUDENT);
        student.setId(8L);
        when(userRepository.findByEmail(student.getEmail())).thenReturn(Optional.of(student));
    }

    @Test
    void savesSubmissionForAuthenticatedStudent() {
        when(submissionRepository.findByAssignmentIdAndStudent_Id(3L, student.getId())).thenReturn(Optional.empty());
        when(submissionRepository.save(any(AssignmentSubmission.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        AssignmentSubmission result = service.submitAssignment(3L, student.getEmail(), "  My completed work  ");

        assertEquals(3L, result.getAssignmentId());
        assertEquals("My completed work", result.getContent());
        assertEquals(student.getId(), result.getStudent().getId());
        verify(submissionRepository).save(any(AssignmentSubmission.class));
    }

    @Test
    void rejectsDuplicateSubmission() {
        when(submissionRepository.findByAssignmentIdAndStudent_Id(3L, student.getId()))
                .thenReturn(Optional.of(new AssignmentSubmission(3L, student, "Existing work")));

        ResponseStatusException error = assertThrows(ResponseStatusException.class,
                () -> service.submitAssignment(3L, student.getEmail(), "Duplicate work"));

        assertEquals(409, error.getStatusCode().value());
    }

    @Test
    void rejectsSubmissionForUnknownAssignment() {
        ResponseStatusException error = assertThrows(ResponseStatusException.class,
                () -> service.submitAssignment(99L, student.getEmail(), "Work"));

        assertEquals(404, error.getStatusCode().value());
    }
}
