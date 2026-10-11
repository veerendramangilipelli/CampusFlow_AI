/*
 * DEMO DATA ONLY.
 * Every page imports its sample records from this file so the UI can be previewed.
 * When wiring the backend, replace each import with an API call (see docs/UI_SPEC.md,
 * "Data needed" per screen). Do not change the layout or CSS when doing so.
 * Dates are ISO strings (YYYY-MM-DD).
 */

export const student = {
  name: 'Alex Morgan', email: 'student@campusflow.test', phone: '+91 90000 00001',
  department: 'Computer Science', program: 'B.Tech Computer Science', studentId: 'CS21B042',
  academicYear: '2023 - 2027', semester: 5,
};

export const courses = [
  { id: 1, code: 'CS301', name: 'Data Structures', department: 'Computer Science', credits: 4, semester: 5, faculty: 'Dr. Priya Nair', academicYear: '2026-27', description: 'Arrays, trees, graphs and algorithm analysis.' },
  { id: 2, code: 'CS302', name: 'Database Systems', department: 'Computer Science', credits: 4, semester: 5, faculty: 'Prof. Arjun Rao', academicYear: '2026-27', description: 'Relational model, SQL, normalization and transactions.' },
  { id: 3, code: 'CS303', name: 'Web Technologies', department: 'Computer Science', credits: 3, semester: 5, faculty: 'Dr. Meera Das', academicYear: '2026-27', description: 'React, REST APIs and full-stack development.' },
  { id: 4, code: 'CS304', name: 'Software Engineering', department: 'Computer Science', credits: 3, semester: 5, faculty: 'Prof. Kiran Shah', academicYear: '2026-27', description: 'SDLC, testing, design patterns and project management.' },
  { id: 5, code: 'AI305', name: 'Machine Learning Basics', department: 'AI & ML', credits: 3, semester: 5, faculty: 'Dr. Neha Kulkarni', academicYear: '2026-27', description: 'Supervised learning, evaluation and model selection.' },
  { id: 6, code: 'EC301', name: 'Digital Electronics', department: 'Electronics', credits: 3, semester: 5, faculty: 'Prof. Vikram Joshi', academicYear: '2026-27', description: 'Logic design, flip-flops and counters.' },
];

export const assignments = [
  { id: 1, title: 'REST API Design', course: 'Web Technologies', due: '2026-10-11', maxMarks: 20, status: 'PENDING', marks: null, submitted: 31, total: 48 },
  { id: 2, title: 'ER Diagram Lab', course: 'Database Systems', due: '2026-10-14', maxMarks: 25, status: 'IN_PROGRESS', marks: null, submitted: 22, total: 48 },
  { id: 3, title: 'Sorting Algorithms Report', course: 'Data Structures', due: '2026-10-16', maxMarks: 30, status: 'IN_PROGRESS', marks: null, submitted: 18, total: 48 },
  { id: 4, title: 'Unit Test Case Set', course: 'Software Engineering', due: '2026-10-09', maxMarks: 20, status: 'SUBMITTED', marks: null, submitted: 45, total: 48 },
  { id: 5, title: 'SQL Joins Worksheet', course: 'Database Systems', due: '2026-10-02', maxMarks: 15, status: 'GRADED', marks: 13, submitted: 48, total: 48 },
  { id: 6, title: 'Linked List Implementation', course: 'Data Structures', due: '2026-09-28', maxMarks: 20, status: 'GRADED', marks: 17, submitted: 47, total: 48 },
];

export const attendanceByCourse = [
  { course: 'Data Structures', attended: 46, total: 50, percent: 92 },
  { course: 'Database Systems', attended: 44, total: 50, percent: 88 },
  { course: 'Web Technologies', attended: 34, total: 40, percent: 85 },
  { course: 'Software Engineering', attended: 31, total: 42, percent: 74 },
  { course: 'Machine Learning Basics', attended: 33, total: 40, percent: 83 },
];

