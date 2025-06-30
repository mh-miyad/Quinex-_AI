'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { toast } from 'sonner';
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  DollarSign,
  Heart,
  Share2,
  Printer,
  Download,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Image,
  Info,
  Ruler,
  Shield,
  User,
} from 'lucide-react';

interface PropertyDetailProps {
  property: any;
  onBack: () => void;
}

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`);
    toast.success('Link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success('Property details downloaded!');
  };

  const handleContact = (method: string) => {
    toast.success(`Contacting owner via ${method}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">{property.title}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success('Property saved to favorites!')}>
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Property Images */}
      <Card>
        <CardContent className="p-6">
          {property.images && property.images.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <img 
                        src={image.secure_url} 
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <Image className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-500">No images available</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className={getStatusColor(property.status)}>
              {property.status}
            </Badge>
            <Badge variant="outline">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
            {property.aiValuation && (
              <Badge className="bg-purple-100 text-purple-800">
                <Sparkles className="mr-1 h-3 w-3" />
                AI Valued
              </Badge>
            )}
            {property.images && property.images.length > 0 && (
              <Badge variant="outline">
                <Image className="mr-1 h-3 w-3" />
                {property.images.length} Photos
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="legal">Legal</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="overview" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{property.title}</h3>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {property.location}
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 py-4 border-y">
                        {property.bedrooms && (
                          <div className="text-center">
                            <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">{property.bedrooms}</p>
                            <p className="text-xs text-muted-foreground">Bedrooms</p>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="text-center">
                            <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">{property.bathrooms}</p>
                            <p className="text-xs text-muted-foreground">Bathrooms</p>
                          </div>
                        )}
                        <div className="text-center">
                          <Square className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                          <p className="font-medium">{property.area}</p>
                          <p className="text-xs text-muted-foreground">Sq Ft</p>
                        </div>
                        {property.yearBuilt && (
                          <div className="text-center">
                            <Calendar className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">{property.yearBuilt}</p>
                            <p className="text-xs text-muted-foreground">Year Built</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground">
                          {property.description || 'No description available.'}
                        </p>
                      </div>
                      
                      {property.aiValuation && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            <h4 className="font-medium">AI Valuation</h4>
                            <Badge className="bg-purple-100 text-purple-800 ml-auto">
                              {property.confidence ? `${(property.confidence * 100).toFixed(0)}% Confidence` : 'AI Powered'}
                            </Badge>
                          </div>
                          <p className="text-xl font-bold text-purple-700 mb-1">
                            {formatPrice(property.aiValuation)}
                          </p>
                          <p className="text-sm text-purple-600">
                            This AI-powered valuation is based on location, property features, and current market conditions.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Property Details</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Basic Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Property Type</span>
                              <span className="font-medium">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Status</span>
                              <span className="font-medium capitalize">{property.status}</span>
                            </div>
                            {property.bedrooms && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Bedrooms</span>
                                <span className="font-medium">{property.bedrooms}</span>
                              </div>
                            )}
                            {property.bathrooms && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Bathrooms</span>
                                <span className="font-medium">{property.bathrooms}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Area</span>
                              <span className="font-medium">{property.area} sq ft</span>
                            </div>
                            {property.yearBuilt && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Year Built</span>
                                <span className="font-medium">{property.yearBuilt}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Location Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Address</span>
                              <span className="font-medium">{property.location}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Neighborhood</span>
                              <span className="font-medium">{property.location.split(',')[0]}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">City/State</span>
                              <span className="font-medium">{property.location.split(',')[1] || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Features & Amenities</h3>
                      
                      {property.amenities && property.amenities.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Amenities</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {property.amenities.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {property.features && Object.values(property.features).some(v => v) && (
                        <div>
                          <h4 className="font-medium mb-3">Property Features</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(property.features).map(([key, value]) => {
                              if (!value) return null;
                              return (
                                <div key={key} className="flex items-center gap-2 p-2 border rounded-md">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="legal" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Legal Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Property Identification</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Property ID</span>
                              <span className="font-medium">{property.legal?.propertyId || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Registration Number</span>
                              <span className="font-medium">{property.legal?.registrationNumber || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {property.legal?.approvals && property.legal.approvals.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Approvals & Certificates</h4>
                            <div className="space-y-2">
                              {property.legal.approvals.map((approval: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 py-2 border-b">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>{approval}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card>
            <CardHeader>
              <CardTitle>Price Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">Price per sq ft</span>
                <span className="font-medium">
                  {formatPrice(Math.round(property.price / property.area))}
                </span>
              </div>
              
              {property.aiValuation && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Valuation
                  </span>
                  <span className="font-medium">
                    {formatPrice(property.aiValuation)}
                  </span>
                </div>
              )}
              
              <div className="pt-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Make an Offer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {property.contact?.ownerName ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{property.contact.ownerName}</p>
                      <p className="text-sm text-muted-foreground">Property Owner</p>
                    </div>
                  </div>
                  
                  {property.contact.ownerPhone && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleContact('phone')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {property.contact.ownerPhone}
                    </Button>
                  )}
                  
                  {property.contact.ownerEmail && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleContact('email')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {property.contact.ownerEmail}
                    </Button>
                  )}
                  
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800"
                    onClick={() => handleContact('message')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-muted-foreground">No contact information available</p>
                  <Button 
                    className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                    onClick={() => toast.info('Contacting agent')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Agent
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Documents Card */}
          <Card>
            <CardHeader>
              <CardTitle>Property Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Property brochure downloaded')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Brochure
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Floor plan downloaded')}
                >
                  <Ruler className="mr-2 h-4 w-4" />
                  Floor Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Legal documents downloaded')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Legal Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}