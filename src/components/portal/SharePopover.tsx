import React from 'react';
import { Button } from '../ui/button';
import { PopoverContent } from '../ui/popover';
import { Copy, Facebook, Twitter, Mail, MessageCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { handleShare } from './complaintUtils';
import { ComplaintWithVote } from './types';

interface SharePopoverProps {
  complaint: ComplaintWithVote;
}

const SharePopover = ({ complaint }: SharePopoverProps) => {
  const onShare = (type: string) => {
    const message = handleShare(type, complaint);
    if (message) {
      toast.success(message);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Fix My City - ${complaint.title}`,
          text: `Help resolve this issue: ${complaint.description}`,
          url: `${window.location.origin}/complaint/${complaint.id}`
        });
        toast.success('Shared successfully!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share. Please try another method.');
        }
      }
    } else {
      toast.error('Web Share API not supported. Please use other sharing options.');
    }
  };

  return (
    <PopoverContent className="w-72 sm:w-80">
      <div className="space-y-3 sm:space-y-4">
        <h4 className="font-medium text-sm sm:text-base">Share this complaint</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Help spread awareness about this issue in your community
        </p>
        
        <div className="space-y-3">
          {/* Native Share Button (if supported) */}
          {navigator.share && (
            <Button 
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share to Apps</span>
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onShare('copy')}
              className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Copy Link</span>
            </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onShare('whatsapp')}
            className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>WhatsApp</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onShare('twitter')}
            className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Twitter</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onShare('facebook')}
            className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Facebook</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onShare('email')}
            className="flex items-center justify-center space-x-1 sm:space-x-2 col-span-2 text-xs sm:text-sm"
          >
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Email</span>
          </Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  );
};

export default SharePopover;