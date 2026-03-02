/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  AlertCircle, 
  Map as MapIcon, 
  Layers, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown,
  Plus,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowRight,
  Construction,
  Trash2,
  Droplets,
  Car,
  Trees,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MOCK_ISSUES, MOCK_CATEGORIES, MOCK_DEPARTMENTS } from './constants';
import { Issue, IssueStatus, IssuePriority } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  key?: string
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
      active 
        ? "bg-primary text-white shadow-md shadow-primary/20" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'issues', label: 'Reported Issues', icon: AlertCircle },
    { id: 'map', label: 'Map View', icon: MapIcon },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'assignments', label: 'Assignments', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <AlertCircle size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicPulse</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Navbar = () => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
    <div className="flex items-center gap-4 flex-1 max-w-xl">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search issues, citizens, or locations..."
          className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors">
        <span className="text-sm font-medium text-slate-700">Central District</span>
        <ChevronDown size={14} className="text-slate-500" />
      </div>
      
      <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
      
      <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900 leading-none">Admin User</p>
          <p className="text-xs text-slate-500 mt-1">City Authority</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          AD
        </div>
      </div>
    </div>
  </header>
);

const KPICard = ({ title, value, trend, icon: Icon, color }: any) => (
  <div className="card p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        <div className={cn(
          "flex items-center gap-1 mt-2 text-xs font-medium",
          trend.startsWith('+') ? "text-emerald-600" : "text-rose-600"
        )}>
          <span>{trend}</span>
          <span className="text-slate-400">vs last month</span>
        </div>
      </div>
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: IssueStatus | string }) => {
  const styles: any = {
    'pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'rejected': 'bg-slate-100 text-slate-700 border-slate-200',
    'urgent': 'bg-rose-100 text-rose-700 border-rose-200',
  };
  
  return (
    <span className={cn("badge border", styles[status] || styles['pending'])}>
      {status.replace('-', ' ')}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: IssuePriority }) => {
  const styles: any = {
    'low': 'text-slate-500',
    'medium': 'text-amber-500',
    'high': 'text-orange-500',
    'urgent': 'text-rose-600 font-bold',
  };
  
  return (
    <span className={cn("text-xs font-medium uppercase", styles[priority])}>
      {priority}
    </span>
  );
};

// --- Page Components ---

