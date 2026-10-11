import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import Field from '../../components/Field';
import DataTable from '../../components/DataTable';
import { courses, classRoster } from '../../data/demoData';

const OPTIONS = [
  { value: 'Present', cls: 'p' },
  { value: 'Absent', cls: 'a' },
  { value: 'Late', cls: 'l' },
];

export default function ManageAttendance() {
  const [course, setCourse] = useState(String(courses[0].id));
  const [date, setDate] = useState('2026-10-10');
  const [marks, setMarks] = useState(() => Object.fromEntries(classRoster.map((s) => [s.id, 'Present'])));
  const [saved, setSaved] = useState(false);

  const counts = useMemo(() => {
    const c = { Present: 0, Absent: 0, Late: 0 };
    Object.values(marks).forEach((v) => { c[v] += 1; });
    return c;
  }, [marks]);

  const set = (id, value) => { setSaved(false); setMarks((m) => ({ ...m, [id]: value })); };
  const markAll = (value) => { setSaved(false); setMarks(Object.fromEntries(classRoster.map((s) => [s.id, value]))); };
  const save = () => setSaved(true); // replace with POST /api/attendance (courseId, date, records[])

  return (
    <>
      <PageHeader title="Record attendance" subtitle="Mark attendance for a class session. Students can view but not edit it." />
      {saved && <Alert tone="success">Attendance saved for {date}.</Alert>}
      <Card>
        <div className="form-grid" style={{ marginBottom: 18 }}>
          <Field label="Course" id="att-course">
            <select className="select" value={course} onChange={(e) => { setCourse(e.target.value); setSaved(false); }}>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}
            </select>
          </Field>
          <Field label="Date" id="att-date">
            <input className="input" type="date" value={date} onChange={(e) => { setDate(e.target.value); setSaved(false); }} />
          </Field>
        </div>
        <div className="flex center between wrap gap-12" style={{ marginBottom: 14 }}>
          <div className="flex gap-8 wrap">
            <Badge tone="success">Present {counts.Present}</Badge>
            <Badge tone="danger">Absent {counts.Absent}</Badge>
            <Badge tone="warning">Late {counts.Late}</Badge>
          </div>
          <div className="flex gap-8">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => markAll('Present')}>Mark all present</button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => markAll('Absent')}>Mark all absent</button>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'name', header: 'Student', render: (r) => <span className="fw-700">{r.name}</span> },
            { key: 'roll', header: 'Roll number' },
            { key: 'status', header: 'Attendance', render: (r) => (
              <div className="attendance-input" role="radiogroup" aria-label={`Attendance for ${r.name}`}>
                {OPTIONS.map((o) => (
                  <label className="radio-pill" key={o.value}>
                    <input type="radio" name={`att-${r.id}`} checked={marks[r.id] === o.value} onChange={() => set(r.id, o.value)} />
                    <span className={o.cls}>{o.value}</span>
                  </label>
                ))}
              </div>
            ) },
          ]}
          rows={classRoster}
        />
        <div className="flex gap-8 mt-16" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={save}>Save attendance</button>
        </div>
      </Card>
    </>
  );
}
