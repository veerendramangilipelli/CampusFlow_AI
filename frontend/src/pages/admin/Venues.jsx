import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Field from '../../components/Field';
import Alert from '../../components/Alert';
import DataTable from '../../components/DataTable';
import { venues as demoVenues } from '../../data/demoData';

const EMPTY = { name: '', building: '', floor: '', room: '', capacity: '', description: '' };

export default function Venues() {
  const [rows, setRows] = useState(demoVenues); // replace with GET /api/venues
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const add = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Venue name is required.';
    if (!form.building.trim()) next.building = 'Building is required.';
    if (!(Number(form.capacity) > 0)) next.capacity = 'Enter the capacity.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setRows((r) => [...r, { ...form, id: Date.now(), floor: Number(form.floor) || 0, capacity: Number(form.capacity) }]); // POST /api/venues
    setForm(EMPTY);
  };

  return (
    <>
      <PageHeader title="Venues" subtitle="Rooms and halls available for campus events." />
      <Alert tone="info">The system blocks an event when its venue is already booked for an overlapping time.</Alert>
      <div className="grid-main">
        <Card title="All venues">
          <DataTable
            columns={[
              { key: 'name', header: 'Venue', render: (r) => <div><div className="fw-700">{r.name}</div><div className="muted text-sm">{r.description}</div></div> },
              { key: 'building', header: 'Building' },
              { key: 'floor', header: 'Floor', render: (r) => (r.floor === 0 ? 'Ground' : r.floor) },
              { key: 'room', header: 'Room' },
              { key: 'capacity', header: 'Capacity' },
            ]}
            rows={rows}
          />
        </Card>
        <Card title="Add venue">
          <form className="stack" style={{ gap: 14 }} onSubmit={add} noValidate>
            <Field label="Venue name" id="v-name" error={errors.name}><input className="input" value={form.name} onChange={update('name')} /></Field>
            <div className="form-grid">
              <Field label="Building" id="v-building" error={errors.building}><input className="input" value={form.building} onChange={update('building')} /></Field>
              <Field label="Floor" id="v-floor"><input className="input" type="number" min="0" value={form.floor} onChange={update('floor')} /></Field>
              <Field label="Room number" id="v-room"><input className="input" value={form.room} onChange={update('room')} /></Field>
              <Field label="Capacity" id="v-cap" error={errors.capacity}><input className="input" type="number" min="1" value={form.capacity} onChange={update('capacity')} /></Field>
            </div>
            <Field label="Location description" id="v-desc"><textarea className="textarea" value={form.description} onChange={update('description')} /></Field>
            <button type="submit" className="btn btn-primary btn-block"><FiPlus /> Add venue</button>
          </form>
        </Card>
      </div>
    </>
  );
}
