import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiUserCheck, FiBookOpen, FiClock } from 'react-icons/fi';
import Hero from '../../components/Hero';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import BarChart from '../../components/BarChart';
import MeterRow from '../../components/MeterRow';
import Avatar from '../../components/Avatar';
import DataTable from '../../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { firstName, ROLE_LABELS } from '../../utils/format';
import { adminStats, users } from '../../data/demoData';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [pending, setPending] = useState(users.filter((u) => u.status === 'PENDING'));
  const decide = (id) => setPending((list) => list.filter((u) => u.id !== id)); // PATCH /api/admin/users/{id}/approve | reject

  return (
    <>
      <Hero title={`Welcome back, ${firstName(user?.name)}`} subtitle="Manage users, approvals, events and platform health." action={<Link className="btn btn-light" to="/admin/users">Review approvals</Link>} />
      <div className="stat-grid">
        <StatCard icon={FiUsers} label="Total users" value="2,450" hint="Up 42 this month" />
        <StatCard icon={FiUserCheck} tone="success" label="Active students" value="1,240" hint="Signed in this week" />
        <StatCard icon={FiBookOpen} label="Active faculty" value="182" hint="Across 6 departments" trend="flat" />
        <StatCard icon={FiClock} tone="warning" label="Pending approvals" value={pending.length} hint="Faculty and placement accounts" trend="down" />
      </div>

      <div className="grid-main">
        <Card title="Platform usage (sessions per day)"><BarChart data={adminStats.usage} /></Card>
        <Card title="Department usage">
          {adminStats.departmentUsage.map((d) => <MeterRow key={d.label} label={d.label} value={d.value} warnBelow={50} />)}
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Account approvals" action={<Link className="btn btn-outline btn-sm" to="/admin/users">All users</Link>}>
          {pending.length === 0 && <p className="muted">No accounts waiting for approval.</p>}
          {pending.map((u) => (
            <div className="list-row" key={u.id}>
              <Avatar name={u.name} size="sm" />
              <div className="grow"><div className="fw-700">{u.name}</div><div className="muted text-sm">{ROLE_LABELS[u.role]} · {u.department}</div></div>
              <button type="button" className="btn btn-success btn-sm" onClick={() => decide(u.id)}>Approve</button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => decide(u.id)}>Reject</button>
            </div>
          ))}
        </Card>
        <Card title="Recent alerts">
          {adminStats.alerts.map((a) => (
            <div className="list-row" key={a.id}><div className="grow fw-600">{a.text}</div><Badge tone={a.tone}>{a.tone === 'danger' ? 'Action needed' : a.tone === 'warning' ? 'Watch' : 'Info'}</Badge></div>
          ))}
        </Card>
      </div>

      <Card title="System activity">
        <DataTable
          columns={[
            { key: 'time', header: 'Time' },
            { key: 'who', header: 'User', render: (r) => <span className="fw-700">{r.who}</span> },
            { key: 'action', header: 'Activity' },
          ]}
          rows={adminStats.activity}
        />
      </Card>
    </>
  );
}
