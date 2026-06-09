import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [shippingMethod, setShippingMethod] = useState('free');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Demo product – matches screenshot
      setCartItems([
        {
          id: '1',
          name: 'Apple iPhone 12 Pro',
          details: 'Size: Medium, Color: Black',
          price: 'Rp104',
          oldPrice: 'Rp881',
          quantity: 1,
          image: '/images/phone-smart.jpg',
        },
      ]);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const subtotal = `Rp${cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace('Rp', ''));
    return sum + price * item.quantity;
  }, 0)}`;

  const subtotalNumber = parseInt(subtotal.replace('Rp', ''));

  const shippingCost = shippingMethod === 'free' ? 0 : 100;
  const discount = couponCode ? subtotalNumber * 0.1 : 0;
  const totalNumber = subtotalNumber + shippingCost - discount;
  const total = `Rp${totalNumber}`;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = (code) => {
    if (code.toLowerCase() === 'save10') {
      setCouponCode('SAVE10');
      setCouponError('');
      setCouponSuccess('Coupon applied successfully!');
    } else {
      setCouponError('Invalid coupon code');
      setCouponSuccess('');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const addItem = (product, quantity = 1) => {
    setCartItems(prev => {
      const matchKey = product.id || product.slug;
      // merge if same product exists
      const existing = prev.find(item => (item.id === matchKey) || (item.slug && product.slug && item.slug === product.slug));
      if (existing) {
        return prev.map(item => {
          if ((item.id === matchKey) || (item.slug && product.slug && item.slug === product.slug)) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      }

      const id = product.id || product.slug || Date.now().toString();
      const price = typeof product.price === 'number' ? `Rp${product.price}` : (product.price || product.price_display || product.priceString || 'Rp0');
      const newItem = {
        id,
        slug: product.slug,
        name: product.name || product.title || 'Product',
        details: product.details || product.variant || '',
        price,
        oldPrice: product.oldPrice || product.price_old || '',
        quantity: quantity,
        image: product.image || (product.gallery && product.gallery[0]) || '',
      };

      return [...prev, newItem];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        removeItem,
        subtotal,
        total,
        shippingCost,
        shippingMethod,
        setShippingMethod,
        couponCode,
        applyCoupon,
        couponError,
        couponSuccess,
        clearCart,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};