import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Trophy, Star, Medal, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { leaderboardData } from './data';

const Leaderboard = () => {
  const { topComplaintContributors, monthlyHeroes, currentMonth, totalActiveUsers, totalComplaints, resolvedThisMonth } = leaderboardData;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Environment': 'bg-emerald-100 text-emerald-800',
      'Cleanliness': 'bg-teal-100 text-teal-800',
      'Safety': 'bg-red-100 text-red-800',
      'Transportation': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-8">
      <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl">Community Leaderboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Recognizing our most active community members</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1 self-start sm:self-auto text-xs">
          <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{currentMonth}</span>
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Users</p>
                <p className="font-medium text-sm sm:text-base">{totalActiveUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Complaints</p>
                <p className="font-medium text-sm sm:text-base">{totalComplaints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Resolved This Month</p>
                <p className="font-medium text-sm sm:text-base">{resolvedThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contributors" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contributors" className="text-sm sm:text-base">Top Contributors</TabsTrigger>
          <TabsTrigger value="heroes" className="text-sm sm:text-base">Monthly Heroes</TabsTrigger>
        </TabsList>

        <TabsContent value="contributors" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span>Most Active Complaint Contributors</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Citizens who actively report issues to improve our community
              </p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0">
              {topComplaintContributors.map((contributor) => (
                <div 
                  key={contributor.rank} 
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border space-y-2 sm:space-y-0 ${
                    contributor.isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl">{getRankIcon(contributor.rank)}</span>
                      <span className="font-medium text-base sm:text-lg">#{contributor.rank}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0">
                        {contributor.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm sm:text-base">{contributor.name}</p>
                          {contributor.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {contributor.complaintsSubmitted} complaints • {contributor.resolvedComplaints} resolved
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-xs sm:text-sm text-muted-foreground">Resolution Rate</p>
                    <p className="font-medium text-sm sm:text-base">
                      {Math.round((contributor.resolvedComplaints / contributor.complaintsSubmitted) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heroes" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span>Heroes of {currentMonth.split(' ')[0]}</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Community champions who went above and beyond to make a difference
              </p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-0">
              {monthlyHeroes.map((hero) => (
                <div key={hero.rank} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                    <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-2">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center text-xl sm:text-2xl border-2 border-primary/20 shrink-0">
                        {hero.avatar}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xl sm:text-2xl">{getRankIcon(hero.rank)}</span>
                        <span className="font-medium text-sm sm:text-base">#{hero.rank}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">{hero.name}</h3>
                          <Badge className={`${getCategoryColor(hero.category)} text-xs`}>
                            {hero.category}
                          </Badge>
                        </div>
                        <span className="text-2xl sm:text-3xl">{hero.badge}</span>
                      </div>
                      <p className="font-medium mb-2 text-sm sm:text-base">{hero.contribution}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{hero.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;