'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Calculator,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
} from 'lucide-react';

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const [stats, setStats] = useState({
    properties: 0,
    users: 0,
    valuations: 0,
    accuracy: 0,
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate counters
      const animateCounter = (target: number, key: keyof typeof stats, duration: number = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }, 16);
      };

      setTimeout(() => {
        animateCounter(25000, 'properties');
        animateCounter(5000, 'users');
        animateCounter(50000, 'valuations');
        animateCounter(95, 'accuracy');
      }, 500);
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-100 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-4 w-4" />
                <span>Powered by Gemini AI</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                AI-Powered{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Real Estate
                </motion.span>{' '}
                Platform
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Revolutionary property transactions platform for global markets with AI-powered valuations, 
                lead scoring, and intelligent matchmaking.
              </motion.p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { icon: Calculator, text: 'AI Valuations', color: 'text-blue-600' },
                { icon: Users, text: 'Smart CRM', color: 'text-emerald-600' },
                { icon: TrendingUp, text: 'Market Analytics', color: 'text-purple-600' },
                { icon: Globe, text: 'Global Markets', color: 'text-orange-600' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="font-medium text-gray-900">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 group">
                    Start Free Trial
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="group">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm text-gray-500">Trusted by real estate professionals in</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {['New York', 'London', 'Dubai', 'Toronto', 'Sydney'].map((city, index) => (
                  <motion.div
                    key={city}
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{city}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl border overflow-hidden"
              variants={pulseVariants}
              animate="animate"
            >
              {/* Mock Dashboard Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-black" />
                    <span className="font-semibold">Quinex Dashboard</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Properties', value: stats.properties.toLocaleString(), icon: Building2, color: 'text-blue-600' },
                    { label: 'Active Users', value: stats.users.toLocaleString(), icon: Users, color: 'text-emerald-600' },
                    { label: 'AI Valuations', value: stats.valuations.toLocaleString(), icon: Calculator, color: 'text-purple-600' },
                    { label: 'Accuracy', value: `${stats.accuracy}%`, icon: Star, color: 'text-orange-600' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-gray-50 p-4 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 1.5 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <motion.span
                          className="text-xs text-gray-500"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Live
                        </motion.span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Mock Chart */}
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Market Trends</span>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +12%
                    </Badge>
                  </div>
                  <div className="flex items-end space-x-1 h-16">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm flex-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.1 + 2.5, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Mock Recent Activity */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <span className="text-sm font-medium text-gray-700">Recent Activity</span>
                  {[
                    'New property valued at $2.5M',
                    'High-priority lead generated',
                    'Market report completed',
                  ].map((activity, index) => (
                    <motion.div
                      key={activity}
                      className="flex items-center space-x-2 text-xs text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 3.2 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                      <span>{activity}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg border"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-6 w-6 text-purple-600" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg border"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}