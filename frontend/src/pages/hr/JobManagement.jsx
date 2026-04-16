import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
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
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-pink-100 transition-all group">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#d81159] transition-colors">{job.title}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
              job.is_active ? "bg-emerald-50 text-emerald-500 border-emerald-100" : "bg-gray-50 text-gray-400 border-gray-100"
            }`}>
              {job.is_active ? "active" : "inactive"}
            </span>
          </div>
          <p className="text-[13px] text-gray-400 mb-3 font-medium">
            {job.department} • {job.location} • ID: {job.job_id}
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-4">{job.salary_range}</p>
          <div className="flex flex-wrap gap-2">
            {skillsArray.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-md font-medium">{skill}</span>
            ))}
            {skillsArray.length > 4 && (
              <span className="bg-gray-50 text-gray-400 text-[11px] px-2.5 py-1 rounded-md italic">+{skillsArray.length - 4} more</span>
            )}
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => onEdit(job)}
            className="flex-1 md:flex-none px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Edit Job
          </button>
          <button 
            onClick={() => onView(job)}
            className="flex-1 md:flex-none px-5 py-2 bg-[#d81159] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const JobManagementPage = () => {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  
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

  const handleCreate = (newJobData) => {
    const newJob = { ...newJobData, id: Date.now() };
    setJobs([newJob, ...jobs]);
  };

  const handleUpdate = (updatedJob) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const closeModal = () => setModalState({ type: null, selectedJob: null });

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Helmet><title>HR - Job Management</title></Helmet>
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Job Management</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">Configure and monitor your organization's career opportunities</p>
          </div>
          <button 
            onClick={() => setModalState({ type: 'create', selectedJob: null })}
            className="bg-[#d81159] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-pink-100"
          >
            Create Job
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by title or job ID..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="w-48 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select 
            className="w-52 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
              No matching job postings found.
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