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
import { getPropertyValuation } from '@/lib/ai-services';
import { ImageUpload } from './image-upload';
import { CloudinaryUploadResult } from '@/lib/cloudinary';
import { toast } from 'sonner';
import {
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Camera,
  Sparkles,
  Save,
  X,
  Plus,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface AddPropertyFormProps {
  onClose: () => void;
  editProperty?: any;
}

export function AddPropertyForm({ onClose, editProperty }: AddPropertyFormProps) {
  const { addProperty, updateProperty } = useEstateStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingValuation, setIsGettingValuation] = useState(false);
  const [aiValuation, setAiValuation] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: editProperty?.title || '',
    description: editProperty?.description || '',
    price: editProperty?.price || '',
    location: editProperty?.location || '',
    type: editProperty?.type || '',
    bedrooms: editProperty?.bedrooms || '',
    bathrooms: editProperty?.bathrooms || '',
    area: editProperty?.area || '',
    yearBuilt: editProperty?.yearBuilt || '',
    status: editProperty?.status || 'active',
    amenities: editProperty?.amenities || [],
    images: editProperty?.images || [],
    features: {
      parking: editProperty?.features?.parking || false,
      furnished: editProperty?.features?.furnished || false,
      petFriendly: editProperty?.features?.petFriendly || false,
      garden: editProperty?.features?.garden || false,
      balcony: editProperty?.features?.balcony || false,
      elevator: editProperty?.features?.elevator || false,
    },
    contact: {
      ownerName: editProperty?.contact?.ownerName || '',
      ownerPhone: editProperty?.contact?.ownerPhone || '',
      ownerEmail: editProperty?.contact?.ownerEmail || '',
    },
    legal: {
      propertyId: editProperty?.legal?.propertyId || '',
      registrationNumber: editProperty?.legal?.registrationNumber || '',
      approvals: editProperty?.legal?.approvals || [],
    }
  });

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' },
    { value: 'draft', label: 'Draft' },
  ];

  const commonAmenities = [
    'Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking',
    'Elevator', 'Balcony', 'AC', 'Furnished', 'City Views',
    'Ocean Views', 'Concierge', 'Spa', 'Tennis Court', 'Golf Course'
  ];

  const legalApprovals = [
    'Building Plan Approval',
    'Occupancy Certificate',
    'NOC from Fire Department',
    'Environmental Clearance',
    'RERA Registration',
    'Khata Certificate',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev], [field]: value }
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleApprovalToggle = (approval: string) => {
    setFormData(prev => ({
      ...prev,
      legal: {
        ...prev.legal,
        approvals: prev.legal.approvals.includes(approval)
          ? prev.legal.approvals.filter(a => a !== approval)
          : [...prev.legal.approvals, approval]
      }
    }));
  };

  const handleImagesUploaded = (images: CloudinaryUploadResult[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const getAIValuation = async () => {
    if (!formData.location || !formData.area || !formData.type) {
      toast.error('Please fill in location, area, and property type first');
      return;
    }

    setIsGettingValuation(true);
    try {
      const valuation = await getPropertyValuation({
        location: formData.location,
        area: parseInt(formData.area),
        type: formData.type,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        amenities: formData.amenities,
      });
      
      setAiValuation(valuation);
      if (!formData.price) {
        setFormData(prev => ({ ...prev, price: valuation.estimatedValue.toString() }));
      }
      toast.success('AI valuation completed successfully!');
    } catch (error) {
      console.error('Valuation failed:', error);
      toast.error('Failed to get AI valuation. Please try again.');
    } finally {
      setIsGettingValuation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: formData.location,
        type: formData.type as any,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        area: parseInt(formData.area),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        status: formData.status as any,
        amenities: formData.amenities,
        images: formData.images,
        aiValuation: aiValuation?.estimatedValue,
        confidence: aiValuation?.confidence,
        features: formData.features,
        contact: formData.contact,
        legal: formData.legal,
      };

      if (editProperty) {
        updateProperty(editProperty.id, propertyData);
        toast.success('Property updated successfully!');
      } else {
        addProperty(propertyData);
        toast.success('Property added successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Failed to save property:', error);
      toast.error('Failed to save property. Please try again.');
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold">
            {editProperty ? 'Edit Property' : 'Add New Property'}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Luxury 3BR Apartment in Manhattan"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the property features, location benefits, and unique selling points..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="e.g., Manhattan New York, Miami Beach Florida"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Square className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="1200"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="3"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
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
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="2020"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label>Property Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(formData.features).map(([feature, checked]) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={checked}
                        onCheckedChange={(value) => handleNestedInputChange('features', feature, value)}
                      />
                      <Label htmlFor={feature} className="text-sm capitalize">
                        {feature.replace(/([A-Z])/g, ' $1')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
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
            </CardContent>
          </Card>

          {/* Pricing & Valuation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & AI Valuation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="850000"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                  {formData.price && (
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(parseInt(formData.price))}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>AI Valuation</Label>
                  <Button
                    type="button"
                    onClick={getAIValuation}
                    disabled={isGettingValuation || !formData.location || !formData.area || !formData.type}
                    variant="outline"
                    className="w-full"
                  >
                    {isGettingValuation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Valuation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get AI Valuation
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {aiValuation && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">AI Valuation Result</h4>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {(aiValuation.confidence * 100).toFixed(0)}% Confidence
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(aiValuation.estimatedValue)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {aiValuation.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Property Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Property Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload 
                onImagesUploaded={handleImagesUploaded}
                existingImages={formData.images}
                maxFiles={10}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    placeholder="Property owner name"
                    value={formData.contact.ownerName}
                    onChange={(e) => handleNestedInputChange('contact', 'ownerName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Owner Phone</Label>
                  <Input
                    id="ownerPhone"
                    placeholder="+1 555-123-4567"
                    value={formData.contact.ownerPhone}
                    onChange={(e) => handleNestedInputChange('contact', 'ownerPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Owner Email</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="owner@email.com"
                    value={formData.contact.ownerEmail}
                    onChange={(e) => handleNestedInputChange('contact', 'ownerEmail', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="propertyId">Property ID</Label>
                  <Input
                    id="propertyId"
                    placeholder="Unique property identifier"
                    value={formData.legal.propertyId}
                    onChange={(e) => handleNestedInputChange('legal', 'propertyId', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Government registration number"
                    value={formData.legal.registrationNumber}
                    onChange={(e) => handleNestedInputChange('legal', 'registrationNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Legal Approvals</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {legalApprovals.map((approval) => (
                    <div key={approval} className="flex items-center space-x-2">
                      <Checkbox
                        id={approval}
                        checked={formData.legal.approvals.includes(approval)}
                        onCheckedChange={() => handleApprovalToggle(approval)}
                      />
                      <Label htmlFor={approval} className="text-sm">{approval}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-black text-white hover:bg-gray-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editProperty ? 'Update Property' : 'Add Property'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}