import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import EmptyState from '../../components/EmptyState';
import Skeleton from '../../components/Skeleton';
import { searchAll } from '../../services/searchService';
import { getErrorMessage } from '../../utils/format';

const GROUPS = [
  { key: 'courses', label: 'Courses', path: 'courses' },
  { key: 'assignments', label: 'Assignments', path: 'assignments' },
  { key: 'events', label: 'Events', path: 'events' },
  { key: 'drives', label: 'Placement drives', path: 'placements' },
];

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { pathname } = useLocation();
  const base = '/' + pathname.split('/')[1];
  const [state, setState] = useState({ loading: true, error: '', data: null });

  useEffect(() => {
    let active = true;
    setState({ loading: true, error: '', data: null });
    searchAll(q)
      .then((data) => active && setState({ loading: false, error: '', data }))
      .catch((err) => active && setState({ loading: false, error: getErrorMessage(err), data: null }));
    return () => { active = false; };
  }, [q]);

  const total = state.data ? GROUPS.reduce((n, g) => n + (state.data[g.key]?.length || 0), 0) : 0;

  return (
    <>
      <PageHeader title={q ? `Results for "${q}"` : 'Search'} subtitle={state.data ? `${total} result${total === 1 ? '' : 's'} across courses, assignments, events and placement drives` : 'Searching...'} />
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.loading && <Card><div className="stack"><Skeleton height={18} width="40%" /><Skeleton height={14} /><Skeleton height={14} width="80%" /></div></Card>}
      {!state.loading && !state.error && total === 0 && (
        <Card><EmptyState icon={FiSearch} title="No results found" text="Try a different keyword, such as a course name or event title." /></Card>
      )}
      {state.data && total > 0 && (
        <Card>
          {GROUPS.filter((g) => state.data[g.key]?.length).map((g) => (
            <div className="result-group" key={g.key}>
              <h3 style={{ fontSize: 14, marginBottom: 6 }}>{g.label} <span className="muted">({state.data[g.key].length})</span></h3>
              {state.data[g.key].map((r) => (
                <Link className="result-link" key={r.id} to={g.key === 'events' ? `${base}/events/${r.id}` : `${base}/${g.path}`}>
                  <span className="fw-700">{r.title}</span>
                  <span className="muted">{r.subtitle}</span>
                </Link>
              ))}
            </div>
          ))}
        </Card>
      )}
    </>
  );
}
