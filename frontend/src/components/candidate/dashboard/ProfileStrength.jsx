import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileStrength = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D10043]/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />

      <div className="max-w-md relative z-10 text-center md:text-left">
        <div className="flex items-center gap-2 bg-[#D10043] w-fit px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-6 mx-auto md:mx-0">
          <Zap size={12} fill="white" />
          High Impact
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-3">Your profile is 85% complete.</h3>
        <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
          Adding your latest certifications could increase your visibility to top-tier recruiters by 40%.
        </p>
        <button
          onClick={() => navigate('/candidate/settings')}
          className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#D10043] hover:text-white transition-all shadow-xl active:scale-[0.95]"
        >
          Optimize Profile
        </button>
      </div>

      <div className="mt-12 md:mt-0 relative z-10">
        <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex flex-col items-center justify-center relative bg-slate-900 shadow-2xl">
          <span className="text-4xl font-black text-white leading-none">85<span className="text-lg">%</span></span>
          <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-xl shadow-lg border-4 border-slate-900">
            <ShieldCheck size={16} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStrength;
