import { useEffect, useMemo, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import DataTable from '../../components/DataTable';
import SearchInput from '../../components/SearchInput';
import Modal from '../../components/Modal';
import Field from '../../components/Field';
import Skeleton from '../../components/Skeleton';
import { getCourses } from '../../services/courseService';
import { getErrorMessage } from '../../utils/format';

const EMPTY = { code: '', name: '', department: '', credits: '', semester: '', academicYear: '', faculty: '', description: '' };

// manage=true shows Add / Edit / Delete (faculty and admin). Backend must enforce the same.
export default function Courses({ manage = false }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | { delete: course }
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;
    getCourses()
      .then((data) => active && setRows(data))
      .catch((error) => active && setLoadError(getErrorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const departments = [...new Set(rows.map((c) => c.department))];
  const filtered = useMemo(
    () => rows.filter((c) =>
      (!dept || c.department === dept) &&
      `${c.name} ${c.code} ${c.faculty}`.toLowerCase().includes(query.toLowerCase())),
    [rows, query, dept]
  );

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const save = () => {
    const next = {};
    if (!form.code.trim()) next.code = 'Course code is required.';
    if (!form.name.trim()) next.name = 'Course name is required.';
    if (!form.department) next.department = 'Select a department.';
    if (!(Number(form.credits) > 0)) next.credits = 'Enter credits.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setRows((r) => [...r, { ...form, id: Date.now(), credits: Number(form.credits), semester: Number(form.semester) || 1 }]); // replace with POST /api/courses
    setForm(EMPTY);
    setModal(null);
  };
  const remove = () => {
    setRows((r) => r.filter((c) => c.id !== modal.delete.id)); // replace with DELETE /api/courses/{id}
    setModal(null);
  };

  const columns = [
    { key: 'code', header: 'Code', render: (r) => <Badge tone="info">{r.code}</Badge> },
    { key: 'name', header: 'Course', render: (r) => <div><div className="fw-700">{r.name}</div><div className="muted text-sm">{r.faculty}</div></div> },
    { key: 'department', header: 'Department' },
    { key: 'credits', header: 'Credits' },
    { key: 'semester', header: 'Semester' },
    { key: 'academicYear', header: 'Academic year' },
    { key: 'actions', header: '', className: 'actions', render: (r) => (
      <>
        <button type="button" className="btn btn-outline btn-sm" aria-label={`View ${r.name}`} onClick={() => setSelectedCourse(r)}><FiEye /></button>
        {manage && <button type="button" className="btn btn-outline btn-sm" aria-label={`Edit ${r.name}`}><FiEdit2 /></button>}
        {manage && <button type="button" className="btn btn-danger btn-sm" aria-label={`Delete ${r.name}`} onClick={() => setModal({ delete: r })}><FiTrash2 /></button>}
      </>
    ) },
  ];

  return (
    <>
      <PageHeader
        title={manage ? 'Course management' : 'Courses'}
        subtitle={`${rows.length} courses this academic year`}
        actions={manage && <button type="button" className="btn btn-primary" onClick={() => setModal('add')}><FiPlus /> Add course</button>}
      />
      <Card>
        {loadError && <Alert tone="error">{loadError}</Alert>}
        <div className="toolbar" style={{ marginBottom: 16 }}>
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, code or faculty" label="Search courses" />
          <select className="select" value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
            <option value="">All departments</option>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        {loading ? (
          <div className="stack"><Skeleton height={18} /><Skeleton height={18} /><Skeleton height={18} /></div>
        ) : (
          <DataTable columns={columns} rows={filtered} emptyTitle="No courses found" emptyText="Try a different search or filter." />
        )}
      </Card>

      <Modal open={Boolean(selectedCourse)} title={selectedCourse?.name || 'Course details'} onClose={() => setSelectedCourse(null)}>
        {selectedCourse && (
          <dl className="kv">
            <div><dt>Course code</dt><dd>{selectedCourse.code}</dd></div>
            <div><dt>Department</dt><dd>{selectedCourse.department}</dd></div>
            <div><dt>Faculty</dt><dd>{selectedCourse.faculty || 'Not assigned'}</dd></div>
            <div><dt>Credits</dt><dd>{selectedCourse.credits}</dd></div>
            <div><dt>Semester</dt><dd>{selectedCourse.semester}</dd></div>
            <div><dt>Academic year</dt><dd>{selectedCourse.academicYear}</dd></div>
            <div><dt>Description</dt><dd>{selectedCourse.description || 'No description available.'}</dd></div>
          </dl>
        )}
      </Modal>

      <Modal
        open={modal === 'add'}
        title="Add course"
        onClose={() => setModal(null)}
        footer={<><button type="button" className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button><button type="button" className="btn btn-primary" onClick={save}>Save course</button></>}
      >
        <div className="form-grid">
          <Field label="Course code" id="c-code" error={errors.code}><input className="input" value={form.code} onChange={update('code')} /></Field>
          <Field label="Course name" id="c-name" error={errors.name}><input className="input" value={form.name} onChange={update('name')} /></Field>
          <Field label="Department" id="c-dept" error={errors.department}>
            <select className="select" value={form.department} onChange={update('department')}>
              <option value="">Select department</option>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Credits" id="c-credits" error={errors.credits}><input className="input" type="number" min="1" value={form.credits} onChange={update('credits')} /></Field>
          <Field label="Semester" id="c-sem"><input className="input" type="number" min="1" max="8" value={form.semester} onChange={update('semester')} /></Field>
          <Field label="Academic year" id="c-year"><input className="input" placeholder="2026-27" value={form.academicYear} onChange={update('academicYear')} /></Field>
          <Field label="Assigned faculty" id="c-faculty"><input className="input" value={form.faculty} onChange={update('faculty')} /></Field>
        </div>
        <div style={{ marginTop: 16 }}>
          <Field label="Description" id="c-desc"><textarea className="textarea" value={form.description} onChange={update('description')} /></Field>
        </div>
      </Modal>

      <Modal
        open={Boolean(modal?.delete)}
        title="Delete course"
        onClose={() => setModal(null)}
        footer={<><button type="button" className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button><button type="button" className="btn btn-danger" onClick={remove}>Delete</button></>}
      >
        <p>Delete <b>{modal?.delete?.name}</b>? This cannot be undone.</p>
      </Modal>
    </>
  );
}
