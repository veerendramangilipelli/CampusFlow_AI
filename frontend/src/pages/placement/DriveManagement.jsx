import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Field from '../../components/Field';
import Alert from '../../components/Alert';
import DataTable from '../../components/DataTable';
import { formatDate } from '../../utils/format';
import { drives as demoDrives, eligibleStudents } from '../../data/demoData';

const EMPTY = { company: '', role: '', date: '', deadline: '', minCgpa: '', minAttendance: '75', departments: '' };

export default function DriveManagement() {
  const [rows, setRows] = useState(demoDrives); // replace with GET /api/placements/drives
  const [form, setForm] = useState(EMPTY);
  const [skills, setSkills] = useState(['Java', 'SQL']);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const update = (key) => (e) => { setSaved(false); setForm((f) => ({ ...f, [key]: e.target.value })); };
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput('');
  };

  const create = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.company.trim()) next.company = 'Company name is required.';
    if (!form.role.trim()) next.role = 'Role is required.';
    if (!form.date) next.date = 'Choose the drive date.';
    if (!form.deadline) next.deadline = 'Choose the registration deadline.';
    if (form.date && form.deadline && form.deadline > form.date) next.deadline = 'Deadline must be on or before the drive date.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setRows((r) => [{ ...form, id: Date.now(), skills, registered: 0, minCgpa: Number(form.minCgpa) || 0, minAttendance: Number(form.minAttendance) || 0 }, ...r]); // POST /api/placements/drives
    setForm(EMPTY);
    setSaved(true);
  };

  return (
    <>
      <PageHeader title="Placement drives" subtitle="Create drives, define eligibility and required skills, and track registrations." />
      <div className="grid-main">
        <Card title="Drives">
          <DataTable
            columns={[
              { key: 'company', header: 'Company', render: (r) => <div><div className="fw-700">{r.company}</div><div className="muted text-sm">{r.role}</div></div> },
              { key: 'date', header: 'Drive date', render: (r) => formatDate(r.date) },
              { key: 'criteria', header: 'Eligibility', render: (r) => `CGPA ${r.minCgpa}+, ${r.minAttendance}%+` },
              { key: 'registered', header: 'Registered', render: (r) => <Badge tone="info">{r.registered}</Badge> },
              { key: 'actions', header: '', className: 'actions', render: () => <><button type="button" className="btn btn-outline btn-sm">Edit</button><button type="button" className="btn btn-primary btn-sm">Registrations</button></> },
            ]}
            rows={rows}
          />
        </Card>

        <Card title="Create placement drive">
          <form className="stack" style={{ gap: 14 }} onSubmit={create} noValidate>
            {saved && <Alert tone="success">Drive created.</Alert>}
            <Field label="Company" id="d-company" error={errors.company}><input className="input" value={form.company} onChange={update('company')} /></Field>
            <Field label="Job role" id="d-role" error={errors.role}><input className="input" value={form.role} onChange={update('role')} /></Field>
            <div className="form-grid">
              <Field label="Drive date" id="d-date" error={errors.date}><input className="input" type="date" value={form.date} onChange={update('date')} /></Field>
              <Field label="Registration deadline" id="d-deadline" error={errors.deadline}><input className="input" type="date" value={form.deadline} onChange={update('deadline')} /></Field>
              <Field label="Minimum CGPA" id="d-cgpa"><input className="input" type="number" step="0.1" min="0" max="10" value={form.minCgpa} onChange={update('minCgpa')} /></Field>
              <Field label="Minimum attendance (%)" id="d-att"><input className="input" type="number" min="0" max="100" value={form.minAttendance} onChange={update('minAttendance')} /></Field>
            </div>
            <Field label="Eligible departments" id="d-dept"><input className="input" placeholder="e.g. CSE, AI & ML" value={form.departments} onChange={update('departments')} /></Field>
            <div className="field">
              <label htmlFor="d-skill">Required skills</label>
              <div className="flex gap-8">
                <input id="d-skill" className="input" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} placeholder="Type a skill and press Enter" />
                <button type="button" className="btn btn-outline" onClick={addSkill}><FiPlus /> Add</button>
              </div>
              <div className="chip-list" style={{ marginTop: 6 }}>
                {skills.map((s) => (
                  <span className="chip" key={s}>{s}
                    <button type="button" aria-label={`Remove ${s}`} onClick={() => setSkills(skills.filter((x) => x !== s))} style={{ border: 0, background: 'transparent', marginLeft: 6, display: 'inline-flex' }}><FiX /></button>
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create drive</button>
          </form>
        </Card>
      </div>

      <Card title="Eligible students for TCS · Software Engineer">
        <DataTable
          columns={[
            { key: 'name', header: 'Student', render: (r) => <span className="fw-700">{r.name}</span> },
            { key: 'roll', header: 'Roll number' },
            { key: 'department', header: 'Department' },
            { key: 'cgpa', header: 'CGPA' },
            { key: 'readiness', header: 'Readiness', render: (r) => <Badge tone={r.readiness >= 70 ? 'success' : r.readiness >= 60 ? 'info' : 'warning'}>{r.readiness}/100</Badge> },
          ]}
          rows={eligibleStudents}
        />
      </Card>
    </>
  );
}
