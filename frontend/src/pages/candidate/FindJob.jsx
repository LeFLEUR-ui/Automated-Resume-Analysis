import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  Briefcase, 
  Search, 
  X, 
  MapPin, 
  Clock, 
  ArrowRight,
  CircleDot,
  Sparkles,
  Filter,
  Bookmark,
  Building2,
  TrendingUp,
  LayoutGrid,
  List
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { STATIC_JOBS } from '../../data/jobs';

const FindJob = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [viewMode, setViewMode] = useState('grid');

  const departments = ['All Departments', ...new Set(STATIC_JOBS.map(job => job.department))];

  const filteredJobs = STATIC_JOBS.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills_requirements.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
    
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-['Inter',_sans-serif] min-h-screen flex flex-col">
      <Helmet>
        <title>Mariwasa - Find Your Future Career</title>
      </Helmet>
      
      <Header />

      <main className="flex-grow">
        
        {/* Modern Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-50/30 to-transparent pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col items-start max-w-3xl">
              <div className="flex items-center gap-2 bg-[#D10043]/5 text-[#D10043] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                <Sparkles size={14} className="animate-pulse" />
                Empowering the Builders of Tomorrow
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
                Craft Your <span className="text-[#D10043]">Legacy</span> <br />
                at Mariwasa.
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                Join a heritage of excellence spanning decades. We're looking for visionary minds to help us innovate the future of ceramic craftsmanship and home solutions.
              </p>

              {/* Advanced Search Bar */}
              <div className="w-full max-w-4xl bg-white p-2 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="relative flex-grow">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search roles, skills, or departments..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-10 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-[#D10043]/5 transition-all text-sm font-bold placeholder:text-slate-300 text-slate-900"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                
                <div className="relative w-full md:w-80">
                  <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full appearance-none pl-16 pr-12 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-[#D10043]/5 text-sm font-black text-slate-700 cursor-pointer"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-[1400px] mx-auto px-6 py-20">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Open Opportunities</h2>
              <p className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-widest">
                Showing {filteredJobs.length} active roles across {departments.length - 1} departments
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#D10043] text-white shadow-lg shadow-pink-100' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#D10043] text-white shadow-lg shadow-pink-100' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10" 
            : "flex flex-col gap-6"
          }>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`bg-white group relative border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-[#D10043]/10 overflow-hidden ${
                    viewMode === 'grid' 
                      ? "p-10 rounded-[48px] flex flex-col" 
                      : "p-8 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between"
                  }`}
                >
                  <div className={viewMode === 'list' ? "flex items-center gap-8 flex-1" : ""}>
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#D10043]/5 transition-colors duration-500">
                          <Building2 className="w-8 h-8 text-slate-400 group-hover:text-[#D10043] transition-colors" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D10043]">
                              {job.department}
                            </span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <TrendingUp size={12} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Growth Role</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                            {job.title}
                          </h3>
                        </div>
                      </div>
                      <button className="p-3 text-slate-300 hover:text-[#D10043] hover:bg-pink-50 rounded-full transition-all">
                        <Bookmark size={20} />
                      </button>
                    </div>
                    
                    <p className={`text-slate-500 text-sm leading-relaxed font-medium mb-10 ${viewMode === 'grid' ? "line-clamp-3" : "max-w-md line-clamp-2 mb-0"}`}>
                      {job.skills_requirements}
                    </p>

                    <div className={`grid grid-cols-2 gap-y-6 px-1 ${viewMode === 'grid' ? "mb-10 mt-auto" : "hidden md:grid ml-auto mr-12 min-w-[300px]"}`}>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#D10043]">
                          <MapPin size={16} />
                        </div>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#D10043]">
                          <Clock size={16} />
                        </div>
                        {job.job_type}
                      </div>
                      <div className="col-span-2 flex items-center gap-3 text-sm font-black text-slate-900 bg-slate-50 w-fit px-4 py-2.5 rounded-2xl border border-slate-100">
                        <CircleDot size={14} className="text-[#D10043] animate-pulse" />
                        {job.salary_range}
                      </div>
                    </div>
                  </div>

                  <div className={`flex gap-4 pt-10 border-t border-slate-50 ${viewMode === 'list' ? "md:pt-0 md:border-t-0 md:min-w-[200px]" : ""}`}>
                    <button 
                      onClick={() => navigate(`/apply/${job.id}`)}
                      disabled={!job.is_active}
                      className={`flex-1 py-5 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
                        job.is_active 
                          ? 'bg-[#D10043] text-white shadow-pink-100 hover:bg-slate-900 active:scale-[0.98]' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {job.is_active ? (
                        <>Apply Now <ArrowRight size={16} /></>
                      ) : (
                        'Applications Closed'
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[60px] border-2 border-dashed border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Search size={48} />
                </div>
                <h3 className="text-slate-900 font-black text-2xl tracking-tight mb-3">No matching roles found</h3>
                <p className="text-slate-400 text-base font-medium max-w-sm mx-auto mb-10">Try adjusting your filters or keywords to discover other ways to join our team.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedDept('All Departments');}} 
                  className="px-8 py-4 bg-[#D10043] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-pink-100"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Brand Philosophy / Stats Section */}
        <section className="bg-slate-900 py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { label: "Founded", value: "1963", desc: "A legacy of Philippine craftsmanship" },
                { label: "Global Reach", value: "20+", desc: "Countries exported with excellence" },
                { label: "Workforce", value: "1,500+", desc: "Passionate individuals growing with us" }
              ].map((stat, i) => (
                <div key={i} className="group">
                  <p className="text-[#D10043] text-sm font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                  <h4 className="text-6xl font-black text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</h4>
                  <p className="text-slate-500 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FindJob;