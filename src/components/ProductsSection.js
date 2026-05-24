import './ProductsSection.css';
import { CartIcon, HeartIcon, StarIcon } from './Icons';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <button className="wishlist-button" type="button" aria-label={`Save ${product.name}`}>
        <HeartIcon />
      </button>
      <div className="product-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>You can write your product short description here to highlight the phone features.</p>
        <div className="price-row">
          <span className="discount">{product.discount}</span>
          <span className="old-price">{product.oldPrice}</span>
        </div>
        <strong className="current-price">{product.price}</strong>
        <div className="meta-row">
          <span className="rating">
            <StarIcon />
            {product.rating}
          </span>
          <span className="sold">{product.sold}</span>
          <button className="cart-button" type="button" aria-label={`Add ${product.name} to cart`}>
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductsSection({ id, title, subtitle, chips, products }) {
  return (
    <section className="products-shell section-shell" id={id}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <a className="section-link" href="#top">
          View all
        </a>
      </div>

      <div className="chip-row" aria-label={`${title} filters`}>
        {chips.map((chip, index) => (
          <button key={chip} className={`chip ${index === 0 ? 'is-active' : ''}`} type="button">
            {chip}
          </button>
        ))}
      </div>

      <div className="products-row">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
