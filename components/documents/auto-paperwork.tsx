'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  FileText,
  Globe,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Calendar,
  User,
  Building,
  Sparkles,
  Brain,
  Zap,
  ArrowRight,
  Languages,
  DollarSign,
  FileCheck,
  FileQuestion,
  HelpCircle,
  Lightbulb,
  Briefcase,
  Landmark,
  Scale,
  Flag,
} from 'lucide-react';

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  country: string;
  category: 'sale' | 'purchase' | 'lease' | 'legal' | 'registration';
  required: boolean;
  fields: string[];
  language: string;
  currency: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function AutoPaperwork() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);
  const [buyerCountry, setBuyerCountry] = useState<string>('');
  const [sellerCountry, setSellerCountry] = useState<string>('');
  const [propertyCountry, setPropertyCountry] = useState<string>('');
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [transactionType, setTransactionType] = useState<string>('sale');

  // Global document templates organized by country
  const documentTemplates: Record<string, DocumentTemplate[]> = {
    'US': [
      {
        id: 'purchase-agreement-us',
        name: 'Purchase Agreement',
        description: 'Standard real estate purchase contract for US properties',
        country: 'United States',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'USD',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'deposit_amount', 'closing_date', 'contingencies']
      },
      {
        id: 'disclosure-us',
        name: 'Seller Disclosure',
        description: 'Property condition disclosure statement',
        country: 'United States',
        category: 'legal',
        required: true,
        language: 'en',
        currency: 'USD',
        fields: ['seller_name', 'property_address', 'property_age', 'known_defects', 'environmental_issues']
      },
      {
        id: 'title-deed-us',
        name: 'Warranty Deed',
        description: 'Title transfer document',
        country: 'United States',
        category: 'registration',
        required: true,
        language: 'en',
        currency: 'USD',
        fields: ['buyer_name', 'seller_name', 'property_legal_description', 'consideration_amount', 'transfer_date']
      }
    ],
    'AE': [
      {
        id: 'mou-ae',
        name: 'Memorandum of Understanding',
        description: 'Initial agreement between buyer and seller',
        country: 'United Arab Emirates',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'AED',
        fields: ['buyer_name', 'seller_name', 'property_details', 'sale_price', 'deposit_amount', 'completion_date']
      },
      {
        id: 'form-f-ae',
        name: 'Form F',
        description: 'Dubai Land Department transfer application',
        country: 'United Arab Emirates',
        category: 'registration',
        required: true,
        language: 'en',
        currency: 'AED',
        fields: ['buyer_name', 'seller_name', 'property_details', 'sale_price', 'broker_details']
      },
      {
        id: 'noc-ae',
        name: 'No Objection Certificate (NOC)',
        description: 'Developer approval for property transfer',
        country: 'United Arab Emirates',
        category: 'legal',
        required: true,
        language: 'en',
        currency: 'AED',
        fields: ['developer_name', 'property_details', 'seller_name', 'buyer_name']
      }
    ],
    'UK': [
      {
        id: 'contract-uk',
        name: 'Contract of Sale',
        description: 'Standard property sale contract',
        country: 'United Kingdom',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'GBP',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'deposit_amount', 'completion_date']
      },
      {
        id: 'tr1-uk',
        name: 'TR1 Form',
        description: 'Land Registry transfer deed',
        country: 'United Kingdom',
        category: 'registration',
        required: true,
        language: 'en',
        currency: 'GBP',
        fields: ['buyer_name', 'seller_name', 'property_address', 'title_number', 'consideration_amount']
      },
      {
        id: 'sdlt-uk',
        name: 'SDLT Return',
        description: 'Stamp Duty Land Tax declaration',
        country: 'United Kingdom',
        category: 'legal',
        required: true,
        language: 'en',
        currency: 'GBP',
        fields: ['buyer_name', 'property_address', 'purchase_price', 'buyer_address', 'completion_date']
      }
    ],
    'SG': [
      {
        id: 'option-sg',
        name: 'Option to Purchase',
        description: 'Initial purchase option agreement',
        country: 'Singapore',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'SGD',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'option_fee', 'option_period']
      },
      {
        id: 'spa-sg',
        name: 'Sale & Purchase Agreement',
        description: 'Final property purchase contract',
        country: 'Singapore',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'SGD',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'completion_date', 'payment_terms']
      },
      {
        id: 'caveat-sg',
        name: 'Caveat Registration',
        description: 'Legal notice of buyer interest',
        country: 'Singapore',
        category: 'legal',
        required: false,
        language: 'en',
        currency: 'SGD',
        fields: ['buyer_name', 'property_address', 'caveat_date', 'consideration_amount']
      }
    ],
    'IN': [
      {
        id: 'agreement-to-sale-in',
        name: 'Agreement to Sale',
        description: 'Primary sale agreement document for property transactions',
        country: 'India',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'INR',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'advance_amount', 'completion_date']
      },
      {
        id: 'sale-deed-in',
        name: 'Sale Deed',
        description: 'Final ownership transfer document',
        country: 'India',
        category: 'registration',
        required: true,
        language: 'en',
        currency: 'INR',
        fields: ['buyer_name', 'seller_name', 'property_details', 'consideration_amount', 'registration_date']
      },
      {
        id: 'noc-in',
        name: 'No Objection Certificate (NOC)',
        description: 'Society/Builder NOC for property transfer',
        country: 'India',
        category: 'legal',
        required: false,
        language: 'en',
        currency: 'INR',
        fields: ['society_name', 'property_address', 'member_name', 'transfer_details']
      }
    ],
    'AU': [
      {
        id: 'contract-au',
        name: 'Contract of Sale',
        description: 'Standard property sale contract',
        country: 'Australia',
        category: 'sale',
        required: true,
        language: 'en',
        currency: 'AUD',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'deposit_amount', 'settlement_date']
      },
      {
        id: 'transfer-au',
        name: 'Transfer of Land',
        description: 'Land title transfer document',
        country: 'Australia',
        category: 'registration',
        required: true,
        language: 'en',
        currency: 'AUD',
        fields: ['buyer_name', 'seller_name', 'property_details', 'consideration_amount', 'settlement_date']
      },
      {
        id: 'vendor-statement-au',
        name: 'Vendor Statement',
        description: 'Seller disclosure document',
        country: 'Australia',
        category: 'legal',
        required: true,
        language: 'en',
        currency: 'AUD',
        fields: ['seller_name', 'property_details', 'title_details', 'encumbrances', 'services']
      }
    ]
  };

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
    { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  ];

  const transactionTypes = [
    { value: 'sale', label: 'Property Sale' },
    { value: 'purchase', label: 'Property Purchase' },
    { value: 'lease', label: 'Property Lease/Rental' },
    { value: 'investment', label: 'Investment Property' },
    { value: 'commercial', label: 'Commercial Property' },
  ];

  useEffect(() => {
    // When property country changes, update the selected country for document templates
    if (propertyCountry) {
      setSelectedCountry(propertyCountry);
      
      // Set default currency based on country
      const country = countries.find(c => c.code === propertyCountry);
      if (country) {
        setSelectedCurrency(country.currency);
      }
    }
  }, [propertyCountry]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setPropertyCountry(countryCode);
    setSelectedDocuments([]);
    setFormData({});
    setGeneratedDocs([]);
    setAiSuggestions(null);
  };

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getAllRequiredFields = () => {
    const templates = documentTemplates[selectedCountry] || [];
    const selectedTemplates = templates.filter(t => selectedDocuments.includes(t.id));
    const allFields = new Set<string>();
    
    selectedTemplates.forEach(template => {
      template.fields.forEach(field => allFields.add(field));
    });
    
    return Array.from(allFields);
  };

  const generateDocuments = async () => {
    setIsGenerating(true);
    
    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGeneratedDocs(selectedDocuments);
    setIsGenerating(false);
    
    toast.success('Documents generated successfully!');
  };

  const getAiSuggestions = async () => {
    setIsAiAssisting(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate AI suggestions based on transaction details
    const suggestions = {
      recommendedDocuments: [],
      legalConsiderations: [],
      taxImplications: [],
      requiredApprovals: [],
    };
    
    // Cross-border transaction detection
    const isCrossBorder = buyerCountry && propertyCountry && buyerCountry !== propertyCountry;
    
    if (isCrossBorder) {
      suggestions.legalConsiderations.push(
        'Cross-border transaction detected. Additional legal considerations apply.',
        'Foreign ownership restrictions may apply in the property country.',
        'Currency exchange considerations should be addressed in the contract.'
      );
      
      suggestions.taxImplications.push(
        'Potential for double taxation without proper planning.',
        'Foreign buyer may be subject to additional withholding taxes.',
        'Consider tax treaties between buyer and property countries.'
      );
      
      // Add recommended documents based on countries involved
      if (propertyCountry === 'US' && buyerCountry !== 'US') {
        suggestions.recommendedDocuments.push(
          'purchase-agreement-us',
          'disclosure-us',
          'title-deed-us',
          'firpta-us' // Foreign Investment in Real Property Tax Act
        );
        
        suggestions.requiredApprovals.push(
          'FIRPTA Withholding Certificate',
          'IRS Form 8288 filing'
        );
      } 
      else if (propertyCountry === 'AE') {
        suggestions.recommendedDocuments.push(
          'mou-ae',
          'form-f-ae',
          'noc-ae'
        );
        
        suggestions.requiredApprovals.push(
          'Security clearance for foreign buyers',
          'Dubai Land Department NOC'
        );
      }
      else if (propertyCountry === 'UK') {
        suggestions.recommendedDocuments.push(
          'contract-uk',
          'tr1-uk',
          'sdlt-uk'
        );
        
        suggestions.requiredApprovals.push(
          'Higher rate SDLT for foreign buyers',
          'UK property tax registration'
        );
      }
    } else {
      // Domestic transaction - recommend standard documents
      if (selectedCountry) {
        const templates = documentTemplates[selectedCountry] || [];
        const requiredTemplates = templates.filter(t => t.required);
        
        suggestions.recommendedDocuments = requiredTemplates.map(t => t.id);
        
        // Add country-specific considerations
        if (selectedCountry === 'US') {
          suggestions.legalConsiderations.push(
            'State-specific disclosure requirements may apply.',
            'Consider local zoning and use restrictions.'
          );
        } else if (selectedCountry === 'AE') {
          suggestions.legalConsiderations.push(
            'Ensure property is registered with Dubai Land Department.',
            'Check for service charges and community fees.'
          );
        } else if (selectedCountry === 'IN') {
          suggestions.legalConsiderations.push(
            'RERA registration verification is essential.',
            'Check for encumbrances and pending litigation.'
          );
        }
      }
    }
    
    setAiSuggestions(suggestions);
    
    // Auto-select recommended documents
    if (suggestions.recommendedDocuments.length > 0) {
      setSelectedDocuments(suggestions.recommendedDocuments as string[]);
    }
    
    setIsAiAssisting(false);
    
    toast.success('AI analysis completed!');
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      'buyer_name': 'Buyer Full Name',
      'seller_name': 'Seller Full Name',
      'property_address': 'Property Address',
      'sale_price': 'Sale Price',
      'deposit_amount': 'Deposit/Earnest Money',
      'advance_amount': 'Advance Amount',
      'completion_date': 'Completion Date',
      'closing_date': 'Closing Date',
      'settlement_date': 'Settlement Date',
      'property_details': 'Property Details',
      'consideration_amount': 'Consideration Amount',
      'registration_date': 'Registration Date',
      'society_name': 'Society/Building Name',
      'member_name': 'Member Name',
      'transfer_details': 'Transfer Details',
      'property_location': 'Property Location',
      'total_price': 'Total Price',
      'payment_terms': 'Payment Terms',
      'transferor_name': 'Transferor Name',
      'transferee_name': 'Transferee Name',
      'property_description': 'Property Description',
      'consideration': 'Consideration',
      'previous_owner': 'Previous Owner',
      'new_owner': 'New Owner',
      'land_details': 'Land Details',
      'mutation_reason': 'Mutation Reason',
      'old_owner_name': 'Old Owner Name',
      'new_owner_name': 'New Owner Name',
      'property_dag_khatian': 'Property Dag & Khatian',
      'transfer_date': 'Transfer Date',
      'vendor_name': 'Vendor Name',
      'purchaser_name': 'Purchaser Name',
      'property_schedule': 'Property Schedule',
      'purchase_price': 'Purchase Price',
      'transferor': 'Transferor',
      'transferee': 'Transferee',
      'mortgagor': 'Mortgagor',
      'mortgagee': 'Mortgagee',
      'loan_amount': 'Loan Amount',
      'interest_rate': 'Interest Rate',
      'property_age': 'Property Age',
      'known_defects': 'Known Defects',
      'environmental_issues': 'Environmental Issues',
      'property_legal_description': 'Legal Description',
      'contingencies': 'Contingencies',
      'broker_details': 'Broker Details',
      'developer_name': 'Developer Name',
      'option_fee': 'Option Fee',
      'option_period': 'Option Period',
      'caveat_date': 'Caveat Date',
      'title_number': 'Title Number',
      'buyer_address': 'Buyer Address',
      'title_details': 'Title Details',
      'encumbrances': 'Encumbrances',
      'services': 'Services',
    };
    return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const currentTemplates = documentTemplates[selectedCountry] || [];
  const requiredFields = getAllRequiredFields();

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-black" />
            Global Auto Paperwork Generator
          </h2>
          <p className="text-muted-foreground">
            Generate country-specific legal documents for international property transactions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-black text-black">
            <Globe className="mr-1 h-3 w-3" />
            Multi-Country Support
          </Badge>
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
      </motion.div>

      {/* Transaction Setup */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Transaction Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Property Country</Label>
                <Select value={propertyCountry} onValueChange={setPropertyCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where is the property located?" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Buyer Country</Label>
                <Select value={buyerCountry} onValueChange={setBuyerCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where is the buyer from?" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Seller Country</Label>
                <Select value={sellerCountry} onValueChange={setSellerCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where is the seller from?" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Document Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
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
                <Label>Currency</Label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.symbol}</span>
                          <span>{currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* AI Assistant Button */}
            <div className="flex justify-center mt-4">
              <Button 
                onClick={getAiSuggestions} 
                disabled={isAiAssisting || !propertyCountry || !buyerCountry}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                {isAiAssisting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Transaction...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Suggestions */}
      {aiSuggestions && (
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Transaction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cross-border alert if applicable */}
              {buyerCountry && propertyCountry && buyerCountry !== propertyCountry && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Cross-Border Transaction Detected</h4>
                      <p className="text-sm text-amber-700">
                        Buyer from {countries.find(c => c.code === buyerCountry)?.name} purchasing property in {countries.find(c => c.code === propertyCountry)?.name}. 
                        Special considerations apply.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Legal Considerations */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Legal Considerations</h4>
                  </div>
                  {aiSuggestions.legalConsiderations.length > 0 ? (
                    <ul className="space-y-2">
                      {aiSuggestions.legalConsiderations.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No special legal considerations identified.</p>
                  )}
                </div>
                
                {/* Tax Implications */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Tax Implications</h4>
                  </div>
                  {aiSuggestions.taxImplications.length > 0 ? (
                    <ul className="space-y-2">
                      {aiSuggestions.taxImplications.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Standard tax rules apply for this transaction.</p>
                  )}
                </div>
              </div>
              
              {/* Required Approvals */}
              {aiSuggestions.requiredApprovals.length > 0 && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium">Required Approvals</h4>
                  </div>
                  <ul className="space-y-2">
                    {aiSuggestions.requiredApprovals.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* AI Recommendations */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">AI Recommendation</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (aiSuggestions.recommendedDocuments.length > 0) {
                      setSelectedDocuments(aiSuggestions.recommendedDocuments as string[]);
                      toast.success('Recommended documents selected!');
                    }
                  }}
                  disabled={aiSuggestions.recommendedDocuments.length === 0}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Apply Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Country & Document Selection */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-blue-600" />
                Document Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Country Selection */}
              <div className="space-y-2">
                <Label>Select Country</Label>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Document Templates */}
              {selectedCountry && (
                <div className="space-y-3">
                  <Label>Required Documents</Label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {currentTemplates.map((template) => (
                      <div key={template.id} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-md">
                        <Checkbox
                          id={template.id}
                          checked={selectedDocuments.includes(template.id)}
                          onCheckedChange={() => handleDocumentToggle(template.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={template.id} className="text-sm font-medium cursor-pointer flex items-center gap-2">
                            {template.name}
                            {template.required && (
                              <Badge variant="secondary" className="text-xs">Required</Badge>
                            )}
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Globe className="mr-1 h-3 w-3" />
                              {template.country}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Languages className="mr-1 h-3 w-3" />
                              {languages.find(l => l.code === template.language)?.name || template.language}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedDocuments.length > 0 && (
                <Button
                  onClick={generateDocuments}
                  disabled={isGenerating || requiredFields.some(field => !formData[field])}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Documents...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Documents
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Fields */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-green-600" />
                Document Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requiredFields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Select country and documents to see required fields</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {requiredFields.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{getFieldLabel(field)}</Label>
                      {field.includes('date') ? (
                        <Input
                          id={field}
                          type="date"
                          value={formData[field] || ''}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                        />
                      ) : field.includes('amount') || field.includes('price') ? (
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id={field}
                            type="number"
                            placeholder="Enter amount"
                            value={formData[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="pl-10"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {getCurrencySymbol(selectedCurrency)}
                          </div>
                        </div>
                      ) : field.includes('details') || field.includes('description') || field.includes('schedule') ? (
                        <Textarea
                          id={field}
                          placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                          value={formData[field] || ''}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          rows={3}
                        />
                      ) : field.includes('address') ? (
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id={field}
                            placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                            value={formData[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      ) : field.includes('name') ? (
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id={field}
                            placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                            value={formData[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      ) : (
                        <Input
                          id={field}
                          placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                          value={formData[field] || ''}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated Documents */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-600" />
                Generated Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedDocs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Generated documents will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedDocs.map((docId) => {
                    const template = currentTemplates.find(t => t.id === docId);
                    if (!template) return null;
                    
                    return (
                      <div key={docId} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Ready
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.country}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                            toast.info('Previewing document');
                          }}>
                            <Eye className="mr-1 h-3 w-3" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                            toast.success('Document downloaded successfully!');
                          }}>
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900">Legal Notice</p>
                        <p className="text-blue-700 text-xs mt-1">
                          These documents are generated based on standard templates. 
                          Please review with a legal professional before execution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Country-Specific Guidelines */}
      {selectedCountry && (
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {countries.find(c => c.code === selectedCountry)?.name} Legal Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-2">Required Documents</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {currentTemplates.filter(t => t.required).map(template => (
                      <li key={template.id} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {template.name}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Important Notes</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {selectedCountry === 'US' && (
                      <>
                        <p>• Documents must be notarized</p>
                        <p>• Closing typically handled by escrow company</p>
                        <p>• Title insurance recommended</p>
                        <p>• State-specific requirements may apply</p>
                      </>
                    )}
                    {selectedCountry === 'AE' && (
                      <>
                        <p>• All transactions must be registered with Dubai Land Department</p>
                        <p>• 4% transfer fee applies (paid to DLD)</p>
                        <p>• NOC from developer required</p>
                        <p>• Foreign buyers may need security clearance</p>
                      </>
                    )}
                    {selectedCountry === 'UK' && (
                      <>
                        <p>• Stamp Duty Land Tax must be paid within 14 days</p>
                        <p>• Property must be registered with Land Registry</p>
                        <p>• Conveyancing solicitor typically required</p>
                        <p>• Higher SDLT rates for foreign/additional property buyers</p>
                      </>
                    )}
                    {selectedCountry === 'SG' && (
                      <>
                        <p>• Buyer's Stamp Duty and Additional Buyer's Stamp Duty apply</p>
                        <p>• Foreign buyers face additional restrictions and taxes</p>
                        <p>• Option fee typically 1% of purchase price</p>
                        <p>• Completion usually within 8-12 weeks</p>
                      </>
                    )}
                    {selectedCountry === 'IN' && (
                      <>
                        <p>• Registration required within 4 months of execution</p>
                        <p>• Stamp duty varies by state (1-8% of property value)</p>
                        <p>• NOC from society/builder may be required</p>
                        <p>• RERA registration verification essential</p>
                      </>
                    )}
                    {selectedCountry === 'AU' && (
                      <>
                        <p>• Foreign buyers need FIRB approval</p>
                        <p>• Stamp duty varies by state</p>
                        <p>• Cooling-off period applies in most states</p>
                        <p>• Settlement typically 30-90 days</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Cross-Border Considerations</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {buyerCountry && propertyCountry && buyerCountry !== propertyCountry ? (
                      <>
                        <p>• Foreign ownership restrictions may apply</p>
                        <p>• Additional taxes for foreign buyers</p>
                        <p>• Currency exchange considerations</p>
                        <p>• International tax implications</p>
                        <p>• Repatriation of funds regulations</p>
                      </>
                    ) : (
                      <p>• Standard domestic transaction rules apply</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Legal Assistant */}
      <motion.div variants={itemVariants}>
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Legal Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium">Ask a Question</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Need help understanding legal requirements for your transaction?
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    toast.info('AI Legal Assistant activated');
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Landmark className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium">Regulatory Check</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Verify compliance with local and international property regulations.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    toast.info('Running regulatory compliance check');
                  }}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Run Compliance Check
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium">Custom Document</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Need a specialized document not in our templates? Let AI create it.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    toast.info('Creating custom document');
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Create Custom Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}