import api from './api';
import { isDemoMode } from './authService';
import { courses, assignments, events, drives } from '../data/demoData';

// Expected backend response:
// { courses: [{id,title,subtitle}], assignments: [...], events: [...], drives: [...] }
export async function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { courses: [], assignments: [], events: [], drives: [] };
  if (isDemoMode) {
    const has = (text) => text.toLowerCase().includes(q);
    return {
      courses: courses.filter((c) => has(c.name + c.code)).map((c) => ({ id: c.id, title: c.name, subtitle: `${c.code} · ${c.department}` })),
      assignments: assignments.filter((a) => has(a.title + a.course)).map((a) => ({ id: a.id, title: a.title, subtitle: a.course })),
      events: events.filter((e) => has(e.title + e.category)).map((e) => ({ id: e.id, title: e.title, subtitle: `${e.category} · ${e.venue}` })),
      drives: drives.filter((d) => has(d.company + d.role)).map((d) => ({ id: d.id, title: d.company, subtitle: d.role })),
    };
  }
  const { data } = await api.get('/search', { params: { q: query } });
  return data;
}
