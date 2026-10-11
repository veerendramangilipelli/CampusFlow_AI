import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import DataTable from '../../components/DataTable';
import MeterRow from '../../components/MeterRow';
import RingChart from '../../components/RingChart';
import { formatDate } from '../../utils/format';
import { drives, readinessFactors } from '../../data/demoData';

export default function Placements() {
  const [registered, setRegistered] = useState([]);
  const register = (id) => setRegistered((r) => [...r, id]); // replace with POST /api/placements/drives/{id}/register

  return (
    <>
      <PageHeader title="Placements" subtitle="Check your readiness and eligibility, then register for drives." />
      <div className="grid-2">
        <Card title="Placement readiness">
          <div className="flex center gap-16 wrap">
            <RingChart value={72} label="Placement readiness 72 percent" />
            <div className="grow">
              <p className="fw-700">72 out of 100</p>
              <p className="muted text-sm">A weighted score of the five factors on the right, calculated from your recorded data.</p>
            </div>
          </div>
          <div className="mt-16">
            <Alert tone="info">Placement interests are not set yet, so that factor uses a default. Add them in Profile to complete your score.</Alert>
          </div>
        </Card>
        <Card title="How your score is calculated">
          {readinessFactors.map((f) => (
            <MeterRow key={f.label} label={`${f.label} (weight ${f.weight}%)`} value={f.value} warnBelow={65} />
          ))}
        </Card>
      </div>

      <Card title="Placement drives">
        <DataTable
          columns={[
            { key: 'company', header: 'Company', render: (r) => <div><div className="fw-700">{r.company}</div><div className="muted text-sm">{r.role}</div></div> },
            { key: 'date', header: 'Drive date', render: (r) => formatDate(r.date) },
            { key: 'criteria', header: 'Eligibility', render: (r) => `CGPA ${r.minCgpa}+, attendance ${r.minAttendance}%+` },
            { key: 'skills', header: 'Required skills', render: (r) => <div className="chip-list">{r.skills.map((s) => <span className="chip" key={s} style={{ padding: '3px 10px', fontSize: 12 }}>{s}</span>)}</div> },
            { key: 'status', header: 'Your status', render: (r) => r.eligible ? <Badge tone="success">Eligible</Badge> : <div><Badge tone="danger">Not eligible</Badge><div className="muted text-sm" style={{ marginTop: 4 }}>{r.reason}</div></div> },
            { key: 'action', header: '', className: 'actions', render: (r) => registered.includes(r.id)
              ? <Badge tone="info">Registered</Badge>
              : <button type="button" className="btn btn-primary btn-sm" disabled={!r.eligible} onClick={() => register(r.id)}>Register</button> },
          ]}
          rows={drives}
        />
      </Card>
    </>
  );
}
