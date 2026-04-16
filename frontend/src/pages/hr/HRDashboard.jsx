import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, AlertCircle, Briefcase, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import KeyMetrics from '../../components/hr/dashboard/KeyMetrics';
import ApplicationTrends from '../../components/hr/dashboard/ApplicationTrends';
import RecentSubmissions from '../../components/hr/dashboard/RecentSubmissions';
import Header from '../../components/layout/Header';

const STATIC_STATS = {
  total: 1248,
  pending: 42,
  reviewed: 1206,
  activeJobs: 12
};

const STATIC_CANDIDATES = [
  {
    id: 1,
    name: "Alex Thompson",
    preferredJob: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    matchScore: 94,
    status: "approved",
    profileImage: null
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    preferredJob: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    matchScore: 88,
    status: "pending",
    profileImage: null
  },
  {
    id: 3,
    name: "Michael Chen",
    preferredJob: "Backend Engineer",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    matchScore: 82,
    status: "reviewed",
    profileImage: null
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    preferredJob: "Project Manager",
    skills: ["Agile", "Scrum", "Jira"],
    matchScore: 75,
    status: "pending",
    profileImage: null
  },
  {
    id: 5,
    name: "David Kim",
    preferredJob: "Data Analyst",
    skills: ["Python", "SQL", "Tableau"],
    matchScore: 91,
    status: "approved",
    profileImage: null
  }
];

const HRDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Helmet>
        <title>HR - Dashboard</title>
      </Helmet>
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-8">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Dashboard Overview
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Live recruitment analytics from database
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl hover:shadow-sm transition-all text-xs font-semibold tracking-tight text-gray-600 flex items-center">
              Real-time
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
            </button>

            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl hover:shadow-sm transition-all text-xs font-semibold tracking-tight text-gray-600 flex items-center">
              <Download className="h-3 w-3 mr-2" />
              Export
            </button>
          </div>
        </div>

        <KeyMetrics stats={STATIC_STATS} />
        <ApplicationTrends />
        <RecentSubmissions candidates={STATIC_CANDIDATES} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div
            onClick={() => navigate('/screening')}
            className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-start gap-5"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="text-orange-500 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                Pending Reviews
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                {STATIC_STATS.pending} applications waiting
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/jobs')}
            className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-start gap-5"
          >
            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
              <Briefcase className="text-pink-600 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                Active Positions
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                {STATIC_STATS.activeJobs} roles currently open
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-start gap-5">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-500 h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-gray-900">
                Department Reports
              </h4>
              <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-1">
                Detailed analytics
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default HRDashboard;