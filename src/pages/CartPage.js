import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function CartPage({ onNavigatePath }) {
  const { config } = useConfig();
  const cartCfg = config?.cartSettings || {};

  const emptyMessage = cartCfg.emptyCartMessage || 'Your cart is empty';
  const couponPlaceholder = cartCfg.couponPlaceholder || 'Coupon code';
  const shippingOptions = cartCfg.shippingOptions || [{ id: 'standard', label: 'Standard', price: 'Free' }];
  const proceedText = cartCfg.proceedToCheckoutText || 'Proceed to checkout';

  return (
    <div className="cart-page section-shell">
      <h1>{cartCfg.title || 'Cart'}</h1>
      <p>{emptyMessage}</p>
      <div className="cart-actions">
        <input placeholder={couponPlaceholder} />
        <div className="shipping-options">
          {shippingOptions.map((s) => (
            <label key={s.id}><input type="radio" name="shipping" /> {s.label} <small>{s.price}</small></label>
          ))}
        </div>
        <button className="primary-button">{proceedText}</button>
      </div>
    </div>
  );
}
