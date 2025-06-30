'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useEstateStore } from '@/lib/store';
import {
  User,
  Home,
  MessageCircle,
  Calendar,
  FileText,
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
} from 'lucide-react';

export function ClientPortal() {
  const { properties, leads } = useEstateStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'documents' | 'messages' | 'visits'>('properties');

  // Mock client data - in real app this would come from props or context
  const clientData = {
    id: 'client-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    agent: {
      name: 'Rajesh Kumar',
      email: 'rajesh@quinex.ai',
      phone: '+91 87654 32109',
      avatar: 'RK'
    },
    preferences: {
      budget: { min: 20000000, max: 35000000 },
      type: ['villa', 'apartment'],
      locations: ['Mumbai Central', 'Delhi NCR'],
      bedrooms: 3
    },
    matchedProperties: properties.slice(0, 3),
    documents: [
      {
        id: 'doc-1',
        name: 'Property Shortlist Report',
        type: 'report',
        status: 'completed',
        date: new Date('2024-01-15'),
        url: '/documents/shortlist-report.pdf'
      },
      {
        id: 'doc-2',
        name: 'Loan Pre-approval Letter',
        type: 'financial',
        status: 'pending',
        date: new Date('2024-01-20'),
        url: null
      },
      {
        id: 'doc-3',
        name: 'Property Valuation Report',
        type: 'valuation',
        status: 'in_progress',
        date: new Date('2024-01-18'),
        url: null
      }
    ],
    visits: [
      {
        id: 'visit-1',
        propertyId: properties[0]?.id,
        propertyName: properties[0]?.title,
        date: new Date('2024-01-25'),
        time: '10:00 AM',
        status: 'scheduled',
        notes: 'First viewing - focus on layout and amenities'
      },
      {
        id: 'visit-2',
        propertyId: properties[1]?.id,
        propertyName: properties[1]?.title,
        date: new Date('2024-01-22'),
        time: '2:00 PM',
        status: 'completed',
        notes: 'Client loved the location, concerned about price'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        from: 'agent',
        content: 'Hi Priya! I\'ve found 3 new properties that match your criteria. Would you like to schedule viewings?',
        timestamp: new Date('2024-01-20T10:30:00'),
        read: true
      },
      {
        id: 'msg-2',
        from: 'client',
        content: 'Yes, I\'m particularly interested in the Mumbai Central villa. Can we see it this weekend?',
        timestamp: new Date('2024-01-20T11:15:00'),
        read: true
      },
      {
        id: 'msg-3',
        from: 'agent',
        content: 'Perfect! I\'ve scheduled a viewing for Saturday at 10 AM. I\'ll send you the property details and directions.',
        timestamp: new Date('2024-01-20T11:45:00'),
        read: false
      }
    ]
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const tabs = [
    { id: 'properties', label: 'Matched Properties', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'visits', label: 'Site Visits', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {clientData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome, {clientData.name}</h1>
                <p className="text-muted-foreground">Your property search dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Your Agent</p>
                <p className="text-sm text-muted-foreground">{clientData.agent.name}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-black text-white">
                  {clientData.agent.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Matched Properties</p>
                  <p className="text-2xl font-bold">{clientData.matchedProperties.length}</p>
                </div>
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Site Visits</p>
                  <p className="text-2xl font-bold">{clientData.visits.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="text-2xl font-bold">{clientData.documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{clientData.messages.filter(m => !m.read).length}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 ${activeTab === tab.id ? 'bg-black text-white' : ''}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Matched Properties</h2>
              <Badge variant="secondary">
                {clientData.matchedProperties.length} matches found
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clientData.matchedProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
                    <Home className="h-16 w-16 text-blue-400" />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {property.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-blue-600 mb-3">
                      {formatPrice(property.price)}
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

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-black text-white hover:bg-gray-800">
                        Schedule Visit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Documents</h2>
            
            <div className="grid gap-4">
              {clientData.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <FileText className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status.replace('_', ' ')}</span>
                        </Badge>
                        
                        {doc.url && (
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Messages with Your Agent</h2>
              <Button className="bg-black text-white hover:bg-gray-800">
                <MessageCircle className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {clientData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.from === 'client' 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-3`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.from === 'client' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Site Visits</h2>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
            </div>
            
            <div className="grid gap-4">
              {clientData.visits.map((visit) => (
                <Card key={visit.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Calendar className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{visit.propertyName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {visit.date.toLocaleDateString()} at {visit.time}
                          </p>
                          {visit.notes && (
                            <p className="text-sm text-gray-600 mt-1">{visit.notes}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(visit.status)}>
                          {getStatusIcon(visit.status)}
                          <span className="ml-1 capitalize">{visit.status}</span>
                        </Badge>
                        
                        {visit.status === 'scheduled' && (
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Agent */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Your Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-black text-white">
                    {clientData.agent.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{clientData.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">Your Real Estate Agent</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-1 h-3 w-3" />
                      {clientData.agent.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-1 h-3 w-3" />
                      {clientData.agent.phone}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}