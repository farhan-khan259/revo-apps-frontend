import { bestDeals, newProducts } from './data';

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const productPath = (slug) => `/product/${slug}/`;

const normalizeImageSource = (source) => {
  if (!source) {
    return '';
  }

  if (/^https?:\/\//i.test(source)) {
    return source;
  }

  return source.startsWith('/') ? source : `/${source}`;
};

const remoteImages = {
  phoneHero: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
  phoneSide: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80',
  foldable: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
  charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330f22?auto=format&fit=crop&w=1200&q=80',
  powerbank: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
  watch: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
  case: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
};

const galleryBySlug = {
  'samsung-galaxy-s24-ultra': [remoteImages.phoneHero, remoteImages.phoneSide, remoteImages.case, remoteImages.foldable],
  'apple-iphone-12-pro': [remoteImages.foldable, remoteImages.phoneHero, remoteImages.phoneSide, remoteImages.case],
  'oneplus-fold-x': [remoteImages.phoneSide, remoteImages.foldable, remoteImages.phoneHero, remoteImages.earbuds],
  'sony-wf-1000xm5-buds': [remoteImages.earbuds, remoteImages.phoneSide, remoteImages.charger, remoteImages.powerbank],
  'anker-65w-charger': [remoteImages.charger, remoteImages.powerbank, remoteImages.phoneHero, remoteImages.phoneSide],
  'powerbank-slim-20k': [remoteImages.powerbank, remoteImages.charger, remoteImages.phoneHero, remoteImages.watch],
  'pixel-pro-9': [remoteImages.phoneHero, remoteImages.phoneSide, remoteImages.case, remoteImages.earbuds],
  'galaxy-z-fold': [remoteImages.phoneSide, remoteImages.foldable, remoteImages.phoneHero, remoteImages.case],
  'noisecancel-buds': [remoteImages.earbuds, remoteImages.phoneSide, remoteImages.charger, remoteImages.powerbank],
  'powerbank-turbo-20k': [remoteImages.powerbank, remoteImages.charger, remoteImages.phoneHero, remoteImages.earbuds],
  'clear-case-pro': [remoteImages.case, remoteImages.phoneHero, remoteImages.phoneSide, remoteImages.foldable],
  'smartwatch-active': [remoteImages.watch, remoteImages.phoneHero, remoteImages.earbuds, remoteImages.powerbank],
  'gan-65w-charger': [remoteImages.charger, remoteImages.powerbank, remoteImages.phoneSide, remoteImages.case],
  'usb-c-cable-pro': [remoteImages.charger, remoteImages.phoneHero, remoteImages.powerbank, remoteImages.earbuds],
  'screen-protector-pack': [remoteImages.phoneSide, remoteImages.case, remoteImages.phoneHero, remoteImages.powerbank],
  'magsafe-wallet': [remoteImages.case, remoteImages.foldable, remoteImages.phoneHero, remoteImages.earbuds],
  'car-charger-duo': [remoteImages.charger, remoteImages.powerbank, remoteImages.phoneSide, remoteImages.watch],
  'samsung-galaxy-s24-ultra-512gb-titanium-violet': [remoteImages.phoneSide, remoteImages.phoneHero, remoteImages.foldable, remoteImages.case],
  'samsung-75-q80c-4k-hdr-smart-qled-tv': [remoteImages.tv, remoteImages.watch, remoteImages.phoneSide, remoteImages.earbuds],
  'smartwatch-fit-pro': [remoteImages.watch, remoteImages.earbuds, remoteImages.powerbank, remoteImages.phoneHero],
  'airfit-wireless-buds': [remoteImages.earbuds, remoteImages.phoneSide, remoteImages.charger, remoteImages.foldable],
  'mag-safe-charger': [remoteImages.charger, remoteImages.phoneHero, remoteImages.powerbank, remoteImages.case],
  'clear-phone-case': [remoteImages.case, remoteImages.phoneHero, remoteImages.phoneSide, remoteImages.foldable],
  'fast-charge-cable': [remoteImages.charger, remoteImages.powerbank, remoteImages.phoneSide, remoteImages.earbuds],
  'watch': [remoteImages.watch, remoteImages.phoneHero, remoteImages.earbuds, remoteImages.powerbank],
};

