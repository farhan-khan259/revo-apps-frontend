import './LifestyleTiles.css';

function LifestyleTiles({ items }) {
  return (
    <section className="lifestyle-shell section-shell">
      <div className="section-header">
        <div>
          <h2 className="section-title">Mobile lifestyle picks</h2>
          <p className="section-subtitle">Editorial-style tiles for quick navigation and a richer storefront feel.</p>
        </div>
      </div>

      <div className="lifestyle-grid">
        {items.map((item) => (
          <a className="lifestyle-card" key={item.title} href="#best-deals">
            <img src={item.image} alt={item.title} />
            <div className="lifestyle-overlay">{item.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default LifestyleTiles;
