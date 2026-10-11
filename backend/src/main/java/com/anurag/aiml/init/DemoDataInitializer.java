package com.anurag.aiml.init;

import com.anurag.aiml.entity.User;
import com.anurag.aiml.entity.UserRole;
import com.anurag.aiml.entity.UserStatus;
import com.anurag.aiml.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DemoDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DemoDataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createUserIfMissing("Alex Morgan", "student@campusflow.test", "password", "+91 90000 00001", "Computer Science", UserRole.STUDENT, "CS21B042", "B.Tech Computer Science", "2023 - 2027", 5);
        createUserIfMissing("Dr. Priya Nair", "faculty@campusflow.test", "password", "+91 90000 00002", "Computer Science", UserRole.FACULTY, null, null, null, null);
        createUserIfMissing("Rahul Verma", "placement@campusflow.test", "password", "+91 90000 00003", "Training & Placement", UserRole.PLACEMENT_OFFICER, null, null, null, null);
        createUserIfMissing("Sana Iqbal", "admin@campusflow.test", "password", "+91 90000 00004", "Administration", UserRole.ADMIN, null, null, null, null);
    }

    private void createUserIfMissing(String name, String email, String rawPassword, String phone, String department, UserRole role,
                                    String studentId, String program, String academicYear, Integer semester) {
        if (userRepository.findByEmail(email).isPresent()) {
            return;
        }

        User user = new User(name, email, passwordEncoder.encode(rawPassword), phone, department, role);
        user.setStatus(UserStatus.ACTIVE);
        user.setStudentId(studentId);
        user.setProgram(program);
        user.setAcademicYear(academicYear);
        user.setSemester(semester);
        userRepository.save(user);
    }
}