export const attendanceHistory = [
  { id: 1, date: '2026-10-09', course: 'Data Structures', status: 'Present' },
  { id: 2, date: '2026-10-09', course: 'Software Engineering', status: 'Absent' },
  { id: 3, date: '2026-10-08', course: 'Database Systems', status: 'Present' },
  { id: 4, date: '2026-10-08', course: 'Web Technologies', status: 'Late' },
  { id: 5, date: '2026-10-07', course: 'Machine Learning Basics', status: 'Present' },
];

export const results = [
  { id: 1, assessment: 'Mid-term Exam', course: 'Data Structures', marks: 41, total: 50, grade: 'A' },
  { id: 2, assessment: 'Mid-term Exam', course: 'Database Systems', marks: 36, total: 50, grade: 'B+' },
  { id: 3, assessment: 'Quiz 2', course: 'Web Technologies', marks: 18, total: 20, grade: 'A+' },
  { id: 4, assessment: 'Internal Test', course: 'Software Engineering', marks: 27, total: 40, grade: 'B' },
  { id: 5, assessment: 'Lab Evaluation', course: 'Machine Learning Basics', marks: 22, total: 25, grade: 'A' },
];

export const semesterGpa = [
  { label: 'Sem 1', value: 7.8 }, { label: 'Sem 2', value: 8.0 }, { label: 'Sem 3', value: 8.1 },
  { label: 'Sem 4', value: 8.4 }, { label: 'Sem 5', value: 8.5, tone: 'alt' },
];

export const nextActions = [
  { id: 1, title: 'Submit REST API Design', hint: 'Due tomorrow in Web Technologies', badge: 'Urgent', tone: 'danger', to: 'assignments' },
  { id: 2, title: 'Revise SQL joins before the DBMS quiz', hint: 'Based on your last assessment result', badge: 'Suggested', tone: 'info', to: 'results' },
  { id: 3, title: 'Practice 5 Java interview questions', hint: 'Closes your Spring Security skill gap', badge: 'Skill gap', tone: 'warning', to: 'skills' },
];

export const progress = [
  { label: 'Courses', value: '5 / 6' }, { label: 'Assignments', value: '3 / 5' },
  { label: 'Assessments', value: '4 / 6' }, { label: 'Attendance', value: '87%' },
];

export const skills = [
  { name: 'Java', level: 4, target: 5 }, { name: 'SQL', level: 3, target: 5 },
  { name: 'React', level: 3, target: 4 }, { name: 'Spring Boot', level: 2, target: 4 },
  { name: 'Data Structures', level: 4, target: 5 }, { name: 'System Design', level: 1, target: 3 },
];

export const skillGaps = ['System Design', 'Spring Security', 'SQL Optimization'];

export const recommendedPractice = [
  { id: 1, title: 'DSA: Arrays', hint: '12 questions', badge: 'Recommended' },
  { id: 2, title: 'DBMS: SQL Joins', hint: '8 questions', badge: 'Recommended' },
  { id: 3, title: 'Java OOP Concepts', hint: '10 questions', badge: 'Optional' },
];

export const learningPath = [
  { step: 'Basics', topic: 'Java Fundamentals', state: 'done' },
  { step: 'Practice', topic: 'DSA - Arrays', state: 'current' },
  { step: 'Build', topic: 'DBMS - SQL', state: 'next' },
  { step: 'Master', topic: 'Project Building', state: 'next' },
];

export const readinessFactors = [
  { label: 'Skills', value: 70, weight: 35 }, { label: 'Academic performance', value: 80, weight: 25 },
  { label: 'Assessment performance', value: 65, weight: 20 }, { label: 'Attendance', value: 87, weight: 10 },
  { label: 'Placement interests', value: 60, weight: 10 },
];

