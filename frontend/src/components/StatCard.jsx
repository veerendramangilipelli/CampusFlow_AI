export default function StatCard({ label, value, hint, tone = 'primary', icon: Icon, trend = 'up' }) {
  return (
    <div className="card stat">
      {Icon && (
        <span className={`stat__icon tone-${tone}`}>
          <Icon aria-hidden="true" />
        </span>
      )}
      <div>
        <p className="stat__label">{label}</p>
        <p className="stat__value">{value}</p>
        {hint && <p className={`stat__hint ${trend}`}>{hint}</p>}
      </div>
    </div>
  );
}
