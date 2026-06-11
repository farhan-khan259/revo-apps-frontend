
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductsSection from './components/ProductsSection';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LifestyleTiles from './components/LifestyleTiles';
import ReelsSection from './components/ReelsSection';
import AccountPages from './pages/AccountPages';
import CheckoutPages from './components/CheckoutPages';
import Footer from './components/Footer';
import LanguageProvider from './context/LanguageContext';
import ConfigProvider from './context/ConfigContext';
import MobileBottomNav from './components/MobileBottomNav';
import { CartProvider } from './components/CartContext';
import { ToastProvider } from './components/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/Layout';
import Login from './components/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import AdminOrderWorkflow from './pages/admin/OrderWorkflow';
import AdminNavigationEditor from './pages/admin/NavigationEditor';
import AdminHeroEditor from './pages/admin/HeroEditor';
import AdminFooterEditor from './pages/admin/FooterEditor';
import AdminThemeEditor from './pages/admin/ThemeEditor';
import AdminSiteSettings from './pages/admin/SiteSettings';
import AdminCartCheckoutSettings from './pages/admin/CartCheckoutSettings';
import AdminNotificationsSettings from './pages/admin/NotificationsSettings';
import AdminWishlistSettings from './pages/admin/WishlistSettings';
import AdminUsers from './pages/admin/Users';
import AdminMediaLibrary from './pages/admin/MediaLibrary';
import ConfirmOrders from './components/admin/ConfirmOrders';
import Shipped from './components/admin/Shipped';
import CancelledOrders from './components/admin/CancelledOrders';
import Reels from './components/admin/Reels';
import Homepage from './components/admin/Homepage';
import Settings from './components/admin/Settings';
import {
  accessoryTiles as fallbackAccessoryTiles,
  bestDeals as fallbackBestDeals,
  categories as fallbackCategories,
  heroSlides as fallbackHeroSlides,
  heroStats,
  newProducts as fallbackNewProducts,
  promoTiles as fallbackPromoTiles,
  reels as fallbackReels,
} from './data';
import { useTranslation } from './i18n';
import { fetchProducts } from './services/productService';
import { fetchSiteSettings } from './services/settingsService';

