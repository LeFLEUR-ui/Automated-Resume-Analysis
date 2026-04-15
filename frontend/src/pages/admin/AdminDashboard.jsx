import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import SystemHealthMetrics from '../../components/admin/dashboard/SystemHealthMetrics';
import TrafficAnalytics from '../../components/admin/dashboard/TrafficAnalytics';
import UserActivityLog from '../../components/admin/dashboard/UserActivityLog';
import { 
  Download, 
  ShieldCheck, 
  Users, 
  Settings, 
  Database, 
  Activity 
} from 'lucide-react';

const SYSTEM_STATS = {
  totalUsers: 14205,
  activeSessions: 892,
  serverUptime: "99.98%",
  securityAlerts: 3
};

const RECENT_USERS = [
  {
    id: 1,
    name: "Marcus Aurelius",
    role: "Super Admin",
    action: "Updated Firewall Rules",
    timestamp: "2 mins ago",
    status: "success",
  },
  {
    id: 2,
    name: "Helena Troi",
    role: "Editor",
    action: "Bulk Asset Upload",
    timestamp: "15 mins ago",
    status: "pending",
  },
  {
    id: 3,
    name: "Julian Casablancas",
    role: "Moderator",
    action: "Flagged Content Review",
    timestamp: "1 hour ago",
    status: "warning",
  },
  {
    id: 4,
    name: "Sophia Loren",
    role: "User Manager",
    action: "Created New Account",
    timestamp: "3 hours ago",
    status: "success",
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <AdminHeader />

      <main className="max-w-[1400px] mx-auto px-10 py-8">
        
        {/* 🔹 Dashboard Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              System Control Center
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Global infrastructure and user management overview
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl hover:shadow-sm transition-all text-xs font-semibold tracking-tight text-gray-600 flex items-center">
              System Live
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 animate-pulse"></div>
            </button>

            <button className="bg-[#111827] text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all text-xs font-semibold tracking-tight flex items-center">
              <Download className="h-3.5 w-3.5 mr-2" />
              Download Audit Logs
            </button>
          </div>
        </div>

        {/* 🔹 Core Metrics Component */}
        <SystemHealthMetrics stats={SYSTEM_STATS} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
                <TrafficAnalytics />
            </div>
            <div className="lg:col-span-1">
                <UserActivityLog activities={RECENT_USERS} />
            </div>
        </div>

        {/* 🔹 Admin Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div
            onClick={() => navigate('/admin/security')}
            className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-start gap-5"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center transition-colors group-hover:bg-indigo-100">
              <ShieldCheck className="text-indigo-600 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                Security Protocols
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                {SYSTEM_STATS.securityAlerts} active patches required
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/users')}
            className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-start gap-5"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center transition-colors group-hover:bg-emerald-100">
              <Users className="text-emerald-600 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                User Management
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                {SYSTEM_STATS.totalUsers.toLocaleString()} registered accounts
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/database')}
            className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-start gap-5"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center transition-colors group-hover:bg-purple-100">
              <Database className="text-purple-600 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                Database Clusters
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                Health: Optimal (4 Nodes)
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;