const relatedByType = {
  phone: ['Apple iPhone 12 Pro', 'Samsung Galaxy S24 Ultra 512GB - Titanium Violet', 'Pixel Pro 9'],
  foldable: ['OnePlus Fold X', 'Galaxy Z Fold', 'Samsung Galaxy S24 Ultra'],
  audio: ['Sony WF-1000XM5 Buds', 'NoiseCancel Buds', 'AirFit Wireless Buds'],
  charging: ['Anker 65W Charger', 'GaN 65W Charger', 'Car Charger Duo'],
  power: ['PowerBank Slim 20K', 'PowerBank Turbo 20K', 'MagSafe Charger'],
  protection: ['Clear Case Pro', 'Screen Protector Pack', 'MagSafe Wallet'],
  wearable: ['Smartwatch Active', 'Smartwatch Fit Pro', 'Watch'],
  display: ['Samsung 75" Q80C 4K HDR Smart QLED TV', 'Samsung Galaxy S24 Ultra', 'Pixel Pro 9'],
};

const typeMatchers = [
  { type: 'display', match: /(tv|qled|smart led|hdr)/i },
  { type: 'wearable', match: /watch/i },
  { type: 'audio', match: /(earbud|buds|headphone|audio)/i },
  { type: 'charging', match: /(charger|cable|adapter)/i },
  { type: 'power', match: /power ?bank/i },
  { type: 'protection', match: /(case|cover|protector|wallet)/i },
  { type: 'foldable', match: /(fold|flip)/i },
];

const unique = (items) => Array.from(new Set(items.filter(Boolean)));

const extractVariant = (productName) => {
  const parts = productName.split(' - ');
  return parts.length > 1 ? parts.slice(1).join(' - ') : '';
};

const getCatalogSpecs = (product, type) => {
  const specs = [
    { label: 'Product', value: product.name },
    { label: 'Category', value: type.charAt(0).toUpperCase() + type.slice(1) },
    { label: 'Price', value: product.price },
    { label: 'Old price', value: product.oldPrice },
    { label: 'Discount', value: product.discount },
    { label: 'Rating', value: product.rating },
    { label: 'Sold', value: product.sold },
  ];

  const variant = extractVariant(product.name);
  if (variant) {
    specs.splice(2, 0, { label: 'Variant', value: variant });
  }

  return specs;
};

const getGallery = (product) =>
  unique(
    [normalizeImageSource(product.image), ...(galleryBySlug[product.slug] || galleryBySlug[slugify(product.name)] || [product.image])].map(
      normalizeImageSource,
    ),
  );

const getTypeFromSlug = (slug) => {
  const matched = typeMatchers.find((entry) => entry.match.test(slug.replace(/-/g, ' ')));
  return matched?.type || 'phone';
};

const enrichProduct = (product) => {
  const slug = slugify(product.name);
  const type = getTypeFromSlug(slug);

  return {
    ...product,
    slug,
    path: productPath(slug),
    type,
    gallery: getGallery({ ...product, slug }),
    description: `${product.name} is listed here with the storefront price, rating, and sold count shown in the catalog.`,
    specs: getCatalogSpecs(product, type),
    highlights: [
      `Exact catalog name: ${product.name}`,
      `Price shown in the store: ${product.price}`,
      `Rating and sold count from the catalog: ${product.rating} / ${product.sold}`,
    ],
    relatedSlugs: unique(relatedByType[type] || relatedByType.phone).map(slugify),
  };
};

const dedupeBySlug = (products) => Array.from(new Map(products.map((product) => [product.slug, product])).values());

export const allProducts = dedupeBySlug([...newProducts, ...bestDeals].map(enrichProduct));

export const getProductPath = (product) => product?.path || productPath(slugify(product?.name || ''));

export const getProductBySlug = (slug) => allProducts.find((product) => product.slug === slug);

export const getRelatedProducts = (product, limit = 4) => {
  if (!product) {
    return allProducts.slice(0, limit);
  }

  const related = (product.relatedSlugs || [])
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter(Boolean)
    .filter((relatedProduct, index, list) => list.findIndex((item) => item.slug === relatedProduct.slug) === index)
    .filter((relatedProduct) => relatedProduct.slug !== product.slug);

  const fallback = allProducts.filter(
    (item) => item.slug !== product.slug && !related.some((relatedProduct) => relatedProduct.slug === item.slug),
  );

  return [...related, ...fallback].slice(0, limit);
};