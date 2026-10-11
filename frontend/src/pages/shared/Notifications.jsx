import { useState } from 'react';
import { FiFileText, FiAlertTriangle, FiCalendar, FiBriefcase, FiMessageSquare, FiBell } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Tabs from '../../components/Tabs';
import EmptyState from '../../components/EmptyState';
import { notifications as demoNotifications } from '../../data/demoData';

const ICONS = {
  assignment: { icon: FiFileText, tone: 'tone-primary' },
  attendance: { icon: FiAlertTriangle, tone: 'tone-warning' },
  event: { icon: FiCalendar, tone: 'tone-primary' },
  placement: { icon: FiBriefcase, tone: 'tone-success' },
  announcement: { icon: FiMessageSquare, tone: 'tone-primary' },
};

export default function Notifications() {
  const [items, setItems] = useState(demoNotifications); // replace with GET /api/notifications
  const [tab, setTab] = useState('all');
  const unread = items.filter((n) => n.unread).length;
  const shown = tab === 'unread' ? items.filter((n) => n.unread) : items;

  const markAll = () => setItems((list) => list.map((n) => ({ ...n, unread: false }))); // PATCH /api/notifications/read-all

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Deadlines, warnings, reminders and announcements."
        actions={<button type="button" className="btn btn-outline" onClick={markAll} disabled={unread === 0}>Mark all as read</button>}
      />
      <Tabs value={tab} onChange={setTab} tabs={[{ value: 'all', label: 'All', count: items.length }, { value: 'unread', label: 'Unread', count: unread }]} />
      <Card>
        {shown.length === 0 ? (
          <EmptyState icon={FiBell} title="You are all caught up" text="New notifications will appear here." />
        ) : (
          shown.map((n) => {
            const { icon: Icon, tone } = ICONS[n.type];
            return (
              <div className={`notif ${n.unread ? 'unread' : ''}`} key={n.id}>
                <span className={`icon-tile ${tone}`}><Icon aria-hidden="true" /></span>
                <div>
                  <div className="notif__title">{n.title}</div>
                  <div className="muted">{n.message}</div>
                </div>
                <span className="notif__time">{n.time}</span>
              </div>
            );
          })
        )}
      </Card>
    </>
  );
}
