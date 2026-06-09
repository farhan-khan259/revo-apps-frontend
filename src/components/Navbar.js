import './Navbar.css';
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { BellIcon, CartIcon, HeartIcon, ListIcon, MenuIcon, SearchIcon } from './Icons';
import { useContext } from 'react';
import { LanguageContext, SUPPORTED_LANGS } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';

const defaultNavItems = [
  { key: 'nav.newArrival', target: 'new-products' },
  { key: 'nav.limitedOffers', target: 'best-deals' },
  { key: 'nav.shop', target: 'new-products' },
  { key: 'nav.reels', target: 'reels' },
];

const defaultCategories = [
  { label: 'Smartphones', target: 'new-products' },
  { label: 'Foldables', target: 'new-products' },
  { label: 'Earbuds', target: 'new-products' },
  { label: 'Chargers', target: 'best-deals' },
  { label: 'Power Banks', target: 'best-deals' },
  { label: 'Cases', target: 'best-deals' },
  { label: 'Wearables', target: 'best-deals' },
  { label: 'Accessories', target: 'best-deals' },
];

function Navbar({ settings, activeSection, currentPath, onNavigate, onNavigatePath }) {
  const { t } = useTranslation();
  const { config } = useConfig();
  
  const nav = config?.navigation?.links || settings?.navLinks || defaultNavItems;
  const cats = config?.categories || settings?.categories || defaultCategories;
  const siteSettings = config?.site || settings;
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getNavLabel = (item) => item.name || item.label || t(item.key);
  const getNavTarget = (item) => item.target || item.href || item.key || item.label;
  const getNavHref = (target) => (target?.startsWith('/') ? target : `#${target}`);

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

  useEffect(() => {
    setSearchQuery(currentPath.startsWith('/my-account') ? 'Samsung S24 Ult' : '');
  }, [currentPath]);

  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
    setIsCategoriesOpen(false);
    setIsDrawerOpen(false);
  };

  const handlePathNavigate = (path) => {
    onNavigatePath(path);
    setIsCategoriesOpen(false);
    setIsDrawerOpen(false);
  };

  function LangToggle() {
    const { lang, toggleLang } = useContext(LanguageContext);

    return (
      <button
        type="button"
        className="lang-button"
        onClick={() => toggleLang()}
        aria-label={`Switch language, current ${lang}`}
      >
        {lang === SUPPORTED_LANGS.EN ? 'EN' : 'AR'}
      </button>
    );
  }

  return (
    <header className="navbar-wrap">
      <div className="navbar-shell">
        
        <div className="navbar-top">
          <a
            className="brand"
            href="/"
            aria-label={`${siteSettings?.siteName || 'Creative Imprints'} home`}
            onClick={(event) => {
              event.preventDefault();
              handlePathNavigate('/');
            }}
          >
            <span className="brand-mark">{(siteSettings?.siteName || 'Creative Imprints').split(' ')[0]}</span>
            <span className="brand-line">{(siteSettings?.siteName || 'Creative Imprints').split(' ').slice(1).join(' ')}</span>
          </a>

          {/* Language toggle */}
          <div className="lang-toggle">
            <LangToggle />
          </div>

          <form
            className="searchbar"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              type="search"
              aria-label="Search products"
              placeholder={siteSettings?.searchPlaceholder || t('searchPlaceholder')}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </form>

          <div className="navbar-actions">
            <button className="icon-action" type="button" aria-label="Orders" onClick={() => handlePathNavigate('/orders/')}>
              <ListIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Wishlist" onClick={() => handlePathNavigate('/wishlist/')}>
              <HeartIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Notifications" onClick={() => handlePathNavigate('/notifications/')}>
              <BellIcon />
            </button>
            <button className="icon-action" type="button" aria-label="Cart" onClick={() => handlePathNavigate('/cart/')}>
              <CartIcon />
            </button>
            <a
              className="nav-button ghost desktop-only"
              href="/my-account/"
              onClick={(event) => {
                event.preventDefault();
                handlePathNavigate('/my-account/');
              }}
            >
              {t('login')}
            </a>
            <a
              className="nav-button solid desktop-only"
              href="/my-account/register/"
              onClick={(event) => {
                event.preventDefault();
                handlePathNavigate('/my-account/register/');
              }}
            >
              {t('register')}
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
          <a
            className="mobile-brand-mark"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handlePathNavigate('/');
            }}
          >
            <span>Creative</span>
            <span>Imprints</span>
          </a>
          <div className="mobile-brand-copy">
            <strong>{t('brandTheme')}</strong>
            <span>{t('pleaseLogin')}</span>
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
              {t('nav.allCategories')}
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
                    {cats.map((item) => (
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
            {nav.map((item, idx) => {
              const target = getNavTarget(item);
              return (
                <a
                  key={item.key || `${item.label || item.name}-${idx}`}
                  className={activeSection === target ? 'active' : ''}
                  href={getNavHref(target)}
                  onClick={(event) => {
                    event.preventDefault();
                    if (target?.startsWith('/')) {
                      handlePathNavigate(target);
                    } else {
                      handleNavigate(target);
                    }
                  }}
                  aria-current={activeSection === target ? 'page' : undefined}
                >
                  {getNavLabel(item)}
                </a>
              );
            })}
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
                {nav.map((item, idx) => {
                  const target = getNavTarget(item);
                  return (
                    <a
                      key={item.label || item.name || `${item.key}-${idx}`}
                      className={activeSection === target ? 'active' : ''}
                      href={getNavHref(target)}
                      onClick={(event) => {
                        event.preventDefault();
                        if (target?.startsWith('/')) {
                          handlePathNavigate(target);
                        } else {
                          handleNavigate(target);
                        }
                      }}
                    >
                      {getNavLabel(item)}
                    </a>
                  );
                })}
            </div>
            <div className="drawer-group">
              <span className="drawer-label">Quick Links</span>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/wishlist/')}>
                <span>Wishlist</span>
                <small>Saved items</small>
              </button>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/notifications/')}>
                <span>Notifications</span>
                <small>Order updates</small>
              </button>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/cart/')}>
                <span>Cart</span>
                <small>Mobile checkout</small>
              </button>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/orders/')}>
                <span>Orders</span>
                <small>Track purchases</small>
              </button>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/my-account/')}>
                <span>Login</span>
                <small>Account access</small>
              </button>
              <button className="drawer-category" type="button" onClick={() => handlePathNavigate('/my-account/register/')}>
                <span>Register</span>
                <small>Create account</small>
              </button>
            </div>

            <div className="drawer-group">
              <span className="drawer-label">Categories</span>
              {cats.map((item) => (
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
