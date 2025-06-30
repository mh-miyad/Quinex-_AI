'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Check,
  X,
  Crown,
  Zap,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Headphones,
} from 'lucide-react';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual agents getting started',
      icon: Users,
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        { name: '5 Property listings', included: true },
        { name: '10 Lead contacts', included: true },
        { name: 'Basic AI valuations', included: true },
        { name: 'Email support', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Team collaboration', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
      ],
      cta: 'Start Free',
      highlight: 'Free Forever',
    },
    {
      name: 'Professional',
      description: 'For growing real estate professionals',
      icon: Building2,
      monthlyPrice: 49,
      annualPrice: 39,
      popular: true,
      features: [
        { name: 'Unlimited properties', included: true },
        { name: 'Unlimited leads', included: true },
        { name: 'Advanced AI features', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Document automation', included: true },
        { name: 'Market insights', included: true },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
      ],
      cta: 'Start Free Trial',
      highlight: 'Most Popular',
    },
    {
      name: 'Agency',
      description: 'For teams and real estate agencies',
      icon: Crown,
      monthlyPrice: 149,
      annualPrice: 119,
      popular: false,
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'White-label solution', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
      cta: 'Contact Sales',
      highlight: 'Best Value',
    },
  ];

  const faqs = [
    {
      question: 'How accurate are the AI property valuations?',
      answer: 'Our AI valuation model achieves 95% accuracy across global markets. It\'s trained on millions of property transactions and considers factors like location, size, amenities, market conditions, and comparable sales.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your current billing period.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 14-day free trial for all paid plans. No credit card required. You can explore all features and see how Quinex can transform your real estate business.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.',
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees or hidden costs. The price you see is exactly what you pay. We believe in transparent, straightforward pricing.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing accordingly.',
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 'Free';
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    return `$${price}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null;
    const savings = ((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice * 100).toFixed(0);
    return `Save ${savings}%`;
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="h-4 w-4" />
            <span>Simple, Transparent Pricing</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose Your Perfect Plan
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Start with our free plan and upgrade as your business grows. 
            All plans include our core AI features and 24/7 support.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 bg-white p-2 rounded-full border inline-flex"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.div
              whileTap={{ scale: 0.95 }}
            >
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-black"
              />
            </motion.div>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                Save up to 20%
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                >
                  <Badge className="bg-black text-white px-4 py-1">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {plan.highlight}
                  </Badge>
                </motion.div>
              )}

              <Card className={`h-full relative overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-black shadow-2xl' 
                  : 'border border-gray-200 hover:border-gray-300'
              } transition-all duration-300 group-hover:shadow-xl`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}

                <CardHeader className="text-center space-y-4 pb-8">
                  <motion.div
                    className={`p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center ${
                      plan.popular ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <plan.icon className="h-8 w-8" />
                  </motion.div>

                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="space-y-2">
                    <motion.div
                      className="text-4xl font-bold text-gray-900"
                      key={`${plan.name}-${isAnnual}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {getPrice(plan)}
                      {plan.monthlyPrice > 0 && (
                        <span className="text-lg font-normal text-gray-500">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </motion.div>
                    {isAnnual && getSavings(plan) && (
                      <motion.div
                        className="text-emerald-600 font-medium text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {getSavings(plan)}
                      </motion.div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-black text-white hover:bg-gray-800' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">What's included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature.name}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + featureIndex * 0.05 + 1 }}
                      >
                        <div className={`flex-shrink-0 ${
                          feature.included ? 'text-emerald-600' : 'text-gray-300'
                        }`}>
                          {feature.included ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise Section */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 lg:p-12 mb-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-white" />
              <h3 className="text-3xl font-bold text-white">Enterprise Solutions</h3>
            </div>
            <p className="text-gray-300 text-lg mb-8">
              Need a custom solution for your large organization? We offer enterprise-grade 
              features, dedicated support, and custom integrations.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Users, text: 'Unlimited Users' },
                { icon: Headphones, text: 'Dedicated Support' },
                { icon: Zap, text: 'Custom Features' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center justify-center space-x-2 text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1 + 1.4 }}
                >
                  <feature.icon className="h-5 w-5" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Sales Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">
              Everything you need to know about our pricing and features
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 + 1.8 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Real Estate Business?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of real estate professionals who have already revolutionized 
            their business with Quinex AI-powered platform.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
            </motion.button>
            <motion.button
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}