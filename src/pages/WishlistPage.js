import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function WishlistPage() {
  const { config } = useConfig();
  const wishlist = config?.wishlist || {};
  const emptyMessage = wishlist.emptyMessage || 'You have no items in your wishlist';
  const maxItems = wishlist.maxItems || 100;
  const image = wishlist.image || '/images/empty-wishlist.png';

  return (
    <div className="wishlist-page section-shell">
      <h1>{wishlist.title || 'Wishlist'}</h1>
      <p>{emptyMessage}</p>
      <img src={image} alt="Empty wishlist" />
      <p>Max items allowed: {maxItems}</p>
    </div>
  );
}
