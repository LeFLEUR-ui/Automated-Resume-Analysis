import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';

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
  }
];

const JobCard = ({ job }) => {
  const skillsArray = typeof job.skills_requirements === 'string'
    ? job.skills_requirements.split(',').map(s => s.trim())
    : [];

  const displaySkills = skillsArray.slice(0, 4);
  const remainingCount = skillsArray.length - 4;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-pink-100 transition-all">
      
      <div className="flex flex-col md:flex-row justify-between gap-6">

        <div className="w-full">

          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-900">
              {job.title}
            </h3>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
              job.is_active
                ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                : "bg-gray-50 text-gray-400 border-gray-100"
            }`}>
              {job.is_active ? "active" : "inactive"}
            </span>
          </div>

          <p className="text-[13px] text-gray-400 mb-3">
            {job.department} • {job.location} • ID: {job.job_id}
          </p>

          <p className="text-sm font-semibold text-gray-700 mb-4">
            {job.salary_range}
          </p>

          <div className="flex flex-wrap gap-2">
            {displaySkills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="bg-gray-100 text-gray-400 text-[11px] px-2.5 py-1 rounded-md">
                +{remainingCount} more
              </span>
            )}
          </div>

        </div>

        <div className="flex gap-3 md:flex-col lg:flex-row">

          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Edit
          </button>

          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            View
          </button>

        </div>

      </div>
    </div>
  );
};

const JobManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  const departments = [
    "All Departments",
    "Information Technology",
    "Human Resources",
    "Marketing",
    "Finance"
  ];

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const searchMatch =
        !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch =
        selectedStatus === "All Status" ||
        (selectedStatus === "Active" && job.is_active) ||
        (selectedStatus === "Inactive" && !job.is_active);

      const deptMatch =
        selectedDept === "All Departments" ||
        job.department === selectedDept;

      return searchMatch && statusMatch && deptMatch;
    });
  }, [searchQuery, selectedStatus, selectedDept]);

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Helmet>
        <title>HR - Job Management</title>
      </Helmet>
      
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-8">

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Job Management
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Create and manage job postings
            </p>
          </div>

          <button className="bg-[#d81159] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
            Create Job
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 flex gap-4">

          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-48 px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-52 px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
          >
            {departments.map(dept => (
              <option key={dept}>{dept}</option>
            ))}
          </select>

        </div>

        <div className="space-y-4">

          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="bg-white border border-dashed border-gray-200 p-20 rounded-2xl text-center text-gray-400">
              No jobs match your filters.
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default JobManagement;