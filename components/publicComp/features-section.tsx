"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Calculator,
  FileText,
  Globe,
  MessageSquare,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useRef } from "react";

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const features = [
    {
      icon: Calculator,
      title: "AI Property Valuation",
      description:
        "Get instant, accurate property valuations powered by Gemini AI with 95% accuracy across global markets.",
      badge: "AI Powered",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Users,
      title: "Smart Lead Scoring",
      description:
        "Automatically score and prioritize leads using machine learning to focus on high-conversion prospects.",
      badge: "ML Algorithm",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: Target,
      title: "Property Matchmaking",
      description:
        "Intelligent matching engine that connects the right properties with the right clients automatically.",
      badge: "Smart Match",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description:
        "Real-time market insights, trend analysis, and predictive analytics for informed decision making.",
      badge: "Real-time",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: FileText,
      title: "Document Automation",
      description:
        "Generate contracts, valuations, and legal documents automatically with country-specific templates.",
      badge: "Auto Generate",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description:
        "24/7 AI-powered assistant for customer support, lead qualification, and property recommendations.",
      badge: "24/7 Support",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Powered by Google Gemini AI for superior accuracy",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Support for 50+ countries with local regulations",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds, not hours",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security for your sensitive data",
    },
  ];

  const stats = [
    { number: "95%", label: "Valuation Accuracy" },
    { number: "50+", label: "Global Markets" },
    { number: "10K+", label: "Properties Valued" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-gray-700">Powered by Advanced AI</span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Revolutionary Features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Modern Real Estate
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Transform your real estate business with AI-powered tools designed
            for global markets. From property valuation to client matching,
            {` we've got you `}covered.
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card
                className={`h-full border-2 ${feature.borderColor} hover:shadow-xl transition-all duration-300 ${feature.bgColor}`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className={`p-3 rounded-lg ${feature.bgColor} border ${feature.borderColor}`}
                      variants={iconVariants}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </motion.div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <motion.div
                    className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Features Section */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 lg:p-12 mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h3
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Why Choose Our AI Platform?
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Built with cutting-edge technology to deliver unmatched
              performance and reliability
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="bg-white bg-opacity-10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300"
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-white font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 + 1.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 group"
            >
              Explore All Features
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
