package com.anurag.aiml.controller;

import com.anurag.aiml.entity.User;
import com.anurag.aiml.entity.UserRole;
import com.anurag.aiml.entity.UserStatus;
import com.anurag.aiml.repository.UserRepository;
import com.anurag.aiml.security.JwtTokenProvider;
import com.anurag.aiml.service.CampusFlowService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final CampusFlowService campusFlowService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                         JwtTokenProvider jwtTokenProvider,
                         CampusFlowService campusFlowService,
                         UserRepository userRepository,
                         PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.campusFlowService = campusFlowService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = campusFlowService.findByEmail(request.email()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
        if (user.getStatus() == UserStatus.PENDING) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Account pending approval"));
        }

        String token = jwtTokenProvider.generateToken(request.email(), user.getRole().name());
        Map<String, Object> payload = new HashMap<>();
        payload.put("token", token);
        payload.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().name(),
                "department", user.getDepartment()));
        return ResponseEntity.ok(payload);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (request.role() == UserRole.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Administrator accounts are provisioned by the system"));
        }

        String email = request.email().trim();
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already registered"));
        }
        if (request.role() == UserRole.STUDENT && request.studentId() != null && userRepository.existsByStudentId(request.studentId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Student ID already registered"));
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setDepartment(request.department());
        user.setRole(request.role());
        user.setStatus(request.role() == UserRole.STUDENT ? UserStatus.ACTIVE : UserStatus.PENDING);
        user.setStudentId(request.studentId());
        user.setProgram(request.program());
        user.setAcademicYear(request.academicYear());
        user.setSemester(request.semester());
        user.setEmployeeId(request.employeeId());
        user.setDesignation(request.designation());
        user.setPlacementDepartment(request.placementDepartment());

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Registration successful"));
    }

    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}

    public record RegisterRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank String password,
            String phone,
            @NotBlank String department,
            @NotNull UserRole role,
            String studentId,
            String program,
            String academicYear,
            Integer semester,
            String employeeId,
            String designation,
            String placementDepartment) {}
}
