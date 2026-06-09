import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function NotificationsPage() {
  const { config } = useConfig();
  const notificationsCfg = config?.notifications || {};
  const categories = notificationsCfg.categories || [
    { key: 'orders', title: 'Order updates', enabled: true, icon: '🔔' },
    { key: 'promos', title: 'Promotions', enabled: true, icon: '🎁' },
  ];

  return (
    <div className="notifications-page section-shell">
      <h1>{notificationsCfg.title || 'Notifications'}</h1>
      <div className="notifications-grid">
        {categories.filter((c) => c.enabled).map((cat) => (
          <section key={cat.key} className="notification-category">
            <h2>{cat.title}</h2>
            <div className="notification-item">
              <span className="notification-icon">{cat.icon}</span>
              <div>
                <strong>{cat.exampleTitle || 'Example'}</strong>
                <p>{cat.exampleBody || 'This is a sample notification.'}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
