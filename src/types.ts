export type IssueStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: IssueStatus;
  priority: IssuePriority;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reporter: {
    name: string;
    email: string;
  };
  district?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface Department {
  id: string;
  name: string;
  workload: number;
  activeIssues: number;
  members: number;
}
