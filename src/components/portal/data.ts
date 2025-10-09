export const dashboardStats = [
  { label: 'Services Available', value: '80', icon: 'FileText' },
  { label: 'Active Complaints', value: '2', icon: 'MessageSquare' },
  { label: 'Community Groups', value: '2', icon: 'Users' },
  { label: 'Leaderboard Rank', value: '#1', icon: 'Trophy' },
];

export const recentActivities = [
  { name: 'Water Supply Complaint', status: 'In Progress', date: '2024-03-15', type: 'complaint' },
  { name: 'Joined Water Conservation Group', status: 'Completed', date: '2024-03-12', type: 'community' },
  { name: 'Transportation Service Query', status: 'Resolved', date: '2024-03-10', type: 'service' },
  { name: 'Profile Updated', status: 'Completed', date: '2024-03-08', type: 'profile' }
];

export const serviceCategories = [
  { title: 'Water & Sewerage', services: 12, icon: '💧' },
  { title: 'Electricity', services: 8, icon: '⚡' },
  { title: 'Transportation', services: 7, icon: '🚗' },
  { title: 'Social Welfare', services: 20, icon: '🤝' },
  { title: 'Garbage Collection', services: 6, icon: '🗑️' },
  { title: 'Fire Services', services: 4, icon: '🚒' },
  { title: 'Street Light Repair', services: 5, icon: '💡' },
  { title: 'Road Maintenance', services: 8, icon: '🛣️' },
  { title: 'Environment Sustainability', services: 10, icon: '🌱' }
];

export const complaintsData = [
  { 
    id: 'CMP001', 
    title: 'Water Supply Issue', 
    category: 'Water & Sewerage',
    status: 'In Progress', 
    submitted: '2024-03-12',
    priority: 'High',
    votes: 23,
    hasVoted: false,
    shareUrl: 'https://portal.gov/complaints/CMP001'
  },
  { 
    id: 'CMP002', 
    title: 'Street Light Not Working', 
    category: 'Electricity',
    status: 'Resolved', 
    submitted: '2024-03-05',
    priority: 'Medium',
    votes: 8,
    hasVoted: true,
    shareUrl: 'https://portal.gov/complaints/CMP002'
  },
  {
    id: 'CMP003',
    title: 'Poor Road Conditions on Main Street',
    category: 'Transportation',
    status: 'Open',
    submitted: '2024-03-10',
    priority: 'Medium',
    votes: 15,
    hasVoted: false,
    shareUrl: 'https://portal.gov/complaints/CMP003'
  }
];

export const communityGroups = [
  {
    id: 'CG001',
    name: 'Water Conservation Group',
    members: 234,
    description: 'Community group focused on water conservation and management initiatives.',
    category: 'Environment',
    lastActivity: '2 hours ago',
    isJoined: true
  },
  {
    id: 'CG002',
    name: 'Local Safety Watch',
    members: 156,
    description: 'Neighborhood watch group ensuring safety and security in our community.',
    category: 'Safety',
    lastActivity: '1 day ago',
    isJoined: false
  },
  {
    id: 'CG003',
    name: 'Clean Streets Initiative',
    members: 89,
    description: 'Citizens working together to keep our streets and public spaces clean.',
    category: 'Cleanliness',
    lastActivity: '3 days ago',
    isJoined: true
  },
  {
    id: 'CG004',
    name: 'Public Transport Improvement',
    members: 178,
    description: 'Advocating for better public transportation services and infrastructure.',
    category: 'Transportation',
    lastActivity: '1 week ago',
    isJoined: false
  }
];

export const communityPosts = [
  {
    id: 'POST001',
    groupId: 'CG001',
    groupName: 'Water Conservation Group',
    author: 'Raj Kumar',
    title: 'Water Tank Maintenance Schedule',
    content: 'The community water tank will undergo maintenance next Tuesday from 10 AM to 4 PM. Please store water accordingly.',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 3
  },
  {
    id: 'POST002',
    groupId: 'CG002',
    groupName: 'Local Safety Watch',
    author: 'Priya Sharma',
    title: 'Increased Patrol Schedule',
    content: 'Due to recent events, we are increasing our evening patrol schedule. Volunteers needed for the 8 PM - 10 PM slot.',
    timestamp: '1 day ago',
    likes: 8,
    comments: 5
  }
];

