import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Search, Filter, ChevronDown, ChevronRight, Phone, Globe, MapPin, Clock, Info } from 'lucide-react';
import { serviceCategories } from './data';
import { useLanguage } from './LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };

  // Enhanced service data with detailed information
  const detailedServices = {
    'Water & Sewerage': [
      { name: 'New Water Connection', description: 'Apply for new residential/commercial water connection', status: 'Available', processingTime: '7-10 days' },
      { name: 'Water Bill Payment', description: 'Pay monthly water bills online or offline', status: 'Available', processingTime: 'Instant' },
      { name: 'Sewerage Connection', description: 'Apply for sewerage line connection', status: 'Available', processingTime: '15-20 days' },
      { name: 'Water Quality Testing', description: 'Request water quality testing service', status: 'Available', processingTime: '3-5 days' },
      { name: 'Leak Repair Request', description: 'Report water leakage for repair', status: 'Available', processingTime: '24-48 hours' },
      { name: 'Meter Reading Dispute', description: 'Dispute incorrect water meter readings', status: 'Available', processingTime: '5-7 days' }
    ],
    'Electricity': [
      { name: 'New Electricity Connection', description: 'Apply for new power connection', status: 'Available', processingTime: '5-7 days' },
      { name: 'Electricity Bill Payment', description: 'Pay electricity bills online', status: 'Available', processingTime: 'Instant' },
      { name: 'Power Outage Report', description: 'Report power outage in your area', status: 'Available', processingTime: '2-4 hours' },
      { name: 'Meter Installation', description: 'Request new electricity meter installation', status: 'Available', processingTime: '3-5 days' },
      { name: 'Load Enhancement', description: 'Increase power load capacity', status: 'Available', processingTime: '10-15 days' },
      { name: 'Street Light Repair', description: 'Report non-functional street lights', status: 'Available', processingTime: '24-48 hours' }
    ],
    'Transportation': [
      { name: 'Driving License', description: 'Apply for new driving license or renewal', status: 'Available', processingTime: '7-10 days' },
      { name: 'Vehicle Registration', description: 'Register new vehicle or transfer ownership', status: 'Available', processingTime: '3-5 days' },
      { name: 'Bus Pass', description: 'Apply for monthly bus pass', status: 'Available', processingTime: '1-2 days' },
      { name: 'Road Repair Request', description: 'Report road damage or potholes', status: 'Available', processingTime: '7-14 days' },
      { name: 'Traffic Signal Issues', description: 'Report malfunctioning traffic signals', status: 'Available', processingTime: '4-6 hours' },
      { name: 'Parking Permits', description: 'Apply for residential parking permits', status: 'Available', processingTime: '2-3 days' }
    ],
    'Social Welfare': [
      { name: 'Ration Card', description: 'Apply for new ration card or updates', status: 'Available', processingTime: '15-30 days' },
      { name: 'Pension Schemes', description: 'Apply for old age/disability pension', status: 'Available', processingTime: '30-45 days' },
      { name: 'Health Insurance', description: 'Enroll in government health schemes', status: 'Available', processingTime: '10-15 days' },
      { name: 'Education Scholarships', description: 'Apply for educational scholarships', status: 'Seasonal', processingTime: '45-60 days' },
      { name: 'Birth Certificate', description: 'Issue birth certificate', status: 'Available', processingTime: '3-7 days' },
      { name: 'Death Certificate', description: 'Issue death certificate', status: 'Available', processingTime: '2-3 days' }
    ],
    'Garbage Collection': [
      { name: 'Regular Waste Collection', description: 'Daily household waste collection service', status: 'Available', processingTime: 'Daily' },
      { name: 'Bulk Waste Removal', description: 'Remove large items and furniture', status: 'Available', processingTime: '2-3 days' },
      { name: 'Recycling Pickup', description: 'Separate collection for recyclable materials', status: 'Available', processingTime: 'Weekly' },
      { name: 'Composting Program', description: 'Organic waste composting service', status: 'Available', processingTime: 'Bi-weekly' },
      { name: 'Special Collection', description: 'Electronic waste and hazardous materials', status: 'Available', processingTime: '7-10 days' }
    ],
    'Fire Services': [
      { name: 'Emergency Response', description: '24/7 fire emergency services', status: 'Available', processingTime: 'Immediate' },
      { name: 'Fire Safety Inspection', description: 'Building fire safety compliance check', status: 'Available', processingTime: '5-7 days' },
      { name: 'Fire NOC', description: 'No Objection Certificate for fire safety', status: 'Available', processingTime: '10-15 days' },
      { name: 'Safety Training', description: 'Fire safety awareness programs', status: 'Available', processingTime: 'On demand' }
    ],
    'Street Light Repair': [
      { name: 'Report Outage', description: 'Report non-working street lights', status: 'Available', processingTime: '24-48 hours' },
      { name: 'New Installation', description: 'Request new street light installation', status: 'Available', processingTime: '15-20 days' },
      { name: 'LED Upgrade', description: 'Upgrade traditional lights to LED', status: 'Available', processingTime: '7-10 days' },
      { name: 'Timer Adjustment', description: 'Adjust automatic on/off timers', status: 'Available', processingTime: '2-3 days' },
      { name: 'Maintenance Check', description: 'Regular maintenance and cleaning', status: 'Available', processingTime: 'Monthly' }
    ],
    'Road Maintenance': [
      { name: 'Pothole Repair', description: 'Fill and repair road potholes', status: 'Available', processingTime: '3-7 days' },
      { name: 'Road Resurfacing', description: 'Complete road surface renovation', status: 'Available', processingTime: '30-45 days' },
      { name: 'Drainage Cleaning', description: 'Clean roadside drains and gutters', status: 'Available', processingTime: '5-7 days' },
      { name: 'Speed Bump Installation', description: 'Install speed control measures', status: 'Available', processingTime: '7-10 days' },
      { name: 'Road Marking', description: 'Paint lane markings and signs', status: 'Available', processingTime: '3-5 days' }
    ],
    'Environment Sustainability': [
      { name: 'Tree Plantation', description: 'Community tree plantation programs', status: 'Seasonal', processingTime: 'Monsoon season' },
      { name: 'Air Quality Monitoring', description: 'Check local air quality levels', status: 'Available', processingTime: 'Real-time' },
      { name: 'Green Building Certification', description: 'Eco-friendly building certification', status: 'Available', processingTime: '20-30 days' },
      { name: 'Solar Panel Subsidy', description: 'Apply for solar installation subsidies', status: 'Available', processingTime: '30-45 days' },
      { name: 'Waste Reduction Program', description: 'Join community waste reduction initiatives', status: 'Available', processingTime: 'Ongoing' },
      { name: 'Environmental Impact Assessment', description: 'Assess environmental impact of projects', status: 'Available', processingTime: '45-60 days' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-800';
      case 'Seasonal': return 'bg-amber-100 text-amber-800';
      case 'Limited': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCategories = serviceCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 mb-8">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">{t('serviceDirectory')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t('serviceDirectoryDesc')}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchServices')} 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="self-start sm:self-auto">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
        </div>

        {/* Service Categories Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="font-medium text-lg text-primary">80</p>
            <p className="text-xs text-muted-foreground">{t('totalServices')}</p>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <p className="font-medium text-lg text-emerald-600">24/7</p>
            <p className="text-xs text-muted-foreground">{t('emergencyServices')}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-lg text-blue-600">9</p>
            <p className="text-xs text-muted-foreground">{t('categories')}</p>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <p className="font-medium text-lg text-amber-600">{t('online')}</p>
            <p className="text-xs text-muted-foreground">{t('digitalServices')}</p>
          </div>
        </div>
      </div>

      {/* Detailed Service Categories */}
      <div className="space-y-3 sm:space-y-4">
        {filteredCategories.map((category, index) => (
          <Collapsible key={index} open={expandedCategories.has(index)}>
            <Card className="transition-shadow hover:shadow-md">
              <CollapsibleTrigger asChild>
                <CardHeader 
                  className="cursor-pointer hover:bg-accent/50 transition-colors p-4 sm:p-6"
                  onClick={() => toggleCategory(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="text-2xl sm:text-3xl shrink-0">{category.icon}</div>
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg">{category.title}</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {category.services} services available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {t('active')}
                      </Badge>
                      {expandedCategories.has(index) ? 
                        <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      }
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {detailedServices[category.title as keyof typeof detailedServices]?.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="p-3 sm:p-4 border rounded-lg hover:bg-accent/20 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-sm sm:text-base">{service.name}</h4>
                              <Badge className={getStatusColor(service.status)} variant="secondary">
                                {service.status}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{service.processingTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Info className="h-3 w-3" />
                                <span>Online Available</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 shrink-0">
                            <Button size="sm" variant="outline">
                              Apply
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Contact Information */}
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>Help: 1800-XXX-XXXX</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span>Online Portal</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>Visit Local Office</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {/* Emergency Services Section */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <span className="text-xl">🚨</span>
            <span>Emergency Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <p className="font-medium text-red-800">Police</p>
              <p className="text-xl font-bold text-red-600">100</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <p className="font-medium text-red-800">Fire Department</p>
              <p className="text-xl font-bold text-red-600">101</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <p className="font-medium text-red-800">Medical Emergency</p>
              <p className="text-xl font-bold text-red-600">102</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;