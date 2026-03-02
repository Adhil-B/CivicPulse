import { Issue, Category, Department } from './types';

export const MOCK_ISSUES: Issue[] = [
  {
    id: 'ISS-001',
    title: 'Broken Street Light',
    description: 'The street light at the corner of 5th and Main has been flickering for three days.',
    category: 'Infrastructure',
    status: 'pending',
    priority: 'medium',
    location: { lat: 40.7128, lng: -74.0060, address: '5th Ave & Main St' },
    reporter: { name: 'John Doe', email: 'john@example.com' },
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'ISS-002',
    title: 'Pothole on Oak Street',
    description: 'Large pothole causing traffic delays near the elementary school.',
    category: 'Roads',
    status: 'in-progress',
    priority: 'high',
    location: { lat: 40.7138, lng: -74.0070, address: '123 Oak St' },
    reporter: { name: 'Jane Smith', email: 'jane@example.com' },
    assignedTo: 'Road Maintenance Dept',
    createdAt: '2026-02-28T08:30:00Z',
    updatedAt: '2026-03-01T14:20:00Z',
  },
  {
    id: 'ISS-003',
    title: 'Water Leak',
    description: 'Main water pipe burst in front of the library.',
    category: 'Utilities',
    priority: 'urgent',
    location: { lat: 40.7148, lng: -74.0080, address: 'Public Library Plaza' },
    reporter: { name: 'Mike Johnson', email: 'mike@example.com' },
    status: 'in-progress',
    assignedTo: 'Water & Sewage',
    createdAt: '2026-03-02T06:15:00Z',
    updatedAt: '2026-03-02T07:00:00Z',
  },
  {
    id: 'ISS-004',
    title: 'Graffiti on Park Bench',
    description: 'Vandalism in Central Park near the fountain.',
    category: 'Sanitation',
    status: 'resolved',
    priority: 'low',
    location: { lat: 40.7158, lng: -74.0090, address: 'Central Park North' },
    reporter: { name: 'Sarah Wilson', email: 'sarah@example.com' },
    assignedTo: 'Parks & Rec',
    createdAt: '2026-02-25T12:00:00Z',
    updatedAt: '2026-02-27T16:45:00Z',
  },
  {
    id: 'ISS-005',
    title: 'Illegal Parking',
    description: 'Truck blocking the fire hydrant.',
    category: 'Traffic',
    status: 'pending',
    priority: 'high',
    location: { lat: 40.7168, lng: -74.0100, address: '45 Firehouse Lane' },
    reporter: { name: 'Officer Brown', email: 'brown@citypd.gov' },
    createdAt: '2026-03-02T02:00:00Z',
    updatedAt: '2026-03-02T02:00:00Z',
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Infrastructure', icon: 'Construction', count: 45, color: '#3B82F6' },
  { id: 'cat-2', name: 'Roads', icon: 'Road', count: 128, color: '#F59E0B' },
  { id: 'cat-3', name: 'Utilities', icon: 'Droplets', count: 62, color: '#10B981' },
  { id: 'cat-4', name: 'Sanitation', icon: 'Trash2', count: 89, color: '#6B7280' },
  { id: 'cat-5', name: 'Traffic', icon: 'Car', count: 34, color: '#EF4444' },
  { id: 'cat-6', name: 'Parks', icon: 'Trees', count: 21, color: '#8B5CF6' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Road Maintenance', workload: 85, activeIssues: 42, members: 12 },
  { id: 'dept-2', name: 'Water & Sewage', workload: 60, activeIssues: 18, members: 8 },
  { id: 'dept-3', name: 'Sanitation Services', workload: 45, activeIssues: 24, members: 15 },
  { id: 'dept-4', name: 'Public Safety', workload: 30, activeIssues: 12, members: 20 },
];
