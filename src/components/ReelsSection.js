import './ReelsSection.css';
import { useState } from 'react';
import { PlayIcon, CloseIcon } from './Icons';

function ReelsSection({ reels }) {
  const [activeReel, setActiveReel] = useState(null);

  return (
    <section className="reels-shell section-shell" id="reels">
      <div className="reels-header">
        <div>
          <p className="reels-eyebrow">Trending Reels</p>
          <h2 className="reels-title">Short fashion and lifestyle drops</h2>
        </div>
        <button type="button" className="reels-action" onClick={() => setActiveReel(reels[0])}>
          Watch featured reel
        </button>
      </div>

      <div className="reels-grid">
        {reels.map((reel) => (
          <button
            key={reel.title}
            type="button"
            className="reel-card"
            onClick={() => setActiveReel(reel)}
          >
            <div className="reel-thumb" style={{ backgroundImage: `url(${reel.thumbnail})` }}>
              <span className="reel-play-icon">
                <PlayIcon />
              </span>
            </div>
            <div className="reel-copy">
              <span className="reel-category">{reel.category}</span>
              <strong>{reel.title}</strong>
              <span className="reel-meta">{reel.duration} • {reel.views} views</span>
            </div>
          </button>
        ))}
      </div>

      {activeReel ? (
        <div className="reel-modal" role="dialog" aria-modal="true">
          <div className="reel-modal-content">
            <div className="reel-modal-header">
              <div>
                <span className="reel-category">{activeReel.category}</span>
                <h3>{activeReel.title}</h3>
              </div>
              <button type="button" className="reel-close" onClick={() => setActiveReel(null)} aria-label="Close reel">
                <CloseIcon />
              </button>
            </div>
            <div className="reel-player">
              <div className="reel-player-inner" style={{ backgroundImage: `url(${activeReel.thumbnail})` }}>
                <span className="reel-player-badge">Preview</span>
              </div>
            </div>
            <p>{activeReel.description}</p>
          </div>
          <button className="reel-backdrop" type="button" onClick={() => setActiveReel(null)} aria-label="Close reel overlay" />
        </div>
      ) : null}
    </section>
  );
}

export default ReelsSection;
