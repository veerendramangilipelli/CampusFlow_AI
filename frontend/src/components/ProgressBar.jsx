// Turns amber below `warnBelow` (default 75) unless a tone is forced.
export default function ProgressBar({ value, tone, warnBelow = 75, label }) {
  const auto = value < warnBelow ? 'warning' : '';
  return (
    <div
      className={`progress ${tone || auto}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
