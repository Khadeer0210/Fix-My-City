export type Issue = {
  id: string;
  title: string;
  description: string;
  category: 'Pothole' | 'Graffiti' | 'Streetlight Out' | 'Trash' | 'Water Logging' | 'Other';
  status: 'New' | 'In Progress' | 'Resolved';
  votes: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  imageUrl: string;
  reporter: User;
  createdAt: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
};

export type Badge = {
    name: 'Top Citizen' | 'First Report' | 'Pothole Pro' | 'Community Hero';
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  isTopCitizen: boolean; // Keep for admin toggle simplicity
  badges: Badge[];
  reportedIssues: number;
  totalVotes: number;
};
