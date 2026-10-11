import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import Avatar from '../components/Avatar';
import { ROLE_LABELS } from '../utils/format';
import { BASE_PATH } from '../utils/navConfig';

export default function Topbar({ user, role, onMenu, onSignOut }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const base = BASE_PATH[role];

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`${base}/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="topbar">
      <button type="button" className="btn btn-icon menu-btn" onClick={onMenu} aria-label="Open menu">
        <FiMenu />
      </button>
      <form className="search" role="search" onSubmit={submit}>
        <FiSearch aria-hidden="true" />
        <input
          className="input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, events, drives"
          aria-label="Search courses, assignments, events and placement drives"
        />
      </form>
      <div className="topbar__spacer" />
      <button type="button" className="btn btn-icon bell" onClick={() => navigate(`${base}/notifications`)} aria-label="Notifications, unread">
        <FiBell />
        <span className="bell__dot" />
      </button>
      <div className="menu-wrap">
        <button type="button" className="avatar-btn" onClick={() => setMenuOpen((v) => !v)} aria-haspopup="menu" aria-expanded={menuOpen} aria-label="Account menu">
          <Avatar name={user?.name} />
        </button>
        {menuOpen && (
          <div className="dropdown" role="menu">
            <div className="dropdown__who">
              <div className="fw-700">{user?.name}</div>
              <div className="muted text-sm">{ROLE_LABELS[role]}</div>
            </div>
            <button type="button" className="dropdown__item" role="menuitem" onClick={() => { setMenuOpen(false); navigate(`${base}/profile`); }}>
              <FiUser aria-hidden="true" /> Profile
            </button>
            <button type="button" className="dropdown__item" role="menuitem" onClick={onSignOut}>
              <FiLogOut aria-hidden="true" /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