export const drives = [
  { id: 1, company: 'TCS', role: 'Software Engineer', date: '2026-10-28', deadline: '2026-10-22', minCgpa: 7.0, minAttendance: 75, departments: 'All departments', skills: ['Java', 'SQL', 'Aptitude'], registered: 64, eligible: true, reason: '' },
  { id: 2, company: 'Infosys', role: 'Systems Engineer', date: '2026-11-04', deadline: '2026-10-30', minCgpa: 6.5, minAttendance: 75, departments: 'CSE, AI & ML, ECE', skills: ['Java', 'Problem Solving'], registered: 41, eligible: true, reason: '' },
  { id: 3, company: 'Zoho', role: 'Member Technical Staff', date: '2026-11-10', deadline: '2026-11-03', minCgpa: 8.5, minAttendance: 80, departments: 'CSE, AI & ML', skills: ['DSA', 'System Design'], registered: 18, eligible: false, reason: 'Minimum CGPA 8.5 required' },
  { id: 4, company: 'Capgemini', role: 'Analyst', date: '2026-11-15', deadline: '2026-11-08', minCgpa: 6.0, minAttendance: 75, departments: 'All departments', skills: ['SQL', 'Communication'], registered: 5, eligible: true, reason: '' },
];

export const eligibleStudents = [
  { id: 1, name: 'Alex Morgan', roll: 'CS21B042', department: 'CSE', cgpa: 8.4, readiness: 72 },
  { id: 2, name: 'Nisha Patel', roll: 'CS21B018', department: 'CSE', cgpa: 8.9, readiness: 81 },
  { id: 3, name: 'Rohan Mehta', roll: 'AI21B007', department: 'AI & ML', cgpa: 7.6, readiness: 64 },
  { id: 4, name: 'Zoya Khan', roll: 'EC21B031', department: 'ECE', cgpa: 7.2, readiness: 58 },
];

export const venues = [
  { id: 1, name: 'Main Auditorium', building: 'Block A', floor: 2, room: 'A-201', description: 'Next to the admin office, lift access available.', capacity: 400 },
  { id: 2, name: 'Seminar Hall', building: 'Block C', floor: 0, room: 'C-001', description: 'Ground floor, opposite the library entrance.', capacity: 150 },
  { id: 3, name: 'Computer Lab 4', building: 'Block B', floor: 1, room: 'B-104', description: 'First floor, east wing of the CSE department.', capacity: 60 },
  { id: 4, name: 'Open Air Theatre', building: 'Campus Ground', floor: 0, room: '-', description: 'Beside the main sports ground.', capacity: 800 },
];

export const events = [
  { id: 1, title: 'Hackathon 2026', category: 'Hackathon', date: '2026-10-18', start: '09:00', end: '21:00', venue: 'Main Auditorium', building: 'Block A', floor: 2, room: 'A-201', department: 'Computer Science', eligibility: 'All departments, teams of 3 to 4', deadline: '2026-10-15', total: 200, registered: 148, approval: 'APPROVED', description: 'A 12-hour build sprint where teams create working prototypes around campus problems. Mentors from faculty and industry guide each team.' },
  { id: 2, title: 'Guest Lecture: Cloud Careers', category: 'Guest lecture', date: '2026-10-22', start: '11:00', end: '12:30', venue: 'Seminar Hall', building: 'Block C', floor: 0, room: 'C-001', department: 'Computer Science', eligibility: 'Semester 5 and above', deadline: '2026-10-21', total: 150, registered: 92, approval: 'APPROVED', description: 'An industry speaker walks through cloud engineering roles, certifications and how to prepare.' },
  { id: 3, title: 'Placement Training: Aptitude', category: 'Placement training', date: '2026-10-25', start: '10:00', end: '13:00', venue: 'Computer Lab 4', building: 'Block B', floor: 1, room: 'B-104', department: 'Training & Placement', eligibility: 'Final and pre-final year', deadline: '2026-10-23', total: 60, registered: 54, approval: 'APPROVED', description: 'Timed aptitude practice with solutions and strategy sessions.' },
  { id: 4, title: 'Inter-department Cricket', category: 'Sports', date: '2026-10-29', start: '08:00', end: '17:00', venue: 'Open Air Theatre', building: 'Campus Ground', floor: 0, room: '-', department: 'Physical Education', eligibility: 'Open to all students', deadline: '2026-10-26', total: 120, registered: 60, approval: 'APPROVED', description: 'League matches between departments with a final on the last day.' },
  { id: 5, title: 'Cultural Night', category: 'Cultural', date: '2026-10-30', start: '17:00', end: '21:00', venue: 'Main Auditorium', building: 'Block A', floor: 2, room: 'A-201', department: 'Student Council', eligibility: 'Open to all students', deadline: '2026-10-28', total: 400, registered: 210, approval: 'PENDING', description: 'Music, dance and drama performances by student clubs.' },
  { id: 6, title: 'Coding Contest: Code Sprint', category: 'Coding contest', date: '2026-11-02', start: '14:00', end: '17:00', venue: 'Computer Lab 4', building: 'Block B', floor: 1, room: 'B-104', department: 'Computer Science', eligibility: 'All departments', deadline: '2026-10-31', total: 60, registered: 12, approval: 'APPROVED', description: 'Individual algorithmic contest with three difficulty tiers.' },
];

