import { ObjectId } from 'mongodb';

export interface PropertyImage {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
}

export interface Property {
  _id?: ObjectId;
  id?: string;
  title: string;
  price: number;
  location: string;
  type: 'apartment' | 'villa' | 'commercial' | 'land' | 'penthouse' | 'studio';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  status: 'active' | 'sold' | 'rented' | 'draft';
  images: PropertyImage[];
  description: string;
  amenities: string[];
  aiValuation?: number;
  confidence?: number;
  yearBuilt?: number;
  features?: {
    parking?: boolean;
    furnished?: boolean;
    petFriendly?: boolean;
    garden?: boolean;
    balcony?: boolean;
    elevator?: boolean;
  };
  contact?: {
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
  };
  legal?: {
    propertyId?: string;
    registrationNumber?: string;
    approvals?: string[];
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyCreateInput {
  title: string;
  price: number;
  location: string;
  type: Property['type'];
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  status?: Property['status'];
  images?: PropertyImage[];
  description?: string;
  amenities?: string[];
  aiValuation?: number;
  confidence?: number;
  yearBuilt?: number;
  features?: Property['features'];
  contact?: Property['contact'];
  legal?: Property['legal'];
  userId: string;
}

export interface PropertyUpdateInput extends Partial<PropertyCreateInput> {
  updatedAt: Date;
}