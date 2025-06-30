'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useEstateStore } from '@/lib/store';
import { getPropertyMatches } from '@/lib/ai-services';
import { toast } from 'sonner';
import {
  Target,
  Users,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Sparkles,
  Loader2,
} from 'lucide-react';

export function PropertyMatchmaking() {
  const { properties, leads } = useEstateStore();
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customPreferences, setCustomPreferences] = useState({
    budget: { min: '', max: '' },
    type: [] as string[],
    locations: [] as string[],
    bedrooms: '',
  });

  const propertyTypes = ['apartment', 'villa', 'commercial', 'land'];
  const commonLocations = [
    'Manhattan New York', 'Brooklyn New York', 'Miami Beach Florida', 'Los Angeles California',
    'Chicago Illinois', 'San Francisco California', 'Boston Massachusetts', 'Seattle Washington'
  ];

  const handleFindMatches = async () => {
    if (!selectedLead && (!customPreferences.budget.min || !customPreferences.budget.max)) {
      toast.error('Please select a lead or enter budget range');
      return;
    }

    setIsLoading(true);
    try {
      let preferences;
      
      if (selectedLead) {
        const lead = leads.find(l => l.id === selectedLead);
        if (!lead) return;
        preferences = {
          budget: lead.budget,
          type: lead.preferences.type,
          locations: lead.preferences.locations,
          bedrooms: lead.preferences.bedrooms,
        };
      } else {
        preferences = {
          budget: {
            min: parseInt(customPreferences.budget.min),
            max: parseInt(customPreferences.budget.max),
          },
          type: customPreferences.type,
          locations: customPreferences.locations,
          bedrooms: customPreferences.bedrooms ? parseInt(customPreferences.bedrooms) : undefined,
        };
      }

      const matchResults = await getPropertyMatches('custom', preferences, properties);
      setMatches(matchResults);
      toast.success(`Found ${matchResults.length} matching properties!`);
    } catch (error) {
      console.error('Matching failed:', error);
      toast.error('Failed to find matches. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getMatchedProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-black" />
            Property Matchmaking
          </h2>
          <p className="text-muted-foreground">
            AI-powered property matching engine for perfect buyer-property combinations
          </p>
        </div>
        <Badge variant="outline" className="border-black text-black">
          <Sparkles className="mr-1 h-3 w-3" />
          AI Matching
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Matching Criteria */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Matching Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Select Existing Lead */}
            <div className="space-y-2">
              <Label>Select Existing Lead</Label>
              <Select value={selectedLead} onValueChange={setSelectedLead}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a lead" />
                </SelectTrigger>
                <SelectContent>
                  {leads.map((lead) => (
                    <SelectItem key={lead.id} value={lead.id}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {lead.name} - {formatPrice(lead.budget.max)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-center text-sm text-gray-500">
              OR
            </div>

            {/* Custom Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium">Custom Preferences</h4>
              
              {/* Budget Range */}
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min ($)"
                    value={customPreferences.budget.min}
                    onChange={(e) => setCustomPreferences(prev => ({
                      ...prev,
                      budget: { ...prev.budget, min: e.target.value }
                    }))}
                    disabled={!!selectedLead}
                  />
                  <Input
                    placeholder="Max ($)"
                    value={customPreferences.budget.max}
                    onChange={(e) => setCustomPreferences(prev => ({
                      ...prev,
                      budget: { ...prev.budget, max: e.target.value }
                    }))}
                    disabled={!!selectedLead}
                  />
                </div>
              </div>

              {/* Property Types */}
              <div className="space-y-2">
                <Label>Property Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type}
                      variant={customPreferences.type.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedLead) return;
                        setCustomPreferences(prev => ({
                          ...prev,
                          type: prev.type.includes(type)
                            ? prev.type.filter(t => t !== type)
                            : [...prev.type, type]
                        }));
                      }}
                      disabled={!!selectedLead}
                      className={customPreferences.type.includes(type) ? "bg-black text-white" : ""}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {commonLocations.map((location) => (
                    <Button
                      key={location}
                      variant={customPreferences.locations.includes(location) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedLead) return;
                        setCustomPreferences(prev => ({
                          ...prev,
                          locations: prev.locations.includes(location)
                            ? prev.locations.filter(l => l !== location)
                            : [...prev.locations, location]
                        }));
                      }}
                      disabled={!!selectedLead}
                      className={`w-full justify-start text-xs ${
                        customPreferences.locations.includes(location) ? "bg-black text-white" : ""
                      }`}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  value={customPreferences.bedrooms}
                  onChange={(e) => setCustomPreferences(prev => ({
                    ...prev,
                    bedrooms: e.target.value
                  }))}
                  disabled={!!selectedLead}
                />
              </div>
            </div>

            {/* Find Matches Button */}
            <Button 
              onClick={handleFindMatches}
              disabled={isLoading || (!selectedLead && (!customPreferences.budget.min || !customPreferences.budget.max))}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Find Matches
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Match Results */}
        <div className="lg:col-span-2 space-y-4">
          {matches.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
              <p className="text-muted-foreground">
                Set your criteria and click "Find Matches" to discover perfect property matches
              </p>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Found {matches.length} matching properties
                </h3>
                <Badge variant="secondary">
                  AI Scored
                </Badge>
              </div>

              <div className="space-y-4">
                {matches.map((match) => {
                  const property = getMatchedProperty(match.propertyId);
                  if (!property) return null;

                  return (
                    <Card key={match.propertyId} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{property.title}</h4>
                              <Badge className={getScoreColor(match.matchScore)}>
                                {match.matchScore}% Match
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="mr-1 h-3 w-3" />
                              {property.location}
                            </div>
                            <div className="text-xl font-bold text-black mb-2">
                              {formatPrice(property.price)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast.success('Property saved to favorites!');
                            }}>
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast.success('Property link copied to clipboard!');
                            }}>
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-muted-foreground">
                          {property.bedrooms && (
                            <div className="flex items-center">
                              <Bed className="mr-1 h-3 w-3" />
                              {property.bedrooms} beds
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center">
                              <Bath className="mr-1 h-3 w-3" />
                              {property.bathrooms} baths
                            </div>
                          )}
                          <div className="flex items-center">
                            <Square className="mr-1 h-3 w-3" />
                            {property.area} sq ft
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">Why this matches:</h5>
                          <div className="flex flex-wrap gap-1">
                            {match.reasons.map((reason: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Match Scores */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">Price</div>
                            <div className="text-xs text-muted-foreground">
                              {(match.priceAlignment * 100).toFixed(0)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Location</div>
                            <div className="text-xs text-muted-foreground">
                              {(match.locationMatch * 100).toFixed(0)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Features</div>
                            <div className="text-xs text-muted-foreground">
                              {(match.featureMatch * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => {
                            toast.info('Viewing property details');
                          }}>
                            View Details
                          </Button>
                          <Button className="flex-1 bg-black text-white hover:bg-gray-800" onClick={() => {
                            toast.success('Property shared with client!');
                          }}>
                            Share with Client
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}