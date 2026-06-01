import './Footer.css';
import { useTranslation } from '../i18n';


function Footer({ id }) {
  const { t } = useTranslation();
  return (
    <footer className="footer-wrap" id={id}>
      <div className="footer-shell section-shell">
        <div className="footer-brand">
          <a className="brand footer-brand-logo" href="/" aria-label="Revo Apps home">
            <span className="brand-mark">Revo</span>
            <span className="brand-line">Apps</span>
          </a>
          <p>{t('footer.brandCopy')}</p>
        </div>

        <div className="footer-columns">
          <div>
            <h3>{t('footer.companyInfo')}</h3>
            <a href="#top">{t('footer.about')}</a>
            <a href="#top">{t('footer.contact')}</a>
            <a href="#top">{t('footer.careers')}</a>
            <a href="#top">{t('footer.press')}</a>
          </div>
          <div>
            <h3>{t('footer.customerService')}</h3>
            <a href="#top">{t('footer.howToOrder')}</a>
            <a href="#top">{t('footer.returns')}</a>
            <a href="#top">{t('footer.shipping')}</a>
            <a href="#top">{t('footer.delivery')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