export const eventCategories = ['Workshop', 'Seminar', 'Hackathon', 'Cultural', 'Sports', 'Coding contest', 'Exhibition', 'Guest lecture', 'Club activity', 'Placement training'];

export const notifications = [
  { id: 1, type: 'assignment', title: 'Assignment due tomorrow', message: 'REST API Design in Web Technologies is due on 11 Oct.', time: '2 hours ago', unread: true },
  { id: 2, type: 'attendance', title: 'Attendance warning', message: 'Software Engineering attendance is 74%, below the 75% requirement.', time: '5 hours ago', unread: true },
  { id: 3, type: 'event', title: 'Event reminder', message: 'Hackathon 2026 starts on 18 Oct at 09:00, Main Auditorium.', time: 'Yesterday', unread: true },
  { id: 4, type: 'placement', title: 'New placement drive', message: 'TCS has opened registrations for Software Engineer. You are eligible.', time: 'Yesterday', unread: false },
  { id: 5, type: 'announcement', title: 'Announcement from Dr. Priya Nair', message: 'Data Structures lab moves to Computer Lab 4 this week.', time: '2 days ago', unread: false },
];

export const users = [
  { id: 1, name: 'Alex Morgan', email: 'student@campusflow.test', role: 'STUDENT', department: 'Computer Science', status: 'ACTIVE' },
  { id: 2, name: 'Dr. Priya Nair', email: 'priya.nair@campusflow.test', role: 'FACULTY', department: 'Computer Science', status: 'ACTIVE' },
  { id: 3, name: 'Rahul Verma', email: 'rahul.verma@campusflow.test', role: 'PLACEMENT_OFFICER', department: 'Training & Placement', status: 'ACTIVE' },
  { id: 4, name: 'Prof. Arjun Rao', email: 'arjun.rao@campusflow.test', role: 'FACULTY', department: 'Computer Science', status: 'PENDING' },
  { id: 5, name: 'Dr. Meera Das', email: 'meera.das@campusflow.test', role: 'FACULTY', department: 'AI & ML', status: 'PENDING' },
  { id: 6, name: 'Kavya Reddy', email: 'kavya.reddy@campusflow.test', role: 'PLACEMENT_OFFICER', department: 'Training & Placement', status: 'PENDING' },
  { id: 7, name: 'Nisha Patel', email: 'nisha.patel@campusflow.test', role: 'STUDENT', department: 'Computer Science', status: 'ACTIVE' },
  { id: 8, name: 'Zoya Khan', email: 'zoya.khan@campusflow.test', role: 'STUDENT', department: 'Electronics', status: 'INACTIVE' },
];

export const classRoster = [
  { id: 1, name: 'Alex Morgan', roll: 'CS21B042' }, { id: 2, name: 'Nisha Patel', roll: 'CS21B018' },
  { id: 3, name: 'Rohan Mehta', roll: 'AI21B007' }, { id: 4, name: 'Zoya Khan', roll: 'EC21B031' },
  { id: 5, name: 'Dev Malhotra', roll: 'CS21B055' }, { id: 6, name: 'Ishita Roy', roll: 'CS21B023' },
];

