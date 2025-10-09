import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Phone, Info, CheckCircle } from 'lucide-react';
import { emergencyServices, governmentSchemes, localAnnouncements } from './data';

const LocalInfo = () => {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl">Local Information & Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyServices.map((service, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-600" />
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.number}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Government Schemes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {governmentSchemes.map((scheme, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">{scheme.name}</h4>
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Local Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {localAnnouncements.map((announcement, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-4 p-4 rounded-lg border ${
                announcement.type === 'info' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              {announcement.type === 'info' ? (
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`font-medium ${
                  announcement.type === 'info' ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {announcement.title}
                </h4>
                <p className={`text-sm ${
                  announcement.type === 'info' ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {announcement.message}
                </p>
                <p className={`text-xs mt-1 ${
                  announcement.type === 'info' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  Posted: {announcement.date}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalInfo;