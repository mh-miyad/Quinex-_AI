'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useEstateStore } from '@/lib/store';
import { SUPPORTED_MARKETS } from '@/lib/config';
import {
  Globe,
  DollarSign,
  MapPin,
  Clock,
  Languages,
  Palette,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';

export function GlobalSettings() {
  const { user, setUser } = useEstateStore();
  const [theme, setTheme] = useState(user?.settings?.theme || 'light');

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

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'pt', name: 'Portuguese' },
  ];

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Dubai',
    'Asia/Tokyo',
    'Australia/Sydney',
    'America/Toronto',
  ];

  return (
    <div className="space-y-6">
      {/* Market & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Market & Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Primary Market</Label>
              <Select 
                value={user?.settings?.market || 'new-york'} 
                onValueChange={(value) => handleUpdateSettings('market', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SUPPORTED_MARKETS).map(([key, market]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {market.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select 
                value={user?.settings?.currency || 'USD'} 
                onValueChange={(value) => handleUpdateSettings('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {currency.symbol} {currency.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select 
                value={user?.settings?.language || 'en'} 
                onValueChange={(value) => handleUpdateSettings('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={user?.settings?.timezone || 'America/New_York'} 
                onValueChange={(value) => handleUpdateSettings('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {timezone.replace('_', ' ')}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => {
                  setTheme('light');
                  handleUpdateSettings('theme', 'light');
                }}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => {
                  setTheme('dark');
                  handleUpdateSettings('theme', 'dark');
                }}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => {
                  setTheme('system');
                  handleUpdateSettings('theme', 'system');
                }}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use smaller spacing and components
              </p>
            </div>
            <Switch
              checked={user?.settings?.compactMode || false}
              onCheckedChange={(checked) => handleUpdateSettings('compactMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better accessibility
              </p>
            </div>
            <Switch
              checked={user?.settings?.highContrast || false}
              onCheckedChange={(checked) => handleUpdateSettings('highContrast', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the platform by sharing usage data
              </p>
            </div>
            <Switch
              checked={user?.settings?.analytics || true}
              onCheckedChange={(checked) => handleUpdateSettings('analytics', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new features and tips
              </p>
            </div>
            <Switch
              checked={user?.settings?.marketing || false}
              onCheckedChange={(checked) => handleUpdateSettings('marketing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Data Export</Label>
              <p className="text-sm text-muted-foreground">
                Download all your data in JSON format
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex gap-2">
        <Button className="bg-black text-white hover:bg-gray-800">
          Save Changes
        </Button>
        <Button variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}