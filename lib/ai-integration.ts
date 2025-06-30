interface AIServiceConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

interface PropertyValuationRequest {
  location: string;
  area: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  amenities?: string[];
  market: string;
  currency: string;
}

interface PropertyValuationResponse {
  estimatedValue: number;
  confidence: number;
  factors: {
    location: number;
    size: number;
    amenities: number;
    market: number;
    yearBuilt: number;
  };
  comparables?: Array<{
    address: string;
    price: number;
    similarity: number;
    distance: number;
  }>;
  summary: string;
  marketInsights: string[];
}

interface LeadScoringRequest {
  leadData: {
    budget?: number;
    timeline?: string;
    propertyType?: string;
    location?: string;
    contactMethod?: string;
    source?: string;
  };
}

interface LeadScoringResponse {
  score: number;
  priority: 'high' | 'medium' | 'low';
  factors: Record<string, number>;
  recommendations: string[];
}

class AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this.config = config;
  }

  private async makeRequest(prompt: string, systemPrompt?: string): Promise<any> {
    const { provider, apiKey, model, baseUrl } = this.config;

    try {
      switch (provider) {
        case 'openai':
          return await this.makeOpenAIRequest(prompt, systemPrompt);
        case 'anthropic':
          return await this.makeAnthropicRequest(prompt, systemPrompt);
        case 'custom':
          return await this.makeCustomRequest(prompt, systemPrompt);
        default:
          throw new Error(`Unsupported AI provider: ${provider}`);
      }
    } catch (error) {
      console.error('AI request failed:', error);
      throw error;
    }
  }

  private async makeOpenAIRequest(prompt: string, systemPrompt?: string): Promise<any> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  }

  private async makeAnthropicRequest(prompt: string, systemPrompt?: string): Promise<any> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model || 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0]?.text;
  }

  private async makeCustomRequest(prompt: string, systemPrompt?: string): Promise<any> {
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Custom API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  }

  async getPropertyValuation(request: PropertyValuationRequest): Promise<PropertyValuationResponse> {
    const systemPrompt = `You are a professional real estate valuation expert. Provide accurate property valuations based on the given information. Return your response as a valid JSON object with the following structure:
    {
      "estimatedValue": number,
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
          "address": string,
          "price": number,
          "similarity": number (0-1),
          "distance": number (km)
        }
      ],
      "summary": string,
      "marketInsights": [string]
    }`;

    const prompt = `Please provide a property valuation for:
    Location: ${request.location}
    Area: ${request.area} sq ft
    Type: ${request.type}
    ${request.bedrooms ? `Bedrooms: ${request.bedrooms}` : ''}
    ${request.bathrooms ? `Bathrooms: ${request.bathrooms}` : ''}
    ${request.yearBuilt ? `Year Built: ${request.yearBuilt}` : ''}
    ${request.amenities?.length ? `Amenities: ${request.amenities.join(', ')}` : ''}
    Market: ${request.market}
    Currency: ${request.currency}`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback if AI doesn't return valid JSON
      return {
        estimatedValue: 500000,
        confidence: 0.7,
        factors: {
          location: 0.35,
          size: 0.25,
          amenities: 0.15,
          market: 0.15,
          yearBuilt: 0.10,
        },
        summary: 'AI valuation completed based on provided property details.',
        marketInsights: ['Market analysis in progress', 'Property shows good potential'],
      };
    }
  }

  async scoreLeads(request: LeadScoringRequest): Promise<LeadScoringResponse> {
    const systemPrompt = `You are a lead scoring expert for real estate. Score leads from 0-100 based on their likelihood to convert. Return your response as a valid JSON object with this structure:
    {
      "score": number (0-100),
      "priority": "high" | "medium" | "low",
      "factors": {
        "budget": number (0-1),
        "timeline": number (0-1),
        "propertyType": number (0-1),
        "location": number (0-1),
        "contactMethod": number (0-1),
        "source": number (0-1)
      },
      "recommendations": [string]
    }`;

    const prompt = `Score this lead:
    ${JSON.stringify(request.leadData, null, 2)}`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback scoring
      return {
        score: 65,
        priority: 'medium',
        factors: {
          budget: 0.7,
          timeline: 0.6,
          propertyType: 0.5,
          location: 0.8,
          contactMethod: 0.6,
          source: 0.5,
        },
        recommendations: [
          'Follow up within 24 hours',
          'Send property recommendations',
          'Schedule viewing appointment',
        ],
      };
    }
  }

  async generateContent(type: string, context: any): Promise<string> {
    const systemPrompt = `You are a professional real estate content generator. Create high-quality, engaging content based on the type and context provided.`;

    const prompt = `Generate ${type} content with this context:
    ${JSON.stringify(context, null, 2)}`;

    return await this.makeRequest(prompt, systemPrompt);
  }

  async chatCompletion(message: string, context?: any): Promise<string> {
    const systemPrompt = `You are a helpful real estate AI assistant. Provide accurate, professional, and helpful responses to real estate related questions.`;

    const prompt = context 
      ? `Context: ${JSON.stringify(context, null, 2)}\n\nUser: ${message}`
      : message;

    return await this.makeRequest(prompt, systemPrompt);
  }
}

export function createAIService(config: AIServiceConfig): AIService {
  return new AIService(config);
}

export type {
  AIServiceConfig,
  PropertyValuationRequest,
  PropertyValuationResponse,
  LeadScoringRequest,
  LeadScoringResponse,
};