import { allProducts } from '../productCatalog';

const DEFAULT_API_URL = 'https://revoapps-backend.onrender.com';
const isLocalhost = typeof window !== 'undefined' && /(localhost|127\.0\.0\.1)/.test(window.location.hostname);
const envApiUrl = process.env.REACT_APP_API_URL;
const API_BASE = isLocalhost
  ? envApiUrl || 'http://localhost:4000'
  : envApiUrl?.includes('localhost')
    ? DEFAULT_API_URL
    : envApiUrl || DEFAULT_API_URL;

const normalizeProduct = (product) => ({
  ...product,
  image: product.image || product.images?.[0] || '',
  description: product.description || product.fullDescription || product.shortDescription || '',
  sold: typeof product.sold === 'number' ? `${product.sold} Sold` : product.sold || '',
  discount:
    product.discount !== undefined && product.discount !== null
      ? `${product.discount}%`
      : product.discount || '',
});

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/products?limit=200`);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    return (data.products || allProducts).map(normalizeProduct);
  } catch (err) {
    return allProducts;
  }
};

export const fetchProductsByIds = async (ids = []) => {
  if (!ids.length) return [];
  try {
    const res = await fetch(`${API_BASE}/api/products?ids=${ids.join(',')}`);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    return (data.products || []).map(normalizeProduct);
  } catch (err) {
    return allProducts.filter((p) => ids.includes(p._id) || ids.includes(p.slug)).map(normalizeProduct);
  }
};

export const getProductFromList = (products, slug) =>
  products.find((p) => p.slug === slug || p.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
