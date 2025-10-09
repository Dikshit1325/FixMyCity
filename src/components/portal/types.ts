export interface NewComplaint {
  serviceType: string;
  location: string;
  title: string;
  description: string;
  images: File[];
  priority: 'low' | 'medium' | 'high';
}

export interface ComplaintWithVote {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  submittedBy: string;
  date: string;
  location: string;
  votes: number;
  hasVoted: boolean;
  response?: string;
}