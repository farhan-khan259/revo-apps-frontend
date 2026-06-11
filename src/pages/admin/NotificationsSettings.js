import SectionEditor from '../../components/admin/SectionEditor';

function NotificationsSettingsForm({ data, setData }) {
  const settings = data || {};
  const notificationTypes = [
    { key: 'order_confirmation', label: 'Order Confirmation' },
    { key: 'price_drop', label: 'Price Drop' },
    { key: 'wishlist_restock', label: 'Wishlist Restock' },
    { key: 'promo', label: 'Promotional' },
    { key: 'shipping_update', label: 'Shipping Update' },
  ];

  const updateSetting = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const toggleNotificationType = (key) => {
    const enabled = settings.enabled || {};
    updateSetting('enabled', { ...enabled, [key]: !enabled[key] });
  };

  const updateTemplate = (key, field, value) => {
    const templates = settings.templates || {};
    updateSetting('templates', {
      ...templates,
      [key]: { ...templates[key], [field]: value },
    });
  };

  return (
    <div>
      {notificationTypes.map((notif) => (
        <div
          key={notif.key}
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.enabled?.[notif.key] || false}
              onChange={() => toggleNotificationType(notif.key)}
              id={`notif-${notif.key}`}
            />
            <label htmlFor={`notif-${notif.key}`} style={{ fontWeight: '600' }}>
              {notif.label}
            </label>
          </div>

          <div className="admin-form">
            <label style={{ gridColumn: '1 / -1' }}>
              <span>Title</span>
              <input
                value={settings.templates?.[notif.key]?.title || ''}
                onChange={(e) => updateTemplate(notif.key, 'title', e.target.value)}
                placeholder="Notification title"
              />
            </label>
            <label style={{ gridColumn: '1 / -1' }}>
              <span>Body</span>
              <textarea
                value={settings.templates?.[notif.key]?.body || ''}
                onChange={(e) => updateTemplate(notif.key, 'body', e.target.value)}
                placeholder="Notification message"
                rows="3"
              />
            </label>
            <label>
              <span>Icon Emoji</span>
              <input
                value={settings.templates?.[notif.key]?.icon || ''}
                onChange={(e) => updateTemplate(notif.key, 'icon', e.target.value)}
                placeholder="e.g., 📦, 💰, 📍"
                maxLength="2"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NotificationsSettings() {
  return (
    <div>
      <h1>Notifications Settings</h1>
      <SectionEditor sectionKey="notifications" title="Notification Configuration">
        {(data, setData) => <NotificationsSettingsForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
