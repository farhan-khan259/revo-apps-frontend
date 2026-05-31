import './AppDownload.css';

function AppDownload() {
  return (
    <section className="download-shell section-shell">
      <div className="download-card">
        <div className="download-phone" aria-hidden="true">
          <div className="phone-frame">
            <div className="phone-camera" />
            <div className="phone-screen">
              <span className="mini-pill">Point and Rewards</span>
              <div className="screen-card screen-card-top" />
              <div className="screen-card screen-card-bottom" />
            </div>
          </div>
        </div>

        <div className="download-copy">
          <span className="eyebrow-small">Download Our App</span>
          <h2>Enjoy the best shopping experience on mobile</h2>
          <p>
            Get the latest discount updates, push notifications, order tracking, and smoother checkout on your phone.
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
