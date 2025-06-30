'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  FileText,
  Zap,
  Users,
  CreditCard,
  Settings,
} from 'lucide-react';

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Learn the basics of Quinex',
      articles: 12,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Users,
      title: 'Lead Management',
      description: 'Managing leads and CRM features',
      articles: 8,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: 'Property Valuation',
      description: 'AI valuation and market analysis',
      articles: 15,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: CreditCard,
      title: 'Billing & Plans',
      description: 'Subscription and payment help',
      articles: 6,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Profile and configuration',
      articles: 10,
      color: 'bg-gray-100 text-gray-600',
    },
  ];

  const popularArticles = [
    {
      title: 'How to get started with Quinex',
      category: 'Getting Started',
      views: '2.1k views',
    },
    {
      title: 'Understanding AI property valuations',
      category: 'Property Valuation',
      views: '1.8k views',
    },
    {
      title: 'Setting up WhatsApp integration',
      category: 'Integrations',
      views: '1.5k views',
    },
    {
      title: 'Managing team members and permissions',
      category: 'Team Management',
      views: '1.2k views',
    },
    {
      title: 'Upgrading your subscription plan',
      category: 'Billing & Plans',
      views: '980 views',
    },
  ];

  const faqs = [
    {
      question: 'How accurate are the AI property valuations?',
      answer: 'Our AI valuation model achieves 95% accuracy for South Asian markets. The model is trained on millions of property transactions and considers factors like location, size, amenities, market conditions, and comparable sales. Each valuation comes with a confidence score to help you understand the reliability of the estimate.',
    },
    {
      question: 'Can I integrate Quinex with my existing CRM?',
      answer: 'Yes, we offer API access and integrations with popular CRM systems. You can export your data, use our REST API, or connect through Zapier. Our team can also help with custom integrations for enterprise clients.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and UPI payments through Stripe. For enterprise clients, we also offer bank transfers and custom billing arrangements.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, Quinex is a web-based platform optimized for mobile browsers. We\'re working on native mobile apps for iOS and Android, which will be available in Q2 2024.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from the Billing section in Settings. Your account will remain active until the end of your current billing period, and you\'ll retain access to all your data.',
    },
    {
      question: 'Do you offer training for new users?',
      answer: 'Yes! We provide comprehensive onboarding for all new users, including video tutorials, documentation, and live training sessions for Pro and Agency plan subscribers. Our support team is also available to help you get started.',
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-black" />
          Help Center
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to your questions, learn how to use Quinex effectively, 
          and get the support you need to grow your real estate business.
        </p>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-3 text-black" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get instant help from our support team
            </p>
            <Button variant="outline" size="sm">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 mx-auto mb-3 text-black" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Send us a detailed message
            </p>
            <Button variant="outline" size="sm">Send Email</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 mx-auto mb-3 text-black" />
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Watch step-by-step guides
            </p>
            <Button variant="outline" size="sm">Watch Videos</Button>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{category.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {category.articles} articles
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Popular Articles</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {popularArticles.map((article, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <Book className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@quinex.ai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Support Hours</h4>
              <div className="text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button className="bg-black text-white hover:bg-gray-800">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}