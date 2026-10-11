package com.anurag.aiml.service;

import com.anurag.aiml.entity.User;
import com.anurag.aiml.entity.UserRole;
import com.anurag.aiml.entity.UserStatus;
import com.anurag.aiml.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CampusFlowService {

    private final UserRepository userRepository;

    public CampusFlowService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> dashboardForUser(User user) {
        if (user == null) {
            return Collections.emptyMap();
        }
        Map<String, Object> summary = new LinkedHashMap<>();
        if (user.getRole() == UserRole.STUDENT) {
            summary.put("attendance", 87);
            summary.put("gpa", 8.4);
            summary.put("pendingAssignments", 3);
            summary.put("readinessScore", 72);
            summary.put("nextActions", List.of(
                    Map.of("id", 1, "title", "Submit REST API Design", "hint", "Due tomorrow in Web Technologies", "badge", "Urgent", "tone", "danger", "to", "assignments"),
                    Map.of("id", 2, "title", "Revise SQL joins before the DBMS quiz", "hint", "Based on your last assessment result", "badge", "Suggested", "tone", "info", "to", "results"),
                    Map.of("id", 3, "title", "Practice 5 Java interview questions", "hint", "Closes your Spring Security skill gap", "badge", "Skill gap", "tone", "warning", "to", "skills")
            ));
            summary.put("progress", List.of(
                    Map.of("label", "Courses", "value", "5 / 6"),
                    Map.of("label", "Assignments", "value", "3 / 5"),
                    Map.of("label", "Assessments", "value", "4 / 6"),
                    Map.of("label", "Attendance", "value", "87%")
            ));
            summary.put("upcomingAssignments", List.of(
                    Map.of("id", 1, "title", "REST API Design", "course", "Web Technologies", "due", "2026-10-11", "status", "PENDING", "maxMarks", 20, "marks", null),
                    Map.of("id", 2, "title", "ER Diagram Lab", "course", "Database Systems", "due", "2026-10-14", "status", "IN_PROGRESS", "maxMarks", 25, "marks", null),
                    Map.of("id", 3, "title", "Sorting Algorithms Report", "course", "Data Structures", "due", "2026-10-16", "status", "IN_PROGRESS", "maxMarks", 30, "marks", null)
            ));
            summary.put("attendanceByCourse", List.of(
                    Map.of("course", "Data Structures", "attended", 46, "total", 50, "percent", 92),
                    Map.of("course", "Database Systems", "attended", 44, "total", 50, "percent", 88),
                    Map.of("course", "Web Technologies", "attended", 34, "total", 40, "percent", 85),
                    Map.of("course", "Software Engineering", "attended", 31, "total", 42, "percent", 74)
            ));
        } else if (user.getRole() == UserRole.FACULTY) {
            summary.put("performance", List.of(76, 82, 80, 88, 92));
            summary.put("insights", List.of("80% of students are on track", "Need more revision sessions in DBMS"));
            summary.put("schedule", List.of(
                    Map.of("slot", "Mon 09:00", "course", "Data Structures"),
                    Map.of("slot", "Tue 11:00", "course", "Database Systems")
            ));
            summary.put("toReview", List.of(
                    Map.of("student", "Nisha Patel", "assignment", "REST API Design", "course", "Web Technologies", "submitted", "2026-10-10"),
                    Map.of("student", "Rahul Sharma", "assignment", "ER Diagram Lab", "course", "Database Systems", "submitted", "2026-10-11")
            ));
        } else if (user.getRole() == UserRole.PLACEMENT_OFFICER) {
            summary.put("activeDrives", List.of(Map.of("company", "TCS", "role", "Software Engineer")));
            summary.put("eligibleStudents", List.of(Map.of("name", "Alex Morgan", "readiness", 72)));
            summary.put("readinessBands", List.of(25, 55, 72, 86));
        } else if (user.getRole() == UserRole.ADMIN) {
            summary.put("usage", List.of(120, 180, 210));
            summary.put("departmentUsage", List.of(Map.of("department", "CSE", "count", 246)));
        }
        return summary;
    }

    public List<Map<String, Object>> getCourses() {
        return List.of(
                Map.of("id", 1, "code", "CS301", "name", "Data Structures", "department", "Computer Science", "credits", 4, "semester", 5, "faculty", "Dr. Priya Nair", "academicYear", "2026-27", "description", "Arrays, trees, graphs and algorithm analysis."),
                Map.of("id", 2, "code", "CS302", "name", "Database Systems", "department", "Computer Science", "credits", 4, "semester", 5, "faculty", "Prof. Arjun Rao", "academicYear", "2026-27", "description", "Relational model, SQL, normalization and transactions."),
                Map.of("id", 3, "code", "CS303", "name", "Web Technologies", "department", "Computer Science", "credits", 3, "semester", 5, "faculty", "Dr. Meera Das", "academicYear", "2026-27", "description", "React, REST APIs and full-stack development."),
                Map.of("id", 4, "code", "CS304", "name", "Software Engineering", "department", "Computer Science", "credits", 3, "semester", 5, "faculty", "Prof. Kiran Shah", "academicYear", "2026-27", "description", "SDLC, testing, design patterns and project management."),
                Map.of("id", 5, "code", "AI305", "name", "Machine Learning Basics", "department", "AI & ML", "credits", 3, "semester", 5, "faculty", "Dr. Neha Kulkarni", "academicYear", "2026-27", "description", "Supervised learning, evaluation and model selection."),
                Map.of("id", 6, "code", "EC301", "name", "Digital Electronics", "department", "Electronics", "credits", 3, "semester", 5, "faculty", "Prof. Vikram Joshi", "academicYear", "2026-27", "description", "Logic design, flip-flops and counters."));
    }

    public List<Map<String, Object>> getAssignmentsForStudent() {
        return List.of(
                Map.of("id", 1, "title", "REST API Design", "course", "Web Technologies", "due", "2026-10-11", "maxMarks", 20, "status", "PENDING", "marks", null, "submitted", 31, "total", 48),
                Map.of("id", 2, "title", "ER Diagram Lab", "course", "Database Systems", "due", "2026-10-14", "maxMarks", 25, "status", "IN_PROGRESS", "marks", null, "submitted", 22, "total", 48),
                Map.of("id", 3, "title", "Sorting Algorithms Report", "course", "Data Structures", "due", "2026-10-16", "maxMarks", 30, "status", "IN_PROGRESS", "marks", null, "submitted", 18, "total", 48),
                Map.of("id", 4, "title", "Unit Test Case Set", "course", "Software Engineering", "due", "2026-10-09", "maxMarks", 20, "status", "SUBMITTED", "marks", null, "submitted", 45, "total", 48),
                Map.of("id", 5, "title", "SQL Joins Worksheet", "course", "Database Systems", "due", "2026-10-02", "maxMarks", 15, "status", "GRADED", "marks", 13, "submitted", 48, "total", 48),
                Map.of("id", 6, "title", "Linked List Implementation", "course", "Data Structures", "due", "2026-09-28", "maxMarks", 20, "status", "GRADED", "marks", 17, "submitted", 47, "total", 48));
    }

    public List<Map<String, Object>> getAttendanceByCourse() {
        return List.of(
                Map.of("course", "Data Structures", "attended", 46, "total", 50, "percent", 92),
                Map.of("course", "Database Systems", "attended", 44, "total", 50, "percent", 88),
                Map.of("course", "Web Technologies", "attended", 34, "total", 40, "percent", 85),
                Map.of("course", "Software Engineering", "attended", 31, "total", 42, "percent", 74),
                Map.of("course", "Machine Learning Basics", "attended", 33, "total", 40, "percent", 83));
    }

    public List<Map<String, Object>> getAttendanceHistory() {
        return List.of(
                Map.of("id", 1, "date", "2026-10-09", "course", "Data Structures", "status", "Present"),
                Map.of("id", 2, "date", "2026-10-09", "course", "Software Engineering", "status", "Absent"),
                Map.of("id", 3, "date", "2026-10-08", "course", "Database Systems", "status", "Present"),
                Map.of("id", 4, "date", "2026-10-08", "course", "Web Technologies", "status", "Late"),
                Map.of("id", 5, "date", "2026-10-07", "course", "Machine Learning Basics", "status", "Present"));
    }

    public List<Map<String, Object>> getResults() {
        return List.of(
                Map.of("id", 1, "assessment", "Mid-term Exam", "course", "Data Structures", "marks", 41, "total", 50, "grade", "A"),
                Map.of("id", 2, "assessment", "Mid-term Exam", "course", "Database Systems", "marks", 36, "total", 50, "grade", "B+"),
                Map.of("id", 3, "assessment", "Quiz 2", "course", "Web Technologies", "marks", 18, "total", 20, "grade", "A+"),
                Map.of("id", 4, "assessment", "Internal Test", "course", "Software Engineering", "marks", 27, "total", 40, "grade", "B"),
                Map.of("id", 5, "assessment", "Lab Evaluation", "course", "Machine Learning Basics", "marks", 22, "total", 25, "grade", "A"));
    }

    public List<Map<String, Object>> getSemesterGpa() {
        return List.of(
                Map.of("label", "Sem 1", "value", 7.8),
                Map.of("label", "Sem 2", "value", 8.0),
                Map.of("label", "Sem 3", "value", 8.1),
                Map.of("label", "Sem 4", "value", 8.4),
                Map.of("label", "Sem 5", "value", 8.5, "tone", "alt"));
    }

    public List<Map<String, Object>> getSkills() {
        return List.of(
                Map.of("name", "Java", "level", 4, "target", 5),
                Map.of("name", "SQL", "level", 3, "target", 5),
                Map.of("name", "React", "level", 3, "target", 4),
                Map.of("name", "Spring Boot", "level", 2, "target", 4),
                Map.of("name", "Data Structures", "level", 4, "target", 5),
                Map.of("name", "System Design", "level", 1, "target", 3));
    }

    public List<String> getSkillGaps() {
        return List.of("System Design", "Spring Security", "SQL Optimization");
    }

    public List<Map<String, Object>> getRecommendedPractice() {
        return List.of(
                Map.of("id", 1, "title", "DSA: Arrays", "hint", "12 questions", "badge", "Recommended"),
                Map.of("id", 2, "title", "DBMS: SQL Joins", "hint", "8 questions", "badge", "Recommended"),
                Map.of("id", 3, "title", "Java OOP Concepts", "hint", "10 questions", "badge", "Optional"));
    }

    public List<Map<String, Object>> getLearningPath() {
        return List.of(
                Map.of("step", "Basics", "topic", "Java Fundamentals", "state", "done"),
                Map.of("step", "Practice", "topic", "DSA - Arrays", "state", "current"),
                Map.of("step", "Build", "topic", "DBMS - SQL", "state", "next"),
                Map.of("step", "Master", "topic", "Project Building", "state", "next"));
    }

    public List<Map<String, Object>> getReadinessFactors() {
        return List.of(
                Map.of("label", "Skills", "value", 70, "weight", 35),
                Map.of("label", "Academic performance", "value", 80, "weight", 25),
                Map.of("label", "Assessment performance", "value", 65, "weight", 20),
                Map.of("label", "Attendance", "value", 87, "weight", 10),
                Map.of("label", "Placement interests", "value", 60, "weight", 10));
    }

    public List<Map<String, Object>> getPlacements() {
        return List.of(
                Map.of("id", 1, "company", "TCS", "role", "Software Engineer", "date", "2026-10-28", "deadline", "2026-10-22", "minCgpa", 7.0, "minAttendance", 75, "departments", "All departments", "skills", List.of("Java", "SQL", "Aptitude"), "registered", 64, "eligible", true, "reason", ""),
                Map.of("id", 2, "company", "Infosys", "role", "Systems Engineer", "date", "2026-11-04", "deadline", "2026-10-30", "minCgpa", 6.5, "minAttendance", 75, "departments", "CSE, AI & ML, ECE", "skills", List.of("Java", "Problem Solving"), "registered", 41, "eligible", true, "reason", ""),
                Map.of("id", 3, "company", "Zoho", "role", "Member Technical Staff", "date", "2026-11-10", "deadline", "2026-11-03", "minCgpa", 8.5, "minAttendance", 80, "departments", "CSE, AI & ML", "skills", List.of("DSA", "System Design"), "registered", 18, "eligible", false, "reason", "Minimum CGPA 8.5 required"),
                Map.of("id", 4, "company", "Capgemini", "role", "Analyst", "date", "2026-11-15", "deadline", "2026-11-08", "minCgpa", 6.0, "minAttendance", 75, "departments", "All departments", "skills", List.of("SQL", "Communication"), "registered", 5, "eligible", true, "reason", ""));
    }

    public List<Map<String, Object>> getEvents() {
        return List.of(
                Map.of("id", 1, "title", "AI & Data Hackathon", "category", "Workshop", "date", "2026-10-18", "start", "09:00", "end", "13:00", "venue", "Main Auditorium", "building", "Block A", "floor", 2, "room", "A-201", "department", "Computer Science", "eligibility", "All students", "deadline", "2026-10-16", "total", 120, "registered", 88, "approval", "APPROVED", "description", "Hands-on build challenge for AI and data projects."),
                Map.of("id", 2, "title", "Campus Placement Prep", "category", "Seminar", "date", "2026-10-21", "start", "15:00", "end", "17:00", "venue", "Innovation Hall", "building", "Block C", "floor", 1, "room", "C-102", "department", "Training & Placement", "eligibility", "Final year students", "deadline", "2026-10-19", "total", 180, "registered", 146, "approval", "APPROVED", "description", "Resume, mock interviews and aptitude bootcamp."),
                Map.of("id", 3, "title", "Cloud Skills Day", "category", "Workshop", "date", "2026-10-24", "start", "10:30", "end", "12:30", "venue", "Tech Lab", "building", "Block B", "floor", 3, "room", "B-312", "department", "Computer Science", "eligibility", "Open to all", "deadline", "2026-10-22", "total", 80, "registered", 72, "approval", "PENDING", "description", "Intro to Docker, Kubernetes and cloud deployment."));
    }

    public List<String> getEventCategories() {
        return List.of("Workshop", "Seminar", "Contest", "Talk");
    }

    public List<Map<String, Object>> getNotifications() {
        return List.of(
                Map.of("id", 1, "type", "assignment", "title", "Assignment due tomorrow", "message", "REST API Design is due in Web Technologies.", "time", "2h ago", "unread", true),
                Map.of("id", 2, "type", "attendance", "title", "Attendance check", "message", "Your attendance in Software Engineering is below 75%.", "time", "1d ago", "unread", true),
                Map.of("id", 3, "type", "event", "title", "Event reminder", "message", "Placement Prep seminar starts at 3:00 PM.", "time", "2d ago", "unread", false));
    }

    public List<Map<String, Object>> getUsers() {
        return List.of(
                Map.of("id", 1, "name", "Alex Morgan", "email", "student@campusflow.test", "role", "STUDENT", "department", "Computer Science", "status", "ACTIVE"),
                Map.of("id", 2, "name", "Dr. Priya Nair", "email", "faculty@campusflow.test", "role", "FACULTY", "department", "Computer Science", "status", "ACTIVE"),
                Map.of("id", 3, "name", "Rahul Verma", "email", "placement@campusflow.test", "role", "PLACEMENT_OFFICER", "department", "Training & Placement", "status", "ACTIVE"),
                Map.of("id", 4, "name", "Sana Iqbal", "email", "admin@campusflow.test", "role", "ADMIN", "department", "Administration", "status", "ACTIVE"));
    }

    public List<Map<String, Object>> getFacultyStats() {
        return Map.of(
                "performance", List.of(76, 82, 80, 88, 92),
                "insights", List.of("80% of students are on track", "Need more revision sessions in DBMS"),
                "schedule", List.of(Map.of("time", "Mon 09:00", "course", "Data Structures"), Map.of("time", "Tue 11:00", "course", "Database Systems")),
                "toReview", List.of(
                        Map.of("student", "Nisha Patel", "assignment", "REST API Design", "course", "Web Technologies", "submitted", "2026-10-10"),
                        Map.of("student", "Rahul Sharma", "assignment", "ER Diagram Lab", "course", "Database Systems", "submitted", "2026-10-11")))
                .entrySet().stream().collect(java.util.stream.Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public Map<String, Object> getPlacementStats() {
        return Map.of(
                "readinessBands", List.of(25, 55, 72, 86),
                "registrationsByDrive", List.of(Map.of("label", "TCS", "value", 64), Map.of("label", "Infosys", "value", 41)),
                "skillDemand", List.of(Map.of("label", "Java", "value", 85), Map.of("label", "SQL", "value", 72)),
                "activity", List.of(Map.of("title", "Drive approved", "detail", "TCS drive updated")));
    }

    public Map<String, Object> getAdminStats() {
        return Map.of(
                "usage", List.of(120, 180, 210, 240),
                "departmentUsage", List.of(Map.of("department", "CSE", "value", 246), Map.of("department", "ECE", "value", 130)),
                "alerts", List.of(Map.of("title", "2 faculty approvals pending", "tone", "warning")),
                "activity", List.of(Map.of("title", "User approval workflow updated", "detail", "3 minutes ago")));
    }

    public List<Map<String, Object>> getChatSeed() {
        return List.of(
                Map.of("id", 1, "from", "me", "text", "When is my next exam?"),
                Map.of("id", 2, "from", "assistant", "text", "I can check your assessment schedule and attendance. Open the Assessments page for exact dates."));
    }

    public Map<String, Object> getStudentProfile() {
        return Map.of(
                "name", "Alex Morgan",
                "email", "student@campusflow.test",
                "phone", "+91 90000 00001",
                "department", "Computer Science",
                "program", "B.Tech Computer Science",
                "studentId", "CS21B042",
                "academicYear", "2023 - 2027",
                "semester", 5);
    }

    public List<Map<String, Object>> getEligibleStudents() {
        return List.of(
                Map.of("id", 1, "name", "Alex Morgan", "roll", "CS21B042", "department", "CSE", "cgpa", 8.4, "readiness", 72),
                Map.of("id", 2, "name", "Nisha Patel", "roll", "CS21B018", "department", "CSE", "cgpa", 8.9, "readiness", 81),
                Map.of("id", 3, "name", "Rohan Mehta", "roll", "AI21B007", "department", "AI & ML", "cgpa", 7.6, "readiness", 64));
    }

    public List<Map<String, Object>> getVenues() {
        return List.of(
                Map.of("id", 1, "name", "Main Auditorium", "building", "Block A", "floor", 2, "room", "A-201", "description", "Next to the admin office, lift access available.", "capacity", 400),
                Map.of("id", 2, "name", "Innovation Hall", "building", "Block C", "floor", 1, "room", "C-102", "description", "Seminar hall with projection and audio support.", "capacity", 220));
    }

    public List<Map<String, Object>> getClassRoster() {
        return List.of(
                Map.of("id", 1, "name", "Alex Morgan", "roll", "CS21B042"),
                Map.of("id", 2, "name", "Nisha Patel", "roll", "CS21B018"),
                Map.of("id", 3, "name", "Rohan Mehta", "roll", "AI21B007"));
    }

    public List<Map<String, Object>> getSearchResults(String q) {
        String query = q == null ? "" : q.trim().toLowerCase();
        List<Map<String, Object>> results = new ArrayList<>();
        if (query.isBlank()) {
            return results;
        }
        getCourses().stream().filter(c -> String.valueOf(c.get("name")).toLowerCase().contains(query) || String.valueOf(c.get("code")).toLowerCase().contains(query)).forEach(c -> results.add(Map.of("id", c.get("id"), "title", c.get("name"), "subtitle", c.get("code") + " · " + c.get("department"))));
        getAssignmentsForStudent().stream().filter(a -> String.valueOf(a.get("title")).toLowerCase().contains(query) || String.valueOf(a.get("course")).toLowerCase().contains(query)).forEach(a -> results.add(Map.of("id", a.get("id"), "title", a.get("title"), "subtitle", a.get("course"))));
        getEvents().stream().filter(e -> String.valueOf(e.get("title")).toLowerCase().contains(query) || String.valueOf(e.get("category")).toLowerCase().contains(query)).forEach(e -> results.add(Map.of("id", e.get("id"), "title", e.get("title"), "subtitle", e.get("category") + " · " + e.get("venue"))));
        getPlacements().stream().filter(d -> String.valueOf(d.get("company")).toLowerCase().contains(query) || String.valueOf(d.get("role")).toLowerCase().contains(query)).forEach(d -> results.add(Map.of("id", d.get("id"), "title", d.get("company"), "subtitle", d.get("role"))));
        return results;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email.trim());
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email.trim());
    }

    public boolean existsByStudentId(String studentId) {
        return userRepository.existsByStudentId(studentId);
    }
}
