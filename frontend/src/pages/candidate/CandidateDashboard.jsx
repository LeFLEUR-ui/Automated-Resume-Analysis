import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Bell, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  ArrowUpRight,
  User,
  Search,
  LayoutDashboard,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings
} from 'lucide-react';
import Header from '../../components/Header';

const BRAND_RED = "#D10043";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  const APPLICATION_STATUS = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "Mariwasa Siam Ceramics",
      appliedDate: "Oct 12, 2023",
      status: "Interview",
      statusColor: "text-blue-500 bg-blue-50",
      step: 3,
      totalSteps: 5
    },
    {
      id: 2,
      role: "System Administrator",
      company: "Tech Solutions Inc.",
      appliedDate: "Oct 08, 2023",
      status: "Reviewing",
      statusColor: "text-orange-500 bg-orange-50",
      step: 1,
      totalSteps: 4
    }
  ];

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Helmet>
        <title>Candidate Page - Dashboard</title>
      </Helmet>
      <Header />
      <main className="max-w-[1400px] mx-auto px-10 py-8">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Welcome back, Candidate!
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              You have {APPLICATION_STATUS.length} active applications and 1 event scheduled.
            </p>
          </div>

          <button 
            style={{ backgroundColor: BRAND_RED }}
            className="text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm font-semibold shadow-sm flex items-center"
          >
            Explore New Jobs
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900">Active Applications</h3>
                <button style={{ color: BRAND_RED }} className="text-xs font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {APPLICATION_STATUS.map((app) => (
                  <div key={app.id} className="group border border-gray-50 rounded-2xl p-5 hover:border-red-100 transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-red-50 transition-colors">
                          <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-[#D10043]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{app.role}</h4>
                          <p className="text-sm text-gray-400 font-medium">{app.company} • Applied {app.appliedDate}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        <span>Application Progress</span>
                        <span>Step {app.step} of {app.totalSteps}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${(app.step / app.totalSteps) * 100}%`, backgroundColor: BRAND_RED }}
                          className="h-full rounded-full transition-all duration-500" 
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              style={{ background: `linear-gradient(to right, ${BRAND_RED}, #A00033)` }}
              className="rounded-[24px] p-8 text-white flex justify-between items-center shadow-lg shadow-red-100"
            >
              <div className="max-w-md">
                <h3 className="text-xl font-semibold mb-2">Complete your profile</h3>
                <p className="text-red-50 font-medium text-sm leading-relaxed opacity-90">
                  Detailed profiles get viewed 3x more often by our HR specialists.
                </p>
                <button className="mt-6 bg-white text-[#D10043] px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
                  Update Profile
                </button>
              </div>
              <div className="hidden md:flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-red-400/30 flex items-center justify-center relative">
                  <span className="text-xl font-bold">85%</span>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#D10043]"></div>
                </div>
                <span className="text-[11px] mt-2 font-bold uppercase tracking-widest text-red-100">Strength</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">

            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Calendar className="text-[#D10043] w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Interviews</h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900 mb-1">Technical Interview</h4>
                <p className="text-xs text-gray-500 mb-4">Sarah Miller (HR Manager)</p>
                
                <div className="flex items-center text-[12px] text-gray-600 font-medium mb-4">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                  Tomorrow, 10:00 AM
                </div>
                
                <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                  Prepare for Call
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#D10043]" />
                    <span className="text-sm font-medium text-gray-600">Update Resume</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 group-hover:text-[#D10043]" />
                    <span className="text-sm font-medium text-gray-600">Skill Assessment</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;