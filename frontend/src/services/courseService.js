import api from './api';
import { isDemoMode } from './authService';
import { courses as demoCourses } from '../data/demoData';

export async function getCourses() {
  if (isDemoMode) return demoCourses;
  const { data } = await api.get('/courses');
  return data;
}
