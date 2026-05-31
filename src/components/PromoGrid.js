import './PromoGrid.css';

function PromoGrid({ cards }) {
  return (
    <section className="promo-shell section-shell">
      <div className="section-header promo-header">
        <div>
          <h2 className="section-title">Special Promo : App Only</h2>
          <p className="section-subtitle">4 premium banners arranged to match the reference layout.</p>
        </div>
      </div>
      <div className="promo-grid">
        {cards.map((card) => (
          <article className="promo-card" key={card.title}>
            <img src={card.image} alt={card.title} />
            <div className="promo-copy">
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PromoGrid;
