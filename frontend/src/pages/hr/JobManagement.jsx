import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/Header';
import CreateJobModal from '../../components/modals/hr/CreateJobModal';
import EditJobModal from '../../components/modals/hr/EditJobModal';
import ViewJobDetailsModal from '../../components/modals/hr/ViewJobDetailsModal';

// Job management components
import JobManagementHeader from '../../components/hr/jobManagement/JobManagementHeader';
import JobSearchAndFilter from '../../components/hr/jobManagement/JobSearchAndFilter';
import JobList from '../../components/hr/jobManagement/JobList';

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
        <JobManagementHeader onCreateJob={() => setModalState({ type: 'create', selectedJob: null })} />

        <JobSearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          departments={departments}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={suggestions}
        />

        <JobList 
          jobs={filteredJobs}
          onEdit={(job) => setModalState({ type: 'edit', selectedJob: job })}
          onView={(job) => setModalState({ type: 'view', selectedJob: job })}
        />
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