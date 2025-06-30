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
import { getLeadScore } from '@/lib/ai-services';
import { toast } from 'sonner';
import {
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Home,
  Calendar,
  Target,
  Sparkles,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface AddLeadFormProps {
  onClose: () => void;
  editLead?: any;
}

export function AddLeadForm({ onClose, editLead }: AddLeadFormProps) {
  const { addLead, updateLead } = useEstateStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingScore, setIsGettingScore] = useState(false);
  const [aiScore, setAiScore] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: editLead?.name || '',
    email: editLead?.email || '',
    phone: editLead?.phone || '',
    source: editLead?.source || '',
    status: editLead?.status || 'new',
    budget: {
      min: editLead?.budget?.min || '',
      max: editLead?.budget?.max || '',
    },
    preferences: {
      type: editLead?.preferences?.type || [],
      locations: editLead?.preferences?.locations || [],
      bedrooms: editLead?.preferences?.bedrooms || '',
      urgency: editLead?.preferences?.urgency || 'medium',
    },
    notes: editLead?.notes || [],
    contact: {
      preferredTime: editLead?.contact?.preferredTime || '',
      preferredMethod: editLead?.contact?.preferredMethod || 'phone',
      language: editLead?.contact?.language || 'english',
    },
    demographics: {
      age: editLead?.demographics?.age || '',
      occupation: editLead?.demographics?.occupation || '',
      income: editLead?.demographics?.income || '',
      familySize: editLead?.demographics?.familySize || '',
    },
    requirements: {
      moveInDate: editLead?.requirements?.moveInDate || '',
      financing: editLead?.requirements?.financing || '',
      purpose: editLead?.requirements?.purpose || '',
      timeline: editLead?.requirements?.timeline || '',
    }
  });

  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social media', label: 'Social Media' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'cold call', label: 'Cold Call' },
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'event', label: 'Event' },
  ];

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' },
  ];

  const propertyTypes = [
    'Apartment', 'Villa', 'Commercial', 'Land', 'Penthouse', 'Studio'
  ];

  const commonLocations = [
    'Manhattan New York', 'Brooklyn New York', 'Los Angeles California', 'San Francisco California',
    'Miami Florida', 'Chicago Illinois', 'Boston Massachusetts', 'Seattle Washington',
    'Austin Texas', 'Denver Colorado'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low (6+ months)' },
    { value: 'medium', label: 'Medium (3-6 months)' },
    { value: 'high', label: 'High (Within 3 months)' },
  ];

  const contactMethods = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'sms', label: 'SMS' },
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
  ];

  const purposeOptions = [
    { value: 'primary', label: 'Primary Residence' },
    { value: 'investment', label: 'Investment' },
    { value: 'commercial', label: 'Commercial Use' },
    { value: 'vacation', label: 'Vacation Home' },
  ];

  const financingOptions = [
    { value: 'cash', label: 'Cash Payment' },
    { value: 'loan', label: 'Bank Loan' },
    { value: 'partial', label: 'Partial Financing' },
    { value: 'undecided', label: 'Undecided' },
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

  const handleArrayToggle = (parent: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: (prev[parent as keyof typeof prev] as any)[field].includes(value)
          ? (prev[parent as keyof typeof prev] as any)[field].filter((item: string) => item !== value)
          : [...(prev[parent as keyof typeof prev] as any)[field], value]
      }
    }));
  };

  const getAIScore = async () => {
    if (!formData.email || !formData.budget.min || !formData.budget.max) {
      toast.error('Please fill in email and budget range first');
      return;
    }

    setIsGettingScore(true);
    try {
      const score = await getLeadScore({
        budget: {
          min: parseInt(formData.budget.min),
          max: parseInt(formData.budget.max),
        },
        preferences: {
          type: formData.preferences.type,
          locations: formData.preferences.locations,
          urgency: formData.preferences.urgency as any,
        },
        source: formData.source,
        email: formData.email,
        phone: formData.phone,
      });
      
      setAiScore(score);
      toast.success('AI lead score generated successfully!');
    } catch (error) {
      console.error('Scoring failed:', error);
      toast.error('Failed to generate AI score. Please try again.');
    } finally {
      setIsGettingScore(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: formData.source,
        status: formData.status as any,
        budget: {
          min: parseInt(formData.budget.min),
          max: parseInt(formData.budget.max),
        },
        preferences: {
          type: formData.preferences.type,
          locations: formData.preferences.locations,
          bedrooms: formData.preferences.bedrooms ? parseInt(formData.preferences.bedrooms) : undefined,
          urgency: formData.preferences.urgency as any,
        },
        score: aiScore?.score || 50,
        notes: formData.notes,
        contact: formData.contact,
        demographics: formData.demographics,
        requirements: formData.requirements,
      };

      if (editLead) {
        updateLead(editLead.id, leadData);
        toast.success('Lead updated successfully!');
      } else {
        addLead(leadData);
        toast.success('Lead added successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Failed to save lead:', error);
      toast.error('Failed to save lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatBudget = (min: string, max: string) => {
    if (!min || !max) return '';
    const formatPrice = (price: number) => {
      if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
      if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
      return `$${price.toLocaleString()}`;
    };
    return `${formatPrice(parseInt(min))} - ${formatPrice(parseInt(max))}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editLead ? 'Edit Lead' : 'Add New Lead'}
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
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      placeholder="+1 555-123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source</Label>
                  <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceOptions.map((source) => (
                        <SelectItem key={source.value} value={source.value}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>
            </CardContent>
          </Card>

          {/* Budget & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Minimum Budget ($) *</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="500000"
                    value={formData.budget.min}
                    onChange={(e) => handleNestedInputChange('budget', 'min', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Maximum Budget ($) *</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="1000000"
                    value={formData.budget.max}
                    onChange={(e) => handleNestedInputChange('budget', 'max', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    {formatBudget(formData.budget.min, formData.budget.max) || 'Enter budget range'}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Preferred Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="3"
                    value={formData.preferences.bedrooms}
                    onChange={(e) => handleNestedInputChange('preferences', 'bedrooms', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select 
                    value={formData.preferences.urgency} 
                    onValueChange={(value) => handleNestedInputChange('preferences', 'urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Property Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.preferences.type.includes(type)}
                        onCheckedChange={() => handleArrayToggle('preferences', 'type', type)}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {commonLocations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={formData.preferences.locations.includes(location)}
                        onCheckedChange={() => handleArrayToggle('preferences', 'locations', location)}
                      />
                      <Label htmlFor={location} className="text-sm">{location}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Lead Scoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI Lead Scoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered lead quality score based on budget, preferences, and behavior
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={getAIScore}
                  disabled={isGettingScore || !formData.email || !formData.budget.min || !formData.budget.max}
                  variant="outline"
                >
                  {isGettingScore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scoring...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get AI Score
                    </>
                  )}
                </Button>
              </div>

              {aiScore && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Lead Quality Score</h4>
                    <Badge className={
                      aiScore.score >= 80 ? 'bg-green-100 text-green-800' :
                      aiScore.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {aiScore.score}% Quality Score
                    </Badge>
                  </div>
                  
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium mb-2">Recommendation:</p>
                      <p className="text-sm text-muted-foreground">{aiScore.recommendation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Next Actions:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {aiScore.nextActions.map((action: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="preferredMethod">Preferred Contact Method</Label>
                  <Select 
                    value={formData.contact.preferredMethod} 
                    onValueChange={(value) => handleNestedInputChange('contact', 'preferredMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contactMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Contact Time</Label>
                  <Input
                    id="preferredTime"
                    placeholder="e.g., 10 AM - 6 PM"
                    value={formData.contact.preferredTime}
                    onChange={(e) => handleNestedInputChange('contact', 'preferredTime', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select 
                    value={formData.contact.language} 
                    onValueChange={(value) => handleNestedInputChange('contact', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Demographics (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="35"
                    value={formData.demographics.age}
                    onChange={(e) => handleNestedInputChange('demographics', 'age', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    value={formData.demographics.occupation}
                    onChange={(e) => handleNestedInputChange('demographics', 'occupation', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    placeholder="$150,000"
                    value={formData.demographics.income}
                    onChange={(e) => handleNestedInputChange('demographics', 'income', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familySize">Family Size</Label>
                  <Input
                    id="familySize"
                    type="number"
                    placeholder="4"
                    value={formData.demographics.familySize}
                    onChange={(e) => handleNestedInputChange('demographics', 'familySize', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purchase Purpose</Label>
                  <Select 
                    value={formData.requirements.purpose} 
                    onValueChange={(value) => handleNestedInputChange('requirements', 'purpose', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposeOptions.map((purpose) => (
                        <SelectItem key={purpose.value} value={purpose.value}>
                          {purpose.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="financing">Financing Method</Label>
                  <Select 
                    value={formData.requirements.financing} 
                    onValueChange={(value) => handleNestedInputChange('requirements', 'financing', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select financing" />
                    </SelectTrigger>
                    <SelectContent>
                      {financingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.requirements.moveInDate}
                    onChange={(e) => handleNestedInputChange('requirements', 'moveInDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Decision Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g., Within 3 months"
                    value={formData.requirements.timeline}
                    onChange={(e) => handleNestedInputChange('requirements', 'timeline', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any additional notes about the lead, special requirements, or conversation highlights..."
                rows={3}
              />
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
                  {editLead ? 'Update Lead' : 'Add Lead'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}