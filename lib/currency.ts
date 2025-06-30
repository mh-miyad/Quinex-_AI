const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  CHF: 'CHF',
  SGD: 'S$',
  SAR: 'ر.س',
  SEK: 'kr',
  QAR: 'ر.ق',
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  AED: 'UAE Dirham',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  SGD: 'Singapore Dollar',
  SAR: 'Saudi Riyal',
  SEK: 'Swedish Krona',
  QAR: 'Qatari Riyal',
};

export function formatPrice(amount: number, currency: string = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  
  // Format based on currency and amount
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}K`;
  }
  
  // For most currencies, format with appropriate decimal places
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return `${symbol}${formatted}`;
}

export function parsePriceString(priceString: string): number {
  // Remove currency symbols and commas, then parse
  const cleaned = priceString.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || '$';
}

export function getCurrencyName(currency: string): string {
  return CURRENCY_NAMES[currency] || 'US Dollar';
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates?: Record<string, number>
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // If no exchange rates provided, return original amount
  // In a real app, you'd fetch current exchange rates from an API
  if (!exchangeRates) {
    return amount;
  }
  
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  return (amount / fromRate) * toRate;
}

export const SUPPORTED_CURRENCIES = Object.keys(CURRENCY_SYMBOLS);