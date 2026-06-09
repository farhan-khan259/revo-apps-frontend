import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  SearchIcon,
  ContactIcon,
  UserIcon,
  CloseIcon,
  CartIcon,
  PlayIcon,
  ShopIcon,
  StarIcon,
} from '../Icons';
import { logout } from '../../services/auth';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <HomeIcon /> },
  { label: 'Site Settings', path: '/admin/site-settings', icon: <ShopIcon /> },
  { label: 'Navigation', path: '/admin/navigation', icon: <ShopIcon /> },
  { label: 'Hero', path: '/admin/hero', icon: <StarIcon /> },
  { label: 'Footer', path: '/admin/footer', icon: <ShopIcon /> },
  { label: 'Theme', path: '/admin/theme', icon: <StarIcon /> },
  { label: 'Products', path: '/admin/products', icon: <ShopIcon /> },
  { label: 'Categories', path: '/admin/categories', icon: <CartIcon /> },
  { label: 'Orders', path: '/admin/orders', icon: <ContactIcon /> },
  { label: 'Order Workflow', path: '/admin/order-workflow', icon: <ContactIcon /> },
  { label: 'Cart & Checkout', path: '/admin/cart-checkout', icon: <CartIcon /> },
  { label: 'Notifications', path: '/admin/notifications', icon: <ContactIcon /> },
  { label: 'Wishlist', path: '/admin/wishlist', icon: <StarIcon /> },
  { label: 'Users', path: '/admin/users', icon: <UserIcon /> },
  { label: 'Media Library', path: '/admin/media', icon: <ShopIcon /> },
  { label: 'Reels', path: '/admin/reels', icon: <PlayIcon /> },
  { label: 'Homepage', path: '/admin/homepage', icon: <StarIcon /> },
  { label: 'SEO', path: '/admin/seo', icon: <SearchIcon /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Creative Imprints Admin</h2>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button onClick={logout} className="sidebar-link logout">
          <CloseIcon /> <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}