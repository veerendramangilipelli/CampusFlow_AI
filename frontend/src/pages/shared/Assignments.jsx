import { useEffect, useState } from 'react';
import { FiPlus, FiUpload } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Tabs from '../../components/Tabs';
import DataTable from '../../components/DataTable';
import ProgressBar from '../../components/ProgressBar';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Skeleton from '../../components/Skeleton';
import { formatDate, getErrorMessage } from '../../utils/format';
import { assignments as demoAssignments, facultyStats } from '../../data/demoData';
import { getMySubmission, getStudentAssignments, submitAssignment } from '../../services/assignmentService';
import { isDemoMode } from '../../services/authService';

const STATUS = {
  PENDING: { tone: 'danger', label: 'Pending' },
  IN_PROGRESS: { tone: 'warning', label: 'In progress' },
  SUBMITTED: { tone: 'success', label: 'Submitted' },
  GRADED: { tone: 'info', label: 'Graded' },
};

// mode: 'student' (view and submit) | 'faculty' (create and review)
export default function Assignments({ mode = 'student' }) {
  const [tab, setTab] = useState('ALL');
  const [studentRows, setStudentRows] = useState([]);
  const [loading, setLoading] = useState(mode === 'student');
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [content, setContent] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const faculty = mode === 'faculty';
  const assignments = faculty ? demoAssignments : studentRows;
  const rows = tab === 'ALL' ? assignments : assignments.filter((a) => a.status === tab);
  const count = (s) => assignments.filter((a) => a.status === s).length;

  useEffect(() => {
    if (faculty) return undefined;
    let active = true;
    getStudentAssignments()
      .then((data) => active && setStudentRows(data))
      .catch((error) => active && setLoadError(getErrorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [faculty]);

  useEffect(() => {
    if (!selected || selected.mode !== 'view' || isDemoMode) {
      setSubmission(null);
      setSubmissionLoading(false);
      return undefined;
    }
    let active = true;
    setSubmissionLoading(true);
    getMySubmission(selected.assignment.id)
      .then((data) => active && setSubmission(data))
      .catch((error) => active && setActionError(getErrorMessage(error)))
      .finally(() => active && setSubmissionLoading(false));
    return () => { active = false; };
  }, [selected]);

  const openAssignment = (assignment, mode) => {
    setActionError('');
    setActionSuccess('');
    setContent('');
    setSubmission(null);
    setSelected({ assignment, mode });
  };

  const saveSubmission = async (event) => {
    event.preventDefault();
    if (!selected || !content.trim()) {
      setActionError('Enter your assignment submission before saving.');
      return;
    }
    setActionError('');
    setSaving(true);
    try {
      const savedSubmission = await submitAssignment(selected.assignment.id, content);
      setStudentRows((list) => list.map((assignment) => (
        assignment.id === selected.assignment.id
          ? { ...assignment, status: 'SUBMITTED', submittedAt: savedSubmission.submittedAt }
          : assignment
      )));
      setActionSuccess('Submission saved.');
      setSubmission(savedSubmission);
      setSelected({ ...selected, mode: 'view' });
    } catch (error) {
      setActionError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const studentColumns = [
    { key: 'title', header: 'Title', render: (r) => <div><div className="fw-700">{r.title}</div><div className="muted text-sm">{r.course}</div></div> },
    { key: 'due', header: 'Due date', render: (r) => formatDate(r.due) },
    { key: 'maxMarks', header: 'Marks', render: (r) => (r.marks !== null ? `${r.marks} / ${r.maxMarks}` : `- / ${r.maxMarks}`) },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS[r.status].tone}>{STATUS[r.status].label}</Badge> },
    { key: 'action', header: '', className: 'actions', render: (r) => (
      ['PENDING', 'IN_PROGRESS'].includes(r.status)
      ? <button type="button" className="btn btn-primary btn-sm" disabled={new Date(`${r.due}T23:59:59`) < new Date()} onClick={() => openAssignment(r, 'submit')}><FiUpload /> Submit</button>
      : <button type="button" className="btn btn-outline btn-sm" onClick={() => openAssignment(r, 'view')}>View</button>
    ) },
  ];

  const facultyColumns = [
    { key: 'title', header: 'Assignment', render: (r) => <div><div className="fw-700">{r.title}</div><div className="muted text-sm">{r.course}</div></div> },
    { key: 'due', header: 'Due date', render: (r) => formatDate(r.due) },
    { key: 'submitted', header: 'Submissions', render: (r) => (
      <div className="flex center gap-12"><div style={{ minWidth: 110 }}><ProgressBar value={Math.round((r.submitted / r.total) * 100)} warnBelow={50} label={`${r.title} submissions`} /></div><b>{r.submitted}/{r.total}</b></div>
    ) },
    { key: 'maxMarks', header: 'Max marks' },
    { key: 'action', header: '', className: 'actions', render: () => (
      <><button type="button" className="btn btn-outline btn-sm">Edit</button><button type="button" className="btn btn-primary btn-sm">Review</button></>
    ) },
  ];

  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle={faculty ? 'Create assignments and review student submissions.' : 'Track deadlines and submit your work.'}
        actions={faculty && <button type="button" className="btn btn-primary"><FiPlus /> Create assignment</button>}
      />
      {!faculty && loadError && <Alert tone="error">{loadError}</Alert>}
      {!faculty && actionSuccess && <Alert tone="success">{actionSuccess}</Alert>}
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'ALL', label: 'All', count: assignments.length },
          { value: 'PENDING', label: 'Pending', count: count('PENDING') },
          { value: 'IN_PROGRESS', label: 'In progress', count: count('IN_PROGRESS') },
          { value: 'SUBMITTED', label: 'Submitted', count: count('SUBMITTED') },
          { value: 'GRADED', label: 'Graded', count: count('GRADED') },
        ]}
      />
      <Card>
        {!faculty && loading ? (
          <div className="stack"><Skeleton height={18} /><Skeleton height={18} /><Skeleton height={18} /></div>
        ) : (
          <DataTable columns={faculty ? facultyColumns : studentColumns} rows={rows} emptyTitle="No assignments" emptyText="Nothing matches this filter." />
        )}
      </Card>
      {!faculty && (
        <Modal
          open={Boolean(selected)}
          title={selected?.mode === 'submit' ? `Submit: ${selected.assignment.title}` : selected?.assignment.title || 'Assignment details'}
          onClose={() => setSelected(null)}
          footer={selected?.mode === 'submit' && (
            <>
              <button type="button" className="btn btn-outline" onClick={() => setSelected(null)}>Cancel</button>
              <button type="submit" form="assignment-submission" className="btn btn-primary" disabled={saving || !content.trim()}>{saving ? 'Submitting...' : 'Submit work'}</button>
            </>
          )}
        >
          {selected && (
            <>
              {actionError && <Alert tone="error">{actionError}</Alert>}
              <dl className="kv">
                <div><dt>Course</dt><dd>{selected.assignment.course}</dd></div>
                <div><dt>Due date</dt><dd>{formatDate(selected.assignment.due)}</dd></div>
                <div><dt>Maximum marks</dt><dd>{selected.assignment.maxMarks}</dd></div>
                <div><dt>Status</dt><dd>{STATUS[selected.assignment.status]?.label || selected.assignment.status}</dd></div>
                {selected.assignment.marks !== null && <div><dt>Marks</dt><dd>{selected.assignment.marks} / {selected.assignment.maxMarks}</dd></div>}
              </dl>
              {selected.mode === 'submit' ? (
                <form id="assignment-submission" onSubmit={saveSubmission} style={{ marginTop: 16 }}>
                  {isDemoMode && <Alert tone="warning">Demo mode does not save submissions. Disable VITE_DEMO_MODE to submit work.</Alert>}
                  <label className="field" htmlFor="assignment-content">
                    <span>Submission text</span>
                    <textarea id="assignment-content" className="textarea" maxLength={10000} rows={7} value={content} onChange={(event) => setContent(event.target.value)} required />
                  </label>
                </form>
              ) : (
                <div style={{ marginTop: 16 }}>
                  {submissionLoading ? <Skeleton height={48} /> : submission ? (
                    <>
                      <h3>My submission</h3>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{submission.content}</p>
                      <p className="muted text-sm">Submitted {new Date(submission.submittedAt).toLocaleString()}</p>
                    </>
                  ) : (
                    <p className="muted">{isDemoMode ? 'Submission details are not available in demo mode.' : 'No saved submission is available for this assignment.'}</p>
                  )}
                </div>
              )}
            </>
          )}
        </Modal>
      )}
      {faculty && (
        <Card title="Submissions waiting for review">
          <DataTable
            columns={[
              { key: 'student', header: 'Student' },
              { key: 'assignment', header: 'Assignment', render: (r) => <div><div className="fw-700">{r.assignment}</div><div className="muted text-sm">{r.course}</div></div> },
              { key: 'submitted', header: 'Submitted' },
              { key: 'action', header: '', className: 'actions', render: () => <button type="button" className="btn btn-primary btn-sm">Grade</button> },
            ]}
            rows={facultyStats.toReview}
          />
        </Card>
      )}
    </>
  );
}
