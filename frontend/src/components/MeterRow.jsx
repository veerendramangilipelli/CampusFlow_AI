import ProgressBar from './ProgressBar';

export default function MeterRow({ label, value, display, tone, warnBelow }) {
  return (
    <div className="meter-row">
      <div className="meter-row__top">
        <span>{label}</span>
        <b>{display ?? `${value}%`}</b>
      </div>
      <ProgressBar value={value} tone={tone} warnBelow={warnBelow} label={label} />
    </div>
  );
}
