import { Outlet } from 'react-router-dom';
import { FiTarget, FiMessageSquare, FiCalendar } from 'react-icons/fi';

export default function AuthLayout() {
  return (
    <div className="auth">
      <section className="auth__brand" aria-label="About CampusFlow">
        <div className="auth__logo">
          <span className="brand-mark">C</span>
          CampusFlow
        </div>
        <div>
          <h2 className="auth__headline">Smarter learning. Personalized guidance. Better campus management.</h2>
          <p className="auth__sub">One platform for students, faculty, placement officers and administrators.</p>
          <div className="auth__points">
            <div className="auth__point">
              <span className="icon-tile"><FiTarget aria-hidden="true" /></span>
              <div><b>Role-based workspace</b><span>See only what matters for your role and department.</span></div>
            </div>
            <div className="auth__point">
              <span className="icon-tile"><FiMessageSquare aria-hidden="true" /></span>
              <div><b>AI College Assistant</b><span>Ask about academics, events, placements and services.</span></div>
            </div>
            <div className="auth__point">
              <span className="icon-tile"><FiCalendar aria-hidden="true" /></span>
              <div><b>Campus events and venues</b><span>Find, register for and locate every event on campus.</span></div>
            </div>
          </div>
        </div>
        <p className="auth__foot">CampusFlow · Smarter Learning. Personalized Guidance.</p>
      </section>
      <section className="auth__panel">
        <Outlet />
      </section>
    </div>
  );
}
