'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, AlertTriangle, Target, MapPin, Download, Filter, Calendar, ChevronRight, ArrowUpRight, ArrowDownRight, Lightbulb, Sparkles, Building2 } from 'lucide-react';

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

const priceIndexData = [
  { month: 'Jan', value: 100, volume: 120 },
  { month: 'Feb', value: 102, volume: 125 },
  { month: 'Mar', value: 105, volume: 130 },
  { month: 'Apr', value: 103, volume: 128 },
  { month: 'May', value: 108, volume: 135 },
  { month: 'Jun', value: 112, volume: 142 },
  { month: 'Jul', value: 115, volume: 148 },
  { month: 'Aug', value: 118, volume: 155 },
];

const volumeData = [
  { region: 'New York', volume: 150, growth: 12 },
  { region: 'Los Angeles', volume: 120, growth: 8 },
  { region: 'Miami', volume: 90, growth: 15 },
  { region: 'Chicago', volume: 60, growth: -5 },
  { region: 'San Francisco', volume: 85, growth: 10 },
  { region: 'Boston', volume: 45, growth: 7 },
];

const propertyTypeData = [
  { name: 'Residential', value: 65, color: '#3b82f6' },
  { name: 'Commercial', value: 20, color: '#10b981' },
  { name: 'Industrial', value: 10, color: '#f59e0b' },
  { name: 'Land', value: 5, color: '#8b5cf6' },
];

const forecastData = [
  { quarter: 'Q1', actual: 105, forecast: 105 },
  { quarter: 'Q2', actual: 112, forecast: 112 },
  { quarter: 'Q3', actual: 118, forecast: 118 },
  { quarter: 'Q4', actual: null, forecast: 125 },
  { quarter: 'Q1 2025', actual: null, forecast: 132 },
];

export function MarketTrends() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('6m');
  const [selectedMetric, setSelectedMetric] = useState<string>('price');
  const [isLoading, setIsLoading] = useState(true);
  const [showAIInsights, setShowAIInsights] = useState(false);

  const regions = [
    'New York', 'Los Angeles', 'Miami', 'Chicago', 'San Francisco', 
    'Boston', 'Seattle', 'Austin', 'Denver', 'Atlanta'
  ];

  const timeframes = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' },
  ];

  const metrics = [
    { value: 'price', label: 'Price Index' },
    { value: 'volume', label: 'Transaction Volume' },
    { value: 'days', label: 'Days on Market' },
    { value: 'inventory', label: 'Inventory Levels' },
  ];

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Show AI insights after a delay
    const insightTimer = setTimeout(() => {
      setShowAIInsights(true);
      toast.success("AI market insights available!", {
        description: "We've detected new market trends in your selected region.",
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(insightTimer);
    };
  }, [selectedRegion, selectedTimeframe, selectedMetric]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Market Trends & Analytics
          </h2>
          <p className="text-muted-foreground">
            Real-time market insights and predictive analytics for informed decisions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price/sq ft</CardTitle>
            <div className="bg-blue-50 text-blue-600 p-2 rounded-md">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{isLoading ? '...' : '$950'}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="h-10 w-20">
                {!isLoading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceIndexData.slice(-5)}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
            <div className="bg-green-50 text-green-600 p-2 rounded-md">
              <Building2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{isLoading ? '...' : '1,247'}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="h-10 w-20">
                {!isLoading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceIndexData.slice(-5)}>
                      <Bar dataKey="volume" fill="#10b981" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days on Market</CardTitle>
            <div className="bg-amber-50 text-amber-600 p-2 rounded-md">
              <Calendar className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{isLoading ? '...' : '45'}</div>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+3 days from last month</span>
                </div>
              </div>
              <div className="h-10 w-20">
                {!isLoading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Apr', value: 48 },
                      { month: 'May', value: 46 },
                      { month: 'Jun', value: 42 },
                      { month: 'Jul', value: 44 },
                      { month: 'Aug', value: 45 },
                    ]}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Index</CardTitle>
            <div className="bg-purple-50 text-purple-600 p-2 rounded-md">
              <Target className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{isLoading ? '...' : '118.5'}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+2.3% this quarter</span>
                </div>
              </div>
              <div className="h-10 w-20">
                {!isLoading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Apr', value: 112 },
                      { month: 'May', value: 114 },
                      { month: 'Jun', value: 115 },
                      { month: 'Jul', value: 117 },
                      { month: 'Aug', value: 118.5 },
                    ]}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Price Index Trend */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Price Index Trend</span>
                  <Badge className="bg-green-100 text-green-800 ml-2">+12% YoY</Badge>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => {
                  toast.info("Viewing detailed price trends");
                }}>
                  Details <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceIndexData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        formatter={(value) => [`${value}`, 'Price Index']}
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">+8%</p>
                  <p className="text-xs text-blue-600">This Quarter</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">118</p>
                  <p className="text-xs text-blue-600">Current Index</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">$950</p>
                  <p className="text-xs text-blue-600">Avg per sq ft</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Regional Volume */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span>Regional Transaction Volume</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => {
                  toast.info("Viewing regional breakdown");
                }}>
                  Details <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
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
                      <Bar dataKey="volume" fill="#10b981" radius={[4, 4, 0, 0]}>
                        {volumeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.growth > 0 ? '#10b981' : '#ef4444'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Market Insight</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Prediction
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  New York and Miami showing strong growth. Chicago market cooling due to policy changes.
                  AI models predict 15% growth in second-tier cities next quarter.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Property Type Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                <span>Property Type Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Market Share']}
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Residential properties dominate the market with 65% share
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Commercial properties showing fastest growth at +15% YoY
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Forecast */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                <span>Market Forecast</span>
                <Badge className="bg-purple-100 text-purple-800 ml-2">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="quarter" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#3b82f6" 
                        fillOpacity={1}
                        fill="url(#colorActual)"
                        name="Actual"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke="#8b5cf6" 
                        fillOpacity={1}
                        fill="url(#colorForecast)"
                        strokeDasharray="5 5"
                        name="Forecast"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <h4 className="font-medium text-sm text-purple-900">AI Forecast Insight</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Our AI predicts a 12% price increase over the next 6 months, with strongest growth in Q1 2025.
                  Recommendation: Consider expanding inventory in growth markets.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Market Insights */}
      <motion.div 
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={showAIInsights ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="border-gray-200 hover:shadow-md transition-shadow bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI-Powered Market Insights
              <Badge className="ml-auto bg-purple-100 text-purple-800">
                New
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Strong Growth Predicted</h4>
                    <p className="text-sm text-muted-foreground">
                      AI models predict 15-20% price appreciation in major metropolitan areas over the next 6 months, 
                      driven by infrastructure development and economic growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Inventory Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Current market conditions favor sellers in New York and Miami, while buyers have 
                      better negotiating power in Chicago and Atlanta.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Investment Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Commercial real estate in tech hubs showing strong fundamentals with 
                      8-12% rental yields expected in the coming quarters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50" onClick={() => {
                toast.info("Generating detailed AI market report");
              }}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}