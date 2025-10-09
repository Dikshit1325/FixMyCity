import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Popover, PopoverTrigger } from '../ui/popover';
import { ThumbsUp, Share2, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getStatusColor, getStatusIcon, getPriorityColor } from './complaintUtils';
import { ComplaintWithVote } from './types';
import SharePopover from './SharePopover';

interface ComplaintCardProps {
  complaint: ComplaintWithVote;
  showSubmitter?: boolean;
  onVote: (complaintId: string) => void;
}

const ComplaintCard = ({ complaint, showSubmitter = false, onVote }: ComplaintCardProps) => {
  const StatusIcon = getStatusIcon(complaint.status);

  const handleVote = () => {
    onVote(complaint.id);
    if (complaint.hasVoted) {
      toast.success('Vote removed');
    } else {
      toast.success('Vote added! Your support helps prioritize this issue.');
    }
  };

  return (
    <div className={`p-3 sm:p-4 rounded-lg border-l-4 ${getPriorityColor(complaint.priority)}`}>
      <div className="flex flex-col space-y-2 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <h3 className="font-medium text-sm sm:text-base flex-1">{complaint.title}</h3>
          <Badge className={`${getStatusColor(complaint.status)} self-start sm:self-auto`}>
            <div className="flex items-center space-x-1">
              <StatusIcon className="h-4 w-4" />
              <span className="text-xs">{complaint.status}</span>
            </div>
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">{complaint.description}</p>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-muted-foreground">
          {showSubmitter && <span>By {complaint.submittedBy}</span>}
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className="truncate">{complaint.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{complaint.location}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {complaint.category}
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button 
            variant={complaint.hasVoted ? "default" : "ghost"} 
            size="sm" 
            onClick={handleVote}
            className={`flex items-center space-x-2 text-xs sm:text-sm ${
              complaint.hasVoted 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'hover:bg-muted'
            }`}
          >
            <ThumbsUp className={`h-3 w-3 sm:h-4 sm:w-4 ${complaint.hasVoted ? 'fill-current' : ''}`} />
            <span>{complaint.votes}</span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </PopoverTrigger>
            <SharePopover complaint={complaint} />
          </Popover>
        </div>

        {complaint.hasVoted && (
          <div className="text-xs text-primary">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="h-3 w-3 fill-current" />
              <span>You voted</span>
            </span>
          </div>
        )}
      </div>

      {complaint.response && (
        <div className="mt-3 p-2 sm:p-3 bg-muted/50 rounded border-l-2 border-primary">
          <p className="text-xs sm:text-sm">
            <strong>Official Response:</strong> {complaint.response}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;