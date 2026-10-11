import api from './api';
import { isDemoMode } from './authService';

// Expected backend response: { reply: string, mode: 'LIVE' | 'DEMO' }
export async function askAssistant(message) {
  if (isDemoMode) {
    return {
      reply: 'Demo response: the AI service is not connected. This answer is not verified college information.',
      mode: 'DEMO',
    };
  }
  const { data } = await api.post('/assistant/chat', { message });
  return data;
}
