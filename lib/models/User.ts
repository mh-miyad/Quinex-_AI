import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'agency';
  subscription?: {
    status: 'active' | 'cancelled' | 'expired';
    expiresAt: Date;
    stripeCustomerId?: string;
  };
  settings: {
    market: string;
    currency: string;
    language: string;
    timezone: string;
    theme: string;
    notifications: {
      email: boolean;
      whatsapp: boolean;
      browser: boolean;
    };
    integrations: {
      whatsapp: boolean;
      googleCalendar: boolean;
    };
    automation?: {
      aiAssistant?: boolean;
      propertyValuation?: boolean;
      leadScoring?: boolean;
      documentGeneration?: boolean;
      emailAutomation?: boolean;
    };
    aiConfig?: {
      provider?: string;
      model?: string;
      responseStyle?: string;
      confidenceThreshold?: number;
      learningMode?: boolean;
      openai?: {
        apiKey?: string;
      };
      anthropic?: {
        apiKey?: string;
      };
      custom?: {
        baseUrl?: string;
        apiKey?: string;
      };
    };
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  plan?: User['plan'];
  settings?: Partial<User['settings']>;
}

export interface UserUpdateInput extends Partial<UserCreateInput> {
  updatedAt: Date;
}