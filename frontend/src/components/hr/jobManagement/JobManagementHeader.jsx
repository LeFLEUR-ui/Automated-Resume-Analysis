import React from 'react';
import { Plus } from 'lucide-react';

const JobManagementHeader = ({ onCreateJob }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 md:gap-0">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900">Job Management</h2>
        <p className="text-sm text-gray-500 font-medium tracking-wide mt-1.5">
          Configure and monitor your organization's career opportunities
        </p>
      </div>
      <button
        onClick={onCreateJob}
        className="flex items-center px-6 py-3 bg-[#D60041] border border-[#D60041] text-white rounded-xl text-sm font-bold hover:bg-[#b50037] hover:border-[#b50037] transition-all duration-300 shadow-sm shadow-pink-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Job
      </button>
    </div>
  );
};

export default JobManagementHeader;
