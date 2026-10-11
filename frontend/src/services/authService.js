import api from './api';

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

const DEMO_USERS = {
  student: { id: 1, name: 'Alex Morgan', email: 'student@campusflow.test', role: 'STUDENT', department: 'Computer Science' },
  faculty: { id: 2, name: 'Dr. Priya Nair', email: 'faculty@campusflow.test', role: 'FACULTY', department: 'Computer Science' },
  placement: { id: 3, name: 'Rahul Verma', email: 'placement@campusflow.test', role: 'PLACEMENT_OFFICER', department: 'Training & Placement' },
  admin: { id: 4, name: 'Sana Iqbal', email: 'admin@campusflow.test', role: 'ADMIN', department: 'Administration' },
};

// Expected backend response: { token, user: { id, name, email, role, department } }
export async function loginRequest(email, password) {
  if (isDemoMode) {
    const key = Object.keys(DEMO_USERS).find((k) => email.toLowerCase().startsWith(k));
    if (!key) throw new Error('Demo mode: start the email with student, faculty, placement or admin.');
    return { token: 'demo-token', user: DEMO_USERS[key] };
  }
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registerRequest(payload) {
  if (isDemoMode) return { message: 'Demo mode: registration was not saved.' };
  const { data } = await api.post('/auth/register', payload);
  return data;
}
