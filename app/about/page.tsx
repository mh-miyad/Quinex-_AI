'use client';

import { motion } from 'framer-motion';
import { PublicHeader } from '@/components/layout/public-header';
import { Footer } from '@/components/public/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Lightbulb,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Star,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Active Users', icon: Users },
    { number: '50+', label: 'Countries', icon: Globe },
    { number: '$2B+', label: 'Properties Valued', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime', icon: Shield },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI and technology to solve real problems in real estate.',
    },
    {
      icon: Heart,
      title: 'Customer Success',
      description: 'Your success is our success. We\'re committed to helping you achieve your goals.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and data protection.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Building solutions that work across cultures, currencies, and markets.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Product at PropTech unicorn. 15+ years in real estate technology.',
      image: '/team/sarah.jpg',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google AI researcher. PhD in Machine Learning from Stanford.',
      image: '/team/michael.jpg',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      bio: 'Former Product Lead at Airbnb. Expert in user experience and growth.',
      image: '/team/priya.jpg',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      bio: 'Former Principal Engineer at Uber. Specialist in scalable systems.',
      image: '/team/david.jpg',
      linkedin: '#',
      twitter: '#',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to democratize real estate technology globally.',
    },
    {
      year: '2021',
      title: 'AI Engine Launch',
      description: 'Launched our proprietary AI valuation engine with 95% accuracy.',
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to 25+ countries with multi-currency support.',
    },
    {
      year: '2023',
      title: 'Series A Funding',
      description: 'Raised $15M Series A to accelerate product development.',
    },
    {
      year: '2024',
      title: 'Market Leadership',
      description: 'Became the leading AI-powered real estate platform globally.',
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
        ease: 'easeOut',
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
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Building2 className="h-4 w-4" />
                Revolutionizing Real Estate
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Building the future of{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  real estate
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                We're on a mission to democratize real estate technology and empower agents, 
                agencies, and investors worldwide with AI-powered tools that drive success.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Join Our Team
                </Button>
                <Button variant="outline" className="px-8 py-3">
                  Our Story
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className="text-4xl font-bold text-gray-900 mb-2"
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-black text-white mb-4">Our Mission</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Democratizing real estate technology for everyone
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that powerful real estate tools shouldn't be limited to large corporations. 
                  Our mission is to level the playing field by providing world-class AI-powered solutions 
                  that are accessible, affordable, and easy to use for agents and agencies of all sizes.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  From property valuations to lead management, we're building the comprehensive platform 
                  that empowers real estate professionals to focus on what they do best: serving their clients.
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Learn More About Our Vision
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <Lightbulb className="h-16 w-16 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Innovation at Our Core</h3>
                    <p className="text-lg opacity-90">
                      We're constantly pushing the boundaries of what's possible in real estate technology, 
                      leveraging the latest advances in AI and machine learning.
                    </p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Zap className="h-12 w-12 text-yellow-900" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center"
                >
                  <Target className="h-10 w-10 text-green-900" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From startup to industry leader - here's how we've grown
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-black text-white text-lg px-3 py-1">
                            {item.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 bg-black rounded-full flex-shrink-0"
                  />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The brilliant minds behind Quinex, working to revolutionize real estate
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="text-center"
                >
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center"
                      >
                        <Users className="h-12 w-12 text-gray-600" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-black font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      
                      <div className="flex justify-center gap-3">
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          href={member.linkedin}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <Linkedin className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          href={member.twitter}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <Twitter className="h-5 w-5" />
                        </motion.a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                Want to join our mission?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3">
                    View Open Positions
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}