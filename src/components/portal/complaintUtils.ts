import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved': return 'bg-emerald-100 text-emerald-800';
    case 'in progress': return 'bg-teal-100 text-teal-800';
    case 'pending': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved': return CheckCircle;
    case 'in progress': return Clock;
    case 'pending': return AlertCircle;
    default: return Clock;
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'border-l-red-500 bg-red-50';
    case 'medium': return 'border-l-amber-500 bg-amber-50';
    case 'low': return 'border-l-emerald-500 bg-emerald-50';
    default: return 'border-l-gray-500 bg-gray-50';
  }
};

export const handleShare = (type: string, complaint: any) => {
  const shareUrl = `${window.location.origin}/complaints/${complaint.id}`;
  const shareText = `Check out this complaint: ${complaint.title} - ${complaint.description}`;
  
  switch (type) {
    case 'copy':
      navigator.clipboard.writeText(shareUrl);
      return 'Link copied to clipboard!';
    case 'whatsapp':
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`);
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
      break;
    case 'email':
      window.open(`mailto:?subject=${encodeURIComponent('Important Community Issue')}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`);
      break;
    default:
      break;
  }
  return null;
};