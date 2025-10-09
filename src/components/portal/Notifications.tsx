import React from 'react';
import { Card, CardContent } from '../ui/card';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';
import { notificationsData } from './data';

const Notifications = () => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update': return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'announcement': return <Info className="h-5 w-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl">Notifications</h2>
      
      <div className="space-y-4">
        {notificationsData.map((notification, index) => (
          <Card key={index} className={notification.unread ? 'border-primary/20 bg-primary/5' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;