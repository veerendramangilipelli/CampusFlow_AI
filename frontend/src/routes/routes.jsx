import { Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import StudentDashboard from '../pages/student/StudentDashboard';
import Attendance from '../pages/student/Attendance';
import Results from '../pages/student/Results';
import Skills from '../pages/student/Skills';
import Placements from '../pages/student/Placements';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import ManageAttendance from '../pages/faculty/ManageAttendance';
import PlacementDashboard from '../pages/placement/PlacementDashboard';
import DriveManagement from '../pages/placement/DriveManagement';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import Venues from '../pages/admin/Venues';
import Courses from '../pages/shared/Courses';
import Assignments from '../pages/shared/Assignments';
import Events from '../pages/shared/Events';
import EventDetails from '../pages/shared/EventDetails';
import Notifications from '../pages/shared/Notifications';
import AIAssistant from '../pages/shared/AIAssistant';
import Profile from '../pages/shared/Profile';
import SearchResults from '../pages/shared/SearchResults';

const shared = (manageEvents = false) => [
  { path: 'events', element: <Events manage={manageEvents} /> },
  { path: 'events/:id', element: <EventDetails /> },
  { path: 'notifications', element: <Notifications /> },
  { path: 'profile', element: <Profile /> },
  { path: 'search', element: <SearchResults /> },
];

const guarded = (role, path, children) => ({
  path,
  element: (
    <ProtectedRoute roles={[role]}>
      <AppLayout role={role} />
    </ProtectedRoute>
  ),
  children,
});

const routes = [
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  guarded('STUDENT', '/student', [
    { index: true, element: <StudentDashboard /> },
    { path: 'courses', element: <Courses /> },
    { path: 'assignments', element: <Assignments mode="student" /> },
    { path: 'attendance', element: <Attendance /> },
    { path: 'results', element: <Results /> },
    { path: 'placements', element: <Placements /> },
    { path: 'skills', element: <Skills /> },
    { path: 'assistant', element: <AIAssistant /> },
    ...shared(),
  ]),
  guarded('FACULTY', '/faculty', [
    { index: true, element: <FacultyDashboard /> },
    { path: 'courses', element: <Courses manage /> },
    { path: 'assignments', element: <Assignments mode="faculty" /> },
    { path: 'attendance', element: <ManageAttendance /> },
    { path: 'assistant', element: <AIAssistant /> },
    ...shared(true),
  ]),
  guarded('PLACEMENT_OFFICER', '/placement', [
    { index: true, element: <PlacementDashboard /> },
    { path: 'drives', element: <DriveManagement /> },
    { path: 'assistant', element: <AIAssistant /> },
    ...shared(),
  ]),
  guarded('ADMIN', '/admin', [
    { index: true, element: <AdminDashboard /> },
    { path: 'users', element: <UserManagement /> },
    { path: 'courses', element: <Courses manage /> },
    { path: 'venues', element: <Venues /> },
    ...shared(true),
  ]),
  { path: '*', element: <Navigate to="/login" replace /> },
];

export default routes;
