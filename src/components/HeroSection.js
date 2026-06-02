import './HeroSection.css';
import { useEffect, useMemo, useState } from 'react';
import { ChevronIcon } from './Icons';

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

  const handleSlideChange = (direction) => {
    setActiveSlide((current) => {
      if (direction === 'next') {
        return (current + 1) % slides.length;
      }
      return (current - 1 + slides.length) % slides.length;
    });
  };

  return (
    <section className="hero-shell" id="top">
      <div className="hero-card section-shell">
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-carousel" aria-hidden="true">
            <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide) => (
                <div className="hero-slide" key={slide.key}>
                  <div className="hero-slide-image" style={{ backgroundImage: `url(${slide.image})` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-dots" aria-hidden="true">
            {slides.map((slide, index) => (
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