export const locationOptions = [
  { value: 'sector-1', label: 'Sector 1' },
  { value: 'sector-2', label: 'Sector 2' },
  { value: 'sector-3', label: 'Sector 3' },
  { value: 'sector-4', label: 'Sector 4' },
  { value: 'sector-5', label: 'Sector 5' },
  { value: 'city-center', label: 'City Center' },
  { value: 'industrial-area', label: 'Industrial Area' },
  { value: 'residential-zone-a', label: 'Residential Zone A' },
  { value: 'residential-zone-b', label: 'Residential Zone B' },
  { value: 'commercial-district', label: 'Commercial District' },
  { value: 'old-town', label: 'Old Town' },
  { value: 'new-development', label: 'New Development Area' }
];

export const complaintServiceTypes = [
  { value: 'water-sewerage', label: 'Water & Sewerage', icon: '💧' },
  { value: 'electricity', label: 'Electricity', icon: '⚡' },
  { value: 'transportation', label: 'Transportation', icon: '🚗' },
  { value: 'social-welfare', label: 'Social Welfare', icon: '🤝' },
  { value: 'garbage-collection', label: 'Garbage Collection', icon: '🗑️' },
  { value: 'fire-services', label: 'Fire Services', icon: '🚒' },
  { value: 'street-light-repair', label: 'Street Light Repair', icon: '💡' },
  { value: 'road-maintenance', label: 'Road Maintenance', icon: '🛣️' },
  { value: 'environment-sustainability', label: 'Environment Sustainability', icon: '🌱' }
];

export const complaints = [
  {
    id: 'CMP001',
    title: 'Water Supply Issue in Sector 2',
    description: 'No water supply for the past 3 days in our area. Multiple households are affected and we need immediate attention.',
    category: 'Water & Sewerage',
    status: 'In Progress',
    priority: 'high',
    submittedBy: 'Akshita',
    date: 'March 12, 2024',
    location: 'Sector 2',
    votes: 23,
    hasVoted: true,
    response: 'Water department has been notified. Repair work will begin within 24 hours.'
  },
  {
    id: 'CMP002',
    title: 'Street Light Not Working on Main Road',
    description: 'Street lights have been non-functional for over a week, creating safety concerns for pedestrians.',
    category: 'Street Light Repair',
    status: 'Resolved',
    priority: 'medium',
    submittedBy: 'Akshita',
    date: 'March 5, 2024',
    location: 'City Center',
    votes: 8,
    hasVoted: false,
    response: 'Street lights have been repaired and are now functioning properly.'
  },
  {
    id: 'CMP003',
    title: 'Poor Road Conditions on Main Street',
    description: 'Multiple potholes and damaged road surface making it dangerous for vehicles.',
    category: 'Road Maintenance',
    status: 'Pending',
    priority: 'medium',
    submittedBy: 'Rajesh Kumar',
    date: 'March 10, 2024',
    location: 'Commercial District',
    votes: 15,
    hasVoted: false
  },
  {
    id: 'CMP004',
    title: 'Irregular Garbage Collection',
    description: 'Garbage has not been collected for 5 days in our residential area. Bad smell and hygiene issues.',
    category: 'Garbage Collection',
    status: 'In Progress',
    priority: 'high',
    submittedBy: 'Priya Sharma',
    date: 'March 14, 2024',
    location: 'Residential Zone A',
    votes: 31,
    hasVoted: true,
    response: 'Additional garbage trucks have been deployed to clear the backlog.'
  },
  {
    id: 'CMP005',
    title: 'Power Outage During Peak Hours',
    description: 'Frequent power cuts between 7-9 PM affecting daily activities and business operations.',
    category: 'Electricity',
    status: 'Pending',
    priority: 'high',
    submittedBy: 'Amit Singh',
    date: 'March 11, 2024',
    location: 'Industrial Area',
    votes: 27,
    hasVoted: false
  },
  {
    id: 'CMP006',
    title: 'Bus Stop Shelter Damaged',
    description: 'The bus stop shelter is broken and provides no protection from rain or sun.',
    category: 'Transportation',
    status: 'Resolved',
    priority: 'low',
    submittedBy: 'Sunita Devi',
    date: 'March 8, 2024',
    location: 'Old Town',
    votes: 12,
    hasVoted: false,
    response: 'New bus stop shelter has been installed and is now operational.'
  }
];

