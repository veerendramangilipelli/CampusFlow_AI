import { useState } from 'react';
import { FiPlus, FiUpload } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Tabs from '../../components/Tabs';
import DataTable from '../../components/DataTable';
import ProgressBar from '../../components/ProgressBar';
import { formatDate } from '../../utils/format';
import { assignments, facultyStats } from '../../data/demoData';

const STATUS = {
  PENDING: { tone: 'danger', label: 'Pending' },
  IN_PROGRESS: { tone: 'warning', label: 'In progress' },
  SUBMITTED: { tone: 'success', label: 'Submitted' },
  GRADED: { tone: 'info', label: 'Graded' },
};

// mode: 'student' (view and submit) | 'faculty' (create and review)
export default function Assignments({ mode = 'student' }) {
  const [tab, setTab] = useState('ALL');
  const faculty = mode === 'faculty';
  const rows = tab === 'ALL' ? assignments : assignments.filter((a) => a.status === tab);
  const count = (s) => assignments.filter((a) => a.status === s).length;

  const studentColumns = [
    { key: 'title', header: 'Title', render: (r) => <div><div className="fw-700">{r.title}</div><div className="muted text-sm">{r.course}</div></div> },
    { key: 'due', header: 'Due date', render: (r) => formatDate(r.due) },
    { key: 'maxMarks', header: 'Marks', render: (r) => (r.marks !== null ? `${r.marks} / ${r.maxMarks}` : `- / ${r.maxMarks}`) },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS[r.status].tone}>{STATUS[r.status].label}</Badge> },
    { key: 'action', header: '', className: 'actions', render: (r) => (
      ['PENDING', 'IN_PROGRESS'].includes(r.status)
        ? <button type="button" className="btn btn-primary btn-sm"><FiUpload /> Submit</button>
        : <button type="button" className="btn btn-outline btn-sm">View</button>
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
        <DataTable columns={faculty ? facultyColumns : studentColumns} rows={rows} emptyTitle="No assignments" emptyText="Nothing matches this filter." />
      </Card>
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
