import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScheduleInterviewModal from '../../components/modals/hr/ScheduleInterviewModal';
import ViewCandidateDetailsModal from '../../components/modals/hr/ViewCandidateDetailsModal';

// Screening components
import ScreeningHeader from '../../components/hr/screening/ScreeningHeader';
import SearchAndFilter from '../../components/hr/screening/SearchAndFilter';
import CandidateList from '../../components/hr/screening/CandidateList';

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: "Sarah Jenkins",
    status: "Reviewed",
    preferredJob: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    profileImage: null,
    date: "2026-04-12T10:30:00",
    location: "New York, NY",
    matchScore: 94
  },
  {
    id: 2,
    name: "Marcus Chen",
    status: "Pending",
    preferredJob: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    profileImage: null,
    date: "2026-04-14T14:20:00",
    location: "San Francisco, CA",
    matchScore: 88
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    status: "Reviewed",
    preferredJob: "Product Manager",
    skills: ["Agile", "Scrum", "Jira", "Market Analysis"],
    profileImage: null,
    date: "2026-04-15T09:00:00",
    location: "Austin, TX",
    matchScore: 82
  },
  {
    id: 4,
    name: "Tariq Mahmood",
    status: "Pending",
    preferredJob: "Backend Engineer",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    profileImage: null,
    date: "2026-04-15T11:00:00",
    location: "Chicago, IL",
    matchScore: 79
  },
  {
    id: 5,
    name: "Jessica Wu",
    status: "Reviewed",
    preferredJob: "Data Scientist",
    skills: ["Python", "TensorFlow", "Pandas", "SQL"],
    profileImage: null,
    date: "2026-04-15T16:45:00",
    location: "Seattle, WA",
    matchScore: 91
  },
];

const ScreeningPortal = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/applications/');
        // Map backend data to frontend format
        const mapped = response.data.map(app => ({
          id: app.id,
          name: app.candidate_name,
          status: app.status,
          preferredJob: app.job_title || app.job?.job_title || "Unknown",
          skills: app.skills || [],
          profileImage: null,
          date: app.created_at,
          location: app.job?.location || "N/A",
          matchScore: app.match_score || 0
        }));
        setCandidates(mapped);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleOpenInterview = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewModalOpen(true);
  };

  const handleOpenDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setDetailsModalOpen(true);
  };

  const handleUpdateStatus = async (candidateId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/applications/${candidateId}/status`, {
        status: newStatus
      });
      // Update local state
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, status: newStatus } : c
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesStatus =
      statusFilter === "All Status" ||
      c.status.toLowerCase() === statusFilter.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(q) ||
      c.preferredJob.toLowerCase().includes(q) ||
      (c.skills && c.skills.some(s => s.toLowerCase().includes(q)));

    return matchesStatus && matchesSearch;
  });

  const suggestions = searchQuery.length > 0
    ? candidates.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => c.name)
    : [];

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] pb-12">
      <Helmet>
        <title>HR - Screening Portal</title>
      </Helmet>

      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">
        <ScreeningHeader />

        <SearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={suggestions}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-100 border-t-[#D60041] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold">Loading candidates...</p>
          </div>
        ) : (
          <CandidateList 
            candidates={filteredCandidates}
            onOpenDetails={handleOpenDetails}
            onOpenInterview={handleOpenInterview}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      <ScheduleInterviewModal
        isOpen={interviewModalOpen}
        onClose={() => setInterviewModalOpen(false)}
        candidate={selectedCandidate}
      />

      <ViewCandidateDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        candidate={selectedCandidate}
      />
      <Footer />
    </div>
  );
};

export default ScreeningPortal;