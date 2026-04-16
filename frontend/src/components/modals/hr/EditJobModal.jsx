import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, Building2, DollarSign, ListChecks, FileText } from 'lucide-react';

const EditJobModal = ({ isOpen, onClose, onSubmit, jobData }) => {
  const [formData, setFormData] = useState({
    job_id: '',
    title: '',
    department: 'Information Technology',
    location: '',
    job_type: 'Full-time',
    salary_range: '',
    description: '',
    skills_requirements: '',
    is_active: true
  });

  useEffect(() => {
    if (isOpen && jobData) {
      setFormData({
        ...jobData,

        skills_requirements: Array.isArray(jobData.skills_requirements) 
          ? jobData.skills_requirements.join(', ') 
          : jobData.skills_requirements || ''
      });
    }
  }, [isOpen, jobData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#d81159] focus:ring-2 focus:ring-pink-50 transition-all";
  const labelClasses = "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Job Posting</h2>
            <p className="text-sm text-gray-400 font-medium">Update the details for {formData.job_id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className={labelClasses}>Job ID (Read-only)</label>
              <input
                disabled
                type="text"
                className={`${inputClasses} opacity-60 cursor-not-allowed`}
                value={formData.job_id}
              />
            </div>

            <div>
              <label className={labelClasses}><Briefcase size={14}/> Job Title</label>
              <input
                required
                type="text"
                className={inputClasses}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className={labelClasses}><Building2 size={14}/> Department</label>
              <select
                className={inputClasses}
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option>Information Technology</option>
                <option>Human Resources</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Operations</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Job Type</label>
              <select
                className={inputClasses}
                value={formData.job_type}
                onChange={(e) => setFormData({...formData, job_type: e.target.value})}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}><MapPin size={14}/> Location</label>
              <input
                required
                type="text"
                className={inputClasses}
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div>
              <label className={labelClasses}><DollarSign size={14}/> Salary Range</label>
              <input
                required
                type="text"
                className={inputClasses}
                value={formData.salary_range}
                onChange={(e) => setFormData({...formData, salary_range: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}><FileText size={14}/> Job Description</label>
              <textarea
                required
                rows="4"
                className={`${inputClasses} resize-none`}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}><ListChecks size={14}/> Skills Requirements</label>
              <input
                required
                type="text"
                className={inputClasses}
                value={formData.skills_requirements}
                onChange={(e) => setFormData({...formData, skills_requirements: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
              <div>
                <span className="text-sm font-bold text-gray-700 block">Active Status</span>
                <span className="text-xs text-gray-400 font-medium">Toggle visibility for applicants</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${formData.is_active ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {formData.is_active ? 'Active' : 'Inactive'}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_active ? 'bg-emerald-500' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-3 justify-end sticky bottom-0 bg-white pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2.5 bg-[#d81159] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-pink-100"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;