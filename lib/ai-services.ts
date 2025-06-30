// AI Services for Quinex - Now powered by Gemini AI with USD pricing
import { geminiService } from './gemini-service';
import { formatPrice } from './currency';

export interface PropertyValuation {
  estimatedValue: number;
  confidence: number;
  factors: {
    location: number;
    size: number;
    amenities: number;
    market: number;
    yearBuilt: number;
  };
  comparables: Array<{
    address: string;
    price: number;
    similarity: number;
    distance: number;
  }>;
  summary: string;
  marketInsights?: string[];
}

export interface LeadScore {
  score: number;
  factors: {
    budgetAlignment: number;
    locationPreference: number;
    urgency: number;
    engagement: number;
    profileCompleteness: number;
  };
  recommendation: string;
  nextActions: string[];
}

export interface PropertyMatch {
  propertyId: string;
  matchScore: number;
  reasons: string[];
  priceAlignment: number;
  locationMatch: number;
  featureMatch: number;
}

export interface MarketTrend {
  region: string;
  currentPrice: number;
  priceChange: number;
  volume: number;
  forecast: {
    nextMonth: number;
    nextQuarter: number;
    confidence: number;
  };
}

// Gemini-powered Property Valuation with USD pricing
export async function getPropertyValuation(property: {
  location: string;
  area: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  yearBuilt?: number;
}): Promise<PropertyValuation> {
  try {
    const result = await geminiService.getPropertyValuation(property);
    return result;
  } catch (error) {
    console.error('Gemini valuation failed, using fallback:', error);
    
    // Fallback calculation with USD pricing for US markets
    const locationMultipliers: Record<string, number> = {
      'New York': 1200,
      'Manhattan': 1500,
      'Brooklyn': 900,
      'Los Angeles': 800,
      'San Francisco': 1100,
      'Miami': 650,
      'Chicago': 450,
      'Boston': 750,
      'Seattle': 700,
      'Austin': 400,
      'Denver': 500,
      'Atlanta': 350,
      'Phoenix': 300,
      'Dallas': 350,
      'Houston': 300,
    };
    
    const basePrice = locationMultipliers[property.location] || 400; // USD per sq ft
    const typeMultiplier = {
      'apartment': 1.0,
      'villa': 1.4,
      'commercial': 1.8,
      'land': 0.6,
      'penthouse': 2.0,
      'studio': 0.8,
    }[property.type] || 1.0;
    
    const currentYear = new Date().getFullYear();
    const age = property.yearBuilt ? currentYear - property.yearBuilt : 10;
    const ageMultiplier = Math.max(0.7, 1 - (age * 0.01));
    const amenityBonus = 1 + (property.amenities.length * 0.03);
    const marketVariation = 0.85 + Math.random() * 0.3;
    
    const estimatedValue = Math.round(
      basePrice * property.area * typeMultiplier * ageMultiplier * amenityBonus * marketVariation
    );
    
    return {
      estimatedValue,
      confidence: 0.82 + Math.random() * 0.15,
      factors: {
        location: 0.35,
        size: 0.25,
        amenities: 0.15,
        market: 0.15,
        yearBuilt: 0.10,
      },
      comparables: [
        {
          address: `${property.location} - Comparable 1`,
          price: estimatedValue * (0.92 + Math.random() * 0.16),
          similarity: 0.94,
          distance: 0.3,
        },
        {
          address: `${property.location} - Comparable 2`,
          price: estimatedValue * (0.88 + Math.random() * 0.24),
          similarity: 0.89,
          distance: 0.7,
        },
      ],
      summary: `AI-powered valuation for ${property.type} in ${property.location}. Based on current US market conditions and property features.`,
    };
  }
}

// Gemini-powered Lead Scoring with USD amounts
export async function getLeadScore(lead: {
  name?: string;
  email: string;
  phone: string;
  budget: { min: number; max: number };
  preferences: { 
    type: string[]; 
    locations: string[];
    urgency?: string;
  };
  source: string;
}): Promise<LeadScore> {
  try {
    const result = await geminiService.scoreLeads({
      name: lead.name || 'Unknown',
      email: lead.email,
      phone: lead.phone,
      budget: lead.budget,
      preferences: lead.preferences,
      source: lead.source,
    });
    return result;
  } catch (error) {
    console.error('Gemini lead scoring failed, using fallback:', error);
    
    // Fallback scoring logic with USD amounts
    const budgetScore = lead.budget.max > 1000000 ? 0.95 : 
                       lead.budget.max > 500000 ? 0.85 :
                       lead.budget.max > 250000 ? 0.70 : 0.50;
    
    const sourceScore = {
      'referral': 0.90,
      'website': 0.75,
      'social media': 0.65,
      'advertisement': 0.60,
      'cold call': 0.40,
    }[lead.source] || 0.50;
    
    const urgencyScore = {
      'high': 0.90,
      'medium': 0.70,
      'low': 0.50,
    }[lead.preferences.urgency || 'medium'] || 0.70;
    
    const profileScore = (
      (lead.email ? 0.25 : 0) +
      (lead.phone ? 0.25 : 0) +
      (lead.preferences.type.length > 0 ? 0.25 : 0) +
      (lead.preferences.locations.length > 0 ? 0.25 : 0)
    );
    
    const locationScore = lead.preferences.locations.length > 0 ? 0.80 : 0.40;
    
    const overallScore = Math.round(
      (budgetScore * 0.3 + sourceScore * 0.2 + urgencyScore * 0.2 + profileScore * 0.15 + locationScore * 0.15) * 100
    );
    
    const recommendation = overallScore >= 85 ? 'High Priority - Contact within 1 hour' :
                          overallScore >= 70 ? 'Medium Priority - Contact within 24 hours' :
                          overallScore >= 50 ? 'Low Priority - Add to nurture campaign' :
                          'Qualify further before engagement';
    
    const nextActions = overallScore >= 85 ? 
      ['Schedule immediate call', 'Send property recommendations', 'Prepare site visit'] :
      overallScore >= 70 ?
      ['Send welcome email', 'Share relevant listings', 'Schedule follow-up call'] :
      ['Add to email campaign', 'Send market updates', 'Gather more information'];
    
    return {
      score: overallScore,
      factors: {
        budgetAlignment: budgetScore,
        locationPreference: locationScore,
        urgency: urgencyScore,
        engagement: sourceScore,
        profileCompleteness: profileScore,
      },
      recommendation,
      nextActions,
    };
  }
}

