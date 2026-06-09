import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function OrderReceivedPage({ orderId }) {
  const { config } = useConfig();
  const wf = config?.orderWorkflow || {};

  const heading = wf.thankYouHeading || 'Thank you for your order';
  const subheading = wf.thankYouSubheading || `We have received your order ${orderId || ''}`;
  const statusMessages = wf.statusMessages || {};

  return (
    <div className="order-received section-shell">
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <div className="order-status-messages">
        {Object.entries(statusMessages).map(([k, v]) => (
          <div key={k}><strong>{k}</strong>: <span>{v}</span></div>
        ))}
      </div>
    </div>
  );
}
