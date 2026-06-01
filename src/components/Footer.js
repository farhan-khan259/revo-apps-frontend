import './Footer.css';


function Footer({ id }) {
  return (
    <footer className="footer-wrap" id={id}>
      <div className="footer-shell section-shell">
        <div className="footer-brand">
          <a className="brand footer-brand-logo" href="/" aria-label="Revo Apps home">
            <span className="brand-mark">Revo</span>
            <span className="brand-line">Apps</span>
          </a>
          <p>
            Built for Maximum Sales Conversion. The Ultimate WooCommerce Website Builder you&apos;ve been waiting for!
          </p>
        </div>

        <div className="footer-columns">
          <div>
            <h3>Company Info</h3>
            <a href="#top">About Us</a>
            <a href="#top">Contact</a>
            <a href="#top">Careers</a>
            <a href="#top">Press</a>
          </div>
          <div>
            <h3>Customer Service</h3>
            <a href="#top">How to Order</a>
            <a href="#top">Return and Refund Policy</a>
            <a href="#top">Shipping Info</a>
            <a href="#top">Delivery Information</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
