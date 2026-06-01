// Small helpers to parse values that may be numbers or strings like "Rp104".
// `formatCurrency` accepts a number or a string and returns a localized
// JOD representation based on the selected language.
export const isNumericLike = (value) => {
  if (value == null) return false;
  if (typeof value === 'number' && Number.isFinite(value)) return true;
  if (typeof value !== 'string') return false;
  return /[0-9]/.test(value);
};

// Parse a numeric value from strings like "Rp104", "104,50", "104.50".
// Returns NaN when parsing fails.
const parseNumeric = (value) => {
  if (value == null) return NaN;
  if (typeof value === 'number') return value;

  // Remove currency letters and symbols, keep digits, dots and commas
  const cleaned = String(value).replace(/[^0-9.,-]/g, '').trim();
  if (!cleaned) return NaN;

  // If contains both comma and dot, assume dot is decimal if dot occurs after comma
  if (cleaned.indexOf('.') > -1 && cleaned.indexOf(',') > -1) {
    // remove commas
    return parseFloat(cleaned.replace(/,/g, ''));
  }

  // If contains comma only, treat comma as decimal separator
  if (cleaned.indexOf('.') === -1 && cleaned.indexOf(',') > -1) {
    return parseFloat(cleaned.replace(/,/g, '.'));
  }

  return parseFloat(cleaned);
};

export function formatCurrency(value, lang = 'en') {
  const number = parseNumeric(value);
  if (Number.isNaN(number)) {
    return String(value || '');
  }

  const hasFraction = Math.abs(number % 1) > 1e-6;
  const options = {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  };

  if (lang === 'en') {
    // English: prefix with `JOD `
    const formatted = new Intl.NumberFormat('en-US', options).format(number);
    return `JOD ${formatted}`;
  }

  // Arabic: append Arabic Jordanian Dinar symbol and use Arabic numerals formatting
  const formattedArab = new Intl.NumberFormat('ar-EG', options).format(number);
  return `${formattedArab} د.ا`;
}

export function formatIfPrice(value, lang = 'en') {
  return isNumericLike(value) ? formatCurrency(value, lang) : value;
}

export default formatCurrency;
