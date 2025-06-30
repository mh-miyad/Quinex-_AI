'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEstateStore } from '@/lib/store';
import {
  Home,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Sparkles,
  Award,
  Clock,
  Calendar,
  Building2,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function StatsCards() {
  const { properties, leads } = useEstateStore();
  
  const activeProperties = properties.filter(p => p.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
  const avgLeadScore = leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0;

  const stats = [
    {
      title: 'Active Properties',
      value: activeProperties.toString(),
      icon: Home,
      description: `${properties.length} total properties`,
      trend: '+12%',
      trendDirection: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'New Leads',
      value: newLeads.toString(),
      icon: Users,
      description: `${leads.length} total leads`,
      trend: '+8%',
      trendDirection: 'up',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Portfolio Value',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      description: 'Total property value',
      trend: '+15%',
      trendDirection: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'AI Lead Score',
      value: `${avgLeadScore}%`,
      icon: Target,
      description: 'Average lead quality',
      trend: '+5%',
      trendDirection: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      isAI: true,
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      icon: Award,
      description: 'Lead to client conversion',
      trend: '+3.2%',
      trendDirection: 'up',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Avg. Time to Sell',
      value: '38 days',
      icon: Clock,
      description: 'From listing to closing',
      trend: '-5 days',
      trendDirection: 'down',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Upcoming Viewings',
      value: '12',
      icon: Calendar,
      description: 'Next 7 days',
      trend: '+4',
      trendDirection: 'up',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Closing Rate',
      value: '68%',
      icon: CheckCircle,
      description: 'Viewings to purchase',
      trend: '+2.5%',
      trendDirection: 'up',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="cursor-pointer"
          >
            <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-black">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <span>{stat.title}</span>
                  {stat.isAI && (
                    <Sparkles className="h-3 w-3 text-purple-500" />
                  )}
                </CardTitle>
                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-md`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`flex items-center gap-1 ${
                      stat.trendDirection === 'up' 
                        ? 'text-green-700 bg-green-100' 
                        : 'text-red-700 bg-red-100'
                    }`}
                  >
                    {stat.trendDirection === 'up' ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}