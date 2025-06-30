import { ObjectId } from 'mongodb';

export interface Document {
  _id?: ObjectId;
  id?: string;
  name: string;
  type: 'valuation' | 'contract' | 'brochure' | 'report';
  url: string;
  size: number;
  propertyId?: string;
  leadId?: string;
  userId: string;
  createdAt: Date;
}

export interface DocumentCreateInput {
  name: string;
  type: Document['type'];
  url: string;
  size: number;
  propertyId?: string;
  leadId?: string;
  userId: string;
}