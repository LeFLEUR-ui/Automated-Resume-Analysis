import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  User,
  Mail,
  Lock,
  Bell,
  ShieldCheck,
  Camera,
  ChevronRight,
  Globe,
  MessageSquare,
  Trash2,
  Check,
  Save,
  Zap,
  Smartphone,
  Shield,
  Eye,
  EyeOff,
  Building2,
  Users
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const BRAND_RED = "#D10043";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const userRole = localStorage.getItem('role') || 'Guest';
  const userEmail = localStorage.getItem('saved_email') || 'user@system.com';

  const TABS = [
    { id: 'profile', label: 'Identity & Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];

  if (userRole === 'CANDIDATE') {
    TABS.push({ id: 'applications', label: 'Applications', icon: <ShieldCheck size={18} /> });
  } else if (userRole === 'HR' || userRole === 'ADMIN') {
    TABS.push({ id: 'system', label: 'System Access', icon: <Shield size={18} /> });
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen font-['Inter',_sans-serif] flex flex-col">
      <Helmet>
        <title>Mariwasa - {userRole.charAt(0) + userRole.slice(1).toLowerCase()} Settings</title>
      </Helmet>

      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8 w-full flex-grow">

        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 bg-[#D10043]/5 text-[#D10043] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-[#D10043]/10 w-fit">
            <Zap size={12} className="animate-pulse" />
            {userRole} Preferences
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">
            {userRole === 'HR' ? 'HR' : userRole === 'ADMIN' ? 'Admin' : 'Account'} <span className="text-[#D10043]">Settings</span>
          </h2>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">
            Manage your {userRole.toLowerCase()} credentials and system preferences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          <div className="w-full lg:w-80 shrink-0 animate-in fade-in slide-in-from-left-6 duration-700">
            <div className="bg-white border border-slate-100 rounded-[40px] p-6 shadow-xl shadow-slate-200/40 sticky top-32">
              <div className="space-y-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 group ${activeTab === tab.id
                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                        : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <div className={`${activeTab === tab.id ? 'text-[#D10043]' : 'text-slate-300 group-hover:text-slate-500'} transition-colors`}>
                      {tab.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-[#D10043]" />}
                  </button>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-slate-50 px-2 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Signed in as</p>
                <p className="text-[11px] font-black text-slate-900 truncate mt-1">{userEmail}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Session</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow animate-in fade-in slide-in-from-right-6 duration-700">

            {activeTab === 'profile' && (
              <div className="space-y-10">
                <div className="bg-white border border-slate-100 rounded-[48px] p-10 shadow-xl shadow-slate-200/40">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10 flex items-center gap-3">
                    {userRole === 'CANDIDATE' ? <User size={24} className="text-[#D10043]" /> : <Building2 size={24} className="text-[#D10043]" />}
                    {userRole === 'CANDIDATE' ? 'Public Profile' : 'Professional Identity'}
                  </h3>

                  <div className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-slate-50">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] bg-slate-50 border-4 border-white shadow-2xl shadow-slate-200 overflow-hidden flex items-center justify-center text-slate-200">
                          {userRole === 'CANDIDATE' ? <User size={64} /> : <Shield size={64} />}
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-[#D10043] transition-colors group-hover:scale-110 duration-300">
                          <Camera size={18} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-lg font-black text-slate-900 mb-1">{userRole === 'CANDIDATE' ? 'Profile Picture' : 'Enterprise Avatar'}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                          JPG, GIF or PNG. Max size of 2MB.<br />
                          {userRole === 'CANDIDATE' ? 'Visible to HR and hiring managers.' : 'Used in internal communications and screening.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={userRole === 'CANDIDATE' ? 'Alex Thompson' : 'Mariwasa Official'}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{userRole === 'CANDIDATE' ? 'Professional Title' : 'Department/Role'}</label>
                        <input
                          type="text"
                          defaultValue={userRole === 'CANDIDATE' ? 'Senior Frontend Developer' : 'Human Resources Specialist'}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                        />
                      </div>
                      <div className="col-span-full space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{userRole === 'CANDIDATE' ? 'Bio' : 'Operational Summary'}</label>
                        <textarea
                          rows="4"
                          defaultValue={userRole === 'CANDIDATE' ? 'Passionate frontend engineer with 7+ years of experience...' : 'Managing digital transformation and high-volume recruitment for Mariwasa Siam Ceramics.'}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[24px] text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <button className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Reset</button>
                      <button className="px-10 py-4 bg-[#D10043] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-pink-100 flex items-center gap-3">
                        <Save size={16} /> Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10">
                <div className="bg-white border border-slate-100 rounded-[48px] p-10 shadow-xl shadow-slate-200/40">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10 flex items-center gap-3">
                    <Shield size={24} className="text-[#D10043]" />
                    Security & Credentials
                  </h3>

                  <div className="space-y-10">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                          <div className="relative group">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                              placeholder="••••••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-transparent hidden md:block">Placeholder</label>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed mt-2 px-1">
                            Enterprise accounts require complex passwords (12+ characters, symbols).
                          </p>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                          <input
                            type="password"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                            placeholder="••••••••••••"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#D10043]/10 focus:border-[#D10043] transition-all"
                            placeholder="••••••••••••"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D10043] transition-all shadow-xl active:scale-[0.95]">Update Security Key</button>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-50">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-8 bg-slate-50/50 rounded-[32px] border border-slate-100">
                        <div className="flex gap-5">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D10043] shadow-sm border border-slate-100">
                            <Smartphone size={22} />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900 leading-none mb-2">Multi-Factor Auth (MFA)</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{userRole === 'CANDIDATE' ? 'Secure your account with SMS codes.' : 'Mandatory for administrative access.'}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-7 after:transition-all peer-checked:bg-[#D10043]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {userRole !== 'CANDIDATE' && (
                  <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D10043]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-4">
                        <ShieldCheck size={32} className="text-green-500" />
                        <div>
                          <h4 className="text-lg font-black tracking-tight leading-none mb-2">Access Logs Active</h4>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">All administrative actions are logged for audit compliance.</p>
                        </div>
                      </div>
                      <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">View Active Sessions</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-10">
                <div className="bg-white border border-slate-100 rounded-[48px] p-10 shadow-xl shadow-slate-200/40">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10 flex items-center gap-3">
                    <Bell size={24} className="text-[#D10043]" />
                    Channel Preferences
                  </h3>

                  <div className="space-y-6">
                    {[
                      { title: userRole === 'CANDIDATE' ? "Application Progress" : "Screening Alerts", desc: "Get notified when status changes occur.", icon: <TrendingUp size={18} /> },
                      { title: userRole === 'CANDIDATE' ? "Job Recommendations" : "System Health", desc: "Maintenance and performance updates.", icon: <Zap size={18} /> },
                      { title: "Twilio AI Caller", desc: "Automated phone reminders and notifications.", icon: <Smartphone size={18} /> },
                      { title: "Direct Internal Chat", desc: "Notifications for real-time internal messages.", icon: <MessageSquare size={18} /> }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 hover:bg-slate-50 rounded-[32px] transition-all border border-transparent hover:border-slate-100 group">
                        <div className="flex gap-5">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 group-hover:text-[#D10043] transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-base font-black text-slate-900 leading-none mb-2">{item.title}</h4>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D10043]"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-10">
                    <button className="px-10 py-4 bg-[#D10043] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-pink-100 flex items-center gap-3">
                      <Save size={16} /> Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountSettings;
