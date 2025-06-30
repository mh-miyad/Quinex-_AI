export const SUPPORTED_MARKETS = {
  'new-york': {
    name: 'New York, USA',
    currency: 'USD',
    pricePerSqFt: 1200,
    timezone: 'America/New_York',
  },
  'london': {
    name: 'London, UK',
    currency: 'GBP',
    pricePerSqFt: 800,
    timezone: 'Europe/London',
  },
  'dubai': {
    name: 'Dubai, UAE',
    currency: 'AED',
    pricePerSqFt: 1000,
    timezone: 'Asia/Dubai',
  },
  'toronto': {
    name: 'Toronto, Canada',
    currency: 'CAD',
    pricePerSqFt: 900,
    timezone: 'America/Toronto',
  },
  'sydney': {
    name: 'Sydney, Australia',
    currency: 'AUD',
    pricePerSqFt: 1100,
    timezone: 'Australia/Sydney',
  },
  'paris': {
    name: 'Paris, France',
    currency: 'EUR',
    pricePerSqFt: 950,
    timezone: 'Europe/Paris',
  },
  'tokyo': {
    name: 'Tokyo, Japan',
    currency: 'JPY',
    pricePerSqFt: 85000,
    timezone: 'Asia/Tokyo',
  },
  'singapore': {
    name: 'Singapore',
    currency: 'SGD',
    pricePerSqFt: 1300,
    timezone: 'Asia/Singapore',
  },
  'riyadh': {
    name: 'Riyadh, Saudi Arabia',
    currency: 'SAR',
    pricePerSqFt: 1150,
    timezone: 'Asia/Riyadh',
  },
  'stockholm': {
    name: 'Stockholm, Sweden',
    currency: 'SEK',
    pricePerSqFt: 8500,
    timezone: 'Europe/Stockholm',
  },
  'doha': {
    name: 'Doha, Qatar',
    currency: 'QAR',
    pricePerSqFt: 1400,
    timezone: 'Asia/Qatar',
  },
};

export const DEFAULT_SETTINGS = {
  market: 'new-york',
  currency: 'USD',
  language: 'en',
  timezone: 'America/New_York',
  theme: 'light',
  compactMode: false,
  highContrast: false,
  analytics: true,
  marketing: false,
  notifications: {
    email: true,
    whatsapp: false,
    browser: true,
  },
  automation: {
    aiAssistant: false,
    propertyValuation: false,
    leadScoring: false,
    documentGeneration: false,
    emailAutomation: false,
  },
  aiConfig: {
    provider: 'openai',
    model: 'gpt-4o',
    responseStyle: 'professional',
    confidenceThreshold: 0.7,
    learningMode: true,
    openai: {
      apiKey: '',
    },
    anthropic: {
      apiKey: '',
    },
    custom: {
      baseUrl: '',
      apiKey: '',
    },
  },
};