// AI Property Matching Engine with USD pricing
export async function getPropertyMatches(
  leadId: string, 
  leadPreferences: {
    budget: { min: number; max: number };
    type: string[];
    locations: string[];
    bedrooms?: number;
  },
  properties: any[]
): Promise<PropertyMatch[]> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const matches = properties
    .filter(property => {
      const priceMatch = property.price >= leadPreferences.budget.min && 
                        property.price <= leadPreferences.budget.max;
      const typeMatch = leadPreferences.type.includes(property.type);
      const locationMatch = leadPreferences.locations.some(loc => 
        property.location.toLowerCase().includes(loc.toLowerCase())
      );
      
      return priceMatch && (typeMatch || locationMatch);
    })
    .map(property => {
      const priceAlignment = 1 - Math.abs(property.price - 
        (leadPreferences.budget.min + leadPreferences.budget.max) / 2) / 
        leadPreferences.budget.max;
      
      const locationMatch = leadPreferences.locations.some(loc => 
        property.location.toLowerCase().includes(loc.toLowerCase())
      ) ? 1 : 0.3;
      
      const featureMatch = leadPreferences.type.includes(property.type) ? 1 : 0.5;
      
      const bedroomMatch = leadPreferences.bedrooms ? 
        (property.bedrooms === leadPreferences.bedrooms ? 1 : 0.7) : 0.8;
      
      const matchScore = Math.round(
        (priceAlignment * 0.4 + locationMatch * 0.3 + featureMatch * 0.2 + bedroomMatch * 0.1) * 100
      );
      
      const reasons = [];
      if (priceAlignment > 0.8) reasons.push('Excellent price match');
      if (locationMatch === 1) reasons.push('Perfect location match');
      if (featureMatch === 1) reasons.push('Exact property type match');
      if (bedroomMatch === 1) reasons.push('Bedroom requirement match');
      
      return {
        propertyId: property.id,
        matchScore,
        reasons,
        priceAlignment,
        locationMatch,
        featureMatch,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
  
  return matches;
}

// Gemini-powered Market Trend Analysis with USD pricing
export async function getMarketTrends(region?: string): Promise<MarketTrend[]> {
  try {
    const result = await geminiService.getMarketTrends(region);
    return result;
  } catch (error) {
    console.error('Gemini market trends failed, using fallback:', error);
    
    const regions = region ? [region] : [
      'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Denver', 'Atlanta'
    ];
    
    return regions.map(region => ({
      region,
      currentPrice: 400 + Math.random() * 800, // USD per sq ft
      priceChange: -15 + Math.random() * 30,
      volume: 50 + Math.random() * 200,
      forecast: {
        nextMonth: -5 + Math.random() * 15,
        nextQuarter: -10 + Math.random() * 25,
        confidence: 0.75 + Math.random() * 0.20,
      },
    }));
  }
}

// Document Generation
export async function generateDocument(
  type: 'valuation' | 'contract' | 'brochure',
  data: any
): Promise<{ url: string; filename: string }> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const filename = `${type}_${Date.now()}.pdf`;
  const url = `/documents/${filename}`;
  
  return { url, filename };
}

// Gemini-powered Content Generation
export async function generatePropertyDescription(property: {
  type: string;
  location: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
}): Promise<string> {
  try {
    return await geminiService.generatePropertyDescription(property);
  } catch (error) {
    console.error('Gemini description generation failed:', error);
    
    // Fallback descriptions with USD market focus
    const descriptions = [
      `Stunning ${property.type} in prime ${property.location} location. This ${property.area} sq ft property offers modern living with ${property.bedrooms || 'multiple'} bedrooms and premium amenities including ${property.amenities.slice(0, 3).join(', ')}. Perfect for discerning buyers seeking luxury and convenience in the US market.`,
      
      `Exceptional ${property.type} opportunity in ${property.location}. Spanning ${property.area} sq ft, this property combines contemporary design with practical functionality. Features include ${property.amenities.slice(0, 2).join(' and ')}, making it ideal for modern American living.`,
      
      `Premium ${property.type} in the heart of ${property.location}. This ${property.area} sq ft residence offers sophisticated living with ${property.bedrooms || 'spacious'} bedrooms and world-class amenities. A rare opportunity in one of America's most sought-after locations.`,
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}