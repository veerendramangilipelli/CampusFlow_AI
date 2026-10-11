import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiMapPin } from 'react-icons/fi';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import ProgressBar from '../../components/ProgressBar';
import EmptyState from '../../components/EmptyState';
import { seatStatus } from '../../components/EventCard';
import { formatDate } from '../../utils/format';
import { events, venues } from '../../data/demoData';

export default function EventDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const basePath = '/' + pathname.split('/')[1];
  const event = events.find((e) => String(e.id) === String(id)); // replace with GET /api/events/{id}
  const [registered, setRegistered] = useState(false);
  const [reminder, setReminder] = useState(false);

  if (!event) return <Card><EmptyState title="Event not found" action={<Link className="btn btn-primary" to={`${basePath}/events`}>Back to events</Link>} /></Card>;

  const venue = venues.find((v) => v.name === event.venue);
  const seats = seatStatus(event);
  const pct = Math.round((event.registered / event.total) * 100);

  return (
    <>
      <Link to={`${basePath}/events`} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}><FiArrowLeft /> All events</Link>
      <section className="hero">
        <div>
          <div className="flex gap-8 wrap" style={{ marginBottom: 10 }}>
            <Badge tone="info">{event.category}</Badge>
            <Badge tone={seats.tone}>{seats.label}</Badge>
          </div>
          <h1>{event.title}</h1>
          <p>{formatDate(event.date)} · {event.start} to {event.end} · {event.venue}, {event.building}</p>
        </div>
      </section>

      <div className="grid-main">
        <div className="stack">
          <Card title="About this event">
            <p>{event.description}</p>
          </Card>
          <Card title="Event details">
            <dl className="kv">
              <div><dt>Date</dt><dd>{formatDate(event.date)}</dd></div>
              <div><dt>Time</dt><dd>{event.start} to {event.end}</dd></div>
              <div><dt>Organizing department</dt><dd>{event.department}</dd></div>
              <div><dt>Eligibility</dt><dd>{event.eligibility}</dd></div>
              <div><dt>Registration deadline</dt><dd>{formatDate(event.deadline)}</dd></div>
              <div><dt>Category</dt><dd>{event.category}</dd></div>
            </dl>
          </Card>
          <Card title="Venue" action={<Badge tone="neutral"><FiMapPin aria-hidden="true" />&nbsp;{event.venue}</Badge>}>
            <dl className="kv">
              <div><dt>Building</dt><dd>{event.building}</dd></div>
              <div><dt>Floor</dt><dd>{event.floor === 0 ? 'Ground floor' : `Floor ${event.floor}`}</dd></div>
              <div><dt>Room number</dt><dd>{event.room}</dd></div>
              <div><dt>Capacity</dt><dd>{venue ? `${venue.capacity} seats` : '-'}</dd></div>
            </dl>
            {venue && <p className="muted" style={{ marginTop: 14 }}>{venue.description}</p>}
          </Card>
        </div>

        <Card title="Registration">
          {registered && <Alert tone="success">You are registered for this event.</Alert>}
          <div style={{ margin: '14px 0' }}>
            <div className="meter-row__top"><span>Seats filled</span><b>{event.registered} / {event.total}</b></div>
            <ProgressBar value={pct} warnBelow={0} tone={pct >= 90 ? 'danger' : pct >= 75 ? 'warning' : ''} label="Seats filled" />
            <p className="muted text-sm" style={{ marginTop: 6 }}>{seats.left} seats left · closes {formatDate(event.deadline)}</p>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            {registered ? (
              <button type="button" className="btn btn-danger btn-block" onClick={() => setRegistered(false)}>Cancel registration</button>
            ) : (
              <button type="button" className="btn btn-primary btn-block" disabled={seats.left <= 0} onClick={() => setRegistered(true)}>Register for event</button>
            )}
            <button type="button" className="btn btn-outline btn-block" onClick={() => setReminder((v) => !v)}>
              <FiBell /> {reminder ? 'Reminder added' : 'Add reminder'}
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}
