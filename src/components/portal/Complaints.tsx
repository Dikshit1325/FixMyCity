import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MessageSquare, Plus, Zap } from 'lucide-react';
import { complaints } from './data';
import { ComplaintWithVote } from './types';
import ComplaintCard from './ComplaintCard';
import NewComplaintDialog from './NewComplaintDialog';
import { useLanguage } from './LanguageContext';

const Complaints = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('my-complaints');
  const [complaintsData, setComplaintsData] = useState<ComplaintWithVote[]>(complaints);

  const handleVote = (complaintId: string) => {
    setComplaintsData(prevComplaints => 
      prevComplaints.map(complaint => {
        if (complaint.id === complaintId) {
          const wasVoted = complaint.hasVoted;
          return {
            ...complaint,
            hasVoted: !wasVoted,
            votes: wasVoted ? complaint.votes - 1 : complaint.votes + 1
          };
        }
        return complaint;
      })
    );
  };

  const handleComplaintSubmit = (newComplaintData: ComplaintWithVote) => {
    setComplaintsData(prev => [newComplaintData, ...prev]);
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-8">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">Complaints & Grievances</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and track your submitted complaints</p>
        </div>
        <NewComplaintDialog onComplaintSubmit={handleComplaintSubmit} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-complaints" className="text-sm sm:text-base">My Complaints</TabsTrigger>
          <TabsTrigger value="community-complaints" className="text-sm sm:text-base">Community Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="my-complaints" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Your Complaints</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0">
              {complaintsData.filter(complaint => complaint.submittedBy === 'Akshita').map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community-complaints" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Community Complaints</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                See what issues your neighbors are reporting. Vote to show support and help prioritize issues.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0">
              {complaintsData.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} showSubmitter={true} onVote={handleVote} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Complaints;