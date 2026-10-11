export default function Card({ title, action, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <header className="card__head">
          <h3>{title}</h3>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
