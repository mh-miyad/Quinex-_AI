import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CloudinaryUploadResult } from './cloudinary';

interface PropertyImage {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
}

interface Property {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

interface Lead {
  id: string;
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
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
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
  };
}

interface Document {
  id: string;
  name: string;
  type: 'valuation' | 'contract' | 'brochure' | 'report';
  url: string;
  size: number;
  createdAt: Date;
  propertyId?: string;
  leadId?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'inactive';
  invitedAt: Date;
  lastActive?: Date;
}

interface EstateStore {
  // Authentication
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Properties
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  
  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  // Documents
  documents: Document[];
  addDocument: (document: Omit<Document, 'id' | 'createdAt'>) => void;
  deleteDocument: (id: string) => void;
  
  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id' | 'invitedAt'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  
  // UI state
  currentView: 'dashboard' | 'properties' | 'leads' | 'valuation' | 'matchmaking' | 'trends' | 'documents' | 'paperwork' | 'campaigns' | 'team' | 'settings' | 'help';
  setCurrentView: (view: EstateStore['currentView']) => void;
  
  // Modals
  modals: {
    addProperty: boolean;
    addLead: boolean;
    leadDetails: string | null;
    propertyDetails: string | null;
  };
  setModal: (modal: keyof EstateStore['modals'], value: boolean | string | null) => void;
}

export const useEstateStore = create<EstateStore>()(
  persist(
    (set, get) => ({
      // Authentication
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email: string, password: string) => {
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user: User = {
          id: '1',
          name: 'John Doe',
          email,
          plan: 'pro',
          subscription: {
            status: 'active',
            expiresAt: new Date('2024-12-31'),
          },
          settings: {
            market: 'new-york',
            currency: 'USD', // Changed to USD
            language: 'en',
            timezone: 'America/New_York',
            theme: 'light',
            notifications: {
              email: true,
              whatsapp: true,
              browser: true,
            },
            integrations: {
              whatsapp: false,
              googleCalendar: false,
            },
          },
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Properties
      properties: [],
      addProperty: (property) => set((state) => ({
        properties: [...state.properties, {
          ...property,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          updatedAt: new Date(),
        }]
      })),
      updateProperty: (id, updates) => set((state) => ({
        properties: state.properties.map(p => 
          p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        )
      })),
      deleteProperty: (id) => set((state) => ({
        properties: state.properties.filter(p => p.id !== id)
      })),
      
      // Leads
      leads: [],
      addLead: (lead) => set((state) => ({
        leads: [...state.leads, {
          ...lead,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        }]
      })),
      updateLead: (id, updates) => set((state) => ({
        leads: state.leads.map(l => 
          l.id === id ? { ...l, ...updates } : l
        )
      })),
      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter(l => l.id !== id)
      })),
      
      // Documents
      documents: [],
      addDocument: (document) => set((state) => ({
        documents: [...state.documents, {
          ...document,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        }]
      })),
      deleteDocument: (id) => set((state) => ({
        documents: state.documents.filter(d => d.id !== id)
      })),
      
      // Team
      teamMembers: [],
      addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, {
          ...member,
          id: Math.random().toString(36).substr(2, 9),
          invitedAt: new Date(),
        }]
      })),
      updateTeamMember: (id, updates) => set((state) => ({
        teamMembers: state.teamMembers.map(m => 
          m.id === id ? { ...m, ...updates } : m
        )
      })),
      removeTeamMember: (id) => set((state) => ({
        teamMembers: state.teamMembers.filter(m => m.id !== id)
      })),
      
      // UI state
      currentView: 'dashboard',
      setCurrentView: (view) => set({ currentView: view }),
      
      // Modals
      modals: {
        addProperty: false,
        addLead: false,
        leadDetails: null,
        propertyDetails: null,
      },
      setModal: (modal, value) => set((state) => ({
        modals: { ...state.modals, [modal]: value }
      })),
    }),
    {
      name: 'quinex-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        properties: state.properties,
        leads: state.leads,
        documents: state.documents,
        teamMembers: state.teamMembers,
      }),
    }
  )
);