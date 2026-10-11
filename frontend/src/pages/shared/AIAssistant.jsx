import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import { askAssistant } from '../../services/assistantService';
import { getErrorMessage } from '../../utils/format';
import { chatSeed } from '../../data/demoData';

const SUGGESTIONS = ['My courses', 'Assignment help', 'Placement', 'Event info'];

export default function AIAssistant() {
  const [messages, setMessages] = useState(chatSeed); // start with [] when wiring the backend
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('DEMO'); // LIVE when the backend reports a configured AI provider
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [messages]);

  const send = async (value) => {
    const message = value.trim();
    if (!message || loading) return;
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: message }]);
    setText('');
    setLoading(true);
    try {
      const { reply, mode: replyMode } = await askAssistant(message);
      setMode(replyMode);
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: reply, mode: replyMode }]);
    } catch (err) {
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'error', text: getErrorMessage(err) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="AI College Assistant" subtitle="Ask about academics, events, placements and campus services." actions={<Badge tone={mode === 'LIVE' ? 'success' : 'warning'}>{mode === 'LIVE' ? 'AI connected' : 'Demo mode'}</Badge>} />
      {mode !== 'LIVE' && <Alert tone="warning">The AI service is not connected. Answers shown here are demo responses and are not verified college information.</Alert>}
      <Card className="chat-page">
        <div className="chat" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`bubble ${m.from === 'me' ? 'me' : m.from === 'error' ? 'error' : ''}`}>
              {m.text}
              {m.from === 'bot' && m.mode === 'DEMO' && <small>Demo response</small>}
            </div>
          ))}
          {loading && <div className="bubble">Thinking...</div>}
          <div ref={endRef} />
        </div>
        <div className="chip-list" style={{ marginBottom: 12 }}>
          {SUGGESTIONS.map((s) => <button type="button" className="chip" key={s} onClick={() => send(s)}>{s}</button>)}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(text); }}>
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message..." aria-label="Message to the assistant" />
          <button type="submit" className="btn btn-primary" disabled={!text.trim() || loading}><FiSend /> Send</button>
        </form>
      </Card>
    </>
  );
}