export const facultyStats = {
  performance: [
    { label: 'Quiz 1', value: 72 }, { label: 'Quiz 2', value: 78 }, { label: 'Mid-term', value: 69, tone: 'alt' },
    { label: 'Lab', value: 84 }, { label: 'Assignment', value: 88, tone: 'alt' },
  ],
  insights: [
    { id: 1, text: '9 students are below 60% in Database Systems', tone: 'danger', badge: 'Low performance' },
    { id: 2, text: '12 submissions are waiting for review', tone: 'warning', badge: 'Review' },
    { id: 3, text: '3 students have attendance below 75%', tone: 'warning', badge: 'Attendance' },
  ],
  schedule: [
    { id: 1, time: '09:00', course: 'Data Structures', room: 'B-104' },
    { id: 2, time: '11:00', course: 'Database Systems', room: 'A-101' },
    { id: 3, time: '14:00', course: 'Web Technologies Lab', room: 'B-201' },
  ],
  toReview: [
    { id: 1, student: 'Alex Morgan', assignment: 'REST API Design', course: 'Web Technologies', submitted: '10 Oct, 08:40' },
    { id: 2, student: 'Nisha Patel', assignment: 'ER Diagram Lab', course: 'Database Systems', submitted: '09 Oct, 21:15' },
    { id: 3, student: 'Rohan Mehta', assignment: 'ER Diagram Lab', course: 'Database Systems', submitted: '09 Oct, 18:02' },
  ],
};

export const placementStats = {
  readinessBands: [
    { label: '0-40', value: 28, tone: 'warn' }, { label: '41-60', value: 74 }, { label: '61-80', value: 96, tone: 'alt' }, { label: '81-100', value: 42 },
  ],
  registrationsByDrive: [
    { label: 'TCS', value: 64, of: 120 }, { label: 'Infosys', value: 41, of: 100 },
    { label: 'Zoho', value: 18, of: 40 }, { label: 'Capgemini', value: 5, of: 80 },
  ],
  skillDemand: ['Java', 'SQL', 'DSA', 'Spring Boot', 'React', 'System Design', 'Communication'],
  activity: [
    { id: 1, text: 'TCS drive: 12 new registrations today', time: '1 hour ago' },
    { id: 2, text: 'Infosys eligibility updated to CGPA 6.5', time: 'Yesterday' },
    { id: 3, text: 'Zoya Khan cancelled Capgemini registration', time: '2 days ago' },
  ],
};

export const adminStats = {
  usage: [
    { label: 'Mon', value: 820 }, { label: 'Tue', value: 940 }, { label: 'Wed', value: 1010, tone: 'alt' },
    { label: 'Thu', value: 970 }, { label: 'Fri', value: 880, tone: 'alt' }, { label: 'Sat', value: 310 },
  ],
  departmentUsage: [
    { label: 'Computer Science', value: 92 }, { label: 'AI & ML', value: 78 }, { label: 'Electronics', value: 65 }, { label: 'Mechanical', value: 48 },
  ],
  alerts: [
    { id: 1, text: 'Low activity in Mechanical department', tone: 'warning' },
    { id: 2, text: 'Cultural Night is waiting for approval', tone: 'info' },
    { id: 3, text: 'Venue clash detected: Main Auditorium, 30 Oct', tone: 'danger' },
  ],
  activity: [
    { id: 1, who: 'Dr. Priya Nair', action: 'Created assignment "Sorting Algorithms Report"', time: '10:42' },
    { id: 2, who: 'Rahul Verma', action: 'Opened TCS placement drive', time: '10:15' },
    { id: 3, who: 'Sana Iqbal', action: 'Approved faculty account Prof. Arjun Rao', time: '09:50' },
    { id: 4, who: 'Alex Morgan', action: 'Registered for Hackathon 2026', time: '09:31' },
  ],
};

export const chatSeed = [
  { id: 1, from: 'me', text: 'What is the eligibility for campus placements?' },
  { id: 2, from: 'bot', text: 'To be eligible for campus placements you need a minimum aggregate set by each company, no active backlogs, and at least 75% attendance. Each drive lists its own criteria.' },
  { id: 3, from: 'me', text: 'Show me upcoming placement drives' },
  { id: 4, from: 'bot', text: 'Upcoming drives: TCS on 28 Oct, Infosys on 4 Nov, Zoho on 10 Nov and Capgemini on 15 Nov. Open the Placements page to check your eligibility.' },
];
