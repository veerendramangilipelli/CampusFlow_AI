export const ROLE_LABELS = {
  STUDENT: 'Student',
  FACULTY: 'Faculty',
  PLACEMENT_OFFICER: 'Placement Officer',
  ADMIN: 'Administrator',
};

export const ROLE_HOME = {
  STUDENT: '/student',
  FACULTY: '/faculty',
  PLACEMENT_OFFICER: '/placement',
  ADMIN: '/admin',
};

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const firstName = (name = '') => name.split(' ')[0];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

export function formatDate(iso) {
  const { year, month, day } = parseDate(iso);
  return `${String(day).padStart(2, '0')} ${MONTHS[month]} ${year}`;
}

export const monthShort = (iso) => MONTHS[parseDate(iso).month].toUpperCase();
export const dayOf = (iso) => String(parseDate(iso).day);

export function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  );
}
