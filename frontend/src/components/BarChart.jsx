// data: [{ label, value, tone? }]  tone: '' | 'alt' | 'warn'
export default function BarChart({ data, max, unit = '' }) {
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bars" role="img" aria-label="Bar chart">
      {data.map((d) => (
        <div className="bars__col" key={d.label}>
          <span className="bars__val">{d.value}{unit}</span>
          <div className={`bars__fill ${d.tone || ''}`} style={{ height: `${(d.value / top) * 78}%` }} />
          <span className="bars__label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
