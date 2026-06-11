import './HeroSection.css';
import { useEffect, useMemo, useState } from 'react';
import { useConfig } from '../context/ConfigContext';

function HeroSection({ stats, slides, onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { config } = useConfig();

  const heroConfig = config?.hero || {};
  const useFallbackSlides = !slides?.length;
  const displaySlides = useMemo(
    () => (useFallbackSlides ? heroConfig.slides || [] : slides),
    [useFallbackSlides, heroConfig.slides, slides],
  );

  const finalSlides = useMemo(
    () => (displaySlides.length > 0
      ? displaySlides
      : (heroConfig.backgroundImage ? [{ key: 'hero-1', image: heroConfig.backgroundImage }] : [])),
    [displaySlides, heroConfig.backgroundImage],
  );

  useEffect(() => {
    if (!finalSlides?.length) return undefined;
    const interval = window.setInterval(() => setActiveSlide((c) => (c + 1) % finalSlides.length), 3000);
    return () => window.clearInterval(interval);
  }, [finalSlides]);

  const heading = useFallbackSlides
    ? heroConfig.heading || (finalSlides[activeSlide] && finalSlides[activeSlide].heading) || ''
    : (finalSlides[activeSlide] && finalSlides[activeSlide].heading) || '';
  const subheading = useFallbackSlides
    ? heroConfig.subheading || (finalSlides[activeSlide] && finalSlides[activeSlide].subheading) || ''
    : (finalSlides[activeSlide] && finalSlides[activeSlide].subheading) || '';
  const buttons = useFallbackSlides
    ? heroConfig.buttons?.length
      ? heroConfig.buttons
      : [
          heroConfig.primaryButton && {
            label: heroConfig.primaryButton.text,
            href: heroConfig.primaryButton.link,
            variant: 'primary',
          },
          heroConfig.secondaryButton && {
            label: heroConfig.secondaryButton.text,
            href: heroConfig.secondaryButton.link,
            variant: 'ghost',
          },
        ].filter(Boolean)
    : [];
  const normalizeHeroHref = (href) => {
    if (!href) {
      return '#/';
    }
    if (href.startsWith('/')) {
      return `#${href}`;
    }
    if (href.startsWith('#')) {
      return `#/${href.replace(/^#\/?/, '')}`;
    }
    return href;
  };

  const statsToShow = useFallbackSlides ? (heroConfig.stats || stats || []) : (stats || []);

  return (
    <section className="hero-shell" id="top">
      <div className="hero-card section-shell">
        <div className="hero-content">
          <h1 className="hero-heading">{heading}</h1>
          {subheading ? <p className="hero-subheading">{subheading}</p> : null}
          {buttons.length > 0 ? (
            <div className="hero-cta-row">
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  className={`hero-cta ${btn.variant === 'primary' ? 'primary' : 'ghost'}`}
                  href={normalizeHeroHref(btn.href)}
                  onClick={(e) => {
                    if (btn.href && btn.href.startsWith('/')) {
                      e.preventDefault();
                      window.history.pushState({}, '', `#${btn.href}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                >
                  {btn.label || btn.text}
                </a>
              ))}
            </div>
          ) : null}

          {statsToShow.length > 0 ? (
            <div className="hero-stats">
              {statsToShow.map((s) => (
                <div key={s.label} className="hero-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-carousel" aria-hidden="true">
            <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {finalSlides.map((slide) => (
                <div className="hero-slide" key={slide.key}>
                  <div className="hero-slide-image" style={{ backgroundImage: `url(${slide.image})` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-dots" aria-hidden="true">
            {finalSlides.map((slide, index) => (
              <button
                key={slide.key}
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
