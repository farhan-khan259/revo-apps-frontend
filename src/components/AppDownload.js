import './AppDownload.css';

function AppDownload() {
  return (
    <section className="download-shell section-shell">
      <div className="download-card">
        <div className="download-phone" aria-hidden="true">
          <div className="phone-frame">
            <div className="phone-camera" />
            <div className="phone-screen">
              <span className="mini-pill">Mobile app preview</span>
              <div className="screen-card screen-card-top" />
              <div className="screen-card screen-card-bottom" />
            </div>
          </div>
        </div>

        <div className="download-copy">
          <span className="eyebrow-small">Download our app</span>
          <h2>Shop phones faster on mobile</h2>
          <p>
            Keep the layout aligned with the reference while making the page fully responsive. The app block is
            included as a final storefront-style section.
          </p>
          <div className="download-badges">
            <span className="badge">Google Play</span>
            <span className="badge">App Store</span>
          </div>
        </div>

        <div className="download-qr" aria-hidden="true">
          <span>Scan to download</span>
          <div className="qr-code" />
        </div>
      </div>
    </section>
  );
}

export default AppDownload;
