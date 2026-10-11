import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { isDemoMode } from '../../services/authService';
import { ROLE_HOME, getErrorMessage } from '../../utils/format';
import Field from '../../components/Field';
import Alert from '../../components/Alert';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Enter your password.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(ROLE_HOME[user.role], { replace: true });
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="lead">Sign in to continue to CampusFlow.</p>
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {params.get('expired') && <Alert tone="warning">Your session expired. Please sign in again.</Alert>}
        {apiError && <Alert tone="error">{apiError}</Alert>}
        {isDemoMode && (
          <Alert tone="info">Demo mode: use student@, faculty@, placement@ or admin@ with any password.</Alert>
        )}
        <Field label="Email" id="login-email" error={errors.email}>
          <input className="input" type="email" autoComplete="email" placeholder="you@college.edu" value={form.email} onChange={update('email')} />
        </Field>
        <Field label="Password" id="login-password" error={errors.password}>
          <input className="input" type="password" autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={update('password')} />
        </Field>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="auth-switch">
        New to CampusFlow? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