const ACCOUNT_PATHS = new Set([
  '/my-account/',
  '/my-account',
  '/my-account/register/',
  '/my-account/lost-password/',
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

const getHashPathname = () => {
  if (typeof window === 'undefined' || !window.location) {
    return '/';
  }

  let hash = window.location.hash || '';
  hash = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!hash) {
    return '/';
  }

  if (!hash.startsWith('/')) {
    hash = `/${hash}`;
  }

  return normalizePath(hash.split('?')[0].split('#')[0]);
};

const getRouteFromLocation = (pathname = getHashPathname()) => {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath.startsWith(PRODUCT_PATH_PREFIX)) {
    const productSlug = pathname.slice(PRODUCT_PATH_PREFIX.length).replace(/\/$/, '');
    if (productSlug) {
      return { kind: 'product', productSlug };
    }
  }

  if (pathname === '/cart/' || pathname === '/checkout/' || pathname.startsWith('/checkout/order-received')) {
    if (pathname === '/cart/') {
      return { kind: 'checkout', route: 'cart' };
    }
    if (pathname === '/checkout/') {
      return { kind: 'checkout', route: 'checkout' };
    }
    const pathParts = pathname.split('/').filter(Boolean);
    const orderId = pathParts.length > 2 ? pathParts[pathParts.length - 1] : undefined;
    return { kind: 'checkout', route: 'orderReceived', orderId };
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

function FrontendApp() {
  const [activeSection, setActiveSection] = useState('top');
  const [routeState, setRouteState] = useState(getRouteFromLocation);
  const homepageContent = {
    heroSlides: fallbackHeroSlides,
    categories: fallbackCategories,
    reels: fallbackReels,
    newProducts: fallbackNewProducts,
    bestDeals: fallbackBestDeals,
    promoTiles: fallbackPromoTiles,
    accessoryTiles: fallbackAccessoryTiles,
  };
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    const loadSite = async () => {
      const [items, settings] = await Promise.all([fetchProducts(), fetchSiteSettings()]);
      setProducts(items || []);
      setSiteSettings(settings || null);
    };

    loadSite();

    const syncRouteState = () => {
      const pathname = getHashPathname();
      const route = getRouteFromLocation(pathname);
      setRouteState(route);

      if (route.kind === 'home') {
        const section = pathname === '/' ? 'top' : pathname.replace(/\/$/, '').replace(/^\//, '');
        setActiveSection(section || 'top');
      } else {
        setActiveSection('top');
      }
    };

    syncRouteState();
    window.addEventListener('hashchange', syncRouteState);
    window.addEventListener('popstate', syncRouteState);

    return () => {
      window.removeEventListener('hashchange', syncRouteState);
      window.removeEventListener('popstate', syncRouteState);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    const hashPath = sectionId === 'top' ? '#/' : `#/${sectionId}`;
    if (window.location.hash !== hashPath) {
      window.history.pushState({}, '', hashPath);
    }
    setActiveSection(sectionId);
    setRouteState({ kind: 'home' });

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  const handleNavigatePath = (path) => {
    const normalizedPath = normalizePath(path);
    const hashPath = `#${normalizedPath}`;

    if (window.location.hash !== hashPath) {
      window.history.pushState({}, '', hashPath);
    }

    setActiveSection('top');
    setRouteState(getRouteFromLocation(normalizedPath));
  };

  const currentHashPath = getHashPathname();
  const isHomeRoute = routeState.kind === 'home';
  const isCheckoutRoute = routeState.kind === 'checkout';
  const currentProduct = routeState.kind === 'product' ? products.find((p) => p.slug === routeState.productSlug) : null;
  const relatedProducts = currentProduct
    ? products.filter((product) => product.category?._id === currentProduct.category?._id && product._id !== currentProduct._id).slice(0, 4)
    : [];

  return (
    <div className="app-shell">
      <Navbar
        settings={siteSettings}
        activeSection={isHomeRoute ? activeSection : ''}
        currentPath={currentHashPath}
        onNavigate={handleNavigate}
        onNavigatePath={handleNavigatePath}
      />
      <main>
        {isCheckoutRoute ? (
          <CheckoutPages
            route={routeState.route}
            onNavigatePath={handleNavigatePath}
            orderId={routeState.orderId}
          />
        ) : isHomeRoute ? (
          activeSection === 'reels' ? (
            <ReelsSection reels={homepageContent.reels} />
          ) : (
            <>
              <HeroSection stats={heroStats} slides={homepageContent.heroSlides} onNavigate={handleNavigate} />
              <Categories items={homepageContent.categories} onNavigate={handleNavigate} />
              <ProductsSection
                id="new-products"
                title={t('newProducts')}
                subtitle={t('newProducts')}
                chips={['Phones', 'Foldables', 'Earbuds', 'Chargers', 'Power Banks', 'Cases', 'Wearables', 'Accessories']}
                products={homepageContent.newProducts}
                onNavigatePath={handleNavigatePath}
              />
              <LifestyleTiles banners={homepageContent.promoTiles} tiles={homepageContent.accessoryTiles} />
              <ProductsSection
                id="best-deals"
                title={t('bestDeals')}
                subtitle={t('bestDeals')}
                chips={['Trending', 'Top Rated', 'Flagships', 'Audio', 'Charging', 'Protection']}
                products={homepageContent.bestDeals}
                onNavigatePath={handleNavigatePath}
              />
            </>
          )
        ) : routeState.kind === 'product' ? (
          <ProductDetailsPage
            product={currentProduct}
            relatedProducts={relatedProducts}
            onNavigatePath={handleNavigatePath}
          />
        ) : (
          <AccountPages route={routeState.route} onNavigatePath={handleNavigatePath} />
        )}
      </main>
      {isHomeRoute ? (
        <MobileBottomNav activeSection={activeSection} onNavigate={handleNavigate} onNavigatePath={handleNavigatePath} />
      ) : null}
      <Footer id={isHomeRoute ? 'account' : undefined} settings={siteSettings} />
    </div>
  );
}

function AdminFallback({ title }) {
  return (
    <div className="admin-main">
      <h1>{title}</h1>
      <p>Admin section available here.</p>
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <HashRouter>
        <LanguageProvider>
          <ToastProvider>
            <CartProvider>
              <AuthProvider>
                <Routes>
                  <Route path="/admin" element={<Login />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="order-workflow" element={<AdminOrderWorkflow />} />
                  <Route path="navigation" element={<AdminNavigationEditor />} />
                  <Route path="hero" element={<AdminHeroEditor />} />
                  <Route path="footer" element={<AdminFooterEditor />} />
                  <Route path="theme" element={<AdminThemeEditor />} />
                  <Route path="site-settings" element={<AdminSiteSettings />} />
                  <Route path="cart-checkout" element={<AdminCartCheckoutSettings />} />
                  <Route path="notifications" element={<AdminNotificationsSettings />} />
                  <Route path="wishlist" element={<AdminWishlistSettings />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="media" element={<AdminMediaLibrary />} />
                  <Route path="confirm-orders" element={<ConfirmOrders />} />
                  <Route path="shipped" element={<Shipped />} />
                  <Route path="cancelled-orders" element={<CancelledOrders />} />
                  <Route path="reels" element={<Reels />} />
                  <Route path="homepage" element={<Homepage />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="seo" element={<AdminFallback title="SEO Settings" />} />
                </Route>
                <Route path="*" element={<FrontendApp />} />
              </Routes>
            </AuthProvider>
          </CartProvider>
        </ToastProvider>
      </LanguageProvider>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;