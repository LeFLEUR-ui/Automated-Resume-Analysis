import React from 'react';
import { X, Briefcase, MapPin, Building2, DollarSign, ListChecks, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const ViewJobDetailsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  const skillsArray = typeof job.skills_requirements === 'string'
    ? job.skills_requirements.split(',').map(s => s.trim())
    : job.skills_requirements || [];

  const DetailSection = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
        <Icon size={12} className="text-gray-400" /> {label}
      </span>
      <span className="text-sm font-semibold text-gray-700">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                job.is_active 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-gray-50 text-gray-400 border-gray-100'
              }`}>
                {job.is_active ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                {job.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-gray-400 font-medium">Internal ID: {job.job_id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <DetailSection icon={Building2} label="Department" value={job.department} />
            <DetailSection icon={Clock} label="Type" value={job.job_type} />
            <DetailSection icon={MapPin} label="Location" value={job.location} />
            <DetailSection icon={DollarSign} label="Salary" value={job.salary_range} />
          </div>

          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
              <FileText size={14} className="text-[#d81159]" /> Job Description
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description || "No description provided for this position."}
            </p>
          </div>

          <div className="space-y-3 pb-4">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
              <ListChecks size={14} className="text-[#d81159]" /> Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-md"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobDetailsModal;