'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote, TrendingUp, Users, Building2 } from 'lucide-react';

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Real Estate Agent',
      company: 'Manhattan Properties',
      location: 'New York, USA',
      avatar: 'SJ',
      rating: 5,
      highlight: 'Increased Sales by 40%',
      testimonial: 'Quinex transformed our business completely. The AI valuations are incredibly accurate, and the lead scoring has helped us focus on the right clients. Our conversion rate has improved dramatically.',
      metric: '$2.5M+ in sales',
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Property Investment Manager',
      company: 'Dubai Real Estate Group',
      location: 'Dubai, UAE',
      avatar: 'AR',
      rating: 5,
      highlight: 'Time Saved: 15 hours/week',
      testimonial: 'The automation features are game-changing. What used to take hours now happens in minutes. The market analytics help us make better investment decisions for our clients.',
      metric: '200+ properties managed',
    },
    {
      name: 'Emma Thompson',
      role: 'Real Estate Broker',
      company: 'London Prime Properties',
      location: 'London, UK',
      avatar: 'ET',
      rating: 5,
      highlight: 'Client Satisfaction: 98%',
      testimonial: 'The client portal and AI assistant have revolutionized how we interact with buyers. Our clients love the transparency and instant responses to their queries.',
      metric: '£5M+ portfolio value',
    },
    {
      name: 'Carlos Rodriguez',
      role: 'Commercial Real Estate Director',
      company: 'Toronto Commercial Group',
      location: 'Toronto, Canada',
      avatar: 'CR',
      rating: 5,
      highlight: 'Deal Closure: 60% faster',
      testimonial: 'The document automation and legal templates have streamlined our entire process. We close deals 60% faster than before, and our clients appreciate the efficiency.',
      metric: 'C$10M+ transactions',
    },
    {
      name: 'Priya Sharma',
      role: 'Real Estate Consultant',
      company: 'Mumbai Elite Properties',
      location: 'Mumbai, India',
      avatar: 'PS',
      rating: 5,
      highlight: 'Lead Quality: +85%',
      testimonial: 'The smart lead scoring is phenomenal. We now focus only on high-quality leads, which has increased our success rate significantly. The ROI is incredible.',
      metric: '₹50Cr+ in sales',
    },
    {
      name: 'Michael Chen',
      role: 'Property Development Manager',
      company: 'Sydney Harbour Developments',
      location: 'Sydney, Australia',
      avatar: 'MC',
      rating: 5,
      highlight: 'Market Insights: Real-time',
      testimonial: 'The market analytics and trend predictions have given us a competitive edge. We make data-driven decisions that consistently outperform the market.',
      metric: 'A$15M+ developments',
    },
  ];

  const stats = [
    { icon: Users, number: '5,000+', label: 'Happy Customers' },
    { icon: Building2, number: '25,000+', label: 'Properties Managed' },
    { icon: TrendingUp, number: '95%', label: 'Customer Satisfaction' },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 bg-purple-100 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="h-4 w-4" />
            <span>Trusted by Professionals Worldwide</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of real estate professionals who have transformed their business with Quinex
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg border group-hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="bg-gray-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-gray-700" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="h-full bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Quote Icon */}
                <motion.div
                  className="absolute top-4 right-4 text-gray-200 group-hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <Quote className="h-8 w-8" />
                </motion.div>

                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <motion.div 
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 1.2 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Highlight Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors">
                      {testimonial.highlight}
                    </Badge>
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-gray-700 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 1.5 }}
                  >
                    "{testimonial.testimonial}"
                  </motion.p>

                  {/* Metric */}
                  <motion.div
                    className="pt-4 border-t border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.8 }}
                  >
                    <div className="text-sm font-semibold text-blue-600">
                      {testimonial.metric}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.p 
            className="text-lg text-gray-600 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Ready to join thousands of successful real estate professionals?
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 2.2 }}
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