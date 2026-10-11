import { FiPercent, FiCheckCircle, FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import DataTable from '../../components/DataTable';
import ProgressBar from '../../components/ProgressBar';
import { formatDate } from '../../utils/format';
import { attendanceByCourse, attendanceHistory } from '../../data/demoData';

const TONE = { Present: 'success', Absent: 'danger', Late: 'warning' };

export default function Attendance() {
  const low = attendanceByCourse.filter((c) => c.percent < 75);
  return (
    <>
      <PageHeader title="Attendance" subtitle="Course-wise attendance and recent history. Only faculty can change attendance." />
      {low.length > 0 && (
        <Alert tone="warning">Attendance warning: {low.map((c) => c.course).join(', ')} is below the 75% requirement.</Alert>
      )}
      <div className="stat-grid">
        <StatCard icon={FiPercent} label="Overall attendance" value="87%" hint="Above 75% requirement" />
        <StatCard icon={FiCheckCircle} tone="success" label="Classes attended" value="188" hint="of 222 held" trend="flat" />
        <StatCard icon={FiXCircle} tone="danger" label="Classes missed" value="34" hint="This semester" trend="flat" />
        <StatCard icon={FiAlertTriangle} tone="warning" label="Courses below 75%" value={low.length} hint="Needs attention" trend="down" />
      </div>
      <div className="grid-main">
        <Card title="Course-wise attendance">
          <DataTable
            columns={[
              { key: 'course', header: 'Course' },
              { key: 'attended', header: 'Attended', render: (r) => `${r.attended} / ${r.total}` },
              { key: 'percent', header: 'Percentage', render: (r) => (
                <div className="flex center gap-12"><div className="grow" style={{ minWidth: 120 }}><ProgressBar value={r.percent} label={`${r.course} attendance`} /></div><b>{r.percent}%</b></div>
              ) },
              { key: 'status', header: 'Status', render: (r) => <Badge tone={r.percent < 75 ? 'warning' : 'success'}>{r.percent < 75 ? 'At risk' : 'Good'}</Badge> },
            ]}
            rows={attendanceByCourse}
            rowKey="course"
          />
        </Card>
        <Card title="Recent history">
          {attendanceHistory.map((h) => (
            <div className="list-row" key={h.id}>
              <div className="grow">
                <div className="fw-700">{h.course}</div>
                <div className="muted text-sm">{formatDate(h.date)}</div>
              </div>
              <Badge tone={TONE[h.status]}>{h.status}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
