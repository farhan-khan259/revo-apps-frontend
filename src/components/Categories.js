import './Categories.css';

function Categories({ items, onNavigate }) {
  return (
    <section className="categories-shell section-shell" id="categories">
      <div className="categories-row" aria-label="Mobile categories">
        {items.map((item) => (
          <a className="category-card" key={item.name} href="#new-products" onClick={() => onNavigate('new-products')}>
            <div className="category-thumb">
              <img src={item.image} alt={item.name} />
            </div>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Categories;
