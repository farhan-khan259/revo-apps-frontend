import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

function FooterEditorForm({ data, setData }) {
  const footer = data || {};

  const updateFooter = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateNavLink = (index, key, value) => {
    const links = footer.navLinks || [];
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [key]: value };
    updateFooter('navLinks', newLinks);
  };

  const addNavLink = () => {
    updateFooter('navLinks', [...(footer.navLinks || []), { label: '', href: '' }]);
  };

  const removeNavLink = (index) => {
    updateFooter('navLinks', footer.navLinks?.filter((_, i) => i !== index) || []);
  };

  const updateSocialLink = (index, key, value) => {
    const links = footer.socialLinks || [];
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [key]: value };
    updateFooter('socialLinks', newLinks);
  };

  const addSocialLink = () => {
    updateFooter('socialLinks', [...(footer.socialLinks || []), { platform: '', url: '' }]);
  };

  const removeSocialLink = (index) => {
    updateFooter('socialLinks', footer.socialLinks?.filter((_, i) => i !== index) || []);
  };

  return (
    <div>
      <div className="admin-form">
        <label>
          <span>Brand Name</span>
          <input
            value={footer.brandName || ''}
            onChange={(e) => updateFooter('brandName', e.target.value)}
            placeholder="Company name"
          />
        </label>
        <label>
          <span>Tagline</span>
          <input
            value={footer.tagline || ''}
            onChange={(e) => updateFooter('tagline', e.target.value)}
            placeholder="Short brand description"
          />
        </label>
        <label>
          <span>Copyright Text</span>
          <input
            value={footer.copyrightText || ''}
            onChange={(e) => updateFooter('copyrightText', e.target.value)}
            placeholder="© 2024 Your Company"
          />
        </label>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Navigation Links</h3>
        {(footer.navLinks || []).map((link, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Label</span>
              <input
                value={link.label || ''}
                onChange={(e) => updateNavLink(i, 'label', e.target.value)}
                placeholder="Link label"
              />
            </label>
            <label>
              <span>URL</span>
              <input
                value={link.href || ''}
                onChange={(e) => updateNavLink(i, 'href', e.target.value)}
                placeholder="e.g., /about, #contact"
              />
            </label>
            <button type="button" onClick={() => removeNavLink(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addNavLink} style={{ marginTop: '1rem' }}>
          + Add Navigation Link
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Social Links</h3>
        {(footer.socialLinks || []).map((link, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Platform</span>
              <input
                value={link.platform || ''}
                onChange={(e) => updateSocialLink(i, 'platform', e.target.value)}
                placeholder="e.g., Facebook, Instagram"
              />
            </label>
            <label>
              <span>URL</span>
              <input
                value={link.url || ''}
                onChange={(e) => updateSocialLink(i, 'url', e.target.value)}
                placeholder="https://..."
              />
            </label>
            <button type="button" onClick={() => removeSocialLink(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSocialLink} style={{ marginTop: '1rem' }}>
          + Add Social Link
        </button>
      </div>
    </div>
  );
}

export default function FooterEditor() {
  return (
    <div>
      <h1>Footer Editor</h1>
      <SectionEditor sectionKey="footer" title="Footer Configuration">
        {(data, setData) => <FooterEditorForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
