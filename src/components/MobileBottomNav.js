import './MobileBottomNav.css';
import { CartIcon, HomeIcon, ReelIcon, ShopIcon, UserIcon } from './Icons';

const tabItems = [
  { key: 'home', label: 'Home', target: 'categories', Icon: HomeIcon },
  { key: 'reels', label: 'Deals', target: 'best-deals', Icon: ReelIcon },
  { key: 'shop', label: 'Shop', target: 'new-products', Icon: ShopIcon },
  { key: 'cart', label: 'Cart', target: 'best-deals', Icon: CartIcon, badge: '2' },
  { key: 'account', label: 'Account', target: 'account', Icon: UserIcon },
];

function MobileBottomNav({ activeSection, onNavigate }) {
  const activeKey =
    activeSection === 'new-products'
        ? 'shop'
        : activeSection === 'best-deals'
          ? 'cart'
          : activeSection === 'account'
            ? 'account'
            : 'home';

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
      {tabItems.map(({ key, label, target, Icon, badge }) => {
        const isActive = activeKey === key;

        return (
          <a
            key={key}
            className={`mobile-bottom-tab ${isActive ? 'active' : ''}`}
            href={`#${target}`}
            onClick={() => onNavigate(target)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="mobile-bottom-iconWrap">
              <Icon />
              {badge ? <span className="mobile-bottom-badge">{badge}</span> : null}
            </span>
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;