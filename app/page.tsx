'use client';

import { useEffect } from 'react';
import { useEstateStore } from '@/lib/store';
import { PublicHeader } from '@/components/layout/public-header';
import { HeroSection } from '@/components/public/hero-section';
import { FeaturesSection } from '@/components/public/features-section';
import { TestimonialsSection } from '@/components/public/testimonials-section';
import { PricingSection } from '@/components/public/pricing-section';
import { Footer } from '@/components/public/footer';
import { DashboardApp } from '@/components/dashboard/dashboard-app';

export default function Home() {
  const { isAuthenticated } = useEstateStore();

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return <DashboardApp />;
  }

  // Otherwise show public homepage
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}