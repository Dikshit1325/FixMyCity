import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FileText, MessageSquare, Bell, Info, Settings, Users, Trophy, Plus, Zap } from 'lucide-react';
import { dashboardStats, recentActivities } from './data';
import { useLanguage } from './LanguageContext';

interface DashboardProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const { t } = useLanguage();
  
  const getIconComponent = (iconName: string) => {
    const icons = { FileText, MessageSquare, Bell, Users, Trophy };
    return icons[iconName as keyof typeof icons] || FileText;
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className="text-xl sm:text-2xl">{t('welcomeBack')}</h2>
        <Badge variant="secondary" className="self-start sm:self-auto">{t('verifiedCitizen')}</Badge>
      </div>
      
      {/* Prominent Lodge Complaint CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">{t('reportIssue')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 sm:mb-0">
                {t('foundProblem')}
              </p>
            </div>
            <Button 
              size="lg"
              onClick={() => setActiveSection?.('complaints')}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('lodgeComplaint')}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {dashboardStats.map((stat, index) => {
          const IconComponent = getIconComponent(stat.icon);
          return (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-medium">{stat.value}</p>
                  </div>
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">{t('recentActivities')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{activity.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'Completed' || activity.status === 'Resolved' ? 'default' : 'secondary'}
                    className="text-xs shrink-0 ml-2"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">{t('quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <Button 
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                onClick={() => setActiveSection?.('services')}
              >
                <FileText className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">{t('browseServices')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                onClick={() => setActiveSection?.('complaints')}
              >
                <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">{t('lodgeComplaint')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                onClick={() => setActiveSection?.('leaderboard')}
              >
                <Trophy className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">{t('leaderboard')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                onClick={() => setActiveSection?.('profile')}
              >
                <Settings className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">{t('updateProfile')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>{t('yourAchievements')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <span className="text-xl sm:text-2xl">🏆</span>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">{t('topContributor')}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">15 {t('complaintsSubmitted')}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-medium text-primary text-lg sm:text-xl">#1</p>
                <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-lg sm:text-xl">80%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('resolutionRate')}</p>
              </div>
              <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-lg sm:text-xl">12</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('resolvedIssues')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;