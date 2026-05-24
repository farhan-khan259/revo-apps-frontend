import './Navbar.css';
import { useEffect, useState } from 'react';
import { BellIcon, CartIcon, HeartIcon, ListIcon, MenuIcon, SearchIcon } from './Icons';

const navItems = [
  { label: 'New Arrivals', target: 'new-arrivals' },
  { label: 'Best Deals', target: 'best-deals' },
  { label: 'Phones', target: 'new-arrivals' },
  { label: 'Accessories', target: 'best-deals' },
];

const categoryMenu = [
  { label: 'Smartphones', target: 'new-arrivals' },
  { label: 'Foldables', target: 'new-arrivals' },
  { label: 'Cases & Covers', target: 'best-deals' },
  { label: 'Chargers & Adapters', target: 'best-deals' },
  { label: 'Power Banks', target: 'best-deals' },
  { label: 'Earbuds', target: 'new-arrivals' },
  { label: 'Smartwatches', target: 'best-deals' },
  { label: 'Screen Protectors', target: 'best-deals' },
];

function Navbar({ activeSection, onNavigate }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCategoriesOpen(false);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    setIsCategoriesOpen(false);

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
    setIsCategoriesOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <header className="navbar-wrap">
      <div className="navbar-shell">
        <div className="navbar-top">
          <a className="brand" href="#top" aria-label="Revo Apps home">
            <span className="brand-mark">Revo</span>
            <span className="brand-line">Apps</span>
          </a>

          <form className="searchbar" role="search">
            <input type="search" aria-label="Search products" placeholder="Search phones, earbuds, chargers..." />
            <button type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </form>

          <div className="navbar-actions">
            <button className="icon-action" type="button" aria-label="Orders">
              <ListIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Wishlist">
              <HeartIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Notifications">
              <BellIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Cart">
              <CartIcon />
            </button>
            <a className="nav-button ghost desktop-only" href="#login">
              Login
            </a>
            <a className="nav-button solid desktop-only" href="#register">
              Register
            </a>
            <button
              className="icon-action mobile-only menu-button"
              type="button"
              aria-label="Open menu"
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen((current) => !current)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <div className="navbar-mobile-brand" aria-hidden="true">
          <a className="mobile-brand-mark" href="#top">
            <span>Revo</span>
            <span>Apps</span>
          </a>
          <div className="mobile-brand-copy">
            <strong>Revo Apps Theme</strong>
            <span>Please Login Here</span>
          </div>
        </div>

        <nav className="navbar-bottom" aria-label="Primary">
          <div className="category-menu-wrap">
            <button
              className={`category-pill ${activeSection === 'categories' || isCategoriesOpen ? 'active' : ''}`}
              type="button"
              onClick={() => setIsCategoriesOpen((current) => !current)}
              aria-expanded={isCategoriesOpen}
              aria-controls="categories-dropdown"
            >
              <MenuIcon />
              All Categories
              <span className="pill-caret" aria-hidden="true" />
            </button>

            {isCategoriesOpen ? (
              <>
                <button
                  className="menu-backdrop"
                  type="button"
                  aria-label="Close categories"
                  onClick={() => setIsCategoriesOpen(false)}
                />
                <div className="categories-dropdown" id="categories-dropdown" role="menu" aria-label="All categories">
                  <div className="dropdown-header">
                    <span>All Categories</span>
                    <span>Mobile focused</span>
                  </div>
                  <div className="dropdown-grid">
                    {categoryMenu.map((item) => (
                      <button
                        key={item.label}
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleNavigate(item.target)}
                      >
                        <span>{item.label}</span>
                        <small>Shop now</small>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="nav-links" aria-label="Section links">
            {navItems.map((item) => (
              <a
                key={item.label}
                className={activeSection === item.target ? 'active' : ''}
                href={`#${item.target}`}
                onClick={() => handleNavigate(item.target)}
                aria-current={activeSection === item.target ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {isDrawerOpen ? (
        <>
          <button
            className="menu-backdrop drawer-backdrop"
            type="button"
            aria-label="Close menu"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className="mobile-drawer" aria-label="Mobile navigation">
            <div className="drawer-top">
              <div>
                <strong>Menu</strong>
                <span>Quick access to shop sections</span>
              </div>
              <button className="drawer-close" type="button" onClick={() => setIsDrawerOpen(false)}>
                Close
              </button>
            </div>

            <div className="drawer-group">
              <span className="drawer-label">Navigate</span>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  className={activeSection === item.target ? 'active' : ''}
                  href={`#${item.target}`}
                  onClick={() => handleNavigate(item.target)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="drawer-group">
              <span className="drawer-label">Categories</span>
              {categoryMenu.map((item) => (
                <button key={item.label} className="drawer-category" type="button" onClick={() => handleNavigate(item.target)}>
                  <span>{item.label}</span>
                  <small>Mobile accessory</small>
                </button>
              ))}
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}

export default Navbar;
