'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useEstateStore } from '@/lib/store';
import { geminiService } from '@/lib/gemini-service';
import { toast } from 'sonner';
import {
  Sparkles,
  Send,
  MessageSquare,
  Mail,
  Target,
  Users,
  Copy,
  RefreshCw,
  Eye,
  Calendar,
  TrendingUp,
  Wand2,
  Brain,
  Zap,
  Download,
  Share2,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'whatsapp' | 'email' | 'sms';
  content: string;
  targetAudience: string[];
  properties: string[];
  status: 'draft' | 'scheduled' | 'sent';
  createdAt: Date;
  scheduledAt?: Date;
  generatedBy: 'user' | 'gemini';
  metrics?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  };
}

export function AICampaignAssistant() {
  const { properties, leads } = useEstateStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<Campaign>>({
    name: '',
    type: 'whatsapp',
    content: '',
    targetAudience: [],
    properties: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'campaigns'>('create');
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [propertyHighlights, setPropertyHighlights] = useState<string[]>([]);

  const campaignTypes = [
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'sms', label: 'SMS', icon: Send },
  ];

  const audienceSegments = [
    'High-value leads (>$500K budget)',
    'New leads (last 7 days)',
    'Interested in luxury properties',
    'Interested in commercial properties',
    'Leads with high urgency',
    'Inactive leads (no contact in 30 days)',
    'First-time buyers',
    'Investment property seekers',
  ];

  const campaignGoals = [
    'Generate new leads',
    'Nurture existing leads',
    'Promote new listings',
    'Schedule property viewings',
    'Follow up on inquiries',
    'Market trend updates',
    'Holiday greetings',
    'Event invitations',
  ];

  const targetMarkets = [
    'New York',
    'Los Angeles',
    'Miami',
    'San Francisco',
    'Chicago',
    'Boston',
    'Seattle',
    'Austin',
    'Denver',
    'Atlanta',
  ];

  const propertyFeatures = [
    'Luxury amenities',
    'Prime location',
    'Modern design',
    'Investment potential',
    'Move-in ready',
    'Price reduction',
    'New construction',
    'Waterfront views',
    'Downtown location',
    'Family-friendly',
  ];

  const generateWithGemini = async () => {
    if (!currentCampaign.type || !campaignGoal) {
      toast.error('Please select campaign type and goal first');
      return;
    }

    setIsGenerating(true);
    try {
      // Prepare context for Gemini
      const context = {
        campaignType: currentCampaign.type,
        goal: campaignGoal,
        targetMarket: targetMarket,
        propertyHighlights: propertyHighlights,
        audienceSegments: currentCampaign.targetAudience,
        customPrompt: geminiPrompt,
        properties: properties.slice(0, 3), // Include sample properties
      };

      const prompt = `Create a ${currentCampaign.type} marketing campaign for real estate with the following details:

Campaign Goal: ${campaignGoal}
Target Market: ${targetMarket || 'General market'}
Target Audience: ${currentCampaign.targetAudience?.join(', ') || 'General audience'}
Property Highlights: ${propertyHighlights.join(', ') || 'Standard features'}
${geminiPrompt ? `Additional Requirements: ${geminiPrompt}` : ''}

Please create compelling, professional content that:
1. Grabs attention with a strong opening
2. Highlights key property benefits
3. Creates urgency and desire
4. Includes a clear call-to-action
5. Maintains a professional yet engaging tone
6. Uses appropriate formatting for ${currentCampaign.type}

${currentCampaign.type === 'whatsapp' ? 'Use emojis and keep it conversational but professional.' : ''}
${currentCampaign.type === 'email' ? 'Include a subject line and structure with headers.' : ''}
${currentCampaign.type === 'sms' ? 'Keep it under 160 characters and very direct.' : ''}

Make it specific to the US real estate market with dollar pricing.`;

      const generatedContent = await geminiService.generateContent('campaign', { prompt, context });
      
      setCurrentCampaign(prev => ({ 
        ...prev, 
        content: generatedContent,
        generatedBy: 'gemini'
      }));
      
      toast.success('Campaign content generated successfully!');
    } catch (error) {
      console.error('Gemini generation failed:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: currentCampaign.name || `${currentCampaign.type} Campaign - ${new Date().toLocaleDateString()}`,
      type: currentCampaign.type as any,
      content: currentCampaign.content || '',
      targetAudience: currentCampaign.targetAudience || [],
      properties: currentCampaign.properties || [],
      status: 'draft',
      createdAt: new Date(),
      generatedBy: currentCampaign.generatedBy || 'user',
    };
    
    setCampaigns(prev => [...prev, campaign]);
    setCurrentCampaign({
      name: '',
      type: 'whatsapp',
      content: '',
      targetAudience: [],
      properties: [],
    });
    setGeminiPrompt('');
    setCampaignGoal('');
    setTargetMarket('');
    setPropertyHighlights([]);
    
    toast.success('Campaign saved successfully!');
  };

  const sendCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: 'sent',
            metrics: {
              sent: 150,
              delivered: 148,
              opened: 89,
              clicked: 23,
            }
          }
        : campaign
    ));
    toast.success('Campaign sent successfully!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard!');
  };

  const getAudienceSize = (segments: string[]) => {
    return segments.length * 25 + Math.floor(Math.random() * 50);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Campaign Assistant
            <Badge className="bg-purple-100 text-purple-800 ml-2">
              <Sparkles className="mr-1 h-3 w-3" />
              Powered by Gemini
            </Badge>
          </h2>
          <p className="text-muted-foreground">
            Create and manage AI-powered marketing campaigns with Google Gemini
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
            className={activeTab === 'create' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('campaigns')}
            className={activeTab === 'campaigns' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            My Campaigns
          </Button>
        </div>
      </div>

      {activeTab === 'create' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Campaign Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Campaign Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., Luxury Properties Q1 2024"
                  value={currentCampaign.name}
                  onChange={(e) => setCurrentCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {campaignTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={currentCampaign.type === type.value ? 'default' : 'outline'}
                        onClick={() => setCurrentCampaign(prev => ({ ...prev, type: type.value as any }))}
                        className={`flex flex-col gap-1 h-16 ${
                          currentCampaign.type === type.value ? 'bg-purple-600 hover:bg-purple-700' : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Campaign Goal</Label>
                <Select value={campaignGoal} onValueChange={setCampaignGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Market</Label>
                <Select value={targetMarket} onValueChange={setTargetMarket}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target market" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetMarkets.map((market) => (
                      <SelectItem key={market} value={market}>
                        {market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Highlights</Label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={propertyHighlights.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPropertyHighlights(prev => [...prev, feature]);
                          } else {
                            setPropertyHighlights(prev => prev.filter(f => f !== feature));
                          }
                        }}
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <div className="space-y-2">
                  {audienceSegments.map((segment) => (
                    <div key={segment} className="flex items-center space-x-2">
                      <Checkbox
                        id={segment}
                        checked={currentCampaign.targetAudience?.includes(segment)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCurrentCampaign(prev => ({
                              ...prev,
                              targetAudience: [...(prev.targetAudience || []), segment]
                            }));
                          } else {
                            setCurrentCampaign(prev => ({
                              ...prev,
                              targetAudience: prev.targetAudience?.filter(s => s !== segment)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={segment} className="text-sm">{segment}</Label>
                    </div>
                  ))}
                </div>
                {currentCampaign.targetAudience && currentCampaign.targetAudience.length > 0 && (
                  <Badge variant="secondary">
                    <Users className="mr-1 h-3 w-3" />
                    ~{getAudienceSize(currentCampaign.targetAudience)} recipients
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label>Additional Instructions for Gemini AI</Label>
                <Textarea
                  placeholder="e.g., Focus on luxury amenities, mention price reduction, include urgency..."
                  value={geminiPrompt}
                  onChange={(e) => setGeminiPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={generateWithGemini}
                disabled={isGenerating || !currentCampaign.type || !campaignGoal}
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating with Gemini AI...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate with Gemini AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Campaign Content</span>
                {currentCampaign.generatedBy === 'gemini' && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Generated
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCampaign.content ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="content">Message Content</Label>
                    <Textarea
                      id="content"
                      value={currentCampaign.content}
                      onChange={(e) => setCurrentCampaign(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => copyToClipboard(currentCampaign.content || '')}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={generateWithGemini}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveCampaign} variant="outline" className="flex-1">
                      Save Draft
                    </Button>
                    <Button className="flex-1 bg-purple-600 text-white hover:bg-purple-700">
                      <Send className="mr-2 h-4 w-4" />
                      Send Now
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="mx-auto h-12 w-12 mb-4 opacity-50 text-purple-400" />
                  <p className="mb-2">Use Gemini AI to generate campaign content</p>
                  <p className="text-sm">Fill in the campaign details and click "Generate with Gemini AI"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first AI-powered marketing campaign
              </p>
              <Button onClick={() => setActiveTab('create')} className="bg-purple-600 text-white hover:bg-purple-700">
                <Brain className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          {campaign.generatedBy === 'gemini' && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Sparkles className="mr-1 h-3 w-3" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline">
                            {campaignTypes.find(t => t.value === campaign.type)?.label}
                          </Badge>
                          <span>•</span>
                          <span>{campaign.targetAudience.length} segments</span>
                          <span>•</span>
                          <span>{campaign.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {campaign.status}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        
                        {campaign.status === 'draft' && (
                          <Button
                            onClick={() => sendCampaign(campaign.id)}
                            size="sm"
                            className="bg-purple-600 text-white hover:bg-purple-700"
                          >
                            <Send className="mr-1 h-3 w-3" />
                            Send
                          </Button>
                        )}
                      </div>
                    </div>

                    {campaign.metrics && (
                      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{campaign.metrics.sent}</p>
                          <p className="text-xs text-muted-foreground">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{campaign.metrics.delivered}</p>
                          <p className="text-xs text-muted-foreground">Delivered</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{campaign.metrics.opened}</p>
                          <p className="text-xs text-muted-foreground">Opened</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{campaign.metrics.clicked}</p>
                          <p className="text-xs text-muted-foreground">Clicked</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gemini AI Info Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">
                Powered by Google Gemini AI
              </h3>
              <p className="text-purple-700 text-sm mb-3">
                Our AI assistant uses Google's advanced Gemini model to create compelling, 
                personalized marketing campaigns that resonate with your target audience and 
                drive real estate success.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-800">
                  <Zap className="mr-1 h-3 w-3" />
                  Instant Generation
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  <Target className="mr-1 h-3 w-3" />
                  Audience Targeting
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Performance Optimized
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}