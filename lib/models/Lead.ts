import { ObjectId } from 'mongodb';

export interface Lead {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  phone: string;
  budget: {
    min: number;
    max: number;
  };
  preferences: {
    type: string[];
    locations: string[];
    bedrooms?: number;
    urgency?: 'low' | 'medium' | 'high';
  };
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  notes: string[];
  lastContact?: Date;
  nextFollowUp?: Date;
  contact?: {
    preferredTime?: string;
    preferredMethod?: string;
    language?: string;
  };
  demographics?: {
    age?: string;
    occupation?: string;
    income?: string;
    familySize?: string;
  };
  requirements?: {
    moveInDate?: string;
    financing?: string;
    purpose?: string;
    timeline?: string;
  };
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LeadCreateInput {
  name: string;
  email: string;
  phone: string;
  budget: Lead['budget'];
  preferences: Lead['preferences'];
  score?: number;
  status?: Lead['status'];
  source: string;
  notes?: string[];
  contact?: Lead['contact'];
  demographics?: Lead['demographics'];
  requirements?: Lead['requirements'];
  userId: string;
}

export interface LeadUpdateInput extends Partial<LeadCreateInput> {
  updatedAt: Date;
}