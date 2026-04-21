import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

// Layout components
import Header from '../../components/layout/Header';
import JobManagementHeader from '../../components/hr/jobManagement/JobManagementHeader';
import JobSearchAndFilter from '../../components/hr/jobManagement/JobSearchAndFilter';
import JobList from '../../components/hr/jobManagement/JobList';

// Modals
import CreateJobModal from '../../components/modals/hr/CreateJobModal';
import EditJobModal from '../../components/modals/hr/EditJobModal';
import ViewJobDetailsModal from '../../components/modals/hr/ViewJobDetailsModal';

const JobManagementPage = () => {
  // State for database data
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [modalState, setModalState] = useState({
    type: null,
    selectedJob: null
  });

  const departments = ["All Departments", "Information Technology", "Human Resources", "Marketing", "Finance", "Operations"];

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/hr/read-jobs');

      const rawData = Array.isArray(response.data) ? response.data : [];

      const transformedData = rawData.map(job => {
        return {
          ...job,

          title: job.job_title || "Untitled Position",

          department: job.department || "General",

          location: job.location || "Remote / Not Specified",

          salary_range: job.salary_range || "Competitive / TBD",

          is_active: Boolean(job.is_active)
        };
      });

      setJobs(transformedData);
      setError(null);
    } catch (err) {
      console.error("Critical Error fetching jobs:", err);
      setError("Failed to sync with database. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const titleMatch = job.job_title?.toLowerCase() || "";
      const idMatch = job.job_id?.toLowerCase() || "";

      const matchesSearch = !searchQuery ||
        titleMatch.includes(searchQuery.toLowerCase()) ||
        idMatch.includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All Status" ||
        (statusFilter === "Active" ? job.is_active : !job.is_active);

      const matchesDept = deptFilter === "All Departments" ||
        job.department === deptFilter;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [jobs, searchQuery, statusFilter, deptFilter]);

  const closeModal = () => setModalState({ type: null, selectedJob: null });

  const handleMutationSuccess = () => {
    fetchJobs();
    closeModal();
  };

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
          suggestions={[]}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p>Fetching latest job openings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <JobList
            jobs={filteredJobs}
            onEdit={(job) => setModalState({ type: 'edit', selectedJob: job })}
            onView={(job) => setModalState({ type: 'view', selectedJob: job })}
          />
        )}
      </main>

      <CreateJobModal
        isOpen={modalState.type === 'create'}
        onClose={closeModal}
        onSuccess={handleMutationSuccess}
      />

      <EditJobModal
        isOpen={modalState.type === 'edit'}
        jobData={modalState.selectedJob}
        onClose={closeModal}
        onSuccess={handleMutationSuccess}
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