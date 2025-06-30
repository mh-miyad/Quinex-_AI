'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { PropertyValuation } from '@/components/valuation/property-valuation';
import { PropertyList } from '@/components/properties/property-list';
import { LeadsDashboard } from '@/components/leads/leads-dashboard';
import { PropertyMatchmaking } from '@/components/matchmaking/property-matchmaking';
import { MarketTrends } from '@/components/trends/market-trends';
import { DocumentsPage } from '@/components/documents/documents-page';
import { AutoPaperwork } from '@/components/documents/auto-paperwork';
import { AICampaignAssistant } from '@/components/campaigns/ai-campaign-assistant';
import { TeamManagement } from '@/components/team/team-management';
import { SettingsPage } from '@/components/settings/settings-page';
import { HelpCenter } from '@/components/help/help-center';
import { AIAssistant } from '@/components/ai/ai-assistant';
import { useEstateStore } from '@/lib/store';
import { formatPrice } from '@/lib/currency';
import { cn } from '@/lib/utils';

// Initialize demo data with USD pricing
const initializeDemoData = () => {
  const properties = [
    {
      title: 'Luxury Penthouse in Manhattan',
      price: 2500000, // $2.5M
      location: 'Manhattan, New York',
      type: 'penthouse' as const,
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      status: 'active' as const,
      images: [],
      description: 'Stunning 4-bedroom penthouse with panoramic city views, modern amenities, private terrace, and excellent connectivity to business districts.',
      amenities: ['City Views', 'Private Terrace', 'Concierge', 'Gym', 'Parking'],
      aiValuation: 2450000,
      confidence: 0.92,
      yearBuilt: 2018,
    },
    {
      title: 'Modern Apartment in Miami Beach',
      price: 850000, // $850K
      location: 'Miami Beach, Florida',
      type: 'apartment' as const,
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      status: 'active' as const,
      images: [],
      description: 'Contemporary 3-bedroom apartment with ocean views, premium finishes, and world-class amenities.',
      amenities: ['Ocean Views', 'Pool', 'Gym', 'Security', 'Beach Access'],
      aiValuation: 820000,
      confidence: 0.89,
      yearBuilt: 2020,
    },
    {
      title: 'Commercial Space in Downtown Chicago',
      price: 1200000, // $1.2M
      location: 'Downtown Chicago, Illinois',
      type: 'commercial' as const,
      area: 3200,
      status: 'active' as const,
      images: [],
      description: 'Prime commercial space in financial district, perfect for corporate headquarters and professional services.',
      amenities: ['Prime Location', '24/7 Access', 'Conference Rooms', 'Parking'],
      aiValuation: 1150000,
      confidence: 0.95,
      yearBuilt: 2019,
    },
  ];

  const leads = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 555-123-4567',
      budget: { min: 800000, max: 1500000 }, // $800K - $1.5M
      preferences: {
        type: ['penthouse', 'apartment'],
        locations: ['Manhattan', 'Brooklyn'],
        bedrooms: 3,
        urgency: 'high' as const,
      },
      score: 87,
      status: 'new' as const,
      source: 'website',
      notes: ['Interested in luxury properties', 'Prefers modern amenities'],
    },
    {
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@business.com',
      phone: '+1 555-234-5678',
      budget: { min: 600000, max: 1200000 }, // $600K - $1.2M
      preferences: {
        type: ['apartment'],
        locations: ['Miami Beach', 'Downtown Miami'],
        bedrooms: 2,
        urgency: 'medium' as const,
      },
      score: 72,
      status: 'contacted' as const,
      source: 'referral',
      notes: ['Looking for investment property'],
    },
    {
      name: 'Emma Thompson',
      email: 'emma.thompson@company.com',
      phone: '+1 555-345-6789',
      budget: { min: 500000, max: 900000 }, // $500K - $900K
      preferences: {
        type: ['apartment', 'commercial'],
        locations: ['Chicago', 'Downtown Chicago'],
        urgency: 'low' as const,
      },
      score: 65,
      status: 'qualified' as const,
      source: 'social media',
      notes: ['First-time buyer', 'Needs financing guidance'],
    },
  ];

  return { properties, leads };
};

export function DashboardApp() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentView, properties, leads, addProperty, addLead } = useEstateStore();

  // Initialize demo data on first load
  useEffect(() => {
    if (properties.length === 0 && leads.length === 0) {
      const { properties: demoProperties, leads: demoLeads } = initializeDemoData();
      
      demoProperties.forEach(property => addProperty(property));
      demoLeads.forEach(lead => addLead(lead));
    }
  }, [properties.length, leads.length, addProperty, addLead]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'valuation':
        return <PropertyValuation />;
      case 'properties':
        return <PropertyList />;
      case 'leads':
        return <LeadsDashboard />;
      case 'matchmaking':
        return <PropertyMatchmaking />;
      case 'trends':
        return <MarketTrends />;
      case 'documents':
        return <DocumentsPage />;
      case 'paperwork':
        return <AutoPaperwork />;
      case 'campaigns':
        return <AICampaignAssistant />;
      case 'team':
        return <TeamManagement />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpCenter />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        className={cn(
          "hidden lg:flex",
          isMobileMenuOpen && "flex"
        )}
      />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-auto">
          <div className=" mx-auto p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}