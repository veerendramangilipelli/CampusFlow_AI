import { Link, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiUserCheck, FiTrendingUp } from 'react-icons/fi';
import Hero from '../../components/Hero';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import BarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import MeterRow from '../../components/MeterRow';
import { useAuth } from '../../context/AuthContext';
import { formatDate, firstName } from '../../utils/format';
import { drives, placementStats } from '../../data/demoData';

export default function PlacementDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Hero
        title={`Welcome back, ${firstName(user?.name)}`}
        subtitle="4 company drives are open for registration this month."
        action={<button type="button" className="btn btn-light" onClick={() => navigate('/placement/drives')}>Manage drives</button>}
      />
      <div className="stat-grid">
        <StatCard icon={FiBriefcase} label="Active drives" value="4" hint="2 closing this week" trend="flat" />
        <StatCard icon={FiUsers} tone="success" label="Eligible students" value="214" hint="Across all open drives" />
        <StatCard icon={FiUserCheck} tone="warning" label="Registrations" value="128" hint="Up 18 since yesterday" />
        <StatCard icon={FiTrendingUp} label="Average readiness" value="64/100" hint="Up 3 this month" />
      </div>

      <div className="grid-main">
        <Card title="Upcoming drives" action={<Link className="btn btn-primary btn-sm" to="/placement/drives">View all</Link>}>
          <DataTable
            columns={[
              { key: 'company', header: 'Company', render: (r) => <div><div className="fw-700">{r.company}</div><div className="muted text-sm">{r.role}</div></div> },
              { key: 'date', header: 'Drive date', render: (r) => formatDate(r.date) },
              { key: 'criteria', header: 'Eligibility', render: (r) => `CGPA ${r.minCgpa}+` },
              { key: 'registered', header: 'Registered', render: (r) => <Badge tone="info">{r.registered}</Badge> },
            ]}
            rows={drives}
          />
        </Card>
        <Card title="Readiness distribution">
          <BarChart data={placementStats.readinessBands} />
          <p className="muted text-sm mt-16">Number of students per readiness score band.</p>
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Registrations by drive">
          {placementStats.registrationsByDrive.map((d) => (
            <MeterRow key={d.label} label={d.label} value={Math.round((d.value / d.of) * 100)} display={`${d.value} of ${d.of}`} warnBelow={30} />
          ))}
        </Card>
        <div className="stack">
          <Card title="Skills in demand">
            <div className="chip-list">{placementStats.skillDemand.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </Card>
          <Card title="Recent activity">
            {placementStats.activity.map((a) => (
              <div className="list-row" key={a.id}>
                <div className="grow">{a.text}</div>
                <span className="muted text-sm">{a.time}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}
