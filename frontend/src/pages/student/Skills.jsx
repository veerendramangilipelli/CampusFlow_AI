import { FiCheck } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MeterRow from '../../components/MeterRow';
import RingChart from '../../components/RingChart';
import { skills, skillGaps, recommendedPractice, learningPath } from '../../data/demoData';

export default function Skills() {
  return (
    <>
      <PageHeader title="Skills and learning path" subtitle="Your recorded skills, the gaps to close, and a suggested path." />
      <div className="grid-2">
        <Card title="Skill gap analysis" action={<Badge tone="warning">Needs attention</Badge>}>
          <div className="flex center gap-16 wrap">
            <RingChart value={62} label="Overall skill completion 62 percent" />
            <div className="grow">
              <p className="muted text-sm" style={{ marginBottom: 8 }}>Skill gaps to close</p>
              <div className="chip-list">{skillGaps.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            </div>
          </div>
        </Card>
        <Card title="Recommended practice">
          {recommendedPractice.map((p) => (
            <div className="list-row" key={p.id}>
              <div className="grow">
                <div className="fw-700">{p.title}</div>
                <div className="muted text-sm">{p.hint}</div>
              </div>
              <Badge tone={p.badge === 'Recommended' ? 'info' : 'neutral'}>{p.badge}</Badge>
              <button type="button" className="btn btn-outline btn-sm">Practice</button>
            </div>
          ))}
        </Card>
      </div>

      <Card title="Your recorded skills">
        <div className="grid-2">
          {skills.map((s) => (
            <MeterRow key={s.name} label={s.name} value={Math.round((s.level / s.target) * 100)} display={`Level ${s.level} of ${s.target}`} warnBelow={60} />
          ))}
        </div>
        <p className="muted text-sm mt-16">Skill levels come from skills recorded in your profile and assessment results. Nothing is assumed.</p>
      </Card>

      <Card title="Personalized learning path">
        <div className="steps">
          {learningPath.map((s, i) => (
            <div className={`step ${s.state === 'done' ? 'done' : s.state === 'current' ? 'current' : ''}`} key={s.step}>
              <div className="step__no">{s.state === 'done' ? <FiCheck aria-hidden="true" /> : i + 1}</div>
              <h4>{s.step}</h4>
              <p className="muted text-sm">{s.topic}</p>
              <div className="mt-16">
                <Badge tone={s.state === 'done' ? 'success' : s.state === 'current' ? 'info' : 'neutral'}>
                  {s.state === 'done' ? 'Completed' : s.state === 'current' ? 'In progress' : 'Up next'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
