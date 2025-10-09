import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, Search, UserPlus, MessageCircle, Heart, Clock, Filter } from 'lucide-react';
import { communityGroups, communityPosts } from './data';

const Community = () => {
  const [groups, setGroups] = useState(communityGroups);
  const [posts] = useState(communityPosts);

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          isJoined: !group.isJoined,
          members: group.isJoined ? group.members - 1 : group.members + 1
        };
      }
      return group;
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Environment': 'bg-green-100 text-green-800',
      'Safety': 'bg-red-100 text-red-800',
      'Cleanliness': 'bg-blue-100 text-blue-800',
      'Transportation': 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl">Community Groups</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Joined Groups</h3>
              {groups.filter(group => group.isJoined).map((group) => (
                <Card key={group.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{group.name}</h4>
                          <Badge className={getCategoryColor(group.category)}>
                            {group.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{group.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Recent Activity</h3>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm">{post.author}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{post.groupName}</p>
                        </div>
                        <h4 className="font-medium text-sm mb-2">{post.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={getCategoryColor(group.category)}>
                      {group.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium mb-2">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{group.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant={group.isJoined ? 'outline' : 'default'}
                    size="sm" 
                    className="w-full"
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.isJoined ? (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Group
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;