const DashboardPage = () => {
  const data = [
    { name: 'Mon', issues: 12 },
    { name: 'Tue', issues: 19 },
    { name: 'Wed', issues: 15 },
    { name: 'Thu', issues: 22 },
    { name: 'Fri', issues: 30 },
    { name: 'Sat', issues: 10 },
    { name: 'Sun', issues: 8 },
  ];

  const pieData = [
    { name: 'Resolved', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#3B82F6' },
    { name: 'Pending', value: 25, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">Welcome back, here's what's happening in your city today.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          <span>New Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Issues" value="1,284" trend="+12%" icon={AlertCircle} color="bg-primary" />
        <KPICard title="Resolved" value="842" trend="+18%" icon={CheckCircle2} color="bg-emerald-500" />
        <KPICard title="In Progress" value="312" trend="-5%" icon={Clock} color="bg-blue-500" />
        <KPICard title="Avg. Resolution" value="2.4 days" trend="-10%" icon={AlertTriangle} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Issue Frequency</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="issues" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-900 mb-6">Resolution Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Issues</h3>
          <button className="text-primary text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Issue ID</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ISSUES.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{issue.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{issue.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{issue.category}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={issue.status} />
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={issue.priority} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const IssuesPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  return (
    <div className="flex h-full gap-6 relative">
      <div className={cn("flex-1 space-y-6 transition-all duration-300", selectedIssue ? "mr-96" : "")}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reported Issues</h1>
            <p className="text-slate-500">Manage and track all citizen reports across the city.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary">
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button className="btn-primary">
              <Plus size={18} />
              <span>New Report</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by ID, title, or reporter..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg">All</button>
              <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Pending</button>
              <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">In Progress</button>
              <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Resolved</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Issue</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Reporter</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Priority</th>
                  <th className="px-6 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ISSUES.map((issue) => (
                  <tr 
                    key={issue.id} 
                    className={cn(
                      "hover:bg-slate-50 transition-colors cursor-pointer",
                      selectedIssue?.id === issue.id ? "bg-blue-50/50" : ""
                    )}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{issue.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{issue.id} • {issue.location.address}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{issue.category}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{issue.reporter.name}</p>
                      <p className="text-xs text-slate-500">{issue.reporter.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={issue.priority} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIssue && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-0 top-16 bottom-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-20 flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Issue Details</h3>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedIssue.id}</span>
                  <StatusBadge status={selectedIssue.status} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedIssue.title}</h2>
                <p className="text-slate-600 mt-2 text-sm leading-relaxed">{selectedIssue.description}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium text-slate-900">{selectedIssue.location.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reported On</p>
                    <p className="text-sm font-medium text-slate-900">{new Date(selectedIssue.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </section>

              <section className="bg-slate-50 rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Actions</h4>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Assign to Department</label>
                  <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
                    <option>Select Department</option>
                    {MOCK_DEPARTMENTS.map(d => <option key={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold">Update Status</button>
                  <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-bold text-slate-900 mb-4">Timeline</h4>
                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                    <p className="text-sm font-bold text-slate-900">Issue Reported</p>
                    <p className="text-xs text-slate-500">By {selectedIssue.reporter.name} • {new Date(selectedIssue.createdAt).toLocaleDateString()}</p>
                  </div>
                  {selectedIssue.status !== 'pending' && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                      <p className="text-sm font-bold text-slate-900">Status Updated</p>
                      <p className="text-xs text-slate-500">Moved to {selectedIssue.status} • {new Date(selectedIssue.updatedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MapViewPage = () => {
  const [selectedMapIssue, setSelectedMapIssue] = useState<Issue | null>(null);
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);

  const districts = [
    { id: 'central', name: 'Central District', path: 'M300,150 C350,130 450,130 500,150 L550,300 C500,350 400,380 300,350 L250,250 Z', color: 'fill-blue-500/10 hover:fill-blue-500/20' },
    { id: 'north', name: 'North Zone', path: 'M200,50 C300,20 500,20 600,50 L650,150 C550,120 450,120 350,150 L250,180 Z', color: 'fill-emerald-500/10 hover:fill-emerald-500/20' },
    { id: 'west', name: 'West Park', path: 'M50,200 L250,180 L300,350 L200,500 C100,450 50,350 50,200 Z', color: 'fill-amber-500/10 hover:fill-amber-500/20' },
    { id: 'east', name: 'East Industrial', path: 'M550,300 L750,250 C780,350 750,500 600,550 L450,500 C500,450 550,400 550,300 Z', color: 'fill-rose-500/10 hover:fill-rose-500/20' },
    { id: 'south', name: 'South Bay', path: 'M300,350 C400,380 500,350 550,300 L600,550 C450,580 300,580 200,500 Z', color: 'fill-indigo-500/10 hover:fill-indigo-500/20' },
  ];

  // Fixed positions for mock issues to look more realistic on the map
  const markerPositions = [
    { left: '42%', top: '22%' },
    { left: '58%', top: '12%' },
    { left: '38%', top: '45%' },
    { left: '18%', top: '32%' },
    { left: '65%', top: '48%' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">City Map View</h1>
          <p className="text-slate-500">Visualize issue density and locations across the city districts.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search location..." 
              className="bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
            <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 rounded-md">Heatmap</button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-md">Markers</button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-1 card relative bg-[#f8fafc] overflow-hidden border-2 border-slate-200">
          {/* Floating Search Bar */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="relative shadow-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search CivicPulse Maps..." 
                className="bg-white border-none rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 w-72 shadow-xl"
              />
            </div>
            <button className="p-2.5 bg-white rounded-lg shadow-xl hover:bg-slate-50 text-slate-600 border-none">
              <Filter size={18} />
            </button>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-lg hover:bg-slate-50 text-slate-600">
              <ZoomIn size={20} />
            </button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-lg hover:bg-slate-50 text-slate-600">
              <ZoomOut size={20} />
            </button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-lg hover:bg-slate-50 text-slate-600 mt-2">
              <Navigation size={20} className="text-primary" />
            </button>
          </div>

          {/* District Info Overlay */}
          <AnimatePresence>
            {activeDistrict && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-24 left-4 z-10 w-64 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900">{activeDistrict}</h4>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Zone Stats</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Open Issues</p>
                    <p className="text-lg font-bold text-slate-900">12</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Time</p>
                    <p className="text-lg font-bold text-blue-600">4.2h</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[#f1f5f9]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-full h-full p-8">
                {/* SVG Mock Map */}
                <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-xl">
                  {/* River */}
                  <path 
                    d="M0,450 C150,420 250,480 400,450 C550,420 650,480 800,450 L800,500 C650,530 550,470 400,500 C250,530 150,470 0,500 Z" 
                    className="fill-blue-200/40"
                  />
                  <path 
                    d="M0,470 C150,440 250,500 400,470 C550,440 650,500 800,470" 
                    className="fill-none stroke-blue-300/30 stroke-2"
                  />
                  
                  {/* Districts Background */}
                  {districts.map(district => (
                    <path 
                      key={district.id}
                      d={district.path} 
                      className={cn(
                        "transition-all duration-500 cursor-pointer stroke-slate-300/30 stroke-1",
                        district.color,
                        activeDistrict === district.name ? "fill-primary/5 stroke-primary/30 stroke-2" : ""
                      )}
                      onMouseEnter={() => setActiveDistrict(district.name)}
                      onMouseLeave={() => setActiveDistrict(null)}
                    />
                  ))}

                  {/* Building Blocks / Footprints (Simulated) */}
                  <g className="fill-slate-200/40">
                    {/* Central District Blocks */}
                    <rect x="320" y="180" width="30" height="20" rx="2" />
                    <rect x="360" y="180" width="40" height="20" rx="2" />
                    <rect x="410" y="180" width="25" height="20" rx="2" />
                    <rect x="320" y="210" width="50" height="30" rx="2" />
                    <rect x="380" y="210" width="30" height="30" rx="2" />
                    <rect x="420" y="210" width="40" height="30" rx="2" />
                    <rect x="320" y="250" width="30" height="20" rx="2" />
                    <rect x="360" y="250" width="60" height="20" rx="2" />
                    
                    {/* North Zone Blocks */}
                    <rect x="450" y="60" width="40" height="25" rx="2" />
                    <rect x="500" y="60" width="30" height="25" rx="2" />
                    <rect x="450" y="95" width="20" height="20" rx="2" />
                    <rect x="480" y="95" width="50" height="20" rx="2" />
                  </g>
                  
                  {/* Secondary Roads */}
                  <g className="stroke-white fill-none stroke-[1.5] stroke-round">
                    <path d="M350,150 L350,350" />
                    <path d="M450,150 L450,350" />
                    <path d="M300,200 L550,200" />
                    <path d="M300,280 L550,280" />
                    <path d="M100,250 L300,250" />
                    <path d="M550,250 L750,250" />
                  </g>

                  {/* Major Roads / Highways */}
                  <g className="stroke-amber-100 fill-none stroke-[6] stroke-round">
                    <path d="M400,0 L400,600" />
                    <path d="M0,300 L800,300" />
                  </g>
                  <g className="stroke-slate-300/40 fill-none stroke-[7] stroke-round">
                    <path d="M400,0 L400,600" />
                    <path d="M0,300 L800,300" />
                  </g>
                  
                  {/* Other Major Roads */}
                  <g className="stroke-white fill-none stroke-[4] stroke-round">
                    <path d="M100,100 L700,500" />
                    <path d="M100,500 L700,100" />
                  </g>
                  <g className="stroke-slate-300/40 fill-none stroke-[5] stroke-round">
                    <path d="M100,100 L700,500" />
                    <path d="M100,500 L700,100" />
                  </g>

                  {/* Parks / Greenery */}
                  <g className="fill-emerald-500/10">
                    <circle cx="200" cy="400" r="40" />
                    <circle cx="600" cy="150" r="30" />
                    <rect x="350" y="50" width="100" height="40" rx="10" />
                  </g>

                  {/* POI Markers (Static) */}
                  <g className="fill-blue-400/40">
                    <circle cx="380" cy="230" r="4" /> {/* Hospital */}
                    <circle cx="480" cy="80" r="4" />  {/* School */}
                  </g>
                  <g className="fill-orange-400/40">
                    <circle cx="120" cy="240" r="4" /> {/* Library */}
                    <circle cx="620" cy="480" r="4" /> {/* Factory */}
                  </g>

                  {/* District Labels */}
                  <g className="fill-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] pointer-events-none opacity-40">
                    <text x="380" y="260" textAnchor="middle">Central Business District</text>
                    <text x="480" y="110" textAnchor="middle">North Heights</text>
                    <text x="150" y="320" textAnchor="middle">West Park Estates</text>
                    <text x="650" y="380" textAnchor="middle">East Industrial</text>
                    <text x="400" y="540" textAnchor="middle">South Bay Marina</text>
                  </g>
                </svg>
                
                {/* Issue Markers */}
                {MOCK_ISSUES.map((issue, i) => {
                  const isSelected = selectedMapIssue?.id === issue.id;
                  const pos = markerPositions[i] || { left: '50%', top: '50%' };
                  return (
                    <motion.div
                      key={issue.id}
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                      className="absolute cursor-pointer z-20"
                      style={{ 
                        left: pos.left, 
                        top: pos.top 
                      }}
                      onClick={() => setSelectedMapIssue(issue)}
                    >
                      <div className="relative flex items-center justify-center">
                        {isSelected && (
                          <motion.div 
                            layoutId="marker-ring"
                            className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"
                          />
                        )}
                        <div className={cn(
                          "relative w-7 h-7 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all duration-300",
                          isSelected ? "scale-125 z-30 ring-4 ring-primary/10" : "hover:scale-110",
                          issue.priority === 'urgent' ? "bg-rose-500" : 
                          issue.priority === 'high' ? "bg-orange-500" : "bg-blue-500"
                        )}>
                          <Navigation size={14} className="text-white rotate-45" />
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white rounded-2xl shadow-2xl p-4 z-40 border border-slate-100"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-sm font-bold text-slate-900 leading-tight">{issue.title}</h4>
                              <button onClick={(e) => { e.stopPropagation(); setSelectedMapIssue(null); }} className="text-slate-400 hover:text-slate-600">
                                <X size={14} />
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 mb-3 flex items-center gap-1">
                              <MapPin size={10} />
                              {issue.location.address}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                              <StatusBadge status={issue.status} />
                              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                Details <ArrowRight size={12} />
                              </button>
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
             </div>
          </div>
          
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xl space-y-3 z-10">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-200" />
                <span className="text-xs font-medium text-slate-600">Urgent Priority</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-200" />
                <span className="text-xs font-medium text-slate-600">High Priority</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                <span className="text-xs font-medium text-slate-600">Standard</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Nearby Issues</h3>
            <span className="text-xs font-bold text-slate-400">{MOCK_ISSUES.length} Total</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {MOCK_ISSUES.map(issue => (
              <div 
                key={issue.id} 
                className={cn(
                  "card p-4 transition-all duration-300 cursor-pointer group border-2",
                  selectedMapIssue?.id === issue.id ? "border-primary bg-primary/5 shadow-md" : "hover:border-slate-300"
                )}
                onClick={() => setSelectedMapIssue(issue)}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{issue.title}</h4>
                  <PriorityBadge priority={issue.priority} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <MapPin size={12} className="text-slate-400" />
                  {issue.location.address}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <StatusBadge status={issue.status} />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{issue.district?.split(' ')[0]}</span>
                    <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const iconMap: any = {
    'Construction': Construction,
    'Road': Car,
    'Droplets': Droplets,
    'Trash2': Trash2,
    'Car': Car,
    'Trees': Trees,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Issue Categories</h1>
          <p className="text-slate-500">Manage classification and routing rules for reported issues.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Layers;
          return (
            <div key={cat.id} className="card p-6 group hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                  <Icon size={24} />
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Issues</p>
                  <p className="text-xl font-bold text-slate-900">{cat.count}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</p>
                  <p className="text-sm font-bold text-emerald-600">+5%</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Last updated 2h ago</span>
                <button className="text-sm font-bold text-primary group-hover:underline flex items-center gap-1">
                  Manage <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AssignmentsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workload & Assignments</h1>
          <p className="text-slate-500">Monitor department capacity and assign pending issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {MOCK_DEPARTMENTS.map(dept => (
          <div key={dept.id} className="card p-6">
            <h3 className="font-bold text-slate-900">{dept.name}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500 uppercase">Workload</span>
                  <span className={cn(
                    dept.workload > 80 ? "text-rose-600" : "text-emerald-600"
                  )}>{dept.workload}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      dept.workload > 80 ? "bg-rose-500" : "bg-emerald-500"
                    )} 
                    style={{ width: `${dept.workload}%` }} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Active</p>
                  <p className="text-lg font-bold text-slate-900">{dept.activeIssues}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Team</p>
                  <p className="text-lg font-bold text-slate-900">{dept.members}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Unassigned Issues</h3>
            <span className="badge bg-amber-100 text-amber-700 border-amber-200">12 Pending</span>
          </div>
          <div className="p-2 space-y-2">
            {MOCK_ISSUES.filter(i => !i.assignedTo).map(issue => (
              <div key={issue.id} className="p-4 border border-slate-100 rounded-xl hover:border-primary transition-colors cursor-move flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{issue.title}</p>
                    <p className="text-xs text-slate-500">{issue.category} • {issue.id}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 group-hover:text-primary">
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Assignment Queue</h3>
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <UserCheck size={32} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Drag issues here to assign</p>
              <p className="text-sm text-slate-500 max-w-xs mt-1">Select a department first to start the assignment process.</p>
            </div>
            <button className="btn-secondary mt-4">Select Department</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => {
  const categoryData = [
    { name: 'Roads', count: 128 },
    { name: 'Sanitation', count: 89 },
    { name: 'Utilities', count: 62 },
    { name: 'Infrastructure', count: 45 },
    { name: 'Traffic', count: 34 },
    { name: 'Parks', count: 21 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Advanced Analytics</h1>
          <p className="text-slate-500">Deep dive into city performance metrics and citizen reporting trends.</p>
        </div>
        <button className="btn-secondary">
          <BarChart3 size={18} />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 mb-6">Issues by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} width={100} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-900 mb-6">Resolution Performance</h3>
          <div className="space-y-8">
            {MOCK_DEPARTMENTS.map(dept => (
              <div key={dept.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">{dept.name}</span>
                  <span className="text-xs font-bold text-emerald-600">92% Target</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.random() * 40 + 60}%` }} 
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Avg. Time: 1.8 days</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Issues: {dept.activeIssues}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-6">Monthly Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'Jan', reports: 400, resolved: 320 },
              { month: 'Feb', reports: 300, resolved: 280 },
              { month: 'Mar', reports: 600, resolved: 450 },
              { month: 'Apr', reports: 800, resolved: 700 },
              { month: 'May', reports: 500, resolved: 480 },
              { month: 'Jun', reports: 700, resolved: 650 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="reports" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => (
  <div className="max-w-4xl space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
      <p className="text-slate-500">Configure platform preferences and authority controls.</p>
    </div>

    <div className="card divide-y divide-slate-100">
      <div className="p-6">
        <h3 className="font-bold text-slate-900 mb-4">Authority Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">City Name</label>
            <input type="text" defaultValue="Metropolis City Council" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Admin Email</label>
            <input type="email" defaultValue="admin@metropolis.gov" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-slate-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Email Alerts</p>
              <p className="text-xs text-slate-500">Receive summaries of urgent issues daily.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Auto-Assignment</p>
              <p className="text-xs text-slate-500">Automatically route issues based on category.</p>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-end gap-3">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage />;
      case 'issues': return <IssuesPage />;
      case 'map': return <MapViewPage />;
      case 'categories': return <CategoriesPage />;
      case 'assignments': return <AssignmentsPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-main">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
