'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEstateStore } from '@/lib/store';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';
import {
  Home,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Calculator,
  Clock,
  ArrowRight,
  Plus,
  BarChart3,
  Calendar,
  Zap,
  Award,
  Bell,
  Building2,
  CheckCircle,
  Sparkles,
  MapPin,
  Eye,
  ChevronRight,
  Star,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const marketData = [
  { month: 'Jan', price: 850, volume: 120 },
  { month: 'Feb', price: 875, volume: 135 },
  { month: 'Mar', price: 860, volume: 128 },
  { month: 'Apr', price: 890, volume: 142 },
  { month: 'May', price: 920, volume: 156 },
  { month: 'Jun', price: 950, volume: 168 },
  { month: 'Jul', price: 980, volume: 175 },
  { month: 'Aug', price: 1010, volume: 182 },
];

const leadSourceData = [
  { name: 'Website', value: 35, color: '#3b82f6' },
  { name: 'Referrals', value: 28, color: '#10b981' },
  { name: 'Social Media', value: 20, color: '#f59e0b' },
  { name: 'Direct', value: 17, color: '#8b5cf6' },
];

const propertyTypeData = [
  { name: 'Apartment', value: 45, color: '#3b82f6' },
  { name: 'Villa', value: 25, color: '#10b981' },
  { name: 'Commercial', value: 15, color: '#f59e0b' },
  { name: 'Land', value: 10, color: '#8b5cf6' },
  { name: 'Penthouse', value: 5, color: '#ec4899' },
];

const regionData = [
  { name: 'New York', value: 35, color: '#3b82f6' },
  { name: 'Los Angeles', value: 25, color: '#10b981' },
  { name: 'Miami', value: 20, color: '#f59e0b' },
  { name: 'Chicago', value: 15, color: '#8b5cf6' },
  { name: 'San Francisco', value: 5, color: '#ec4899' },
];

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

export function DashboardOverview() {
  const { properties, leads, setCurrentView, user } = useEstateStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showInsights, setShowInsights] = useState(false);
  
  const activeProperties = properties.filter(p => p.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
  const avgLeadScore = leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0;

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Show insights after a delay
    const insightTimer = setTimeout(() => {
      setShowInsights(true);
      toast.success("New AI insights available!", {
        description: "We've detected new market opportunities in your area.",
        action: {
          label: "View",
          onClick: () => setCurrentView('trends'),
        },
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(insightTimer);
    };
  }, []);

  const stats = [
    {
      title: 'Active Properties',
      value: activeProperties.toString(),
      icon: Home,
      description: `${properties.length} total properties`,
      trend: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => setCurrentView('properties'),
    },
    {
      title: 'New Leads',
      value: newLeads.toString(),
      icon: Users,
      description: `${leads.length} total leads`,
      trend: '+8%',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      action: () => setCurrentView('leads'),
    },
    {
      title: 'Portfolio Value',
      value: formatPrice(totalValue, user?.settings?.currency || 'USD'),
      icon: DollarSign,
      description: 'Total property value',
      trend: '+15%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => setCurrentView('properties'),
    },
    {
      title: 'AI Lead Score',
      value: `${avgLeadScore}%`,
      icon: Target,
      description: 'Average lead quality',
      trend: '+5%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => setCurrentView('leads'),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'property',
      title: 'New property added',
      description: properties[0]?.title || 'Luxury Penthouse in Manhattan',
      time: '2 minutes ago',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      type: 'lead',
      title: 'High-value lead generated',
      description: leads[0]?.name || 'Sarah Johnson - Budget $1.5M',
      time: '15 minutes ago',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI valuation completed',
      description: 'Property valued at $850K (95% confidence)',
      time: '1 hour ago',
      icon: Calculator,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      type: 'market',
      title: 'Market trend alert',
      description: 'Price increase detected in Manhattan (+3.2%)',
      time: '3 hours ago',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      id: 5,
      type: 'meeting',
      title: 'Client meeting scheduled',
      description: 'Property viewing with Michael Rodriguez',
      time: '5 hours ago',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Follow up with Sarah Johnson',
      dueDate: 'Today',
      priority: 'high',
      type: 'lead',
    },
    {
      id: 2,
      title: 'Property viewing at Manhattan Penthouse',
      dueDate: 'Tomorrow',
      priority: 'medium',
      type: 'property',
    },
    {
      id: 3,
      title: 'Update listing photos for Miami Beach Apartment',
      dueDate: 'Jun 15',
      priority: 'low',
      type: 'property',
    },
  ];

  const aiInsights = [
    {
      title: 'Price Optimization',
      description: 'Your Manhattan property is priced 8% below market value. Consider a price adjustment.',
      action: 'Review Pricing',
    },
    {
      title: 'Lead Opportunity',
      description: '3 high-quality leads haven\'t been contacted in 48 hours.',
      action: 'Contact Leads',
    },
    {
      title: 'Market Trend',
      description: 'Miami Beach showing 12% growth this quarter - good time to acquire inventory.',
      action: 'View Market',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="h-4 w-4" />;
      case 'property': return <Home className="h-4 w-4" />;
      case 'market': return <TrendingUp className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your real estate business today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentView('valuation')}>
            <Calculator className="mr-2 h-4 w-4" />
            AI Valuation
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800" onClick={() => {
            setCurrentView('properties');
            toast.success("Let's add a new property!");
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="cursor-pointer"
              onClick={stat.action}
            >
              <Card className="border-gray-200 hover:border-black transition-colors duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`${stat.bgColor} ${stat.color} p-2 rounded-md`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{isLoading ? '...' : stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Market Overview Card */}
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Market Overview
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('trends')}>
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [`$${value}`, 'Price']}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        name="Avg Price/sqft ($)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#10b981" 
                        fillOpacity={1}
                        fill="url(#colorVolume)"
                        name="Transaction Volume"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">+8.2%</p>
                  <p className="text-xs text-blue-600">Price Growth</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <p className="text-xl font-bold text-green-600">+15%</p>
                  <p className="text-xs text-green-600">Volume Growth</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <p className="text-xl font-bold text-purple-600">$1,010</p>
                  <p className="text-xs text-purple-600">Current Price</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Lead Sources */}
            <motion.div variants={itemVariants}>
              <Card className="border-gray-200 hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    Lead Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    {isLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={leadSourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {leadSourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-center text-muted-foreground">
                      Website leads convert 2.5x better than other sources
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Property Types */}
            <motion.div variants={itemVariants}>
              <Card className="border-gray-200 hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-semibold flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-orange-600" />
                    Property Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    {isLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={propertyTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {propertyTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-center text-muted-foreground">
                      Apartments have the highest ROI in your portfolio
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Regional Performance */}
          <motion.div variants={itemVariants}>
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { region: 'New York', sales: 42, growth: 12 },
                        { region: 'Los Angeles', sales: 28, growth: 8 },
                        { region: 'Miami', sales: 35, growth: 15 },
                        { region: 'Chicago', sales: 22, growth: 5 },
                        { region: 'San Francisco', sales: 30, growth: 10 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="region" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="sales" name="Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="growth" name="Growth %" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {regionData.map((region) => (
                    <div key={region.name} className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 mb-1">{region.name}</p>
                      <Badge className={`bg-${region.color.replace('#', '')} text-white`}>
                        {region.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column - Activity & Tasks */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* AI Insights */}
          <Card className="border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insights
                <Badge className="ml-auto bg-purple-100 text-purple-800">
                  New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={showInsights ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {index === 0 ? (
                          <DollarSign className="h-4 w-4 text-purple-600" />
                        ) : index === 1 ? (
                          <Users className="h-4 w-4 text-purple-600" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0">
                          {insight.action} <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Tasks
                <Badge className="ml-auto bg-blue-100 text-blue-800">
                  {upcomingTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(task.type)}
                        <h4 className="font-medium text-sm">{task.title}</h4>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate}
                      </p>
                      <Button variant="ghost" size="sm" className="h-7 text-xs p-0" onClick={() => {
                        toast.success(`Task marked as complete!`);
                      }}>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  toast.info("View all tasks");
                }}>
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Activity
                <Badge variant="secondary">{recentActivities.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors">
                      <div className={`${activity.bgColor} p-2 rounded-md`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs p-0" onClick={() => {
                        toast.info(`Viewing details for ${activity.title}`);
                      }}>
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 text-center">
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-gray-50 hover:border-black" onClick={() => {
                setCurrentView('valuation');
                toast.info("Starting AI valuation");
              }}>
                <Calculator className="h-6 w-6 text-blue-600" />
                <span>AI Valuation</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-gray-50 hover:border-black" onClick={() => {
                setCurrentView('leads');
                toast.info("Adding new lead");
              }}>
                <Users className="h-6 w-6 text-emerald-600" />
                <span>Add Lead</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-gray-50 hover:border-black" onClick={() => {
                setCurrentView('matchmaking');
                toast.info("Finding property matches");
              }}>
                <Target className="h-6 w-6 text-purple-600" />
                <span>Match Properties</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-gray-50 hover:border-black" onClick={() => {
                setCurrentView('campaigns');
                toast.info("Creating AI campaign");
              }}>
                <Sparkles className="h-6 w-6 text-amber-600" />
                <span>AI Campaign</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-600" />
              Performance Metrics
              <Badge className="ml-auto bg-amber-100 text-amber-800">
                This Month
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-800">Conversion Rate</h3>
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-900">24.8%</p>
                <div className="flex items-center mt-1">
                  <Badge className="bg-blue-200 text-blue-800">
                    +3.2%
                  </Badge>
                  <span className="text-xs text-blue-700 ml-2">vs last month</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-green-800">Avg. Deal Size</h3>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-900">$920K</p>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-200 text-green-800">
                    +5.8%
                  </Badge>
                  <span className="text-xs text-green-700 ml-2">vs last month</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-purple-800">Time to Close</h3>
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-900">18 days</p>
                <div className="flex items-center mt-1">
                  <Badge className="bg-purple-200 text-purple-800">
                    -2.5 days
                  </Badge>
                  <span className="text-xs text-purple-700 ml-2">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Opportunities & Tips */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow bg-gradient-to-r from-amber-50 to-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              Growth Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-5 w-5 text-amber-600" />
                  <h3 className="font-medium">Expand Your Reach</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Your Miami properties are getting 3x more views. Consider expanding your portfolio in this region.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  toast.info("Exploring Miami market opportunities");
                }}>
                  Explore Market
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  <h3 className="font-medium">Lead Nurturing</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  15 leads haven't been contacted in 7+ days. Set up automated follow-ups to increase conversion.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  toast.info("Setting up lead nurturing campaign");
                }}>
                  Set Up Campaign
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-amber-600" />
                  <h3 className="font-medium">Property Optimization</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Adding virtual tours to listings increases engagement by 40%. 8 of your properties need virtual tours.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  toast.info("Optimizing property listings");
                }}>
                  Optimize Listings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}