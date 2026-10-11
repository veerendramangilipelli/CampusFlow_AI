import {
  FiGrid, FiBook, FiFileText, FiCheckSquare, FiAward, FiCalendar, FiBriefcase,
  FiTrendingUp, FiMessageSquare, FiUser, FiBell, FiUsers, FiMapPin,
} from 'react-icons/fi';

const common = (base) => ({
  assistant: { to: `${base}/assistant`, label: 'AI Assistant', icon: FiMessageSquare },
  profile: { to: `${base}/profile`, label: 'Profile', icon: FiUser },
  notifications: { to: `${base}/notifications`, label: 'Notifications', icon: FiBell },
  events: { to: `${base}/events`, label: 'Events', icon: FiCalendar },
});

const s = common('/student');
const f = common('/faculty');
const p = common('/placement');
const a = common('/admin');

export const NAV = {
  STUDENT: [
    { label: 'Main', items: [
      { to: '/student', label: 'Dashboard', icon: FiGrid, end: true },
      { to: '/student/courses', label: 'Courses', icon: FiBook },
      { to: '/student/assignments', label: 'Assignments', icon: FiFileText },
      { to: '/student/attendance', label: 'Attendance', icon: FiCheckSquare },
      { to: '/student/results', label: 'Results', icon: FiAward },
    ] },
    { label: 'Campus', items: [
      s.events,
      { to: '/student/placements', label: 'Placements', icon: FiBriefcase },
      { to: '/student/skills', label: 'Skills & Path', icon: FiTrendingUp },
      s.assistant,
    ] },
    { label: 'Account', items: [s.profile, s.notifications] },
  ],
  FACULTY: [
    { label: 'Main', items: [
      { to: '/faculty', label: 'Dashboard', icon: FiGrid, end: true },
      { to: '/faculty/courses', label: 'My Courses', icon: FiBook },
      { to: '/faculty/assignments', label: 'Assignments', icon: FiFileText },
      { to: '/faculty/attendance', label: 'Attendance', icon: FiCheckSquare },
    ] },
    { label: 'Campus', items: [f.events, f.assistant] },
    { label: 'Account', items: [f.profile, f.notifications] },
  ],
  PLACEMENT_OFFICER: [
    { label: 'Main', items: [
      { to: '/placement', label: 'Dashboard', icon: FiGrid, end: true },
      { to: '/placement/drives', label: 'Placement Drives', icon: FiBriefcase },
    ] },
    { label: 'Campus', items: [p.events, p.assistant] },
    { label: 'Account', items: [p.profile, p.notifications] },
  ],
  ADMIN: [
    { label: 'Main', items: [
      { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
      { to: '/admin/users', label: 'Users & Approvals', icon: FiUsers },
      { to: '/admin/courses', label: 'Courses', icon: FiBook },
    ] },
    { label: 'Campus', items: [a.events, { to: '/admin/venues', label: 'Venues', icon: FiMapPin }] },
    { label: 'Account', items: [a.profile, a.notifications] },
  ],
};

export const BASE_PATH = {
  STUDENT: '/student',
  FACULTY: '/faculty',
  PLACEMENT_OFFICER: '/placement',
  ADMIN: '/admin',
};
