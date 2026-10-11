import { initials } from '../utils/format';

export default function Avatar({ name, size = '' }) {
  return (
    <span className={`avatar ${size ? `avatar-${size}` : ''}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
