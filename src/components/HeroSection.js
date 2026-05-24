import './HeroSection.css';
import { useEffect, useMemo, useState } from 'react';

function HeroSection({ stats, slides, onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!slides?.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [slides]);

  const currentSlide = useMemo(() => {
    if (!slides?.length) {
      return null;
    }

    return slides[activeSlide % slides.length];
  }, [activeSlide, slides]);

  return (
    <section className="hero-shell" id="top">
      <div className="hero-card section-shell">
        <div className="hero-copy">
          <span className="eyebrow">{currentSlide?.eyebrow}</span>
          <h1>{currentSlide?.title}</h1>
          <p>{currentSlide?.description}</p>
          <div className="hero-actions">
            <a className="hero-primary" href="#new-arrivals" onClick={() => onNavigate('new-arrivals')}>
              Shop now
            </a>
            <a className="hero-secondary" href="#categories">
              Browse categories
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-carousel" aria-hidden="true">
            <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide) => (
                <div className="hero-slide" key={slide.title}>
                  <div className="hero-orb hero-orb-left" />
                  <div className="hero-orb hero-orb-right" />
                  <img src={slide.mainImage} alt="" className="hero-phone hero-phone-main" />
                  <img src={slide.secondaryImage} alt="" className="hero-phone hero-phone-second" />
                  <div className="hero-badge hero-badge-top">{slide.badgeTop}</div>
                  <div className="hero-badge hero-badge-bottom">{slide.badgeBottom}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-dots" aria-hidden="true">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
