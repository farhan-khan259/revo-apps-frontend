import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function CheckoutPage({ onNavigatePath }) {
  const { config } = useConfig();
  const cartCfg = config?.cartSettings || {};
  const fields = cartCfg.checkoutFields || [
    { name: 'fullName', label: 'Full name', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
  ];
  const placeOrderText = cartCfg.placeOrderText || 'Place Order';
  const termsNote = cartCfg.termsNote || 'By placing this order you agree to our terms and privacy policy.';

  return (
    <div className="checkout-page section-shell">
      <h1>{cartCfg.checkoutTitle || 'Checkout'}</h1>
      <form className="checkout-form">
        {fields.map((f) => (
          <label key={f.name} className="checkout-field">
            <span>{f.label}</span>
            <input name={f.name} type={f.type || 'text'} />
          </label>
        ))}

        <div className="checkout-terms">
          <small>{termsNote}</small>
        </div>

        <button className="primary-button" type="button">{placeOrderText}</button>
      </form>
    </div>
  );
}
