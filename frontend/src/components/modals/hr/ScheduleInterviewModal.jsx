import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Check,
  Clock,
  Globe,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  X,
  Briefcase,
  ChevronRight,
  Zap,
  Bot,
  Settings2,
  Volume2,
  User
} from 'lucide-react';

const ScheduleInterviewModal = ({ isOpen, onClose, candidate }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Video Call',
    language: 'English',
    voiceType: 'Neural (Professional)',
    notes: '',
    autoVoiceCall: true
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (formData.date && formData.time) {
      setIsSyncing(true);
      const timer = setTimeout(() => {
        setIsSyncing(false);
        setIsAvailable(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [formData.date, formData.time]);

  if (!isOpen || !candidate) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Twilio AI initialized! Scheduling successful.
Automated Voice: ${formData.voiceType} (${formData.language})
Calendar: Synced
SMS Backup: Enabled`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-5xl rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">

        <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-slate-50/80 to-transparent">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#D10043] rounded-[22px] flex items-center justify-center text-white shadow-2xl shadow-pink-200">
              <Calendar size={28} strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Schedule Interview</h3>
                <span className="bg-[#D10043]/10 text-[#D10043] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border border-[#D10043]/20">
                  AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold flex items-center gap-2 uppercase tracking-widest">
                <Zap size={14} className="text-[#F59E0B]" fill="currentColor" />
                Real-time Twilio Infrastructure Integrated
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-slate-100 rounded-full transition-all text-slate-300 hover:text-slate-900">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row h-full">

          <div className="flex-1 p-12 space-y-10 border-r border-slate-50 bg-white">

            <div className="flex items-center gap-6 p-6 bg-slate-50/50 rounded-[32px] border border-slate-100/80">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center text-[#D10043] font-black text-2xl shadow-sm bg-white">
                {candidate.profileImage ? (
                  <img src={candidate.profileImage} alt={candidate.name} className="w-full h-full object-cover" />
                ) : (
                  candidate.name.charAt(0)
                )}
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 tracking-tight">{candidate.name}</p>
                <div className="flex items-center gap-3 text-slate-500 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D10043]">{candidate.preferredJob}</span>
                  </div>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate ID: #ARA-882</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interview Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D10043] transition-colors" size={20} />
                  <input
                    required
                    type="date"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Time</label>
                <div className="relative group">
                  <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D10043] transition-colors" size={20} />
                  <input
                    required
                    type="time"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-center block">Select Interview Format</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'Video Call', icon: <Volume2 size={16} /> },
                  { id: 'In-Person', icon: <User size={16} /> },
                  { id: 'Phone', icon: <PhoneCall size={16} /> }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={`flex flex-col items-center gap-2 p-5 rounded-[24px] border transition-all ${formData.type === type.id
                        ? 'bg-[#D10043] text-white border-[#D10043] shadow-xl shadow-pink-100'
                        : 'bg-white text-slate-600 border-slate-100 hover:border-[#D10043]/30 hover:bg-slate-50'
                      }`}
                  >
                    {type.icon}
                    <span className="text-xs font-black uppercase tracking-tight">{type.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Notes (Visible to Interviewers)</label>
              <textarea
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all resize-none min-h-[120px]"
                placeholder="Brief summary of what to cover..."
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="w-full lg:w-[420px] bg-slate-50/70 p-12 flex flex-col justify-between border-l border-slate-100">
            <div className="space-y-10">

              <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Bot size={20} className="text-[#D10043]" />
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Twilio AI Caller</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Live Engine</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#D10043]/5 text-[#D10043] rounded-[14px] flex items-center justify-center">
                        <PhoneCall size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Auto-Call Pipeline</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">REQ028 Integrated</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.autoVoiceCall}
                        onChange={(e) => setFormData({ ...formData, autoVoiceCall: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D10043]"></div>
                    </label>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} /> Language
                      </p>
                      <div className="flex gap-2">
                        {['English', 'Filipino'].map(lang => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setFormData({ ...formData, language: lang })}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all border ${formData.language === lang
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                              }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Settings2 size={12} /> Voice Profile
                      </p>
                      <select
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#D10043]/20 transition-all cursor-pointer"
                        value={formData.voiceType}
                        onChange={(e) => setFormData({ ...formData, voiceType: e.target.value })}
                      >
                        <option>Neural (Professional)</option>
                        <option>Casual (Friendly)</option>
                        <option>Executive (Formal)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-[28px] border-2 transition-all ${isSyncing ? 'bg-white border-slate-100' : isAvailable ? 'bg-white border-green-500/10' : 'bg-white border-red-500/10'}`}>
                  {isSyncing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#D10043] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">Syncing Calendars...</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl shadow-sm ${isAvailable ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                        {isAvailable ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
                      </div>
                      <div>
                        <p className={`text-xs font-black uppercase tracking-tighter ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {isAvailable ? 'Conflict-Free Slot' : 'Schedule Override Required'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed mt-0.5">
                          {isAvailable ? 'HR and Manager availability verified.' : 'Time conflict detected in manager calendar.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-10 border-t border-slate-200/50">
              <button
                type="submit"
                className="w-full px-8 py-5 bg-[#D10043] text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-pink-200 active:scale-[0.97] flex items-center justify-center gap-3"
              >
                Schedule & Initialize AI
                <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-[#D10043] transition-colors"
              >
                Close Without Saving
              </button>
            </div>
          </div>

        </form>

        <div className="px-12 py-4 bg-slate-900 flex justify-between items-center">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Enterprise Recruitment System v2.4.0
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#D10043] rounded-full" />
              <p className="text-[9px] font-black text-white uppercase tracking-widest">Twilio AI Integrated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;