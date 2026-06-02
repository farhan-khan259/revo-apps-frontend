import './Categories.css';
import { ChevronIcon } from './Icons';

function Categories({ items, onNavigate }) {
  const handleScroll = (direction) => {
    const row = document.getElementById('categories-row');
    if (!row) return;
    const offset = row.clientWidth * 0.5;
    row.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section className="categories-shell section-shell" id="categories">
      <button className="category-scroll-button prev" type="button" onClick={() => handleScroll('left')} aria-label="Scroll categories left">
        <ChevronIcon />
      </button>
      <div className="category-row-wrapper">
        <div className="categories-row" id="categories-row" aria-label="Mobile categories">
          {items.map((item) => (
            <a className="category-card" key={item.name} href="#new-products" onClick={() => onNavigate('new-products')}>
              <div className="category-thumb">
                <img src={item.image} alt={item.name} />
              </div>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      <button className="category-scroll-button next" type="button" onClick={() => handleScroll('right')} aria-label="Scroll categories right">
        <ChevronIcon />
      </button>
    </section>
  );
}

export default Categories;
