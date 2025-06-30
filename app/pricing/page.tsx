"use client";

import { PublicHeader } from "@/components/layout/public-header";
import { motion } from "framer-motion";
import { useState } from "react";

import { Footer } from "@/components/publicComp/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Building2,
  Calculator,
  Check,
  Crown,
  FileText,
  Headphones,
  MessageSquare,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual agents getting started",
      monthlyPrice: 29,
      annualPrice: 290,
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Up to 50 properties",
        "Basic AI valuations",
        "Lead management",
        "Email support",
        "Mobile app access",
        "Basic analytics",
        "Document templates",
        "1 team member",
      ],
      limitations: [
        "Limited AI features",
        "Basic reporting",
        "Email support only",
      ],
    },
    {
      name: "Professional",
      description: "For growing agencies and teams",
      monthlyPrice: 79,
      annualPrice: 790,
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        "Unlimited properties",
        "Advanced AI valuations",
        "Smart lead scoring",
        "Property matchmaking",
        "WhatsApp integration",
        "Advanced analytics",
        "Custom documents",
        "Up to 10 team members",
        "Priority support",
        "API access",
        "Custom branding",
        "Market insights",
      ],
      limitations: [],
    },
    {
      name: "Enterprise",
      description: "For large agencies and organizations",
      monthlyPrice: 199,
      annualPrice: 1990,
      icon: Building2,
      color: "from-gray-700 to-gray-900",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Custom AI training",
        "Advanced security",
        "SLA guarantee",
        "24/7 phone support",
        "Custom workflows",
        "Multi-office support",
        "Advanced permissions",
      ],
      limitations: [],
      custom: true,
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial for all plans. No credit card required to start.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes, we offer special pricing for registered non-profit organizations. Contact our sales team for details.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time. Your account will remain active until the end of your billing period.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use enterprise-grade security with 256-bit SSL encryption, regular backups, and SOC 2 compliance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Star className="h-4 w-4" />
                Trusted by 10,000+ real estate professionals
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Simple, transparent{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  pricing
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Choose the perfect plan for your real estate business. Start
                with a 14-day free trial, no credit card required.
              </p>

              {/* Billing Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4 mb-12"
              >
                <span
                  className={`text-sm font-medium ${
                    !isAnnual ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-black"
                />
                <span
                  className={`text-sm font-medium ${
                    isAnnual ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  Annual
                </span>
                <Badge className="bg-green-100 text-green-800 ml-2">
                  Save 20%
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                const savings = plan.monthlyPrice * 12 - plan.annualPrice;

                return (
                  <motion.div
                    key={plan.name}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      >
                        <Badge className="bg-black text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </motion.div>
                    )}

                    <Card
                      className={`h-full ${
                        plan.popular
                          ? "ring-2 ring-black shadow-2xl"
                          : "shadow-lg"
                      } hover:shadow-xl transition-all duration-300`}
                    >
                      <CardHeader className="text-center pb-8">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>

                        <CardTitle className="text-2xl font-bold">
                          {plan.name}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">{plan.description}</p>

                        <div className="mt-6">
                          {plan.custom ? (
                            <div className="text-4xl font-bold">Custom</div>
                          ) : (
                            <>
                              <div className="text-4xl font-bold">
                                ${price}
                                <span className="text-lg font-normal text-gray-500">
                                  /{isAnnual ? "year" : "month"}
                                </span>
                              </div>
                              {isAnnual && savings > 0 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-sm text-green-600 mt-1"
                                >
                                  Save ${savings}/year
                                </motion.div>
                              )}
                            </>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className={`w-full mb-8 ${
                              plan.popular
                                ? "bg-black hover:bg-gray-800 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                            }`}
                          >
                            {plan.custom ? "Contact Sales" : "Start Free Trial"}
                          </Button>
                        </motion.div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">{`What's included:`}</h4>
                          <ul className="space-y-3">
                            {plan.features.map((feature, featureIndex) => (
                              <motion.li
                                key={feature}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Compare features across all plans and find the perfect fit for
                your business
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Calculator,
                  title: "AI Valuations",
                  description:
                    "Get instant property valuations powered by machine learning",
                },
                {
                  icon: Users,
                  title: "Lead Management",
                  description:
                    "Smart CRM with automated lead scoring and follow-ups",
                },
                {
                  icon: TrendingUp,
                  title: "Market Analytics",
                  description:
                    "Real-time market trends and investment insights",
                },
                {
                  icon: FileText,
                  title: "Document Automation",
                  description:
                    "Generate contracts and legal documents automatically",
                },
                {
                  icon: MessageSquare,
                  title: "Communication Hub",
                  description: "Integrated messaging with WhatsApp and email",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level security with SOC 2 compliance",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  description:
                    "Round-the-clock support from real estate experts",
                },
                {
                  icon: Building2,
                  title: "Multi-Office",
                  description:
                    "Manage multiple offices and teams from one platform",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center"
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing and plans
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Ready to transform your real estate business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful agents and agencies using Quinex to
                close more deals
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg">
                  Start Your Free Trial
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
