import React from 'react';
import { Download } from 'lucide-react';

const ScreeningHeader = ({ onExport }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 md:gap-0">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900">
          Resume Screening
        </h2>
        <p className="text-sm text-gray-500 font-medium tracking-wide mt-1.5">
          Review and manage candidate applications
        </p>
      </div>

      <button 
        onClick={onExport}
        className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:border-pink-100 hover:text-[#D60041] hover:bg-pink-50 hover:shadow-sm transition-all duration-300 text-xs font-bold tracking-tight text-gray-700 flex items-center shadow-sm group"
      >
        <Download className="h-4 w-4 mr-2 text-gray-400 group-hover:text-[#D60041] transition-colors" />
        Export List
      </button>
    </div>
  );
};

export default ScreeningHeader;
