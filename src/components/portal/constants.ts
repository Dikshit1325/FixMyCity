import { Home, User, FileText, MessageSquare, Bell, Info, Users, Trophy } from 'lucide-react';

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'services', label: 'Services', icon: FileText },
  { id: 'complaints', label: 'Complaints', icon: MessageSquare },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'info', label: 'Information', icon: Info },
];