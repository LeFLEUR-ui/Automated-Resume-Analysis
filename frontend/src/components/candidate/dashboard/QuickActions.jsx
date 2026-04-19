import React from 'react';
import { FileText, Award, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const ACTIONS = [
    { icon: <FileText size={18} />, label: "Update Resume", desc: "Latest version", path: "/candidate/settings" },
    { icon: <Award size={18} />, label: "Skill Assessment", desc: "Verify expertise", path: "/candidate/settings" },
    { icon: <Settings size={18} />, label: "Portal Settings", desc: "Notifications", path: "/candidate/settings" }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl shadow-slate-200/40">
      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Quick Actions</h3>
      <div className="space-y-4">
        {ACTIONS.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.path)}
            className="w-full flex items-center justify-between p-5 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-[#D10043]/20 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-[#D10043] border border-slate-100 transition-colors">
                {action.icon}
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-900 leading-none mb-1 group-hover:text-[#D10043] transition-colors">{action.label}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{action.desc}</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-200 group-hover:text-[#D10043] transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
