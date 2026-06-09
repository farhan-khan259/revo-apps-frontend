import { heroSlides, categories, reels, newProducts, bestDeals, promoTiles, accessoryTiles } from '../data';
import { fetchProductsByIds } from './productService';

const API_BASE = process.env.REACT_APP_API_URL || '';

const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/categories`);
    if (!response.ok) throw new Error('Failed to load categories');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    return [];
  }
};

const mapSections = async (sections) => {
  const mapped = {
    heroSlides,
    categories,
    reels,
    newProducts,
    bestDeals,
    promoTiles,
    accessoryTiles,
  };

  for (const section of sections) {
    switch (section.sectionType) {
      case 'hero':
        if (Array.isArray(section.content?.slides)) {
          mapped.heroSlides = section.content.slides;
        }
        break;
      case 'categories':
        if (Array.isArray(section.content?.categoryIds) && section.content.categoryIds.length) {
          const allCategories = await fetchAllCategories();
          mapped.categories = allCategories
            .filter((category) => section.content.categoryIds.includes(category._id || category.id))
            .map((category) => ({
              name: category.name,
              image: category.iconUrl || category.imageUrl || '/images/phone-smart.jpg',
            }));
        } else if (Array.isArray(section.content?.categories)) {
          mapped.categories = section.content.categories;
        }
        break;
      case 'reels':
        if (Array.isArray(section.content?.reels)) {
          mapped.reels = section.content.reels;
        }
        break;
      case 'new-products':
        if (Array.isArray(section.content?.productIds) && section.content.productIds.length) {
          mapped.newProducts = await fetchProductsByIds(section.content.productIds);
        } else if (Array.isArray(section.content?.products)) {
          mapped.newProducts = section.content.products;
        }
        break;
      case 'best-deals':
        if (Array.isArray(section.content?.productIds) && section.content.productIds.length) {
          mapped.bestDeals = await fetchProductsByIds(section.content.productIds);
        } else if (Array.isArray(section.content?.products)) {
          mapped.bestDeals = section.content.products;
        }
        break;
      case 'promo-tiles':
        if (Array.isArray(section.content?.tiles)) {
          mapped.accessoryTiles = section.content.tiles;
        }
        if (Array.isArray(section.content?.banners)) {
          mapped.promoTiles = section.content.banners;
        }
        break;
      default:
        break;
    }
  }

  return mapped;
};

export const fetchHomepageContent = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/content/page/home`);
    if (!response.ok) throw new Error('Failed to load content');
    const data = await response.json();
    return await mapSections(data.sections || []);
  } catch (error) {
    return { heroSlides, categories, reels, newProducts, bestDeals, promoTiles, accessoryTiles };
  }
};
