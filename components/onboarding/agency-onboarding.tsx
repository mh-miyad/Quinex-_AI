'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Building2,
  Users,
  Palette,
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
}

export function AgencyOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    companyDescription: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    
    // Branding
    logo: null as File | null,
    primaryColor: '#000000',
    secondaryColor: '#666666',
    subdomain: '',
    
    // Team Setup
    teamMembers: [
      { name: '', email: '', role: 'agent' }
    ],
    
    // Services
    services: [] as string[],
    markets: [] as string[],
    
    // Preferences
    notifications: {
      email: true,
      whatsapp: false,
      sms: false,
    },
    integrations: {
      whatsapp: false,
      googleCalendar: false,
      crm: false,
    }
  });

  const steps: OnboardingStep[] = [
    {
      id: 'company',
      title: 'Company Information',
      description: 'Tell us about your real estate agency',
      icon: Building2,
      completed: false,
    },
    {
      id: 'branding',
      title: 'Brand Customization',
      description: 'Customize your platform appearance',
      icon: Palette,
      completed: false,
    },
    {
      id: 'team',
      title: 'Team Setup',
      description: 'Add your team members and agents',
      icon: Users,
      completed: false,
    },
    {
      id: 'services',
      title: 'Services & Markets',
      description: 'Configure your service offerings',
      icon: Settings,
      completed: false,
    },
  ];

  const serviceOptions = [
    'Residential Sales',
    'Commercial Sales',
    'Property Rentals',
    'Property Management',
    'Investment Advisory',
    'Property Valuation',
    'Legal Documentation',
    'Mortgage Assistance',
  ];

  const marketOptions = [
    'Mumbai',
    'Delhi NCR',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Karachi',
    'Lahore',
    'Dhaka',
    'Colombo',
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

  const handleArrayToggle = (field: 'services' | 'markets', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', email: '', role: 'agent' }]
    }));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Handle onboarding completion
    console.log('Onboarding completed:', formData);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome to Quinex</h1>
          <p className="text-gray-600">Let's set up your real estate agency in just a few steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-gray-500">{currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isActive ? 'bg-black text-white' :
                    isCompleted ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(steps[currentStep].icon, { className: "h-6 w-6" })}
              <span>{steps[currentStep].title}</span>
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Your Real Estate Agency"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    placeholder="Brief description of your real estate agency..."
                    value={formData.companyDescription}
                    onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@yourcompany.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <Textarea
                      id="address"
                      placeholder="Your business address..."
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Branding */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Upload your company logo</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="primaryColor"
                          value={formData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={formData.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                          placeholder="#666666"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Custom Subdomain</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="subdomain"
                        placeholder="yourcompany"
                        value={formData.subdomain}
                        onChange={(e) => handleInputChange('subdomain', e.target.value)}
                      />
                      <span className="text-gray-500">.quinex.ai</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your clients will access your portal at {formData.subdomain || 'yourcompany'}.quinex.ai
                    </p>
                  </div>
                </div>

                {/* Preview */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Preview</h4>
                  <div className="bg-white rounded border p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: formData.primaryColor }}
                      ></div>
                      <span className="font-semibold">{formData.companyName || 'Your Company'}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.companyDescription || 'Your company description will appear here'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Team Setup */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Team Members</h4>
                  <Button onClick={addTeamMember} variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="grid gap-3 md:grid-cols-4 p-3 border rounded-lg">
                      <Input
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      />
                      <select
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        className="px-3 py-2 border rounded-md"
                      >
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      {formData.teamMembers.length > 1 && (
                        <Button
                          onClick={() => removeTeamMember(index)}
                          variant="outline"
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Services & Markets */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Services Offered</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => handleArrayToggle('services', service)}
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Target Markets</h4>
                  <div className="grid gap-2 md:grid-cols-3">
                    {marketOptions.map((market) => (
                      <div key={market} className="flex items-center space-x-2">
                        <Checkbox
                          id={market}
                          checked={formData.markets.includes(market)}
                          onCheckedChange={() => handleArrayToggle('markets', market)}
                        />
                        <Label htmlFor={market} className="text-sm">{market}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-notifications"
                        checked={formData.notifications.email}
                        onCheckedChange={(checked) => handleNestedInputChange('notifications', 'email', checked)}
                      />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="whatsapp-notifications"
                        checked={formData.notifications.whatsapp}
                        onCheckedChange={(checked) => handleNestedInputChange('notifications', 'whatsapp', checked)}
                      />
                      <Label htmlFor="whatsapp-notifications">WhatsApp Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms-notifications"
                        checked={formData.notifications.sms}
                        onCheckedChange={(checked) => handleNestedInputChange('notifications', 'sms', checked)}
                      />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={completeOnboarding}
              className="bg-black text-white hover:bg-gray-800"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-black text-white hover:bg-gray-800"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}