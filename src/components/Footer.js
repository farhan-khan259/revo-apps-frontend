import './Footer.css';
import { useTranslation } from '../i18n';

function Footer({ id, settings }) {
  const { t } = useTranslation();
  const siteSettings = settings;

  const defaultColumns = [
    { title: t('footer.companyInfo'), links: [t('footer.about'), t('footer.contact'), t('footer.careers'), t('footer.press')] },
    { title: t('footer.customerService'), links: [t('footer.howToOrder'), t('footer.returns'), t('footer.shipping'), t('footer.delivery')] },
  ];

  const columns = settings?.footerColumns || defaultColumns;
  return (
    <footer className="footer-wrap" id={id}>
      <div className="footer-shell section-shell">
        <div className="footer-brand">
          <a className="brand footer-brand-logo" href="/" aria-label={siteSettings?.siteName || 'Creative Imprints'}>
            <span className="brand-mark">{(siteSettings?.siteName || 'Creative Imprints').split(' ')[0]}</span>
            <span className="brand-line">{(siteSettings?.siteName || 'Creative Imprints').split(' ').slice(1).join(' ')}</span>
          </a>
          <p>{siteSettings?.brandCopy || t('footer.brandCopy')}</p>
        </div>

        <div className="footer-columns">
          {columns.map((col) => (
            <div key={col.title}>
              <h3>{col.title}</h3>
              {(col.links || []).map((l, index) => {
                if (typeof l === 'string') {
                  return (
                    <a key={`${col.title}-${index}`} href="#top">
                      {l}
                    </a>
                  );
                }
                return (
                  <a key={`${col.title}-${index}`} href={l.href || '#top'}>
                    {l.label || l.title || l.href}
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <small>{`© ${new Date().getFullYear()} ${(siteSettings?.siteName || 'Creative Imprints')}`}</small>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
