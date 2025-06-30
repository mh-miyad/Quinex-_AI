'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMarketTrends } from '@/lib/ai-services';
import { formatPrice } from '@/lib/currency';
import { useEstateStore } from '@/lib/store';
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
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  MapPin,
  Calendar,
  Target,
  AlertTriangle,
  Download,
} from 'lucide-react';

export function MarketTrends() {
  const { user } = useEstateStore();
  const [trends, setTrends] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const regions = [
    'New York', 'London', 'Dubai', 'Toronto', 'Sydney', 'Paris', 
    'Tokyo', 'Singapore', 'Riyadh', 'Stockholm', 'Doha'
  ];

  // Sample historical data for charts with USD pricing
  const priceHistoryData = [
    { month: 'Jan', price: 850, volume: 120, growth: 5 },
    { month: 'Feb', price: 875, volume: 135, growth: 4.4 },
    { month: 'Mar', price: 860, volume: 128, growth: -1.1 },
    { month: 'Apr', price: 890, volume: 142, growth: 3.2 },
    { month: 'May', price: 920, volume: 156, growth: 3.1 },
    { month: 'Jun', price: 950, volume: 168, growth: 3.0 },
  ];

  const demandSupplyData = [
    { category: 'High Demand', value: 35, color: '#000000' },
    { category: 'Moderate Demand', value: 45, color: '#666666' },
    { category: 'Low Demand', value: 20, color: '#cccccc' },
  ];

  useEffect(() => {
    loadTrends();
  }, [selectedRegion]);

  const loadTrends = async () => {
    setIsLoading(true);
    try {
      const data = await getMarketTrends(selectedRegion === 'all' ? undefined : selectedRegion);
      setTrends(data);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currency = user?.settings?.currency || 'USD';

  const formatPriceForChart = (price: number) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toFixed(0)}`;
  };

  const getTrendIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (change: number) => {
    if (change > 10) return 'text-green-600 bg-green-100';
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change > -5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-black" />
            Market Trends & Analytics
          </h2>
          <p className="text-muted-foreground">
            Real-time market insights and predictive analytics for informed decisions
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price/sq ft</CardTitle>
            <TrendingUp className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(950, currency)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
            <BarChart3 className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days on Market</CardTitle>
            <Calendar className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3 days</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Index</CardTitle>
            <Target className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112.5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> this quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Price Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Price Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatPriceForChart(value as number), 'Price/sq ft']} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Growth Rate']} />
                <Bar 
                  dataKey="growth" 
                  fill="#666666" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demand Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Market Demand Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demandSupplyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {demandSupplyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading market data...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trends.map((trend, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{trend.region}</h4>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(trend.priceChange)}
                      <Badge className={getTrendColor(trend.priceChange)}>
                        {trend.priceChange > 0 ? '+' : ''}{trend.priceChange.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Price:</span>
                      <span className="font-medium">{formatPriceForChart(trend.currentPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-medium">{trend.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Quarter:</span>
                      <span className="font-medium">
                        {trend.forecast.nextQuarter > 0 ? '+' : ''}{trend.forecast.nextQuarter.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            AI Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
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

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Inventory Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Current market conditions favor sellers in New York and London, while buyers have 
                    better negotiating power in emerging markets.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Target className="h-4 w-4 text-white" />
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
        </CardContent>
      </Card>
    </div>
  );
}