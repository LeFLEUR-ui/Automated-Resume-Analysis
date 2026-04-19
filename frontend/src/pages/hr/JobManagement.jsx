import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Plus, Briefcase } from 'lucide-react';
import Header from '../../components/layout/Header';
import CreateJobModal from '../../components/modals/hr/CreateJobModal';
import EditJobModal from '../../components/modals/hr/EditJobModal';
import ViewJobDetailsModal from '../../components/modals/hr/ViewJobDetailsModal';

const MOCK_JOBS = [
  {
    id: 1,
    job_id: "JOB-2024-001",
    title: "Senior Software Engineer",
    department: "Information Technology",
    location: "Manila, Philippines",
    salary_range: "₱80,000 - ₱120,000",
    is_active: true,
    skills_requirements: "React, Node.js, TypeScript, AWS, PostgreSQL",
    description: "We are seeking an experienced Software Engineer to lead our frontend development efforts. You will be responsible for architecting scalable UI components and mentoring junior developers.",
    job_type: "Full-time"
  },
  {
    id: 2,
    job_id: "JOB-2024-002",
    title: "HR Generalist",
    department: "Human Resources",
    location: "Laguna, Philippines",
    salary_range: "₱35,000 - ₱50,000",
    is_active: true,
    skills_requirements: "Recruitment, Payroll, Employee Relations, Labor Laws",
    description: "Manage end-to-end recruitment processes and maintain healthy employee relations across the Laguna branch.",
    job_type: "Full-time"
  },
  {
    id: 3,
    job_id: "JOB-2024-003",
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Remote",
    salary_range: "₱40,000 - ₱60,000",
    is_active: false,
    skills_requirements: "Social Media, Content Writing, SEO, Google Analytics",
    description: "Support our digital marketing strategy by coordinating content calendars and analyzing campaign performance metrics.",
    job_type: "Contract"
  }
];

const JobCard = ({ job, onEdit, onView }) => {
  const skillsArray = typeof job.skills_requirements === 'string'
    ? job.skills_requirements.split(',').map(s => s.trim())
    : [];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-100 transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 group">
      <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 w-full lg:w-auto">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-pink-100 bg-gradient-to-br from-pink-50 to-red-50 shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center justify-center">
          <Briefcase className="w-7 h-7 text-[#D60041]" />
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D60041] transition-colors">{job.title}</h3>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide shadow-sm ${job.is_active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-500 border-gray-200"
              }`}>
              {job.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="text-sm text-gray-500 font-medium mb-3">
            {job.department} • {job.location} • ID: {job.job_id}
          </p>
          <p className="text-sm font-extrabold text-gray-800 mb-4">{job.salary_range} <span className="font-medium text-gray-400">/ month</span></p>

          <div className="flex flex-wrap gap-2">
            {skillsArray.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-lg group-hover:border-pink-100 transition-colors shadow-sm">
                {skill}
              </span>
            ))}
            {skillsArray.length > 4 && (
              <span className="bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-bold px-2 py-1.5 rounded-lg">
                +{skillsArray.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 lg:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-[#D60041] hover:text-white hover:border-[#D60041] transition-all duration-300 shadow-sm text-center"
        >
          Edit Job
        </button>
        <button
          onClick={() => onView(job)}
          className="flex-1 lg:flex-none px-6 py-3 bg-[#D60041] border border-[#D60041] text-white rounded-xl text-xs font-bold hover:bg-[#b50037] hover:border-[#b50037] transition-all duration-300 shadow-sm text-center"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const JobManagementPage = () => {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [modalState, setModalState] = useState({
    type: null,
    selectedJob: null
  });

  const departments = ["All Departments", "Information Technology", "Human Resources", "Marketing", "Finance", "Operations"];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.job_id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || (statusFilter === "Active" ? job.is_active : !job.is_active);
      const matchesDept = deptFilter === "All Departments" || job.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [jobs, searchQuery, statusFilter, deptFilter]);

  const suggestions = searchQuery.length > 0
    ? Array.from(new Set(MOCK_JOBS.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase())).map(j => j.title)))
    : [];

  const handleCreate = (newJobData) => {
    const newJob = { ...newJobData, id: Date.now() };
    setJobs([newJob, ...jobs]);
  };

  const handleUpdate = (updatedJob) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const closeModal = () => setModalState({ type: null, selectedJob: null });

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] pb-12">
      <Helmet><title>HR - Job Management</title></Helmet>
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 md:gap-0">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">Job Management</h2>
            <p className="text-sm text-gray-500 font-medium tracking-wide mt-1.5">Configure and monitor your organization's career opportunities</p>
          </div>
          <button
            onClick={() => setModalState({ type: 'create', selectedJob: null })}
            className="flex items-center px-6 py-3 bg-[#D60041] border border-[#D60041] text-white rounded-xl text-sm font-bold hover:bg-[#b50037] hover:border-[#b50037] transition-all duration-300 shadow-sm shadow-pink-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </button>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-5">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title or job ID..."
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:border-pink-100 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-300 relative z-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 overflow-hidden py-2">
                {suggestions.map((title, idx) => (
                  <li
                    key={idx}
                    className="px-5 py-3 hover:bg-pink-50 hover:text-[#D60041] cursor-pointer text-sm font-semibold transition-colors flex items-center gap-3"
                    onClick={() => {
                      setSearchQuery(title);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="h-4 w-4 text-gray-300" />
                    {title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full md:w-56 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="w-full bg-gray-50/50 border-2 border-gray-100 pl-11 pr-10 py-3.5 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:border-pink-100 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-300 cursor-pointer appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Statuses</option>
              <option value="Active">Active Jobs</option>
              <option value="Inactive">Inactive Jobs</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <select
              className="w-full bg-gray-50/50 border-2 border-gray-100 pl-4 pr-10 py-3.5 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:border-pink-100 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-300 cursor-pointer appearance-none"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[32px] border-2 border-dashed border-gray-200 text-gray-400 shadow-sm">
              <Search className="h-10 w-10 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-bold text-gray-500">No jobs found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={(job) => setModalState({ type: 'edit', selectedJob: job })}
                onView={(job) => setModalState({ type: 'view', selectedJob: job })}
              />
            ))
          )}
        </div>
      </main>

      <CreateJobModal
        isOpen={modalState.type === 'create'}
        onClose={closeModal}
        onSubmit={handleCreate}
      />

      <EditJobModal
        isOpen={modalState.type === 'edit'}
        jobData={modalState.selectedJob}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />

      <ViewJobDetailsModal
        isOpen={modalState.type === 'view'}
        job={modalState.selectedJob}
        onClose={closeModal}
      />
    </div>
  );
};

export default JobManagementPage;