import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, Users } from 'lucide-react';

const BASE_URL = "http://localhost:8000";

const CandidateRow = ({ name, role, skills, match, status, profileImage }) => {
  const statusStyles = {
    pending: "bg-gray-100 text-gray-500",
    reviewed: "bg-white border border-gray-100 text-gray-400",
    approved: "bg-[#D60041] text-white",
    rejected: "bg-red-50 text-red-400"
  };

  const skillsList = Array.isArray(skills)
    ? skills
    : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : []);

  return (
    <div className="flex items-center justify-between p-4 border border-gray-50 rounded-[24px] hover:border-pink-100 hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-50">
          {profileImage ? (
            <img src={profileImage.startsWith('http') ? profileImage : `${BASE_URL}${profileImage}`} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Users className="text-pink-600 h-5 w-5" />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-[15px] tracking-tight text-gray-900">{name}</h3>
          <p className="text-[12px] text-gray-400 font-medium tracking-wide">{role}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-2">
          {skillsList.slice(0, 2).map((skill, i) => (
            <span key={i} className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-semibold text-gray-600">
              {skill}
            </span>
          ))}
        </div>

        <div className="text-center w-20">
          <p className="text-[#D60041] font-extrabold text-lg">{match}%</p>
          <p className="text-[9px] text-gray-400 uppercase font-semibold mt-1">Match</p>
        </div>

        <div className="w-24 flex justify-center">
          <span className={`px-5 py-1.5 rounded-full text-[10px] font-semibold uppercase ${statusStyles[status]}`}>
            {status}
          </span>
        </div>

        <button className="px-6 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 hover:bg-gray-50">
          Review
        </button>
      </div>
    </div>
  );
};

const RecentSubmissions = ({ candidates }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">Recent Submissions</h3>
          <p className="text-sm text-gray-400 mt-1 font-medium tracking-wide">
            Latest resume submissions from the database
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/screening')} className="bg-gray-50 text-gray-700 px-5 py-2 rounded-xl text-xs font-semibold hover:bg-gray-100">
            View All
          </button>
          <ChevronUp className="text-xs text-gray-300" />
        </div>
      </div>

      <div className="space-y-4">
        {candidates.map((can) => (
          <CandidateRow
            key={can.id}
            name={can.name}
            role={can.preferredJob}
            skills={can.skills}
            match={can.matchScore}
            status={can.status}
            profileImage={can.profileImage}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSubmissions;