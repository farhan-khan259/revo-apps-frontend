import './CheckoutPages.css';
import { CartIcon, CheckIcon, ShippingIcon, BillingIcon, ContactIcon } from './Icons';
import { useCart } from './CartContext';
import { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

function ActionButton({ label, variant = 'primary', onClick, disabled = false }) {
  return (
    <button
      className={`checkout-button checkout-button--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function EmptyCart({ onShop, emptyCartMessage, shopNowText }) {
  return (
    <div className="checkout-empty-card">
      <div className="checkout-empty-icon">
        <CartIcon />
      </div>
      <h2>Your cart is currently empty!</h2>
      <p>{emptyCartMessage}</p>
      <ActionButton label={shopNowText} variant="primary" onClick={onShop} />
    </div>
  );
}

function CartPage({ onNavigatePath }) {
  const { cartItems, updateQuantity, removeItem, subtotal, total, shippingCost, applyCoupon, couponCode, setCouponCode, couponError, couponSuccess } = useCart();
  const { config } = useConfig();
  const [localCoupon, setLocalCoupon] = useState('');
  
  const cartSettings = config?.cartSettings || {};
  const emptyCartMessage = cartSettings.emptyCartMessage || 'Checkout is not available while your cart is empty. Please take a look through our store and come back when you\'re ready to place an order.';
  const couponPlaceholder = cartSettings.couponPlaceholder || 'Enter coupon code';
  const shopNowText = cartSettings.shopNowText || 'Shop Now';
  const proceedToCheckoutText = cartSettings.proceedToCheckoutText || 'Proceed to checkout';

  const handleApplyCoupon = () => {
    applyCoupon(localCoupon);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="section-shell">
          <EmptyCart onShop={() => onNavigatePath('/')} emptyCartMessage={emptyCartMessage} shopNowText={shopNowText} />
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="section-shell">
        <div className="checkout-topbar">
          <div>
            <span className="checkout-kicker">Products</span>
            <h1>Cart</h1>
            <p>Review the items in your cart before you continue to checkout.</p>
          </div>
          <div className="checkout-summary-pill">{cartItems.length} items</div>
        </div>

        <div className="checkout-grid">
          <section className="checkout-main-card">
            <div className="checkout-card-heading">
              <h2>Products</h2>
              <span>Review and update your order</span>
            </div>

            <div className="checkout-cart-list">
              {cartItems.map((item) => (
                <article key={item.id} className="checkout-cart-item">
                  <img src={item.image} alt={item.name} className="checkout-cart-image" />
                  <div className="checkout-cart-copy">
                    <strong>{item.name}</strong>
                    <span>{item.details}</span>
                    <div className="checkout-cart-meta">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      {item.oldPrice && <span className="checkout-price-old">{item.oldPrice}</span>}
                    </div>
                  </div>
                  <div className="checkout-cart-price">
                    <strong>{item.price}</strong>
                    <button className="remove-item" onClick={() => removeItem(item.id)}>×</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="checkout-coupon-section">
              <div className="checkout-coupon-row">
                <span>Coupon</span>
                <div>
                  <input
                    type="text"
                    placeholder={couponPlaceholder}
                    value={localCoupon}
                    onChange={(e) => setLocalCoupon(e.target.value)}
                  />
                  <button type="button" onClick={handleApplyCoupon}>Apply</button>
                </div>
              </div>
              {couponError && <p className="coupon-error">{couponError}</p>}
              {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
            </div>
          </section>

          <aside className="checkout-sidebar-card">
            <div className="checkout-sidebar-head">
              <span className="checkout-side-label">Order summary</span>
              <p>Shipping and taxes calculated at checkout.</p>
            </div>
            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{subtotal}</strong>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <strong>{shippingCost === 0 ? 'Rp0' : shippingCost}</strong>
            </div>
            {couponCode && (
              <div className="checkout-summary-row">
                <span>Discount ({couponCode})</span>
                <strong>-Rp{subtotal.replace('Rp', '') * 0.1}</strong>
              </div>
            )}
            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>{total}</strong>
            </div>
            <ActionButton
              label="Proceed to checkout"
              variant="primary"
              onClick={() => onNavigatePath('/checkout/')}
            />
            <ActionButton
              label="Order via WhatsApp"
              variant="secondary"
              onClick={() => {
                const message = `Order: ${cartItems.map(i => `${i.name} x${i.quantity}`).join(', ')} | Total: ${total}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ onNavigatePath }) {
  const { cartItems, total, subtotal, shippingCost, shippingMethod, setShippingMethod, paymentMethod, setPaymentMethod, applyCoupon, couponCode, setCouponCode, couponError, couponSuccess, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'Pakistan',
    street: '',
    postcode: '',
    phone: '',
    note: '',
  });
  const [localCoupon, setLocalCoupon] = useState('');
  const [orderPlacing, setOrderPlacing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    applyCoupon(localCoupon);
  };

  const handlePlaceOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.street) {
      alert('Please fill in all required fields.');
      return;
    }
    setOrderPlacing(true);
    // Simulate order creation
    const orderId = Math.floor(Math.random() * 9000) + 1000;
    // Store order data in sessionStorage for order received page
    const orderData = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cartItems,
      subtotal,
      shipping: shippingCost === 0 ? 'Free shipping' : shippingCost,
      paymentMethod: paymentMethod === 'bank' ? 'Direct bank transfer' : 'Cash on delivery',
      total,
      billingAddress: `${formData.street}, ${formData.country}, ${formData.postcode}`,
      shippingAddress: `${formData.street}, ${formData.country}, ${formData.postcode}`,
      contactName: `${formData.firstName} ${formData.lastName}`,
      contactEmail: formData.email,
      contactPhone: formData.phone,
    };
    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    onNavigatePath(`/checkout/order-received/${orderId}/`);
    setOrderPlacing(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="section-shell">
          <EmptyCart onShop={() => onNavigatePath('/')} />
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="section-shell">
        <div className="checkout-topbar">
          <div>
            <span className="checkout-kicker">Checkout</span>
            <h1>Checkout</h1>
            <p>Enter your contact details and shipping information to complete the order.</p>
          </div>
        </div>

        <div className="checkout-grid">
          <div className="checkout-left-column">
            <section className="checkout-card">
              <div className="checkout-card-heading">
                <h2>Contact information</h2>
              </div>
              <div className="checkout-card-body">
                <label className="checkout-field">
                  <span>Email address *</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <p className="checkout-instruction">
                  We'll use this email to send you details and updates about your order.
                </p>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-heading">
                <h2>Billing & Shipping</h2>
              </div>
              <div className="checkout-card-body">
                <p className="checkout-instruction">Input your billing fields first. Input phone number.</p>
                <div className="checkout-field-grid two-column">
                  <label className="checkout-field">
                    <span>First name *</span>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className="checkout-field">
                    <span>Last name *</span>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
                <label className="checkout-field">
                  <span>Country / Region *</span>
                  <select name="country" value={formData.country} onChange={handleInputChange}>
                    <option>Pakistan</option>
                    <option>Indonesia</option>
                    <option>United States</option>
                  </select>
                </label>
                <label className="checkout-field">
                  <span>Street address *</span>
                  <input
                    type="text"
                    name="street"
                    placeholder="House number and street name"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div className="checkout-field-grid three-column">
                  <label className="checkout-field">
                    <span>Postcode / ZIP *</span>
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode / ZIP"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className="checkout-field">
                    <span>Phone (optional)</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="checkout-field">
                    <span>Select Destination</span>
                    <select>
                      <option>Search and select...</option>
                    </select>
                  </label>
                </div>
              </div>
            </section>

            <section className="checkout-card checkout-card--products">
              <div className="checkout-card-heading">
                <h2>Products ordered</h2>
              </div>
              <div className="checkout-card-body">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-product-item">
                    <img src={item.image} alt={item.name} />
                    <div className="checkout-product-copy">
                      <strong>{item.name}</strong>
                      <span>{item.details}</span>
                    </div>
                    <strong>{item.price}</strong>
                  </div>
                ))}
                <label className="checkout-field checkout-field--textarea">
                  <span>Add note (optional)</span>
                  <textarea
                    name="note"
                    placeholder="Please leave a message"
                    rows="3"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </label>
                <div className="checkout-coupon-row">
                  <span>Apply Coupon</span>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={localCoupon}
                      onChange={(e) => setLocalCoupon(e.target.value)}
                    />
                    <button type="button" onClick={handleApplyCoupon}>Apply</button>
                  </div>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
                {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
                <div className="checkout-field-grid two-column">
                  <label className="checkout-field">
                    <span>Shipping options</span>
                    <select
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    >
                      <option value="free">Free shipping — Rp0</option>
                      <option value="flat">Flat rate — Rp100</option>
                    </select>
                  </label>
                  <label className="checkout-field">
                    <span>Payment options</span>
                    <div className="checkout-payment-options">
                      <button
                        type="button"
                        className={`checkout-pill ${paymentMethod === 'bank' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('bank')}
                      >
                        Direct bank transfer
                      </button>
                      <button
                        type="button"
                        className={`checkout-pill ${paymentMethod === 'cod' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        Cash on delivery
                      </button>
                    </div>
                  </label>
                </div>
                {paymentMethod === 'bank' && (
                  <p className="checkout-notice">
                    Make your payment directly into our bank account. Please use your Order ID as
                    the payment reference. Your order will not be shipped until the funds have
                    cleared in our account.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="checkout-sidebar-card checkout-summary-card">
            <div className="checkout-sidebar-head">
              <span className="checkout-side-label">Order summary</span>
            </div>
            <div className="checkout-summary-row">
              <span>Subtotal ({cartItems.length} Items)</span>
              <strong>{subtotal}</strong>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <strong>{shippingCost === 0 ? 'Rp0' : shippingCost}</strong>
            </div>
            {couponCode && (
              <div className="checkout-summary-row">
                <span>Discount ({couponCode})</span>
                <strong>-Rp{subtotal.replace('Rp', '') * 0.1}</strong>
              </div>
            )}
            <div className="checkout-summary-total">
              <span>Total payment</span>
              <strong>{total}</strong>
            </div>
            <div className="checkout-summary-note">
              Your personal data will be used to process your order, support your experience
              throughout this website, and for other purposes described in our privacy policy.
            </div>
            <ActionButton
              label={orderPlacing ? 'Placing Order...' : 'Place Order'}
              variant="primary"
              onClick={handlePlaceOrder}
              disabled={orderPlacing}
            />
            <ActionButton
              label="Order via WhatsApp"
              variant="secondary"
              onClick={() => {
                const message = `Order: ${cartItems.map(i => `${i.name} x${i.quantity}`).join(', ')} | Total: ${total}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function OrderReceivedPage({ orderId }) {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      // Fallback demo data
      setOrderData({
        id: orderId || '1362',
        date: 'June 07, 2026',
        items: [
          {
            id: '1',
            name: 'Apple iPhone 12 Pro',
            details: 'Variation: Large, Black',
            price: 'Rp104',
            quantity: 1,
            image: '/images/phone-smart.jpg',
          },
        ],
        subtotal: 'Rp104',
        shipping: 'Free shipping',
        paymentMethod: 'Direct bank transfer',
        total: 'Rp104',
        billingAddress: 'Kohat, Pakistan, Pakistan, 26000',
        shippingAddress: 'Kohat, Pakistan, Pakistan, 26000',
        contactName: 'Muhammad Farhan',
        contactEmail: 'mfarhankhan068@gmail.com',
        contactPhone: '',
      });
    }
  }, [orderId]);

  if (!orderData) return <div className="checkout-page">Loading...</div>;

  return (
    <div className="checkout-page order-received-page">
      <div className="section-shell">
        <div className="order-received-grid">
          <div className="order-received-summary-panel">
            <div className="order-received-icon">
              <CheckIcon />
            </div>
            <span>Thank you</span>
            <h1>Your order has been received.</h1>
          </div>

          <aside className="order-received-details">
            <div className="order-info-card">
              <div className="order-info-row">
                <span>Order number</span>
                <strong>{orderData.id}</strong>
              </div>
              <div className="order-info-row">
                <span>Order date</span>
                <strong>{orderData.date}</strong>
              </div>
            </div>

            <div className="order-info-card">
              <h3>
                <ShippingIcon /> SHIPPING ADDRESS
              </h3>
              <p>{orderData.shippingAddress}</p>
            </div>
            <div className="order-info-card">
              <h3>
                <BillingIcon /> BILLING ADDRESS
              </h3>
              <p>{orderData.billingAddress}</p>
            </div>
            <div className="order-info-card">
              <h3>
                <ContactIcon /> CONTACT DETAILS
              </h3>
              <p>{orderData.contactName}</p>
              <p>{orderData.contactEmail}</p>
              {orderData.contactPhone && <p>{orderData.contactPhone}</p>}
            </div>
            <div className="order-info-card order-summary-card">
              <h3>Order summary ({orderData.items.length})</h3>
              {orderData.items.map((item) => (
                <div key={item.id} className="order-product-row">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.details}</span>
                    <span>×{item.quantity}</span>
                  </div>
                  <strong>{item.price}</strong>
                </div>
              ))}
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>{orderData.subtotal}</strong>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <strong>{orderData.shipping}</strong>
              </div>
              <div className="checkout-summary-row">
                <span>Payment method</span>
                <strong>{orderData.paymentMethod}</strong>
              </div>
              <div className="checkout-summary-total">
                <span>Total</span>
                <strong>{orderData.total}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPages({ route, onNavigatePath, orderId }) {
  switch (route) {
    case 'orderReceived':
      return <OrderReceivedPage orderId={orderId} />;
    case 'checkout':
      return <CheckoutPage onNavigatePath={onNavigatePath} />;
    case 'cart':
    default:
      return <CartPage onNavigatePath={onNavigatePath} />;
  }
}