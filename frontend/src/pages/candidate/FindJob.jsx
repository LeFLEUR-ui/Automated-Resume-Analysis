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
  Filter
} from 'lucide-react';
import Header from '../../components/Header';

const BRAND_RED = "#D10043";

const STATIC_JOBS = [
  {
    id: 1,
    title: "Production Supervisor",
    department: "Manufacturing",
    skills_requirements: "Experience in ceramic manufacturing, leadership skills, and knowledge of ISO standards. Minimum 3 years experience.",
    location: "Bulacan",
    job_type: "Full-time",
    salary_range: "₱30,000 - ₱45,000",
    is_active: true
  },
  {
    id: 2,
    title: "Quality Control Analyst",
    department: "Quality Assurance",
    skills_requirements: "Strong attention to detail, laboratory experience, and knowledge of material testing. Chemical Engineering background preferred.",
    location: "Bulacan",
    job_type: "Full-time",
    salary_range: "₱25,000 - ₱35,000",
    is_active: true
  },
  {
    id: 3,
    title: "HR Generalist",
    department: "Human Resources",
    skills_requirements: "Recruitment, payroll processing, and employee relations. Excellent communication skills required.",
    location: "Makati",
    job_type: "Full-time",
    salary_range: "₱28,000 - ₱40,000",
    is_active: true
  },
  {
    id: 4,
    title: "Maintenance Technician",
    department: "Engineering",
    skills_requirements: "Troubleshooting industrial machinery, electrical systems, and preventive maintenance. TESDA certification is a plus.",
    location: "Bulacan",
    job_type: "Full-time",
    salary_range: "₱20,000 - ₱28,000",
    is_active: false
  }
];

const FindJob = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

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
    <div className="bg-[#FCFCFC] text-gray-800 antialiased font-['Inter',_sans-serif] min-h-screen">
      <Helmet>
        <title>Candidate Page - Find Jobs</title>
      </Helmet>
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-12">

        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 bg-red-50 text-[#D10043] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Work with the Industry Leader
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
            Find Your <span className="text-[#D10043]">Career</span> at Mariwasa
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Join a legacy of excellence in ceramic manufacturing. We're looking for passionate 
            individuals to help us build the homes and spaces of tomorrow.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white p-3 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs, skills, or departments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-10 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-50 transition-all text-sm font-medium placeholder:text-gray-300"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="relative w-full md:w-72">
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full appearance-none pl-14 pr-10 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-50 text-sm font-bold text-gray-700 cursor-pointer"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center items-center gap-8">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Available Roles: <span className="text-gray-900">{filteredJobs.length}</span>
            </p>
            <div className="h-4 w-[1px] bg-gray-200" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Hiring Status: <span className="text-green-500 underline underline-offset-4">Active</span>
            </p>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-red-50 transition-colors">
                      <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-[#D10043]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D10043] mb-1 block">
                        {job.department}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {job.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    <CircleDot size={10} />
                    {job.is_active ? 'Active' : 'Closed'}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                  {job.skills_requirements}
                </p>

                <div className="grid grid-cols-2 gap-y-4 mb-8 mt-auto px-1">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-500">
                    <MapPin size={16} className="text-[#D10043]" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-500">
                    <Clock size={16} className="text-[#D10043]" /> {job.job_type}
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-xs font-bold text-gray-900 bg-gray-50 w-fit px-3 py-2 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D10043]" /> {job.salary_range}
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-gray-50">
                  <button className="flex-1 py-4 rounded-2xl border border-gray-100 font-bold text-xs text-gray-500 hover:bg-gray-50 transition-all">
                    Job Description
                  </button>
                  <button 
                    onClick={() => navigate(`/apply/${job.id}`)}
                    style={{ backgroundColor: job.is_active ? BRAND_RED : '#9ca3af' }}
                    disabled={!job.is_active}
                    className="flex-1 py-4 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-red-100 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search size={40} />
              </div>
              <h3 className="text-gray-900 font-bold text-xl">No roles match your search</h3>
              <p className="text-gray-400 text-sm mt-2 mb-8 max-w-xs mx-auto">Try adjusting your filters or search keywords to find other opportunities.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedDept('All Departments');}} 
                className="text-[#D10043] font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-red-100 hover:border-[#D10043] transition-all pb-1"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 border-t border-gray-100 bg-white text-center">
        <div className="flex justify-center mb-6">
          <img src="../src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain grayscale opacity-50" />
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Mariwasa Siam Ceramics Inc.</p>
        <p className="text-gray-400 text-[10px]">© 2026 All rights reserved. Technology powered by AI.</p>
      </footer>
    </div>
  );
};

export default FindJob;