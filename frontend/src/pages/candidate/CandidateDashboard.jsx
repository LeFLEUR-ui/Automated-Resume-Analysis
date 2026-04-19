import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Settings,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

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
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      step: 3,
      totalSteps: 5
    },
    {
      id: 2,
      role: "Production Supervisor",
      company: "Mariwasa Siam Ceramics",
      appliedDate: "Oct 08, 2023",
      status: "Reviewing",
      statusColor: "text-orange-600 bg-orange-50 border-orange-100",
      step: 1,
      totalSteps: 4
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen font-['Inter',_sans-serif] flex flex-col">
      <Helmet>
        <title>Mariwasa - Candidate Dashboard</title>
      </Helmet>
      
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-6 py-12 w-full flex-grow">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center gap-2 bg-[#D10043]/5 text-[#D10043] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-[#D10043]/10 w-fit">
              <Sparkles size={12} className="animate-pulse" />
              Portal Overview
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-none">
              Welcome back, <span className="text-[#D10043]">Alex</span>!
            </h2>
            <p className="text-sm text-slate-500 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" />
              {APPLICATION_STATUS.length} active processes • 1 verified event
            </p>
          </div>

          <button 
            onClick={() => navigate('/careerspage')}
            className="bg-[#D10043] text-white px-8 py-4 rounded-2xl hover:bg-slate-900 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-pink-100 flex items-center group active:scale-[0.95]"
          >
            Explore New Opportunities
            <ArrowUpRight className="h-4 w-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Left Panel */}
          <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left-6 duration-700">
            
            {/* Active Applications Card */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-2xl shadow-slate-200/40">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#D10043]">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Applications</h3>
                </div>
                <button className="text-[10px] font-black text-[#D10043] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Browse All</button>
              </div>

              <div className="space-y-6">
                {APPLICATION_STATUS.map((app) => (
                  <div 
                    key={app.id} 
                    onClick={() => navigate('/application-tracking')}
                    className="group relative border border-slate-50 bg-slate-50/30 rounded-[32px] p-8 hover:bg-white hover:border-[#D10043]/10 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/40"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#D10043]/5 transition-colors duration-500">
                          <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-[#D10043] transition-colors" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">#ARA-{app.id}882</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#D10043]">{app.company}</span>
                          </div>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-[#D10043] transition-colors">{app.role}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Applied {app.appliedDate}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${app.statusColor}`}>
                        {app.status}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                        <span>Process Stage</span>
                        <span>Step {app.step} of {app.totalSteps}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${(app.step / app.totalSteps) * 100}%` }}
                          className="bg-[#D10043] h-full rounded-full transition-all duration-700 delay-300" 
                        ></div>
                      </div>
                    </div>
                    
                    <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <ChevronRight className="text-[#D10043]" size={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Strength Card */}
            <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D10043]/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="max-w-md relative z-10 text-center md:text-left">
                <div className="flex items-center gap-2 bg-[#D10043] w-fit px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-6 mx-auto md:mx-0">
                  <Zap size={12} fill="white" />
                  Profile Performance
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight leading-none">Complete your profile</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">
                  Candidates with detailed profiles and verified skills get viewed <span className="text-white">3x more often</span> by our HR specialists.
                </p>
                <button className="bg-white text-[#D10043] px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#D10043] hover:text-white transition-all shadow-xl active:scale-[0.95]">
                  Optimize Profile
                </button>
              </div>
              
              <div className="mt-12 md:mt-0 relative z-10">
                <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex flex-col items-center justify-center relative bg-slate-900 shadow-2xl">
                  <span className="text-4xl font-black text-white leading-none">85<span className="text-lg">%</span></span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Profile Strength</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Section: Right Panel */}
          <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-700">

            {/* Upcoming Interviews Card */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl shadow-slate-200/40">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#D10043] border border-pink-100">
                  <Calendar size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Interviews</h3>
              </div>

              <div className="bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#D10043] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-600 text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Upcoming</span>
                </div>
                
                <h4 className="font-black text-lg text-slate-900 mb-1 leading-none tracking-tight">Technical Interview</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Sarah Miller • HR Manager</p>
                
                <div className="flex items-center text-xs text-slate-700 font-black uppercase tracking-widest mb-6 bg-white w-fit px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <Clock className="w-4 h-4 mr-3 text-[#D10043]" />
                  Tomorrow, 10:00 AM
                </div>
                
                <button className="w-full py-4 bg-slate-900 hover:bg-[#D10043] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.95]">
                  Prepare for Session
                </button>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl shadow-slate-200/40">
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Quick Actions</h3>
              <div className="space-y-4">
                {[
                  { icon: <FileText size={18} />, label: "Update Resume", desc: "Latest version" },
                  { icon: <Award size={18} />, label: "Skill Assessment", desc: "Verify expertise" },
                  { icon: <Settings size={18} />, label: "Portal Settings", desc: "Notifications" }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-[#D10043]/20 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-[#D10043] border border-slate-100 transition-colors">
                        {action.icon}
                      </div>
                      <div className="text-left">
                        <span className="text-[13px] font-black text-slate-800 block leading-none">{action.label}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">{action.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#D10043] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateDashboard;