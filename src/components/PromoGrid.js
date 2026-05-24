import './PromoGrid.css';

function PromoGrid({ cards }) {
  return (
    <section className="promo-shell section-shell">
      <div className="promo-grid">
        {cards.map((card) => (
          <article className="promo-card" key={card.title}>
            <img src={card.image} alt={card.title} />
            <div className="promo-copy">
              <span>Special promo</span>
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
