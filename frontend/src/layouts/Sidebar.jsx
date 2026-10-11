import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { NAV } from '../utils/navConfig';

export default function Sidebar({ role, open, onNavigate, onSignOut }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
      <div className="sidebar__brand">
        <span className="brand-mark">C</span>
        CampusFlow
      </div>
      <nav>
        {NAV[role].map((group) => (
          <div key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar__foot">
        <button type="button" className="sidebar__signout" onClick={onSignOut}>
          <FiLogOut aria-hidden="true" /> Sign out
        </button>
      </div>
    </aside>
  );
}
