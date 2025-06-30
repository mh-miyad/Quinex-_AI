'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Brain,
  TrendingUp,
  Target,
  BarChart3,
  Download,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const aiInsights = [
  {
    title: 'Market Prediction',
    insight: 'Property prices in Mumbai expected to rise 8-12% in Q3 2024',
    confidence: 87,
    type: 'bullish',
  },
  {
    title: 'Lead Quality Alert',
    insight: 'Higher quality leads from digital channels this month (+15%)',
    confidence: 92,
    type: 'positive',
  },
  {
    title: 'Inventory Optimization',
    insight: 'Consider reducing inventory in Sector 45, slow movement detected',
    confidence: 78,
    type: 'warning',
  },
];

const propertyPerformance = [
  { month: 'Jan', sales: 12, leads: 45, valuation: 2.1 },
  { month: 'Feb', sales: 15, leads: 52, valuation: 2.3 },
  { month: 'Mar', sales: 18, leads: 48, valuation: 2.2 },
  { month: 'Apr', sales: 22, leads: 65, valuation: 2.5 },
  { month: 'May', sales: 19, leads: 58, valuation: 2.4 },
  { month: 'Jun', sales: 25, leads: 72, valuation: 2.7 },
];

const leadSources = [
  { name: 'Website', value: 35, color: '#3b82f6' },
  { name: 'Referrals', value: 28, color: '#059669' },
  { name: 'Social Media', value: 20, color: '#ea580c' },
  { name: 'Direct', value: 17, color: '#7c3aed' },
];

const regionData = [
  { region: 'Mumbai', properties: 45, avgPrice: 2.5, growth: 12 },
  { region: 'Delhi', properties: 32, avgPrice: 1.8, growth: 8 },
  { region: 'Bangalore', properties: 28, avgPrice: 1.2, growth: 15 },
  { region: 'Karachi', properties: 18, avgPrice: 0.8, growth: -3 },
  { region: 'Dhaka', properties: 15, avgPrice: 0.6, growth: 18 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Advanced insights powered by machine learning and market intelligence
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <Badge
                    variant="outline"
                    className={
                      insight.type === 'bullish' ? 'border-green-200 text-green-700' :
                      insight.type === 'positive' ? 'border-blue-200 text-blue-700' :
                      'border-orange-200 text-orange-700'
                    }
                  >
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {insight.insight}
                </p>
                {insight.type === 'warning' && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">Action recommended</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales & Leads Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Sales & Lead Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={propertyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leads"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Lead Source Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Regional Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="properties" fill="#3b82f6" name="Properties" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Growth %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid gap-4 md:grid-cols-5">
            {regionData.map((region) => (
              <div key={region.region} className="text-center p-3 border rounded-lg">
                <h4 className="font-medium text-sm mb-1">{region.region}</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">
                  ₹{region.avgPrice}Cr
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {region.properties} properties
                </p>
                <Badge
                  className={
                    region.growth > 10 ? 'bg-green-100 text-green-800' :
                    region.growth > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {region.growth > 0 ? '+' : ''}{region.growth}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}