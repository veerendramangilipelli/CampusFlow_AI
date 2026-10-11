import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClipboard, FiTrendingDown, FiClock, FiCheckSquare, FiFileText, FiCalendar } from 'react-icons/fi';
import Hero from '../../components/Hero';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import BarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { courses, facultyStats } from '../../data/demoData';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const mine = courses.slice(0, 3);

  return (
    <>
      <Hero
        title={`Good morning, ${user?.name}`}
        subtitle="You have 3 classes today and 12 submissions waiting for review."
        action={<button type="button" className="btn btn-light" onClick={() => navigate('/faculty/assignments')}>Review submissions</button>}
      />
      <div className="stat-grid">
        <StatCard icon={FiUsers} label="Total students" value="48" hint="Across 3 courses" trend="flat" />
        <StatCard icon={FiClipboard} tone="warning" label="Pending reviews" value="12" hint="Oldest from 8 Oct" trend="down" />
        <StatCard icon={FiTrendingDown} tone="danger" label="Low performers" value="9" hint="Below 60% average" trend="down" />
        <StatCard icon={FiClock} tone="success" label="Classes today" value="3" hint="Next at 09:00" trend="flat" />
      </div>

      <div className="grid-main">
        <Card title="Student performance: Database Systems">
          <BarChart data={facultyStats.performance} max={100} unit="%" />
        </Card>
        <Card title="Insights">
          {facultyStats.insights.map((i) => (
            <div className="list-row" key={i.id}>
              <div className="grow fw-600">{i.text}</div>
              <Badge tone={i.tone}>{i.badge}</Badge>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Today's schedule">
          {facultyStats.schedule.map((s) => (
            <div className="list-row" key={s.id}>
              <div className="date-tile" style={{ fontSize: 15 }}>{s.time}</div>
              <div className="grow"><div className="fw-700">{s.course}</div><div className="muted text-sm">Room {s.room}</div></div>
            </div>
          ))}
        </Card>
        <Card title="Quick actions">
          <div className="grid-2" style={{ gap: 12 }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/attendance')}><FiCheckSquare /> Record attendance</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/assignments')}><FiFileText /> Create assignment</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/events')}><FiCalendar /> Manage events</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/courses')}>My courses</button>
          </div>
        </Card>
      </div>

      <Card title="Assigned courses">
        <DataTable
          columns={[
            { key: 'code', header: 'Code', render: (r) => <Badge tone="info">{r.code}</Badge> },
            { key: 'name', header: 'Course', render: (r) => <span className="fw-700">{r.name}</span> },
            { key: 'semester', header: 'Semester' },
            { key: 'credits', header: 'Credits' },
            { key: 'students', header: 'Students', render: () => '48' },
          ]}
          rows={mine}
        />
      </Card>
    </>
  );
}
