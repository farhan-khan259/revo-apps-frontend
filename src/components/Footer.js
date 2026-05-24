import './Footer.css';


function Footer({ id }) {
  return (
    <footer className="footer-wrap" id={id}>
      <div className="footer-shell section-shell">
        <div className="footer-branding">
          <a className="brand brand-footer" href="#top" aria-label="Revo Apps home">
            <span className="brand-mark">Revo</span>
            <span className="brand-line">Apps</span>
          </a>
          <p>
            A storefront-style landing page rebuilt for mobile-first phone shopping, with a clean red-and-white theme
            and responsive cards throughout.
          </p>
          
        </div>

        <div className="footer-columns">
          <div>
            <h3>Company Info</h3>
            <a href="#top">About us</a>
            <a href="#top">Contact</a>
            <a href="#top">Careers</a>
            <a href="#top">Press</a>
          </div>
          <div>
            <h3>Customer Service</h3>
            <a href="#top">How to order</a>
            <a href="#top">Return policy</a>
            <a href="#top">Shipping info</a>
            <a href="#top">Delivery information</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
