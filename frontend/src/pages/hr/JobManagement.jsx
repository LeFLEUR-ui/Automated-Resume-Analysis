import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

// Layout components
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import JobManagementHeader from '../../components/hr/jobManagement/JobManagementHeader';
import JobSearchAndFilter from '../../components/hr/jobManagement/JobSearchAndFilter';
import JobList from '../../components/hr/jobManagement/JobList';

// Modals
import CreateJobModal from '../../components/modals/hr/CreateJobModal';
import EditJobModal from '../../components/modals/hr/EditJobModal';
import ViewJobDetailsModal from '../../components/modals/hr/ViewJobDetailsModal';

import { useGetJobsQuery } from '../../redux/api/apiSlice';

const JobManagementPage = () => {
  // RTK Query hook handles fetching, loading, error, and caching!
  const { data: jobs = [], isLoading, error: queryError, refetch } = useGetJobsQuery();
  const error = queryError ? "Failed to sync with database. Please try again later." : null;

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [modalState, setModalState] = useState({
    type: null,
    selectedJob: null
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const departments = ["All Departments", "Information Technology", "Human Resources", "Marketing", "Finance", "Operations"];

  // We no longer need fetchJobs manually, but we can keep handleMutationSuccess
  // although RTK Query will auto-refetch due to tag invalidation!
  const closeModal = () => setModalState({ type: null, selectedJob: null });

  const handleMutationSuccess = () => {
    // No need to manually refetch if the mutation invalidates the 'Jobs' tag!
    closeModal();
  };

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

  // Handle page reset on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, deptFilter]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] flex flex-col">
      <Helmet><title>HR - Job Management</title></Helmet>
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">
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
          <>
            <JobList
              jobs={paginatedJobs}
              onEdit={(job) => setModalState({ type: 'edit', selectedJob: job })}
              onView={(job) => setModalState({ type: 'view', selectedJob: job })}
            />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white px-8 py-6 rounded-[32px] shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 font-medium">
                  Showing <span className="font-bold text-gray-900">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredJobs.length)}</span> of <span className="font-bold text-gray-900">{filteredJobs.length}</span> jobs
                </div>
                
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page</span>
                    <div className="px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-inner font-black text-[#D60041] text-sm">
                      {currentPage}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">of {totalPages}</span>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white shadow-lg text-sm font-semibold hover:bg-[#D60041] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    Next
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        </main>
      </div>

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