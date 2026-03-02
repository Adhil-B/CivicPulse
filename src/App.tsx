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
  MapPin
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
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">City Map View</h1>
          <p className="text-slate-500">Visualize issue density and locations across the city districts.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
            <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 rounded-md">Heatmap</button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-md">Markers</button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        <div className="flex-1 card relative bg-slate-200 overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-full h-full p-12">
                {/* SVG Mock Map */}
                <svg viewBox="0 0 800 600" className="w-full h-full text-slate-400 fill-current opacity-30">
                  <path d="M100,100 L700,100 L700,500 L100,500 Z" />
                  <path d="M100,300 L700,300 M400,100 L400,500" stroke="white" strokeWidth="2" />
                </svg>
                
                {/* Issue Markers */}
                {MOCK_ISSUES.map((issue, i) => (
                  <motion.div
                    key={issue.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute cursor-pointer group"
                    style={{ 
                      left: `${20 + (i * 15)}%`, 
                      top: `${30 + (i * 10)}%` 
                    }}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 border-white shadow-lg",
                      issue.priority === 'urgent' ? "bg-rose-500" : 
                      issue.priority === 'high' ? "bg-orange-500" : "bg-blue-500"
                    )} />
                    
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <p className="text-xs font-bold text-slate-900">{issue.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{issue.location.address}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <StatusBadge status={issue.status} />
                        <PriorityBadge priority={issue.priority} />
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
          
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-lg space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Legend</h4>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-xs text-slate-600">Urgent Priority</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-slate-600">High Priority</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-slate-600">Standard</span>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-4 overflow-y-auto">
          <h3 className="font-bold text-slate-900">Nearby Issues</h3>
          {MOCK_ISSUES.map(issue => (
            <div key={issue.id} className="card p-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{issue.title}</h4>
                <PriorityBadge priority={issue.priority} />
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin size={12} />
                {issue.location.address}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={issue.status} />
                <button className="text-primary">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
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
