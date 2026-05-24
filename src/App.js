import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductsSection from './components/ProductsSection';
import PromoGrid from './components/PromoGrid';
import LifestyleTiles from './components/LifestyleTiles';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { bestDeals, categoryPromos, categories, heroSlides, heroStats, newPhones, promoCards } from './data';

function App() {
  const [activeSection, setActiveSection] = useState('categories');

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSection(hash || 'categories');
    };

    syncActiveSection();
    window.addEventListener('hashchange', syncActiveSection);

    return () => window.removeEventListener('hashchange', syncActiveSection);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (window.location.hash.replace('#', '') !== sectionId) {
      window.location.hash = sectionId;
    }
  };

  return (
    <div className="app-shell">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <HeroSection stats={heroStats} slides={heroSlides} onNavigate={handleNavigate} />
        <Categories items={categories} onNavigate={handleNavigate} />
        <ProductsSection
          id="new-arrivals"
          title="New Arrivals"
          subtitle="Fresh mobile phones, accessories, and everyday essentials"
          chips={['All', 'Phones', 'Accessories', 'Audio', 'Wearables', 'Gaming']}
          products={newPhones}
        />
        <PromoGrid cards={promoCards} />
        <ProductsSection
          id="best-deals"
          title="Best Deals"
          subtitle="High-value phones and accessories picked for quick conversion"
          chips={['Budget', 'Mid-Range', 'Flagship', 'Accessories']}
          products={bestDeals}
        />
        <LifestyleTiles items={categoryPromos} />
      </main>
      <MobileBottomNav activeSection={activeSection} onNavigate={handleNavigate} />
      <Footer id="account" />
    </div>
  );
}

export default App;
