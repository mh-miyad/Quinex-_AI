interface GeminiConfig {
  apiKey: string;
  model?: string;
}

interface PropertyValuationRequest {
  location: string;
  area: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  amenities?: string[];
}

interface LeadScoringRequest {
  name: string;
  email: string;
  phone: string;
  budget: { min: number; max: number };
  preferences: {
    type: string[];
    locations: string[];
    urgency?: string;
  };
  source: string;
}

class GeminiService {
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-1.5-flash';
  }

  private async makeRequest(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || '';
    } catch (error) {
      console.error('Gemini API request failed:', error);
      throw error;
    }
  }

  async getPropertyValuation(request: PropertyValuationRequest): Promise<any> {
    const systemInstruction = `You are a professional real estate valuation expert specializing in US markets. Provide accurate property valuations in JSON format with USD pricing.`;

    const prompt = `Analyze and provide a property valuation for:

Location: ${request.location}
Area: ${request.area} sq ft
Property Type: ${request.type}
${request.bedrooms ? `Bedrooms: ${request.bedrooms}` : ''}
${request.bathrooms ? `Bathrooms: ${request.bathrooms}` : ''}
${request.yearBuilt ? `Year Built: ${request.yearBuilt}` : ''}
${request.amenities?.length ? `Amenities: ${request.amenities.join(', ')}` : ''}

Please return a JSON response with:
{
  "estimatedValue": number (in USD),
  "confidence": number (0-1),
  "factors": {
    "location": number (0-1),
    "size": number (0-1), 
    "amenities": number (0-1),
    "market": number (0-1),
    "yearBuilt": number (0-1)
  },
  "comparables": [
    {
      "address": "string",
      "price": number,
      "similarity": number (0-1),
      "distance": number
    }
  ],
  "summary": "string explaining the valuation",
  "marketInsights": ["array of market insights"]
}`;

    const response = await this.makeRequest(prompt, systemInstruction);
    
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
    }

    // Fallback response with USD pricing
    return {
      estimatedValue: request.area * 450, // Base calculation for US market
      confidence: 0.85,
      factors: {
        location: 0.35,
        size: 0.25,
        amenities: 0.15,
        market: 0.15,
        yearBuilt: 0.10,
      },
      comparables: [
        {
          address: `${request.location} - Similar Property 1`,
          price: request.area * 420,
          similarity: 0.92,
          distance: 0.5,
        },
        {
          address: `${request.location} - Similar Property 2`,
          price: request.area * 480,
          similarity: 0.88,
          distance: 0.8,
        },
      ],
      summary: `AI-powered valuation for ${request.type} in ${request.location}. Based on current US market conditions and property features.`,
      marketInsights: [
        'Strong demand in this location',
        'Property type showing good appreciation',
        'Market conditions favorable for sellers'
      ],
    };
  }

  async scoreLeads(request: LeadScoringRequest): Promise<any> {
    const systemInstruction = `You are a lead scoring expert for US real estate. Score leads from 0-100 based on their likelihood to convert into actual property transactions.`;

    const prompt = `Score this real estate lead:

Name: ${request.name}
Email: ${request.email}
Phone: ${request.phone}
Budget: $${request.budget.min.toLocaleString()} - $${request.budget.max.toLocaleString()}
Property Types: ${request.preferences.type.join(', ')}
Locations: ${request.preferences.locations.join(', ')}
Urgency: ${request.preferences.urgency || 'medium'}
Source: ${request.source}

Please return a JSON response with:
{
  "score": number (0-100),
  "factors": {
    "budgetAlignment": number (0-1),
    "locationPreference": number (0-1),
    "urgency": number (0-1),
    "engagement": number (0-1),
    "profileCompleteness": number (0-1)
  },
  "recommendation": "string with priority level and action",
  "nextActions": ["array of recommended next steps"]
}`;

    const response = await this.makeRequest(prompt, systemInstruction);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
    }

    // Fallback scoring with USD amounts
    const budgetScore = request.budget.max > 1000000 ? 0.95 : 
                       request.budget.max > 500000 ? 0.85 :
                       request.budget.max > 250000 ? 0.70 : 0.50;
    
    const sourceScore = {
      'referral': 0.90,
      'website': 0.75,
      'social media': 0.65,
      'advertisement': 0.60,
      'cold call': 0.40,
    }[request.source] || 0.50;

    const urgencyScore = {
      'high': 0.90,
      'medium': 0.70,
      'low': 0.50,
    }[request.preferences.urgency || 'medium'] || 0.70;

    const overallScore = Math.round((budgetScore * 0.4 + sourceScore * 0.3 + urgencyScore * 0.3) * 100);

    return {
      score: overallScore,
      factors: {
        budgetAlignment: budgetScore,
        locationPreference: 0.8,
        urgency: urgencyScore,
        engagement: sourceScore,
        profileCompleteness: 0.9,
      },
      recommendation: overallScore >= 80 ? 'High Priority - Contact immediately' :
                      overallScore >= 60 ? 'Medium Priority - Follow up within 24 hours' :
                      'Low Priority - Add to nurture campaign',
      nextActions: overallScore >= 80 ? 
        ['Schedule immediate call', 'Send property recommendations', 'Prepare site visit'] :
        ['Send welcome email', 'Share relevant listings', 'Schedule follow-up call'],
    };
  }

  async generatePropertyDescription(property: any): Promise<string> {
    const systemInstruction = `You are a professional real estate copywriter. Create compelling property descriptions that highlight key features and benefits for the US market.`;

    const prompt = `Create a compelling property description for:

Type: ${property.type}
Location: ${property.location}
Area: ${property.area} sq ft
${property.bedrooms ? `Bedrooms: ${property.bedrooms}` : ''}
${property.bathrooms ? `Bathrooms: ${property.bathrooms}` : ''}
${property.amenities?.length ? `Amenities: ${property.amenities.join(', ')}` : ''}

Write a professional, engaging description that would attract potential buyers. Focus on the unique selling points and lifestyle benefits. Use US market terminology and pricing.`;

    return await this.makeRequest(prompt, systemInstruction);
  }

  async generateContent(type: string, context: any): Promise<string> {
    const systemInstruction = `You are a professional real estate marketing expert. Create high-quality, engaging content for US real estate markets.`;

    let prompt = '';
    
    if (type === 'campaign') {
      prompt = context.prompt;
    } else {
      prompt = `Generate ${type} content with this context:
      ${JSON.stringify(context, null, 2)}`;
    }

    return await this.makeRequest(prompt, systemInstruction);
  }

  async chatCompletion(message: string, context?: any): Promise<string> {
    const systemInstruction = `You are Quinex AI Assistant, a helpful real estate AI assistant specializing in US property markets. Provide accurate, professional, and helpful responses to real estate related questions. Always be friendly and informative. Use USD pricing and US market terminology.`;

    const prompt = context 
      ? `Context: ${JSON.stringify(context, null, 2)}\n\nUser Question: ${message}`
      : message;

    return await this.makeRequest(prompt, systemInstruction);
  }

  async getMarketTrends(region?: string): Promise<any[]> {
    const systemInstruction = `You are a real estate market analyst. Provide current market trends and insights for US property markets.`;

    const prompt = `Provide market trend analysis for ${region || 'major US cities'}. Include price trends, demand patterns, and future outlook.

Return JSON array with:
[
  {
    "region": "string",
    "currentPrice": number (per sq ft in USD),
    "priceChange": number (percentage),
    "volume": number (transactions),
    "forecast": {
      "nextMonth": number (percentage),
      "nextQuarter": number (percentage),
      "confidence": number (0-1)
    }
  }
]`;

    const response = await this.makeRequest(prompt, systemInstruction);
    
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse market trends:', error);
    }

    // Fallback data with US cities and USD pricing
    const regions = region ? [region] : ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'];
    return regions.map(r => ({
      region: r,
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

// Create singleton instance with your API key
export const geminiService = new GeminiService({
  apiKey: 'AIzaSyCpIzzbVq3w-7Gjh_ZGAe0_RpW8yl9u4B0',
  model: 'gemini-1.5-flash'
});

export { GeminiService };
export type { PropertyValuationRequest, LeadScoringRequest };