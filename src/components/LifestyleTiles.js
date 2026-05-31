import './LifestyleTiles.css';

function LifestyleTiles({ banners, tiles }) {
  return (
    <section className="lifestyle-shell section-shell">
      <div className="section-header">
        <div>
          <h2 className="section-title">Love These Items</h2>
          <p className="section-subtitle">Wide promotional cards and category tiles kept mobile-ready.</p>
        </div>
      </div>

      <div className="lifestyle-banner-grid">
        {banners.map((item) => (
          <a className="lifestyle-banner" key={item.title} href="#best-deals">
            <img src={item.image} alt={item.title} />
            <div className="lifestyle-banner-copy">
              <span>{item.subtitle}</span>
              <strong>{item.title}</strong>
            </div>
          </a>
        ))}
      </div>

      <div className="lifestyle-grid">
        {tiles.map((item) => (
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
