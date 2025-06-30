import { ObjectId } from 'mongodb';

export interface Contact {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  assignedTo?: string;
  notes?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
}

export interface ContactCreateInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType?: string;
}

export interface NewsletterSubscriber {
  _id?: ObjectId;
  id?: string;
  email: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: Date;
  unsubscribedAt?: Date;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  preferences?: {
    frequency?: 'daily' | 'weekly' | 'monthly';
    topics?: string[];
  };
}