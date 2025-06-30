"use client";

import { PublicHeader } from "@/components/layout/public-header";
import { useEstateStore } from "@/lib/store";

import { DashboardApp } from "@/components/dashboard/dashboard-app";
import { FeaturesSection } from "@/components/publicComp/features-section";
import { Footer } from "@/components/publicComp/footer";
import { HeroSection } from "@/components/publicComp/hero-section";
import { PricingSection } from "@/components/publicComp/pricing-section";
import { TestimonialsSection } from "@/components/publicComp/testimonials-section";

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
