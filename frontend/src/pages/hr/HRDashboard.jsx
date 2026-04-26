import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Download, AlertCircle, Briefcase, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import KeyMetrics from '../../components/hr/dashboard/KeyMetrics';
import ApplicationTrends from '../../components/hr/dashboard/ApplicationTrends';
import RecentSubmissions from '../../components/hr/dashboard/RecentSubmissions';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

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
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalResumes, setTotalResumes] = useState(0);
  const [appStats, setAppStats] = useState({ pending: 0, reviewed: 0, accepted: 0, rejected: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const jobsResponse = await axios.get('http://localhost:8000/hr/read-jobs');
        setActiveJobsCount(jobsResponse.data.length);
        
        const candidatesResponse = await axios.get('http://localhost:8000/hr/candidate-count');
        setTotalCandidates(candidatesResponse.data.count);

        const resumesResponse = await axios.get('http://localhost:8000/hr/resume-count');
        setTotalResumes(resumesResponse.data.count);

        const statsResponse = await axios.get('http://localhost:8000/hr/application-stats');
        setAppStats(statsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] pb-12">
      <Helmet>
        <title>HR - Dashboard</title>
      </Helmet>
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
              Dashboard Overview
            </h2>
            <p className="text-sm text-gray-500 font-medium tracking-wide mt-1">
              Live recruitment analytics from database
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button className="whitespace-nowrap bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-pink-100 hover:text-[#D60041] hover:bg-pink-50 transition-all duration-300 text-[11px] md:text-xs font-bold text-gray-700 flex items-center shadow-sm shrink-0">
              Real-time
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
            </button>

            <button className="whitespace-nowrap bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-pink-100 hover:text-[#D60041] hover:bg-pink-50 transition-all duration-300 text-[11px] md:text-xs font-bold text-gray-700 flex items-center shadow-sm group shrink-0">
              <Download className="h-4 w-4 mr-2 text-gray-400 group-hover:text-[#D60041]" />
              Export Report
            </button>
          </div>
        </div>

        <KeyMetrics 
          stats={STATIC_STATS} 
          activeJobsCount={activeJobsCount} 
          totalCandidates={totalCandidates} 
          totalResumes={totalResumes}
          appStats={appStats}
        />
        <ApplicationTrends />
        <RecentSubmissions candidates={STATIC_CANDIDATES} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            onClick={() => navigate('/screening')}
            className="bg-white border border-gray-100 rounded-[32px] p-8 lg:p-10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-orange-100 transition-all duration-300 cursor-pointer flex flex-col items-start gap-6 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <AlertCircle className="text-orange-500 h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                Pending Reviews
              </h4>
              <p className="text-sm text-gray-500 font-bold mt-2">
                {STATIC_STATS.pending} applications waiting
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/jobs')}
            className="bg-white border border-gray-100 rounded-[32px] p-8 lg:p-10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-pink-100 transition-all duration-300 cursor-pointer flex flex-col items-start gap-6 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Briefcase className="text-[#D60041] h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-[#D60041] transition-colors">
                Active Positions
              </h4>
              <p className="text-sm text-gray-500 font-bold mt-2">
                {activeJobsCount} roles currently open
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[32px] p-8 lg:p-10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col items-start gap-6 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <BarChart3 className="text-blue-500 h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                Department Reports
              </h4>
              <p className="text-sm text-gray-500 font-bold mt-2">
                Detailed analytics & history
              </p>
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
};

export default HRDashboard;