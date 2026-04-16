import React, { useState } from 'react';
import Header from '../../components/Header';

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
    id: 5,
    name: "Elena Rodriguez",
    status: "Reviewed",
    preferredJob: "Product Manager",
    skills: ["Agile", "Scrum", "Jira", "Market Analysis"],
    profileImage: null,
    date: "2026-04-15T09:00:00",
    location: "Austin, TX",
    matchScore: 82
  },
];

const ScreeningPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toISOString().replace('T', ' ').substring(0, 16);
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

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-8">

        {/* Top Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Resume Screening
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Review and manage candidate applications (Static Preview)
            </p>
          </div>

          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl hover:shadow-sm transition-all text-xs font-semibold tracking-tight text-gray-600 flex items-center">
            Export List
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 flex gap-4">
          
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name, position, or skills..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-48">
            <select
              className="w-full bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Reviewed</option>
            </select>
          </div>
        </div>

        {/* Candidate List */}
        <div className="space-y-4">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed text-gray-400">
              No candidates found matching your criteria.
            </div>
          ) : (
            filteredCandidates.map(candidate => {
              const status = candidate.status.toLowerCase();

              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                candidate.name
              )}&background=fdf2f8&color=d81159&bold=true`;

              return (
                <div
                  key={candidate.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-pink-100 transition-colors"
                >
                  
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-pink-100 bg-pink-50">
                      <img
                        src={avatarUrl}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {candidate.name}
                        </h3>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                          status === 'reviewed'
                            ? 'bg-blue-50 text-blue-400 border-blue-100'
                            : 'bg-orange-50 text-orange-400 border-orange-100'
                        }`}>
                          {status}
                        </span>
                      </div>

                      <p className="text-[13px] text-gray-400 mb-2">
                        Preferred: {candidate.preferredJob}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-[12px] text-gray-400">
                        <span>{formatDate(candidate.date)}</span>
                        <span>{candidate.location}</span>
                        <span className="text-emerald-500 font-semibold">
                          {candidate.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>

                    <button className="px-5 py-2 bg-[#d81159] text-white rounded-lg text-sm font-semibold hover:opacity-90">
                      Schedule Interview
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
};

export default ScreeningPortal;