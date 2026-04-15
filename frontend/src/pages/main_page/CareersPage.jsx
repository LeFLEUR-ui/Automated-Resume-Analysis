import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  ChevronDown, 
  LogIn, 
  UserPlus, 
  Briefcase, 
  Info, 
  Search, 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  ArrowRight,
  CircleDot
} from 'lucide-react';
import Header from '../../components/main_page/Header';

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

const CareersPage = () => {
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
    <div className="bg-gray-50 text-gray-800 antialiased font-['Inter',_sans-serif] min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-white shadow-sm border border-gray-100 mb-6">
            <Briefcase className="text-[#D10043]" size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900">
            Find Your <span className="text-[#D10043]">Career</span> at Mariwasa
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Explore exciting opportunities in ceramic manufacturing. Join our team and build the homes of tomorrow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto -mt-4 mb-16">
          <div className="bg-white p-4 rounded-[30px] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs by title or skills..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-100 transition-all text-sm font-medium"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="relative w-full md:w-64">
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full appearance-none px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-100 text-sm font-bold text-gray-700 cursor-pointer"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {filteredJobs.length} Career Opportunities
          </p>
        </div>

        {/* Job Grid - Using the 40px rounded style from Landing Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D10043] mb-1 block">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#D10043] transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    <CircleDot size={10} />
                    {job.is_active ? 'Active' : 'Closed'}
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                  {job.skills_requirements}
                </p>

                <div className="grid grid-cols-2 gap-y-3 mb-8 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <MapPin size={14} className="text-[#D10043]" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <Clock size={14} className="text-[#D10043]" /> {job.job_type}
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-xs font-bold text-gray-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D10043]" /> {job.salary_range}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-50">
                  <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all">
                    View Details
                  </button>
                  <button 
                    onClick={() => navigate(`/apply/${job.id}`)}
                    className="flex-1 py-3.5 rounded-2xl bg-gray-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D10043] transition-all shadow-lg shadow-gray-100"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg">No matching roles found</h3>
              <p className="text-gray-400 text-sm mt-1 mb-6">Try adjusting your filters to find more opportunities.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedDept('All Departments');}} 
                className="text-[#D10043] font-bold text-xs uppercase tracking-widest hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 border-t border-gray-100 bg-white text-center">
        <div className="flex justify-center mb-6">
          <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain grayscale opacity-50" />
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Mariwasa Siam Ceramics Inc.</p>
        <p className="text-gray-400 text-[10px]">© 2026 All rights reserved. Technology powered by AI.</p>
      </footer>
    </div>
  );
};

export default CareersPage;