import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Tabs from '../../components/Tabs';
import EventCard from '../../components/EventCard';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import Alert from '../../components/Alert';
import { events as demoEvents, eventCategories } from '../../data/demoData';
import { parseDate } from '../../utils/format';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function MonthCalendar({ year, month, events }) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const byDay = (d) => events.filter((e) => { const p = parseDate(e.date); return p.year === year && p.month === month && p.day === d; });
  return (
    <div className="calendar" role="grid" aria-label="Event calendar">
      {DOW.map((d) => <div className="calendar__dow" key={d}>{d}</div>)}
      {cells.map((d, i) => (
        <div className={`calendar__cell ${d ? '' : 'blank'}`} key={i}>
          {d && <span className="calendar__day">{d}</span>}
          {d && byDay(d).map((e) => <span className="calendar__event" key={e.id} title={e.title}>{e.title}</span>)}
        </div>
      ))}
    </div>
  );
}

// manage=true (faculty/admin) adds Create event, Approve and Edit actions.
export default function Events({ manage = false }) {
  const { pathname } = useLocation();
  const basePath = '/' + pathname.split('/')[1];
  const [view, setView] = useState('list');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [registered, setRegistered] = useState([]);

  const filtered = useMemo(
    () => demoEvents.filter((e) =>
      (category === 'All' || e.category.toLowerCase() === category.toLowerCase()) &&
      `${e.title} ${e.department} ${e.venue}`.toLowerCase().includes(query.toLowerCase())), // replace with GET /api/events?search=&category=
    [query, category]
  );

  return (
    <>
      <PageHeader
        title={manage ? 'Manage events' : 'Campus events'}
        subtitle="Search, filter and register for workshops, contests, lectures and more."
        actions={manage && <button type="button" className="btn btn-primary"><FiPlus /> Create event</button>}
      />
      {registered.length > 0 && <Alert tone="success">You are registered for {registered.length} event{registered.length > 1 ? 's' : ''}. Reminders will appear in Notifications.</Alert>}
      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search events, departments or venues" label="Search events" />
          <Tabs value={view} onChange={setView} tabs={[{ value: 'list', label: 'List' }, { value: 'calendar', label: 'Calendar' }]} />
        </div>
        <div className="chip-list" style={{ marginTop: 14 }}>
          {['All', ...eventCategories].map((c) => (
            <button type="button" key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </Card>

      {view === 'calendar' ? (
        <Card title="October 2026"><MonthCalendar year={2026} month={9} events={filtered} /></Card>
      ) : filtered.length === 0 ? (
        <Card><EmptyState title="No events found" text="Try another category or clear the search." /></Card>
      ) : (
        <div className="event-grid">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} basePath={basePath} manage={manage} onRegister={(ev) => setRegistered((r) => [...new Set([...r, ev.id])])} />
          ))}
        </div>
      )}
    </>
  );
}
