import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerRequest } from '../../services/authService';
import { getErrorMessage } from '../../utils/format';
import Field from '../../components/Field';
import Alert from '../../components/Alert';

// Public registration is limited to these roles. ADMIN accounts are provisioned by the system.
const ROLES = [
  { value: 'STUDENT', label: 'Student', hint: 'Instant access' },
  { value: 'FACULTY', label: 'Faculty', hint: 'Needs admin approval' },
  { value: 'PLACEMENT_OFFICER', label: 'Placement Officer', hint: 'Needs admin approval' },
];

const COMMON = { name: '', email: '', phone: '', department: '', password: '', confirmPassword: '' };
const EXTRA = {
  STUDENT: { studentId: '', program: '', academicYear: '', semester: '' },
  FACULTY: { employeeId: '', designation: '' },
  PLACEMENT_OFFICER: { employeeId: '', placementDepartment: '', designation: '' },
};
const LABELS = {
  studentId: 'Student ID / roll number', program: 'Degree / program', academicYear: 'Academic year', semester: 'Semester',
  employeeId: 'Employee ID', designation: 'Designation', placementDepartment: 'Placement department',
};

export default function Register() {
  const [role, setRole] = useState('STUDENT');
  const [form, setForm] = useState({ ...COMMON, ...EXTRA.STUDENT });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const chooseRole = (value) => {
    setRole(value);
    setForm({ ...COMMON, ...EXTRA[value], name: form.name, email: form.email, phone: form.phone, department: form.department });
    setErrors({});
  };
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number.';
    if (!form.department) next.department = 'Select your department.';
    if (form.password.length < 8) next.password = 'Use at least 8 characters.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    Object.keys(EXTRA[role]).forEach((key) => {
      if (!String(form[key]).trim()) next[key] = 'This field is required.';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await registerRequest({ ...payload, role });
      setSuccess(
        role === 'STUDENT'
          ? 'Account created. You can sign in now.'
          : 'Request submitted. An administrator must approve your account before you can sign in.'
      );
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const text = (key, props = {}) => (
    <Field label={LABELS[key]} id={`reg-${key}`} error={errors[key]} key={key}>
      <input className="input" value={form[key]} onChange={update(key)} {...props} />
    </Field>
  );

  return (
    <div className="auth-card auth-card--wide">
      <h1>Create your account</h1>
      <p className="lead">Choose your role. Administrator accounts are created by the college.</p>
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {success && <Alert tone="success">{success}</Alert>}
        {apiError && <Alert tone="error">{apiError}</Alert>}

        <div className="field">
          <span className="fw-600" id="role-label" style={{ fontSize: 13 }}>I am a</span>
          <div className="role-picker" role="radiogroup" aria-labelledby="role-label">
            {ROLES.map((r) => (
              <button type="button" key={r.value} role="radio" aria-checked={role === r.value} className={`role-option ${role === r.value ? 'active' : ''}`} onClick={() => chooseRole(r.value)}>
                {r.label}
                <small>{r.hint}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="divider-label">Account details</div>
        <div className="form-grid">
          <Field label="Full name" id="reg-name" error={errors.name}>
            <input className="input" autoComplete="name" value={form.name} onChange={update('name')} />
          </Field>
          <Field label="Email" id="reg-email" error={errors.email}>
            <input className="input" type="email" autoComplete="email" value={form.email} onChange={update('email')} />
          </Field>
          <Field label="Phone number" id="reg-phone" error={errors.phone}>
            <input className="input" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} />
          </Field>
          <Field label="Department" id="reg-department" error={errors.department}>
            <select className="select" value={form.department} onChange={update('department')}>
              <option value="">Select department</option>
              <option>Computer Science</option>
              <option>AI & ML</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Training & Placement</option>
            </select>
          </Field>
        </div>

        <div className="divider-label">{role === 'STUDENT' ? 'Student details' : role === 'FACULTY' ? 'Faculty details' : 'Placement officer details'}</div>
        <div className="form-grid">
          {Object.keys(EXTRA[role]).map((key) =>
            key === 'semester' ? (
              <Field label={LABELS[key]} id="reg-semester" error={errors.semester} key={key}>
                <select className="select" value={form.semester} onChange={update('semester')}>
                  <option value="">Select semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>Semester {n}</option>)}
                </select>
              </Field>
            ) : (
              text(key)
            )
          )}
        </div>

        <div className="divider-label">Security</div>
        <div className="form-grid">
          <Field label="Password" id="reg-password" error={errors.password} hint="At least 8 characters.">
            <input className="input" type="password" autoComplete="new-password" value={form.password} onChange={update('password')} />
          </Field>
          <Field label="Confirm password" id="reg-confirm" error={errors.confirmPassword}>
            <input className="input" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={update('confirmPassword')} />
          </Field>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
