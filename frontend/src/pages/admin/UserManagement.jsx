import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Tabs from '../../components/Tabs';
import Avatar from '../../components/Avatar';
import DataTable from '../../components/DataTable';
import SearchInput from '../../components/SearchInput';
import { ROLE_LABELS } from '../../utils/format';
import { users as demoUsers } from '../../data/demoData';

const STATUS_TONE = { ACTIVE: 'success', PENDING: 'warning', INACTIVE: 'neutral' };

export default function UserManagement() {
  const [rows, setRows] = useState(demoUsers); // replace with GET /api/admin/users
  const [tab, setTab] = useState('ALL');
  const [role, setRole] = useState('');
  const [query, setQuery] = useState('');

  const pendingCount = rows.filter((u) => u.status === 'PENDING').length;
  const filtered = useMemo(
    () => rows.filter((u) =>
      (tab === 'ALL' || u.status === tab) &&
      (!role || u.role === role) &&
      `${u.name} ${u.email} ${u.department}`.toLowerCase().includes(query.toLowerCase())),
    [rows, tab, role, query]
  );

  const setStatus = (id, status) => setRows((list) => list.map((u) => (u.id === id ? { ...u, status } : u))); // PATCH /api/admin/users/{id}/status

  return (
    <>
      <PageHeader title="Users and approvals" subtitle="Approve faculty and placement accounts, and manage access." />
      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'ALL', label: 'All users', count: rows.length },
        { value: 'PENDING', label: 'Pending approval', count: pendingCount },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
      ]} />
      <Card>
        <div className="toolbar" style={{ marginBottom: 16 }}>
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, email or department" label="Search users" />
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role">
            <option value="">All roles</option>
            {Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <DataTable
          columns={[
            { key: 'name', header: 'User', render: (r) => <div className="cell-user"><Avatar name={r.name} size="sm" /><div><div className="fw-700">{r.name}</div><div className="muted text-sm">{r.email}</div></div></div> },
            { key: 'role', header: 'Role', render: (r) => <Badge tone="info">{ROLE_LABELS[r.role]}</Badge> },
            { key: 'department', header: 'Department' },
            { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status]}>{r.status.charAt(0) + r.status.slice(1).toLowerCase()}</Badge> },
            { key: 'actions', header: '', className: 'actions', render: (r) => r.status === 'PENDING' ? (
              <><button type="button" className="btn btn-success btn-sm" onClick={() => setStatus(r.id, 'ACTIVE')}>Approve</button><button type="button" className="btn btn-danger btn-sm" onClick={() => setStatus(r.id, 'INACTIVE')}>Reject</button></>
            ) : r.status === 'ACTIVE' ? (
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus(r.id, 'INACTIVE')}>Deactivate</button>
            ) : (
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus(r.id, 'ACTIVE')}>Activate</button>
            ) },
          ]}
          rows={filtered}
          emptyTitle="No users found"
          emptyText="Try a different filter or search."
        />
      </Card>
    </>
  );
}
