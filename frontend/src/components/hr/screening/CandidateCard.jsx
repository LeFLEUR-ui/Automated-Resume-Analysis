import React, { useState } from 'react';

const CandidateCard = ({ candidate, onOpenDetails, onOpenInterview, onUpdateStatus }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const status = candidate.status.toLowerCase();
  const avatarUrl = candidate.profileImage 
    ? candidate.profileImage 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=fdf2f8&color=d81159&bold=true`;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toISOString().replace('T', ' ').substring(0, 16);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-100 transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 group">
      <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 w-full lg:w-auto">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-pink-100 bg-gradient-to-br from-pink-50 to-red-50 shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
          <img src={avatarUrl} alt={candidate.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D60041] transition-colors">{candidate.name}</h3>
            
            <div className={`relative group/status rounded-xl transition-all ${isUpdating ? 'animate-success-pulse' : ''}`}>
              <select 
                value={candidate.status}
                onChange={async (e) => {
                  setIsUpdating(true);
                  await onUpdateStatus(candidate.id, e.target.value);
                  setTimeout(() => setIsUpdating(false), 1000);
                }}
                className={`appearance-none cursor-pointer text-[10px] font-black px-4 py-1.5 pr-9 rounded-xl border-2 uppercase tracking-widest shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                  candidate.status.toLowerCase() === 'accepted' ? 'bg-green-50 text-green-600 border-green-200 focus:ring-green-500' :
                  candidate.status.toLowerCase() === 'rejected' ? 'bg-red-50 text-red-600 border-red-200 focus:ring-red-500' :
                  candidate.status.toLowerCase() === 'reviewed' ? 'bg-blue-50 text-blue-600 border-blue-200 focus:ring-blue-500' :
                  'bg-orange-50 text-orange-600 border-orange-200 focus:ring-orange-500'
                }`}
              >
                <option value="Pending">🕒 Pending</option>
                <option value="Reviewed">🔍 Reviewed</option>
                <option value="Accepted">✅ Accepted</option>
                <option value="Rejected">❌ Rejected</option>
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 transition-colors ${
                candidate.status.toLowerCase() === 'accepted' ? 'text-green-600' :
                candidate.status.toLowerCase() === 'rejected' ? 'text-red-600' :
                candidate.status.toLowerCase() === 'reviewed' ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                <svg className="h-4 w-4 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(candidate.date)}
            </span>
            <span className="hidden sm:block text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {candidate.location}
            </span>
            <span className="hidden sm:block text-gray-300">•</span>
            <span className="text-[#D60041] font-extrabold px-2 py-0.5 bg-red-50 rounded-md">{Math.round(candidate.matchScore)}% Match</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
        <button
          onClick={() => onOpenDetails(candidate)}
          className="flex-1 lg:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-[#D60041] hover:text-white hover:border-[#D60041] transition-all duration-300 shadow-sm text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onOpenInterview(candidate)}
          className="flex-1 lg:flex-none px-6 py-3 bg-[#D60041] border border-[#D60041] text-white rounded-xl text-xs font-bold hover:bg-[#b50037] hover:border-[#b50037] transition-all duration-300 shadow-sm text-center"
        >
          Schedule Interview
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
