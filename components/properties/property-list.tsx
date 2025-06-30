'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEstateStore } from '@/lib/store';
import { AddPropertyForm } from './add-property-form';
import { toast } from 'sonner';
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Sparkles,
  Calendar,
  DollarSign,
  MoreVertical,
  Image,
} from 'lucide-react';

export function PropertyList() {
  const { properties, deleteProperty } = useEstateStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'sold' | 'rented' | 'draft'>('all');
  const [filterType, setFilterType] = useState<'all' | 'apartment' | 'villa' | 'commercial' | 'land'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-high' | 'price-low' | 'area'>('newest');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
      const matchesType = filterType === 'all' || property.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'area':
          return b.area - a.area;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    setShowAddForm(true);
  };

  const handleDelete = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      deleteProperty(propertyId);
      toast.success('Property deleted successfully!');
    }
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingProperty(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Properties</h2>
          <p className="text-muted-foreground">
            Manage your property portfolio with AI-powered insights
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold">
                  {properties.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">
                  {formatPrice(properties.reduce((sum, p) => sum + p.price, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Valuations</p>
                <p className="text-2xl font-bold">
                  {properties.filter(p => p.aiValuation).length}
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="area">Area: Largest First</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            List
          </Button>
        </div>
      </div>

      {/* Property Grid/List */}
      {filteredProperties.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Home className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first property'}
          </p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center relative">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0].secure_url} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Home className="h-16 w-16 text-blue-400" />
                )}
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                </div>
                {property.aiValuation && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Valued
                    </Badge>
                  </div>
                )}
                {property.images && property.images.length > 1 && (
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black text-white">
                      <Image className="mr-1 h-3 w-3" />
                      {property.images.length} Photos
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold leading-none tracking-tight line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {property.location}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </span>
                  {property.yearBuilt && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {property.yearBuilt}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="mr-1 h-3 w-3" />
                      {property.bedrooms}
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="mr-1 h-3 w-3" />
                      {property.bathrooms}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="mr-1 h-3 w-3" />
                    {property.area} sq ft
                  </div>
                </div>

                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.description}
                </p>
              </CardContent>
              
              <CardFooter className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                  toast.info('Viewing property details');
                }}>
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEdit(property)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <img 
                          src={property.images[0].secure_url} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Home className="h-8 w-8 text-blue-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{property.title}</h3>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                        {property.aiValuation && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            <Sparkles className="mr-1 h-3 w-3" />
                            AI
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        {property.location}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                        {property.yearBuilt && (
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {property.yearBuilt}
                          </div>
                        )}
                        {property.images && property.images.length > 0 && (
                          <div className="flex items-center">
                            <Image className="mr-1 h-3 w-3" />
                            {property.images.length} photos
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        toast.info('Viewing property details');
                      }}>
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(property)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Property Form */}
      {showAddForm && (
        <AddPropertyForm 
          onClose={closeForm}
          editProperty={editingProperty}
        />
      )}
    </div>
  );
}