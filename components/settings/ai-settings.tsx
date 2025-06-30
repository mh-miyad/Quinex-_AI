'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useEstateStore } from '@/lib/store';
import {
  Brain,
  Zap,
  Settings,
  Key,
  Globe,
  MessageSquare,
  FileText,
  Calculator,
  Users,
  Mail,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

export function AISettings() {
  const { user, setUser } = useEstateStore();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUpdateSettings = (path: string, value: any) => {
    if (user) {
      const newSettings = { ...user.settings };
      const keys = path.split('.');
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i] as keyof typeof current]) {
          current[keys[i] as keyof typeof current] = {} as any;
        }
        current = current[keys[i] as keyof typeof current] as any;
      }
      
      current[keys[keys.length - 1] as keyof typeof current] = value;
      setUser({ ...user, settings: newSettings });
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');
    
    // Simulate API test
    setTimeout(() => {
      const hasApiKey = user?.settings?.aiConfig?.openai?.apiKey || 
                       user?.settings?.aiConfig?.anthropic?.apiKey ||
                       user?.settings?.aiConfig?.custom?.apiKey;
      
      setConnectionStatus(hasApiKey ? 'success' : 'error');
      setIsTestingConnection(false);
    }, 2000);
  };

  const aiProviders = [
    { value: 'openai', label: 'OpenAI', description: 'GPT-4, GPT-3.5 Turbo' },
    { value: 'anthropic', label: 'Anthropic', description: 'Claude 3.5 Sonnet, Claude 3 Haiku' },
    { value: 'custom', label: 'Custom API', description: 'Your own AI endpoint' },
  ];

  const openaiModels = [
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4-turbo',
    'gpt-3.5-turbo',
  ];

  const anthropicModels = [
    'claude-3-5-sonnet-20241022',
    'claude-3-haiku-20240307',
    'claude-3-sonnet-20240229',
  ];

  const currentProvider = user?.settings?.aiConfig?.provider || 'openai';

  return (
    <div className="space-y-6">
      {/* AI Provider Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Provider Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>AI Provider</Label>
            <Select 
              value={currentProvider} 
              onValueChange={(value) => handleUpdateSettings('aiConfig.provider', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiProviders.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    <div>
                      <div className="font-medium">{provider.label}</div>
                      <div className="text-sm text-muted-foreground">{provider.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* OpenAI Configuration */}
          {currentProvider === 'openai' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <Label>OpenAI Configuration</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="openai-key">API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={user?.settings?.aiConfig?.openai?.apiKey || ''}
                  onChange={(e) => handleUpdateSettings('aiConfig.openai.apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <Select 
                  value={user?.settings?.aiConfig?.model || 'gpt-4o'} 
                  onValueChange={(value) => handleUpdateSettings('aiConfig.model', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {openaiModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Anthropic Configuration */}
          {currentProvider === 'anthropic' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <Label>Anthropic Configuration</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="anthropic-key">API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={user?.settings?.aiConfig?.anthropic?.apiKey || ''}
                  onChange={(e) => handleUpdateSettings('aiConfig.anthropic.apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <Select 
                  value={user?.settings?.aiConfig?.model || 'claude-3-5-sonnet-20241022'} 
                  onValueChange={(value) => handleUpdateSettings('aiConfig.model', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {anthropicModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Custom API Configuration */}
          {currentProvider === 'custom' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <Label>Custom API Configuration</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-url">Base URL</Label>
                <Input
                  id="custom-url"
                  placeholder="https://api.example.com/v1"
                  value={user?.settings?.aiConfig?.custom?.baseUrl || ''}
                  onChange={(e) => handleUpdateSettings('aiConfig.custom.baseUrl', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-key">API Key</Label>
                <Input
                  id="custom-key"
                  type="password"
                  placeholder="Your API key"
                  value={user?.settings?.aiConfig?.custom?.apiKey || ''}
                  onChange={(e) => handleUpdateSettings('aiConfig.custom.apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-model">Model Name</Label>
                <Input
                  id="custom-model"
                  placeholder="gpt-4"
                  value={user?.settings?.aiConfig?.model || ''}
                  onChange={(e) => handleUpdateSettings('aiConfig.model', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Test Connection */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={testConnection}
              disabled={isTestingConnection}
            >
              {isTestingConnection ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Test Connection
                </>
              )}
            </Button>
            
            {connectionStatus === 'success' && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            )}
            
            {connectionStatus === 'error' && (
              <Badge variant="destructive">
                <AlertCircle className="mr-1 h-3 w-3" />
                Failed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Automation Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Automation Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <Label>AI Assistant</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Enable AI-powered chat assistant
              </p>
            </div>
            <Switch
              checked={user?.settings?.automation?.aiAssistant || false}
              onCheckedChange={(checked) => handleUpdateSettings('automation.aiAssistant', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <Label>Property Valuation</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered property value estimation
              </p>
            </div>
            <Switch
              checked={user?.settings?.automation?.propertyValuation || false}
              onCheckedChange={(checked) => handleUpdateSettings('automation.propertyValuation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <Label>Lead Scoring</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically score and prioritize leads
              </p>
            </div>
            <Switch
              checked={user?.settings?.automation?.leadScoring || false}
              onCheckedChange={(checked) => handleUpdateSettings('automation.leadScoring', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Label>Document Generation</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Auto-generate contracts and documents
              </p>
            </div>
            <Switch
              checked={user?.settings?.automation?.documentGeneration || false}
              onCheckedChange={(checked) => handleUpdateSettings('automation.documentGeneration', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Label>Email Automation</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-generated follow-up emails
              </p>
            </div>
            <Switch
              checked={user?.settings?.automation?.emailAutomation || false}
              onCheckedChange={(checked) => handleUpdateSettings('automation.emailAutomation', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Behavior Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Behavior Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Response Style</Label>
            <Select 
              value={user?.settings?.aiConfig?.responseStyle || 'professional'} 
              onValueChange={(value) => handleUpdateSettings('aiConfig.responseStyle', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Confidence Threshold</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Low</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-black rounded-full" 
                  style={{ width: `${(user?.settings?.aiConfig?.confidenceThreshold || 0.7) * 100}%` }}
                />
              </div>
              <span className="text-sm">High</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum confidence level for AI suggestions
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Learning Mode</Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to learn from your preferences
              </p>
            </div>
            <Switch
              checked={user?.settings?.aiConfig?.learningMode || true}
              onCheckedChange={(checked) => handleUpdateSettings('aiConfig.learningMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex gap-2">
        <Button className="bg-black text-white hover:bg-gray-800">
          Save AI Settings
        </Button>
        <Button variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}