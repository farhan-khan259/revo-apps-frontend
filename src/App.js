import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductsSection from './components/ProductsSection';
import ProductDetailsPage from './components/ProductDetailsPage';
import LifestyleTiles from './components/LifestyleTiles';
import ReelsSection from './components/ReelsSection';
import AccountPages from './components/AccountPages';
import Footer from './components/Footer';
import LanguageProvider from './context/LanguageContext';
import MobileBottomNav from './components/MobileBottomNav';
import {
  accessoryTiles,
  bestDeals,
  categories,
  heroSlides,
  heroStats,
  newProducts,
  promoTiles,
  reels,
} from './data';
import { useTranslation } from './i18n';
import { getProductBySlug, getRelatedProducts } from './productCatalog';

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

const PRODUCT_PATH_PREFIX = '/product/';

const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

const getRouteFromLocation = () => {
  const pathname = normalizePath(window.location.pathname);

  if (pathname.startsWith(PRODUCT_PATH_PREFIX)) {
    const productSlug = pathname.slice(PRODUCT_PATH_PREFIX.length).replace(/\/$/, '');

    if (productSlug) {
      return { kind: 'product', productSlug };
    }
  }

  if (ACCOUNT_PATHS.has(pathname)) {
    if (pathname === '/my-account/' || pathname === '/my-account') {
      return { kind: 'account', route: 'login' };
    }

    if (pathname === '/my-account/register/') {
      return { kind: 'account', route: 'register' };
    }

    if (pathname === '/my-account/lost-password/') {
      return { kind: 'account', route: 'reset' };
    }

    if (pathname === '/cart/') {
      return { kind: 'account', route: 'cart' };
    }

    if (pathname === '/wishlist/') {
      return { kind: 'account', route: 'wishlist' };
    }

    if (pathname === '/orders/') {
      return { kind: 'account', route: 'orders' };
    }

    if (pathname === '/notifications/') {
      return { kind: 'account', route: 'notifications' };
    }
  }

  return { kind: 'home' };
};

function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [routeState, setRouteState] = useState(getRouteFromLocation);
  const { t } = useTranslation();

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSection(hash || 'top');
      setRouteState(getRouteFromLocation());
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
      setRouteState({ kind: 'home' });
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
    setRouteState(getRouteFromLocation());
  };

  const isHomeRoute = routeState.kind === 'home';
  const currentProduct = routeState.kind === 'product' ? getProductBySlug(routeState.productSlug) : null;
  const relatedProducts = currentProduct ? getRelatedProducts(currentProduct, 3) : [];

  return (
    <LanguageProvider>
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
            <ReelsSection reels={reels} />
            <ProductsSection
              id="new-products"
              title={t('newProducts')}
              subtitle={t('newProducts')}
              chips={['Phones', 'Foldables', 'Earbuds', 'Chargers', 'Power Banks', 'Cases', 'Wearables', 'Accessories']}
              products={newProducts}
              onNavigatePath={handleNavigatePath}
            />
            <LifestyleTiles banners={promoTiles} tiles={accessoryTiles} />
            <ProductsSection
              id="best-deals"
              title={t('bestDeals')}
              subtitle={t('bestDeals')}
              chips={['Trending', 'Top Rated', 'Flagships', 'Audio', 'Charging', 'Protection']}
              products={bestDeals}
              onNavigatePath={handleNavigatePath}
            />
          </>
        ) : routeState.kind === 'product' ? (
          <ProductDetailsPage product={currentProduct} relatedProducts={relatedProducts} onNavigatePath={handleNavigatePath} />
        ) : (
          <AccountPages route={routeState.route} onNavigatePath={handleNavigatePath} />
        )}
      </main>
      {isHomeRoute ? <MobileBottomNav activeSection={activeSection} onNavigate={handleNavigate} /> : null}
        <Footer id={isHomeRoute ? 'account' : undefined} />
      </div>
    </LanguageProvider>
  );
}

export default App;
