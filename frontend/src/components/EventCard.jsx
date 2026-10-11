import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import Badge from './Badge';
import { dayOf, monthShort, formatDate } from '../utils/format';

export function seatStatus(event) {
  const left = event.total - event.registered;
  if (left <= 0) return { tone: 'danger', label: 'Full', left };
  if (left <= 10) return { tone: 'warning', label: 'Few seats', left };
  return { tone: 'success', label: 'Open', left };
}

export default function EventCard({ event, basePath, manage, onRegister }) {
  const status = seatStatus(event);
  return (
    <article className="card event-card">
      <div className="event-card__top">
        <div className="date-tile">{dayOf(event.date)}<small>{monthShort(event.date)}</small></div>
        <div className="grow">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{event.title}</h3>
          <div className="flex gap-8 wrap" style={{ marginTop: 6 }}>
            <Badge tone="info">{event.category}</Badge>
            {manage && event.approval === 'PENDING' && <Badge tone="warning">Pending approval</Badge>}
            {(!manage || event.approval === 'APPROVED') && <Badge tone={status.tone}>{status.label}</Badge>}
          </div>
        </div>
      </div>
      <div className="event-card__meta">
        <span><FiClock aria-hidden="true" /> {event.start} to {event.end}</span>
        <span><FiMapPin aria-hidden="true" /> {event.venue}, {event.building}, Floor {event.floor}</span>
        <span><FiUsers aria-hidden="true" /> {status.left} of {event.total} seats left · closes {formatDate(event.deadline)}</span>
      </div>
      <div className="event-card__foot">
        <Link className="btn btn-outline btn-sm" to={`${basePath}/events/${event.id}`}>View details</Link>
        {manage ? (
          event.approval === 'PENDING' ? <button type="button" className="btn btn-success btn-sm">Approve</button>
            : <button type="button" className="btn btn-outline btn-sm">Edit</button>
        ) : (
          <button type="button" className="btn btn-primary btn-sm" disabled={status.left <= 0} onClick={() => onRegister?.(event)}>
            Register
          </button>
        )}
      </div>
    </article>
  );
}
