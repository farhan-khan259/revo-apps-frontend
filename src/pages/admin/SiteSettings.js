import SectionEditor from '../../components/admin/SectionEditor';

function SiteSettingsForm({ data, setData }) {
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
