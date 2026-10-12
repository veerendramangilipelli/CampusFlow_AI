import api from './api';
import { isDemoMode } from './authService';
import { assignments as demoAssignments } from '../data/demoData';

export async function getStudentAssignments() {
  if (isDemoMode) return demoAssignments;
  const { data } = await api.get('/assignments/me');
  return data;
}

export async function getMySubmission(assignmentId) {
  if (isDemoMode) return null;
  try {
    const { data } = await api.get(`/assignments/${assignmentId}/submissions/me`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}

export async function submitAssignment(assignmentId, content) {
  if (isDemoMode) {
    throw new Error('Submissions are not saved in demo mode. Disable VITE_DEMO_MODE to submit work.');
  }
  const { data } = await api.post(`/assignments/${assignmentId}/submissions`, { content });
  return data;
}
