const API_BASE = process.env.REACT_APP_API_URL || '';

const DEFAULT_SETTINGS = {
  siteName: 'Creative Imprints',
  brandCopy: 'Quality gadgets and accessories',
  navLinks: [
    { label: 'New Arrivals', target: 'new-products' },
    { label: 'Best Deals', target: 'best-deals' },
    { label: 'Reels', target: 'reels' },
  ],
  footerColumns: [
    { title: 'Company', links: ['About', 'Contact', 'Careers'] },
    { title: 'Support', links: ['How to order', 'Returns', 'Shipping'] },
  ],
};

export const fetchSiteSettings = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/settings`);
    if (!res.ok) throw new Error('failed');
    const data = await res.json();
    return data.settings || DEFAULT_SETTINGS;
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
};
