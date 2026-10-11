import { Link, useNavigate } from 'react-router-dom';
import { FiPercent, FiAward, FiFileText, FiBriefcase, FiMapPin } from 'react-icons/fi';
import Hero from '../../components/Hero';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import DataTable from '../../components/DataTable';
import MeterRow from '../../components/MeterRow';
import RingChart from '../../components/RingChart';
import { useAuth } from '../../context/AuthContext';
import { firstName, formatDate, dayOf, monthShort } from '../../utils/format';
import { student, assignments, attendanceByCourse, nextActions, progress, skillGaps, events } from '../../data/demoData';

const STATUS = {
  PENDING: { tone: 'danger', label: 'Pending' },
  IN_PROGRESS: { tone: 'warning', label: 'In progress' },
  SUBMITTED: { tone: 'success', label: 'Submitted' },
  GRADED: { tone: 'info', label: 'Graded' },
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const upcoming = assignments.filter((a) => a.status !== 'GRADED').slice(0, 4);

  return (
    <>
      <Hero
        title={`Welcome back, ${firstName(user?.name)}`}
        subtitle={`${student.department}, Semester ${student.semester}. You have 3 assignments due this week.`}
        action={<button type="button" className="btn btn-light" onClick={() => navigate('/student/assignments')}>View assignments</button>}
      />

      <div className="stat-grid">
        <StatCard icon={FiPercent} label="Attendance" value="87%" hint="Above 75% requirement" />
        <StatCard icon={FiAward} tone="success" label="Current GPA" value="8.4" hint="Up 0.3 from last term" />
        <StatCard icon={FiFileText} tone="warning" label="Pending assignments" value="3" hint="1 due tomorrow" trend="down" />
        <StatCard icon={FiBriefcase} label="Placement readiness" value="72/100" hint="4 drives eligible" />
      </div>

      <div className="grid-2">
        <Card title="Your next best actions" action={<Badge tone="success">AI suggested</Badge>}>
          {nextActions.map((a) => (
            <div className="list-row" key={a.id}>
              <div className="grow">
                <div className="fw-700">{a.title}</div>
                <div className="muted text-sm">{a.hint}</div>
              </div>
              <Badge tone={a.tone}>{a.badge}</Badge>
            </div>
          ))}
        </Card>
        <Card title="Your progress">
          <div className="flex center gap-16 wrap">
            <RingChart value={68} label="Overall completion 68 percent" />
            <dl className="kv grow" style={{ gridTemplateColumns: '1fr 1fr', margin: 0 }}>
              {progress.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Upcoming assignments" action={<Link className="btn btn-primary btn-sm" to="/student/assignments">View all</Link>}>
          <DataTable
            columns={[
              { key: 'title', header: 'Title', render: (r) => <div><div className="fw-700">{r.title}</div><div className="muted text-sm">{r.course}</div></div> },
              { key: 'due', header: 'Due', render: (r) => formatDate(r.due) },
              { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS[r.status].tone}>{STATUS[r.status].label}</Badge> },
            ]}
            rows={upcoming}
          />
        </Card>
        <Card title="Attendance by course">
          {attendanceByCourse.slice(0, 4).map((c) => (
            <MeterRow key={c.course} label={c.course} value={c.percent} />
          ))}
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Placement readiness" action={<Link className="btn btn-outline btn-sm" to="/student/placements">Details</Link>}>
          <div className="flex center gap-16 wrap">
            <RingChart value={72} label="Placement readiness 72 percent" />
            <div className="grow">
              <p className="muted text-sm" style={{ marginBottom: 8 }}>Skill gaps to close</p>
              <div className="chip-list">
                {skillGaps.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          </div>
        </Card>
        <Card title="Upcoming events" action={<Link className="btn btn-outline btn-sm" to="/student/events">Browse</Link>}>
          {events.slice(0, 3).map((e) => (
            <div className="list-row" key={e.id}>
              <div className="date-tile">{dayOf(e.date)}<small>{monthShort(e.date)}</small></div>
              <div className="grow">
                <div className="fw-700">{e.title}</div>
                <div className="muted text-sm"><FiMapPin aria-hidden="true" /> {e.venue}, {e.building}, Floor {e.floor}</div>
              </div>
              <Badge tone={e.total - e.registered <= 10 ? 'warning' : 'success'}>{e.total - e.registered <= 10 ? 'Few seats' : 'Open'}</Badge>
            </div>
          ))}
        </Card>
      </div>

      <Card className="card--dark ai-card" title="AI College Assistant" action={<Badge tone="warning">Demo until connected</Badge>}>
        <div className="chat">
          <div className="bubble me">When is my next exam?</div>
          <div className="bubble">I can check your assessment schedule and attendance. Open the Assessments page for exact dates.</div>
        </div>
        <button type="button" className="btn btn-primary mt-16" onClick={() => navigate('/student/assistant')}>Open assistant</button>
      </Card>
    </>
  );
}
