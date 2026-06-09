import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';
import ImagePicker from '../../components/admin/ImagePicker';

function SiteSettingsForm({ data, setData }) {
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imageField, setImageField] = useState('');

  const site = data || {};
  const social = site.socialLinks || [];

  const updateSite = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateSocial = (index, key, value) => {
    const newSocial = [...social];
    newSocial[index] = { ...newSocial[index], [key]: value };
    updateSite('socialLinks', newSocial);
  };

  const addSocial = () => {
    updateSite('socialLinks', [...social, { platform: '', url: '' }]);
  };

  const removeSocial = (index) => {
    updateSite('socialLinks', social.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="admin-form">
        <label>
          <span>Site Name</span>
          <input
            value={site.siteName || ''}
            onChange={(e) => updateSite('siteName', e.target.value)}
            placeholder="e.g., My Store"
          />
        </label>
        <label>
          <span>Contact Email</span>
          <input
            type="email"
            value={site.contactEmail || ''}
            onChange={(e) => updateSite('contactEmail', e.target.value)}
            placeholder="contact@example.com"
          />
        </label>
        <label>
          <span>Contact Phone</span>
          <input
            value={site.contactPhone || ''}
            onChange={(e) => updateSite('contactPhone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </label>
        <label>
          <span>Address</span>
          <input
            value={site.address || ''}
            onChange={(e) => updateSite('address', e.target.value)}
            placeholder="123 Main St, City, State"
          />
        </label>
      </div>

      <div className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Site Logo</span>
          <div className="image-input-group">
            {site.siteLogo && <img src={site.siteLogo} alt="logo" style={{ maxWidth: '100px' }} />}
            <button
              type="button"
              onClick={() => {
                setImageField('siteLogo');
                setImagePickerOpen(true);
              }}
            >
              Upload Logo
            </button>
          </div>
        </label>
      </div>

      <div className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Favicon</span>
          <div className="image-input-group">
            {site.favicon && <img src={site.favicon} alt="favicon" style={{ maxWidth: '50px' }} />}
            <button
              type="button"
              onClick={() => {
                setImageField('favicon');
                setImagePickerOpen(true);
              }}
            >
              Upload Favicon
            </button>
          </div>
        </label>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Social Links</h3>
        {social.map((link, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Platform</span>
              <input
                value={link.platform || ''}
                onChange={(e) => updateSocial(i, 'platform', e.target.value)}
                placeholder="e.g., Facebook, Instagram"
              />
            </label>
            <label>
              <span>URL</span>
              <input
                value={link.url || ''}
                onChange={(e) => updateSocial(i, 'url', e.target.value)}
                placeholder="https://..."
              />
            </label>
            <button type="button" onClick={() => removeSocial(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSocial} className="admin-form" style={{ padding: '0.75rem' }}>
          + Add Social Link
        </button>
      </div>

      <ImagePicker
        isOpen={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(url) => {
          if (imageField === 'siteLogo') updateSite('siteLogo', url);
          if (imageField === 'favicon') updateSite('favicon', url);
          setImagePickerOpen(false);
        }}
      />
    </div>
  );
}

export default function SiteSettings() {
  return (
    <div>
      <h1>Site Settings</h1>
      <SectionEditor sectionKey="site" title="Site Configuration">
        {(data, setData) => <SiteSettingsForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
