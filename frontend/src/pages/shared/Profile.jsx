import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import Field from '../../components/Field';
import Alert from '../../components/Alert';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../utils/format';
import { student } from '../../data/demoData';

export default function Profile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: student.phone, department: user?.department || '' }); // replace with GET /api/users/me
  const update = (key) => (e) => { setSaved(false); setForm((f) => ({ ...f, [key]: e.target.value })); };

  return (
    <>
      <PageHeader title="Profile" subtitle="Your account details." />
      <div className="grid-main">
        <div className="stack">
          <Card title="Personal information">
            {saved && <div style={{ marginBottom: 14 }}><Alert tone="success">Profile updated.</Alert></div>}
            <div className="form-grid">
              <Field label="Full name" id="p-name"><input className="input" value={form.name} onChange={update('name')} /></Field>
              <Field label="Email" id="p-email" hint="Contact an administrator to change your email."><input className="input" value={user?.email || ''} readOnly /></Field>
              <Field label="Phone number" id="p-phone"><input className="input" value={form.phone} onChange={update('phone')} /></Field>
              <Field label="Department" id="p-dept"><input className="input" value={form.department} onChange={update('department')} /></Field>
            </div>
            <div className="flex gap-8 mt-16">
              <button type="button" className="btn btn-primary" onClick={() => setSaved(true)}>Save changes</button>
            </div>
          </Card>
          <Card title="Change password">
            <div className="form-grid">
              <Field label="Current password" id="pw-old"><input className="input" type="password" autoComplete="current-password" /></Field>
              <Field label="New password" id="pw-new" hint="At least 8 characters."><input className="input" type="password" autoComplete="new-password" /></Field>
            </div>
            <div className="mt-16"><button type="button" className="btn btn-outline">Update password</button></div>
          </Card>
        </div>
        <Card>
          <div className="flex center gap-16">
            <Avatar name={user?.name} size="lg" />
            <div>
              <div className="fw-700" style={{ fontSize: 18 }}>{user?.name}</div>
              <div className="muted">{user?.email}</div>
              <div style={{ marginTop: 8 }}><Badge tone="info">{ROLE_LABELS[user?.role]}</Badge></div>
            </div>
          </div>
          {user?.role === 'STUDENT' && (
            <dl className="kv mt-16" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div><dt>Student ID</dt><dd>{student.studentId}</dd></div>
              <div><dt>Program</dt><dd>{student.program}</dd></div>
              <div><dt>Academic year</dt><dd>{student.academicYear}</dd></div>
              <div><dt>Semester</dt><dd>{student.semester}</dd></div>
            </dl>
          )}
        </Card>
      </div>
    </>
  );
}
