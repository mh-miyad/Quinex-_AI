import { ObjectId } from 'mongodb';

export interface TeamMember {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  role: 'viewer' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'inactive';
  invitedBy: string;
  organizationId: string;
  invitedAt: Date;
  lastActive?: Date;
}

export interface TeamMemberCreateInput {
  name: string;
  email: string;
  role: TeamMember['role'];
  status?: TeamMember['status'];
  invitedBy: string;
  organizationId: string;
}