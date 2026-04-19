import React from 'react';
import { Briefcase, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationList = ({ applications }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-2xl shadow-slate-200/40">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 rounded-2xl text-white">
            <Briefcase size={20} />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Applications</h3>
        </div>
        <button
          onClick={() => navigate('/candidate/applicationtracking')}
          className="text-[10px] font-black uppercase tracking-widest text-[#D10043] hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          View All <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app.id}
            onClick={() => navigate('/candidate/applicationtracking')}
            className="group relative border border-slate-50 bg-slate-50/30 rounded-[32px] p-8 hover:bg-white hover:border-[#D10043]/10 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/40"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <p className="text-[10px] font-black text-[#D10043] uppercase tracking-[0.2em] mb-1">#ARA-88{app.id}</p>
                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{app.role}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{app.company}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${app.statusColor}`}>
                {app.status}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                <span>Process Stage</span>
                <span>Stage {app.step} of {app.totalSteps}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(app.step / app.totalSteps) * 100}%` }}
                  className="bg-[#D10043] h-full rounded-full transition-all duration-700 delay-300"
                ></div>
              </div>
            </div>

            <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
              <ChevronRight className="text-[#D10043]" size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;
