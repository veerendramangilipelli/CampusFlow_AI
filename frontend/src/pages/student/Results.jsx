import { FiAward, FiBookOpen, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import DataTable from '../../components/DataTable';
import BarChart from '../../components/BarChart';
import ProgressBar from '../../components/ProgressBar';
import { results, semesterGpa } from '../../data/demoData';

const gradeTone = (g) => (g.startsWith('A') ? 'success' : g.startsWith('B') ? 'info' : 'warning');

export default function Results() {
  return (
    <>
      <PageHeader title="Results" subtitle="Assessment marks, grades and academic performance." />
      <div className="stat-grid">
        <StatCard icon={FiAward} tone="success" label="Current GPA" value="8.4" hint="Up 0.3 from last term" />
        <StatCard icon={FiBookOpen} label="Credits earned" value="96" hint="of 120 required" trend="flat" />
        <StatCard icon={FiTrendingUp} label="Semester 5 GPA" value="8.5" hint="Best so far" />
        <StatCard icon={FiCheckCircle} tone="success" label="Backlogs" value="0" hint="All cleared" />
      </div>
      <div className="grid-main">
        <Card title="Assessment results">
          <DataTable
            columns={[
              { key: 'assessment', header: 'Assessment' },
              { key: 'course', header: 'Course' },
              { key: 'marks', header: 'Marks', render: (r) => `${r.marks} / ${r.total}` },
              { key: 'percent', header: 'Score', render: (r) => <div style={{ minWidth: 110 }}><ProgressBar value={Math.round((r.marks / r.total) * 100)} label={`${r.assessment} score`} /></div> },
              { key: 'grade', header: 'Grade', render: (r) => <Badge tone={gradeTone(r.grade)}>{r.grade}</Badge> },
            ]}
            rows={results}
          />
        </Card>
        <Card title="GPA by semester">
          <BarChart data={semesterGpa} max={10} />
        </Card>
      </div>
    </>
  );
}
