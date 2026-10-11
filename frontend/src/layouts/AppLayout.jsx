import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app">
      <Sidebar role={role} open={open} onNavigate={() => setOpen(false)} onSignOut={signOut} />
      <div className={`scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <div className="main">
        <Topbar user={user} role={role} onMenu={() => setOpen(true)} onSignOut={signOut} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