export const leaderboardData = {
  topComplaintContributors: [
    {
      rank: 1,
      name: 'Akshita',
      complaintsSubmitted: 15,
      resolvedComplaints: 12,
      avatar: '👩',
      badge: '🏆',
      isCurrentUser: true
    },
    {
      rank: 2,
      name: 'Rajesh Kumar',
      complaintsSubmitted: 12,
      resolvedComplaints: 10,
      avatar: '👨',
      badge: '🥈',
      isCurrentUser: false
    },
    {
      rank: 3,
      name: 'Priya Sharma',
      complaintsSubmitted: 10,
      resolvedComplaints: 8,
      avatar: '👩',
      badge: '🥉',
      isCurrentUser: false
    },
    {
      rank: 4,
      name: 'Amit Singh',
      complaintsSubmitted: 8,
      resolvedComplaints: 6,
      avatar: '👨',
      badge: '',
      isCurrentUser: false
    },
    {
      rank: 5,
      name: 'Sunita Devi',
      complaintsSubmitted: 7,
      resolvedComplaints: 5,
      avatar: '👩',
      badge: '',
      isCurrentUser: false
    }
  ],
  monthlyHeroes: [
    {
      rank: 1,
      name: 'Dr. Ramesh Gupta',
      contribution: 'Led community water conservation drive',
      impact: '500+ families benefited',
      avatar: '👨‍⚕️',
      badge: '🌟',
      category: 'Environment'
    },
    {
      rank: 2,
      name: 'Meera Joshi',
      contribution: 'Organized street cleaning campaign',
      impact: '15 streets cleaned',
      avatar: '👩',
      badge: '✨',
      category: 'Cleanliness'
    },
    {
      rank: 3,
      name: 'Captain Vikram',
      contribution: 'Fire safety awareness program',
      impact: '200+ residents trained',
      avatar: '👨‍🚒',
      badge: '⭐',
      category: 'Safety'
    }
  ],
  currentMonth: 'March 2024',
  totalActiveUsers: 1247,
  totalComplaints: 156,
  resolvedThisMonth: 134
};

export const notificationsData = [
  {
    title: 'Complaint Status Update',
    message: 'Your water supply complaint (CMP001) is now being processed.',
    time: '2 hours ago',
    type: 'update',
    unread: true
  },
  {
    title: 'Service Announcement',
    message: 'Healthcare services will be available for free health check-up this weekend.',
    time: '1 day ago',
    type: 'announcement',
    unread: false
  },
  {
    title: 'Profile Verification',
    message: 'Your profile has been successfully verified.',
    time: '3 days ago',
    type: 'success',
    unread: false
  }
];

export const emergencyServices = [
  { name: 'Police', number: '100' },
  { name: 'Fire Department', number: '101' },
  { name: 'Ambulance', number: '102' }
];

export const governmentSchemes = [
  {
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing scheme for eligible citizens'
  },
  {
    name: 'Ayushman Bharat',
    description: 'Health insurance coverage scheme'
  },
  {
    name: 'Digital India',
    description: 'Digital literacy and services initiative'
  }
];

export const localAnnouncements = [
  {
    title: 'Water Supply Maintenance',
    message: 'Water supply will be interrupted on March 20th from 10 AM to 4 PM for maintenance work.',
    date: 'March 18, 2024',
    type: 'info'
  },
  {
    title: 'Free Health Check-up Camp',
    message: 'Free health check-up camp at Community Center this weekend. No appointment required.',
    date: 'March 16, 2024',
    type: 'success'
  }
];