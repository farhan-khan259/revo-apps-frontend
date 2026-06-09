import { useEffect, useState } from 'react';
import './ProductDetailsPage.css';
import { CartIcon, HeartIcon, StarIcon, ChevronIcon } from './Icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { formatCurrency, formatIfPrice } from '../utils/currencyFormatter';
import { useTranslation } from '../i18n';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { ProductCard } from './ProductsSection';
import { useConfig } from '../context/ConfigContext';

function ProductDetailsPage({ product, relatedProducts, onNavigatePath }) {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { config } = useConfig();
  
  const ecommerceConfig = config?.ecommerce || {};
  const addToCartText = ecommerceConfig.addToCartText || 'Add to cart';
  const orderViaWhatsAppText = ecommerceConfig.orderViaWhatsAppText || 'Order via WhatsApp';
  const shareText = ecommerceConfig.shareText || 'Share';

  useEffect(() => {
    setActiveTab('description');
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [product?.slug]);

  if (!product) {
    return (
      <div className="product-page">
        <div className="section-shell product-page-shell product-empty-state">
          <span className="product-breadcrumbs">{t('home')} {<ChevronIcon />} {t('product.notFound')}</span>
          <h1>{t('product.notFound')}</h1>
          <p>{t('product.notFound')}</p>
          <button className="product-back-button" type="button" onClick={() => onNavigatePath('/')}>
            {t('product.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const activeImage = gallery[selectedImageIndex] || gallery[0] || product.image;

  return (
    <div className="product-page">
      <div className="section-shell product-page-shell">
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <button type="button" className="product-breadcrumb-link" onClick={() => onNavigatePath('/')}>
            {t('home')}
          </button>
          <ChevronIcon />
          <span>{t('electronics')}</span>
          <ChevronIcon />
          <span>{product.name}</span>
        </nav>

        <div className="product-top-grid">
          <section className="product-gallery-card">
            <div className="product-sale-badge">Sale!</div>
            <div className="product-image-stage">
              <button
                className="product-gallery-arrow product-gallery-arrow--left"
                type="button"
                aria-label="Previous image"
                onClick={() => setSelectedImageIndex((current) => (current - 1 + gallery.length) % gallery.length)}
              >
                <ChevronIcon />
              </button>
              <img className="product-main-image" src={activeImage} alt={product.name} />
              <button
                className="product-gallery-arrow product-gallery-arrow--right"
                type="button"
                aria-label="Next image"
                onClick={() => setSelectedImageIndex((current) => (current + 1) % gallery.length)}
              >
                <ChevronIcon />
              </button>
            </div>

            <div className="product-thumb-row" role="list" aria-label={`${product.name} gallery thumbnails`}>
              {gallery.map((image, index) => (
                <button
                  key={`${product.slug}-${image}`}
                  className={`product-thumb ${index === selectedImageIndex ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>

          <aside className="product-summary-card">
            <div className="product-summary-top">
              <button className="product-icon-button" type="button" aria-label={`Save ${product.name}`}>
                <HeartIcon />
              </button>
              <button className="product-share-button" type="button">
                {shareText}
              </button>
            </div>

            <h1>{product.name}</h1>

            <div className="product-rating-row">
              <span className="product-rating-stars">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </span>
              <span>{product.rating || '4.8'}</span>
              <span>({product.sold || '0 Sold'})</span>
            </div>

            <div className="product-price-row">
              <strong>{formatCurrency(product.price, lang)}</strong>
              <span className="product-price-old">{formatCurrency(product.oldPrice, lang)}</span>
              <span className="product-discount">{product.discount}</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-quantity-row">
              <button type="button" className="product-quantity-button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" className="product-quantity-button" onClick={() => setQuantity((current) => current + 1)}>
                +
              </button>

              <button
                className="product-add-button"
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  showToast(`${product.name} added to cart`, { type: 'success' });
                  window.history.pushState({}, '', '/cart/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                {addToCartText}
              </button>
              <button className="product-whatsapp-button" type="button">
                {orderViaWhatsAppText}
              </button>
            </div>

            <div className="product-meta-block">
              <div>
                <strong>SKU:</strong> <span>{product.slug.toUpperCase()}</span>
              </div>
              <div>
                <strong>Categories:</strong> <span>Electronics, Gadget</span>
              </div>
              <div>
                <strong>Tags:</strong> <span>mobile, accessories, shopping</span>
              </div>
            </div>
          </aside>
        </div>

        <section className="product-tabs-card">
          <div className="product-tab-row" role="tablist" aria-label="Product details tabs">
            {['description', 'specs'].map((id) => (
              <button
                key={id}
                type="button"
                className={`product-tab-button ${activeTab === id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(id)}
                role="tab"
                aria-selected={activeTab === id}
              >
                {t(`product.${id}`)}
              </button>
            ))}
          </div>

          <div className="product-tab-panel">
            {activeTab === 'description' ? (
              <>
                <p>{product.description}</p>
                <ul>
                  {(product.highlights || []).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {activeTab === 'specs' ? (
              <div className="product-spec-grid">
                {(product.specs || []).map((spec) => (
                  <div key={spec.label} className="product-spec-row">
                    <span>{spec.label}</span>
                    <strong>{formatIfPrice(spec.value, lang)}</strong>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="product-related-section">
          <div className="section-header product-related-header">
            <div>
              <h2 className="section-title">{ecommerceConfig.relatedProductsHeading || 'Related Products'}</h2>
            </div>
          </div>

            <div className="product-related-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} onNavigatePath={onNavigatePath} />
            ))}
          </div>
        </section>
      </div>

      <div className="product-mobile-bar" aria-label="Product actions">
        <button className="product-mobile-icon" type="button" aria-label={`Save ${product.name}`}>
          <HeartIcon />
        </button>
        <button className="product-mobile-icon" type="button" aria-label="Product details">
          <ChevronIcon />
        </button>
        <button
          className="product-mobile-cart"
          type="button"
          onClick={() => {
            addItem(product, quantity);
            showToast(`${product.name} added to cart`, { type: 'success' });
            window.history.pushState({}, '', '/cart/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
        >
          <CartIcon />
          {addToCartText}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;