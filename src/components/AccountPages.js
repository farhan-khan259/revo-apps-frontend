import './AccountPages.css';
import { BellIcon, CartIcon, HeartIcon, StarIcon, UserIcon } from './Icons';

const wishlistItems = [
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: '$1,199',
    oldPrice: '$1,299',
    image: '/images/phone-smart.jpg',
    tag: 'Best seller',
  },
  {
    name: 'JBL Tune 760NC',
    price: '$179',
    oldPrice: '$219',
    image: '/images/earbuds.jpg',
    tag: 'Audio',
  },
  {
    name: 'MagSafe Power Bank',
    price: '$69',
    oldPrice: '$89',
    image: '/images/powerbank.jpg',
    tag: 'Charging',
  },
];

const cartItems = [
  {
    name: 'iPhone 15 Pro Max',
    details: '256GB, Natural Titanium',
    price: '$1,249',
    quantity: 1,
  },
  {
    name: 'Fast Wireless Charger',
    details: '20W, magnetic pad',
    price: '$39',
    quantity: 2,
  },
];

const orders = [
  { id: '#RV-1432', date: '12 Apr 2026', status: 'Delivered', total: '$1,328', item: 'Samsung Galaxy S24 Ultra + Buds2 Pro' },
  { id: '#RV-1390', date: '03 Apr 2026', status: 'Shipped', total: '$189', item: 'Wireless charger and tempered glass' },
  { id: '#RV-1328', date: '19 Mar 2026', status: 'Processing', total: '$69', item: 'MagSafe battery pack' },
];

const notifications = [
  {
    title: 'Your order is on the way',
    text: 'Tracking updated for order #RV-1390. Delivery expected tomorrow.',
    time: '10 minutes ago',
    icon: <CartIcon />,
  },
  {
    title: 'Price drop on Galaxy S24 Ultra',
    text: 'The flagship you saved just dropped by $100 for a limited time.',
    time: '2 hours ago',
    icon: <HeartIcon />,
  },
  {
    title: 'New discount on accessories',
    text: 'Chargers, cases and earbuds now available with flash-sale pricing.',
    time: 'Today',
    icon: <BellIcon />,
  },
];

function navigatePath(onNavigatePath, path) {
  onNavigatePath(path);
}

function AccountHero({ title, subtitle, kicker, onNavigatePath }) {
  return (
    <div className="account-hero-strip">
      <div>
        <span className="account-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Panel({ children, className = '' }) {
  return <section className={`account-panel ${className}`.trim()}>{children}</section>;
}

function Field({ label, type = 'text', placeholder, autoComplete }) {
  return (
    <label className="account-field">
      <span>{label}</span>
      <div className="account-input-wrap">
        <input type={type} placeholder={placeholder} autoComplete={autoComplete} />
      </div>
    </label>
  );
}

function AuthSpacer() {
  return <aside className="account-spacer" aria-hidden="true" />;
}

function LoginPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell account-auth-shell">
        <div className="account-auth-grid">
          <Panel className="account-auth-card">
            <h2>Login</h2>
            <Field label="Username or email address" placeholder="" autoComplete="username" />
            <Field label="Password" type="password" placeholder="" autoComplete="current-password" />

            <div className="account-auth-row">
              <label className="account-check">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button className="account-link-button" type="button" onClick={() => navigatePath(onNavigatePath, '/my-account/lost-password/')}>
                Lost your password?
              </button>
            </div>

            <button className="account-primary-button" type="button">Log in</button>
          </Panel>

          <AuthSpacer />
        </div>
      </div>
    </div>
  );
}

function ResetPasswordPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell account-auth-shell">
        <div className="account-auth-grid account-auth-grid--reset">
          <Panel className="account-auth-card account-auth-card--reset">
            <p className="account-reset-text">
              Lost your password? Please enter your username or email address. You will receive a link to create a new
              password via email.
            </p>
            <Field label="Username or email" placeholder="" autoComplete="username" />
            <button className="account-primary-button account-primary-button--reset" type="button">Reset password</button>
            <button className="account-text-link" type="button" onClick={() => navigatePath(onNavigatePath, '/my-account/')}>Back to login</button>
          </Panel>

          <AuthSpacer />
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell account-auth-shell">
        <AccountHero
          kicker="Create account"
          title="Register"
          subtitle="Set up your Creative Imprints profile to track orders, save accessories, and get mobile-only offers."
          onNavigatePath={onNavigatePath}
        />

        <div className="account-auth-grid account-auth-grid--register">
          <Panel className="account-auth-card account-auth-card--register">
            <Field label="First name" placeholder="Your first name" autoComplete="given-name" />
            <Field label="Last name" placeholder="Your last name" autoComplete="family-name" />
            <Field label="Email address" type="email" placeholder="you@example.com" autoComplete="email" />
            <Field label="Password" type="password" placeholder="Create a password" autoComplete="new-password" />
            <Field label="Mobile number" type="tel" placeholder="Enter your phone number" autoComplete="tel" />

            <label className="account-check account-check--policy">
              <input type="checkbox" defaultChecked />
              <span>
                I agree to the store policy and want product updates about phones, wearables, accessories, and app-only deals.
              </span>
            </label>

            <button className="account-primary-button" type="button">Create account</button>
          </Panel>

          <Panel className="account-info-card">
            <span className="account-side-label">Why register</span>
            <h3>One account, every device order</h3>
            <ul>
              <li>Save favorite phones, earbuds, chargers, and cases.</li>
              <li>Track orders, shipping updates, and notifications in one place.</li>
              <li>Unlock app-only deals and faster checkout on mobile.</li>
            </ul>
            <button className="account-secondary-button" type="button" onClick={() => navigatePath(onNavigatePath, '/my-account/')}>Already have an account?</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function CartPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell">
        <AccountHero
          kicker="Shopping cart"
          title="Cart"
          subtitle="Review the mobile gear in your basket before you checkout."
          onNavigatePath={onNavigatePath}
        />

        <div className="account-content-grid">
          <Panel className="account-cart-card">
            <div className="account-card-head">
              <h2>2 items</h2>
              <span>Secure checkout ready</span>
            </div>

            <div className="account-cart-list">
              {cartItems.map((item) => (
                <div key={item.name} className="account-cart-row">
                  <div className="account-cart-thumb">
                    <UserIcon />
                  </div>
                  <div className="account-cart-meta">
                    <strong>{item.name}</strong>
                    <span>{item.details}</span>
                  </div>
                  <div className="account-cart-price">
                    <strong>{item.price}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="account-summary-card">
            <span className="account-side-label">Order summary</span>
            <div className="account-summary-row"><span>Subtotal</span><strong>$1,327</strong></div>
            <div className="account-summary-row"><span>Shipping</span><strong>Free</strong></div>
            <div className="account-summary-row"><span>Discount</span><strong>-$40</strong></div>
            <div className="account-summary-total"><span>Total</span><strong>$1,287</strong></div>
            <button className="account-primary-button" type="button">Proceed to checkout</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function WishlistPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell">
        <AccountHero
          kicker="Saved products"
          title="Wishlist"
          subtitle="Your favorite phones and accessories are ready whenever you want them."
          onNavigatePath={onNavigatePath}
        />

        <Panel className="account-wishlist-card">
          <div className="account-product-grid">
            {wishlistItems.map((item) => (
              <article key={item.name} className="account-product-card">
                <div className="account-product-image">
                  <img src={item.image} alt={item.name} />
                  <span>{item.tag}</span>
                </div>
                <div className="account-product-body">
                  <h3>{item.name}</h3>
                  <div className="account-rating">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <span>4.9</span>
                  </div>
                  <div className="account-price-row">
                    <strong>{item.price}</strong>
                    <span>{item.oldPrice}</span>
                  </div>
                  <button className="account-secondary-button" type="button">Move to cart</button>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function OrdersPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell">
        <AccountHero
          kicker="Order history"
          title="Orders"
          subtitle="Track every phone, accessory, and add-on you’ve purchased from the store."
          onNavigatePath={onNavigatePath}
        />

        <div className="account-content-grid">
          <Panel className="account-orders-card">
            <div className="account-card-head">
              <h2>Recent orders</h2>
              <span>Updated just now</span>
            </div>

            <div className="account-order-list">
              {orders.map((order) => (
                <div key={order.id} className="account-order-row">
                  <div>
                    <strong>{order.id}</strong>
                    <span>{order.item}</span>
                  </div>
                  <div>
                    <strong>{order.total}</strong>
                    <span>{order.date}</span>
                  </div>
                  <span className={`account-status account-status--${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="account-summary-card">
            <span className="account-side-label">Quick actions</span>
            <button className="account-secondary-button account-secondary-button--full" type="button">Track shipment</button>
            <button className="account-secondary-button account-secondary-button--full" type="button">Reorder accessories</button>
            <button className="account-secondary-button account-secondary-button--full" type="button">Download invoice</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function NotificationsPage({ onNavigatePath }) {
  return (
    <div className="account-page">
      <div className="section-shell account-shell">
        <AccountHero
          kicker="Store alerts"
          title="Notifications"
          subtitle="Stay up to date with order updates, price drops, and app-only phone deals."
          onNavigatePath={onNavigatePath}
        />

        <div className="account-content-grid">
          <Panel className="account-notifications-card">
            <div className="account-card-head">
              <h2>Activity feed</h2>
              <span>3 unread</span>
            </div>

            <div className="account-notification-list">
              {notifications.map((item) => (
                <div key={item.title} className="account-notification-row">
                  <div className="account-notification-icon">{item.icon}</div>
                  <div className="account-notification-copy">
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                  <small>{item.time}</small>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="account-summary-card">
            <span className="account-side-label">Notification settings</span>
            <div className="account-setting-row"><span>Order updates</span><strong>On</strong></div>
            <div className="account-setting-row"><span>Price alerts</span><strong>On</strong></div>
            <div className="account-setting-row"><span>App promos</span><strong>On</strong></div>
            <button className="account-secondary-button account-secondary-button--full" type="button">Manage preferences</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default function AccountPages({ route, onNavigatePath }) {
  switch (route) {
    case 'register':
      return <RegisterPage onNavigatePath={onNavigatePath} />;
    case 'reset':
      return <ResetPasswordPage onNavigatePath={onNavigatePath} />;
    case 'cart':
      return <CartPage onNavigatePath={onNavigatePath} />;
    case 'wishlist':
      return <WishlistPage onNavigatePath={onNavigatePath} />;
    case 'orders':
      return <OrdersPage onNavigatePath={onNavigatePath} />;
    case 'notifications':
      return <NotificationsPage onNavigatePath={onNavigatePath} />;
    case 'login':
    default:
      return <LoginPage onNavigatePath={onNavigatePath} />;
  }
}