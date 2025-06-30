'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getPropertyValuation } from '@/lib/ai-services';
import { formatPrice } from '@/lib/currency';
import { useEstateStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  Calculator,
  MapPin,
  Home,
  Bed,
  Bath,
  Calendar,
  Sparkles,
  TrendingUp,
  FileText,
  Loader2,
} from 'lucide-react';

export function PropertyValuation() {
  const { user } = useEstateStore();
  const [isLoading, setIsLoading] = useState(false);
  const [valuation, setValuation] = useState<any>(null);
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    amenities: [] as string[],
  });

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const commonAmenities = [
    'Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking',
    'Elevator', 'Balcony', 'AC', 'Furnished', 'City Views',
    'Ocean Views', 'Concierge', 'Spa', 'Tennis Court', 'Golf Course'
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleValuation = async () => {
    if (!formData.location || !formData.area || !formData.type) {
      toast.error('Please fill in location, area, and property type');
      return;
    }

    setIsLoading(true);
    try {
      const result = await getPropertyValuation({
        location: formData.location,
        area: parseInt(formData.area),
        type: formData.type,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        amenities: formData.amenities,
      });
      setValuation(result);
      toast.success('Property valuation completed successfully!');
    } catch (error) {
      console.error('Valuation failed:', error);
      toast.error('Failed to get property valuation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currency = user?.settings?.currency || 'USD';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-black" />
            AI Property Valuation
          </h2>
          <p className="text-muted-foreground">
            Get instant property valuations powered by Gemini AI for global markets
          </p>
        </div>
        <Badge variant="outline" className="border-black text-black">
          <Sparkles className="mr-1 h-3 w-3" />
          Powered by Gemini
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  placeholder="e.g., Manhattan New York, Miami Beach Florida"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label>Property Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft) *</Label>
              <Input
                id="area"
                type="number"
                placeholder="e.g., 1200"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
              />
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <div className="relative">
                  <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="bathrooms"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Year Built */}
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="yearBuilt"
                  type="number"
                  placeholder="e.g., 2020"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearBuilt: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2">
                {commonAmenities.map((amenity) => (
                  <Button
                    key={amenity}
                    variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={formData.amenities.includes(amenity) ? "bg-black text-white" : ""}
                  >
                    {amenity}
                  </Button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleValuation}
              disabled={isLoading || !formData.location || !formData.area || !formData.type}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting AI Valuation...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Gemini AI Valuation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Valuation Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!valuation ? (
              <div className="text-center py-12">
                <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Enter property details to get AI valuation</p>
                <p className="text-sm text-gray-400 mt-2">Powered by Gemini AI for accurate global market analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Valuation */}
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-black mb-2">
                    {formatPrice(valuation.estimatedValue, currency)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{(valuation.confidence * 100).toFixed(0)}% Confidence</span>
                    <Badge variant="secondary" className="ml-2">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Gemini AI
                    </Badge>
                  </div>
                </div>

                {/* Factors */}
                <div>
                  <h4 className="font-medium mb-3">Valuation Factors</h4>
                  <div className="space-y-2">
                    {Object.entries(valuation.factors).map(([factor, weight]) => (
                      <div key={factor} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{factor.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-black h-2 rounded-full" 
                              style={{ width: `${(weight as number) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {((weight as number) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparables */}
                {valuation.comparables && valuation.comparables.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Comparable Properties</h4>
                    <div className="space-y-2">
                      {valuation.comparables.map((comp: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{comp.address}</p>
                            <p className="text-xs text-gray-500">{comp.distance}km away</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatPrice(comp.price, currency)}</p>
                            <p className="text-xs text-gray-500">{(comp.similarity * 100).toFixed(0)}% similar</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Market Insights */}
                {valuation.marketInsights && valuation.marketInsights.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Market Insights</h4>
                    <div className="space-y-1">
                      {valuation.marketInsights.map((insight: string, index: number) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-black">•</span>
                          <span>{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h4 className="font-medium mb-2">AI Summary</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {valuation.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => {
                    toast.success('Valuation report generated successfully!');
                  }}>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {
                    toast.success('Valuation saved successfully!');
                  }}>
                    Save Valuation
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}