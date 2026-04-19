import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Search, Filter } from 'lucide-react';
import Header from '../../components/layout/Header';
import ScheduleInterviewModal from '../../components/modals/hr/ScheduleInterviewModal';
import ViewCandidateDetailsModal from '../../components/modals/hr/ViewCandidateDetailsModal';


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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toISOString().replace('T', ' ').substring(0, 16);
  };

  const handleOpenInterview = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewModalOpen(true);
  };

  const handleOpenDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setDetailsModalOpen(true);
  };

  const filteredCandidates = MOCK_CANDIDATES.filter(c => {
    const matchesStatus =
      statusFilter === "All Status" ||
      c.status.toLowerCase() === statusFilter.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(q) ||
      c.preferredJob.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const suggestions = searchQuery.length > 0
    ? MOCK_CANDIDATES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => c.name)
    : [];

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] pb-12">
      <Helmet>
        <title>HR - Screening Portal</title>
      </Helmet>

      <Header />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 md:gap-0">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">
              Resume Screening
            </h2>
            <p className="text-sm text-gray-500 font-medium tracking-wide mt-1.5">
              Review and manage candidate applications (Static Preview)
            </p>
          </div>

          <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:border-pink-100 hover:text-[#D60041] hover:bg-pink-50 hover:shadow-sm transition-all duration-300 text-xs font-bold tracking-tight text-gray-700 flex items-center shadow-sm group">
            <Download className="h-4 w-4 mr-2 text-gray-400 group-hover:text-[#D60041] transition-colors" />
            Export List
          </button>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-5 relative">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by candidate name..."
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
                {suggestions.map((name, idx) => (
                  <li
                    key={idx}
                    className="px-5 py-3 hover:bg-pink-50 hover:text-[#D60041] cursor-pointer text-sm font-semibold transition-colors flex items-center gap-3"
                    onClick={() => {
                      setSearchQuery(name);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="h-4 w-4 text-gray-300" />
                    {name}
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
              <option value="Pending">Pending Review</option>
              <option value="Reviewed">Already Reviewed</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[32px] border-2 border-dashed border-gray-200 text-gray-400 shadow-sm">
              <Search className="h-10 w-10 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-bold text-gray-500">No candidates found</p>
              <p className="text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredCandidates.map(candidate => {
              const status = candidate.status.toLowerCase();
              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=fdf2f8&color=d81159&bold=true`;

              return (
                <div key={candidate.id} className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-100 transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 group">
                  <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 w-full lg:w-auto">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-pink-100 bg-gradient-to-br from-pink-50 to-red-50 shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <img src={avatarUrl} alt={candidate.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D60041] transition-colors">{candidate.name}</h3>
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide shadow-sm ${status === 'reviewed' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                          {status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 font-medium mb-3">Preferred: {candidate.preferredJob}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-lg group-hover:border-pink-100 transition-colors shadow-sm">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-bold px-2 py-1.5 rounded-lg">
                            +{candidate.skills.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400">
                        <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{formatDate(candidate.date)}</span>
                        <span className="hidden sm:block text-gray-300">•</span>
                        <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{candidate.location}</span>
                        <span className="hidden sm:block text-gray-300">•</span>
                        <span className="text-[#D60041] font-extrabold px-2 py-0.5 bg-red-50 rounded-md">{candidate.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleOpenDetails(candidate)}
                      className="flex-1 lg:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-[#D60041] hover:text-white hover:border-[#D60041] transition-all duration-300 shadow-sm text-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleOpenInterview(candidate)}
                      className="flex-1 lg:flex-none px-6 py-3 bg-[#D60041] border border-[#D60041] text-white rounded-xl text-xs font-bold hover:bg-[#b50037] hover:border-[#b50037] transition-all duration-300 shadow-sm text-center"
                    >
                      Schedule Interview
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
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
    </div>
  );
};

export default ScreeningPortal;