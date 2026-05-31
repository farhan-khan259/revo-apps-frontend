import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductsSection from './components/ProductsSection';
import LifestyleTiles from './components/LifestyleTiles';
import AccountPages from './components/AccountPages';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import {
  accessoryTiles,
  bestDeals,
  categories,
  heroSlides,
  heroStats,
  newProducts,
  promoTiles,
} from './data';

const ACCOUNT_PATHS = new Set([
  '/my-account/',
  '/my-account',
  '/my-account/register/',
  '/my-account/lost-password/',
  '/cart/',
  '/wishlist/',
  '/orders/',
  '/notifications/',
]);

const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

const getRouteFromLocation = () => {
  const pathname = normalizePath(window.location.pathname);

  if (ACCOUNT_PATHS.has(pathname)) {
    if (pathname === '/my-account/' || pathname === '/my-account') {
      return 'login';
    }

    if (pathname === '/my-account/register/') {
      return 'register';
    }

    if (pathname === '/my-account/lost-password/') {
      return 'reset';
    }

    if (pathname === '/cart/') {
      return 'cart';
    }

    if (pathname === '/wishlist/') {
      return 'wishlist';
    }

    if (pathname === '/orders/') {
      return 'orders';
    }

    if (pathname === '/notifications/') {
      return 'notifications';
    }
  }

  return 'home';
};

function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [route, setRoute] = useState(getRouteFromLocation);

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSection(hash || 'top');
      setRoute(getRouteFromLocation());
    };

    syncActiveSection();
    window.addEventListener('hashchange', syncActiveSection);
    window.addEventListener('popstate', syncActiveSection);

    return () => {
      window.removeEventListener('hashchange', syncActiveSection);
      window.removeEventListener('popstate', syncActiveSection);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (normalizePath(window.location.pathname) !== '/' || window.location.hash.replace('#', '') !== sectionId) {
      window.history.pushState({}, '', `/#${sectionId}`);
      setRoute('home');
      return;
    }

    if (window.location.hash.replace('#', '') !== sectionId) {
      window.location.hash = sectionId;
    }
  };

  const handleNavigatePath = (path) => {
    const normalizedPath = normalizePath(path);

    if (normalizePath(window.location.pathname) !== normalizedPath) {
      window.history.pushState({}, '', normalizedPath);
    }

    if (normalizedPath === '/') {
      window.location.hash = '';
    }

    setActiveSection('top');
    setRoute(getRouteFromLocation());
  };

  const isHomeRoute = route === 'home';

  return (
    <div className="app-shell">
      <Navbar
        activeSection={isHomeRoute ? activeSection : ''}
        currentPath={normalizePath(window.location.pathname)}
        onNavigate={handleNavigate}
        onNavigatePath={handleNavigatePath}
      />
      <main>
        {isHomeRoute ? (
          <>
            <HeroSection stats={heroStats} slides={heroSlides} onNavigate={handleNavigate} />
            <Categories items={categories} onNavigate={handleNavigate} />
            <ProductsSection
              id="new-products"
              title="New Products"
              subtitle="Fresh phones and accessories chosen to mirror the storefront reference"
              chips={['Phones', 'Foldables', 'Earbuds', 'Chargers', 'Power Banks', 'Cases', 'Wearables', 'Accessories']}
              products={newProducts}
            />
            <LifestyleTiles banners={promoTiles} tiles={accessoryTiles} />
            <ProductsSection
              id="best-deals"
              title="Best Deals"
              subtitle="Popular mobile picks with strong discounts and fast-moving stock"
              chips={['Trending', 'Top Rated', 'Flagships', 'Audio', 'Charging', 'Protection']}
              products={bestDeals}
            />
          </>
        ) : (
          <AccountPages route={route} onNavigatePath={handleNavigatePath} />
        )}
      </main>
      {isHomeRoute ? <MobileBottomNav activeSection={activeSection} onNavigate={handleNavigate} /> : null}
      <Footer id={isHomeRoute ? 'account' : undefined} />
    </div>
  );
}

export default App;
