export default function Hero({ title, subtitle, action }) {
  return (
    <section className="hero">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </section>
  );
}
