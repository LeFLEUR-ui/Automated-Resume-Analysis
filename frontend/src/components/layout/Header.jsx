import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown, LayoutDashboard, Users, Database, ShieldCheck, LogOut,
  Settings, Menu, X, FileText, Search, User, Building2, Info, Briefcase, LogIn, UserPlus,
  Bell, Clock, CheckCircle2, AlertCircle, MessageSquare, ChevronRight,
  TrendingUp, Zap, Radio
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const BRAND_RED = "#D60041";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  const userEmail = localStorage.getItem('saved_email') || 'user@system.com';
  const userRole = localStorage.getItem('role') || 'Guest';
  const [profileImageUrl, setProfileImageUrl] = useState(localStorage.getItem('profile_image_url'));

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImageUrl(localStorage.getItem('profile_image_url'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Sync with a short interval as a fallback
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isCandidateRole = userRole === 'CANDIDATE';
  const isHRRole = userRole === 'HR';
  const isAdminRole = userRole === 'ADMIN';
  const isGuest = userRole === 'Guest';

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getInitialNotifications = () => {
      if (isAdminRole) return [
        { id: 1, title: 'Security Alert', desc: 'Multiple failed login attempts from IP: 192.168.1.1', time: '10m ago', type: 'system', icon: <ShieldCheck size={16} />, bgColor: 'bg-red-50', textColor: 'text-red-600', tag: 'High Risk', tagColor: 'bg-red-100 text-red-700', read: false },
        { id: 2, title: 'Server Sync', desc: 'Siam Ceramics database sync completed.', time: '2h ago', type: 'system', icon: <Database size={16} />, bgColor: 'bg-green-50', textColor: 'text-green-600', read: false },
        { id: 3, title: 'Audit Log Export', desc: 'The monthly audit log is ready for download.', time: '5h ago', type: 'admin', icon: <FileText size={16} />, bgColor: 'bg-blue-50', textColor: 'text-blue-600', read: false }
      ];
      if (isHRRole) return [
        { id: 1, title: 'New Application', desc: 'John Doe applied for Senior UI/UX Designer.', time: '5m ago', type: 'recruitment', icon: <User size={16} />, bgColor: 'bg-pink-50', textColor: 'text-[#D60041]', tag: 'New', tagColor: 'bg-pink-100 text-[#D60041]', read: false },
        { id: 2, title: 'Interview Confirmed', desc: 'Sarah Jane accepted the Technical Interview.', time: '45m ago', type: 'schedule', icon: <Clock size={16} />, bgColor: 'bg-blue-50', textColor: 'text-blue-600', read: false },
        { id: 3, title: 'Smart Upload Info', desc: '30 resumes were processed in the last hour.', time: '1h ago', type: 'system', icon: <Zap size={16} />, bgColor: 'bg-orange-50', textColor: 'text-orange-600', read: false }
      ];
      if (isCandidateRole) return [
        { id: 1, title: 'Status Update', desc: 'Your application for Frontend Lead is now "Under Review".', time: '2m ago', type: 'application', icon: <Briefcase size={16} />, bgColor: 'bg-blue-50', textColor: 'text-blue-600', tag: 'Update', tagColor: 'bg-blue-100 text-blue-700', read: false },
        { id: 2, title: 'Interview Invite', desc: 'Mariwasa HR sent you an interview invitation.', time: '1h ago', type: 'schedule', icon: <MessageSquare size={16} />, bgColor: 'bg-pink-50', textColor: 'text-[#D60041]', read: false },
        { id: 3, title: 'Job Match', desc: 'New "UI Designer" role matches your profile.', time: '3h ago', type: 'job', icon: <TrendingUp size={16} />, bgColor: 'bg-green-50', textColor: 'text-green-600', read: false }
      ];
      return [];
    };
    setNotifications(getInitialNotifications());
  }, [userRole]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const isAdminPath = location.pathname.startsWith('/admin');
  const isHRPath = location.pathname.startsWith('/hr');
  const isCandidatePath = location.pathname.startsWith('/candidate');

  const isApplicationPage =
    location.pathname.includes('/job-details/') ||
    location.pathname.includes('/apply/') ||
    location.pathname.includes('/smart-upload') ||
    location.pathname.includes('/preview-and-verify/') ||
    location.pathname.includes('/applicationform/') ||
    location.pathname.includes('/submissionsuccess/');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavItems = () => {
    if (isAdminRole) return [
      { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'User Management', path: '/admin/users', icon: <Users size={18} /> },
      { label: 'Audit Logs', path: '/admin/auditlog', icon: <Database size={18} /> },
    ];
    if (isHRRole) return [
      { label: 'Dashboard', path: '/hr/dashboard', icon: <Building2 size={18} /> },
      { label: 'Screening', path: '/hr/screeningportal', icon: <User size={18} /> },
      { label: 'Jobs', path: '/hr/jobmanagement', icon: <Settings size={18} /> },
    ];
    if (isCandidateRole) return [
      { label: 'Dashboard', path: '/candidate/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Find Jobs', path: '/candidate/findjobs', icon: <Search size={18} /> },
      { label: 'Applications', path: '/candidate/applicationtracking', icon: <FileText size={18} /> },
    ];
    return [
      { label: 'About', path: '/aboutpage', icon: <Info size={18} /> },
      { label: 'Careers', path: '/careerspage', icon: <Briefcase size={18} /> },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 md:px-10 py-4 sticky top-0 z-50 font-sans shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-4 cursor-pointer shrink-0 group" onClick={() => navigate(isGuest ? '/' : location.pathname)}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${!isGuest && 'group-hover:shadow-[0_0_15px_rgba(209,0,67,0.3)]'}`}>
            <img src="/src/assets/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-gray-900 leading-tight">
              {isAdminRole ? "Admin Portal" : isHRRole ? "HR Portal" : isCandidateRole ? "Candidate Portal" : "Mariwasa"}
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isGuest ? 'text-gray-400' : 'text-[#D60041]'}`}>
              {isGuest ? "Siam Ceramics Inc." : "Resume Analysis System"}
            </p>
          </div>
        </div>

        <div className={`hidden lg:flex flex-1 items-center ${isGuest || isApplicationPage ? 'justify-end pr-8' : 'justify-center'}`}>
          {!isApplicationPage && (
            <nav className="flex items-center space-x-1 bg-gray-50/50 p-1 rounded-2xl border border-gray-100">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={`px-5 py-2.5 rounded-xl flex items-center space-x-2.5 transition-all duration-300 group ${isActive
                        ? 'bg-white text-[#D60041] shadow-sm ring-1 ring-gray-200/50'
                        : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'
                      }`}
                  >
                    <span className={`transition-transform duration-300 ${isActive ? 'text-[#D60041]' : 'text-gray-400 group-hover:text-gray-600'} ${!isActive && 'group-hover:scale-110'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4 relative shrink-0" ref={dropdownRef}>
          {isApplicationPage ? (
            <button
              onClick={() => navigate('/careerspage')}
              className="hidden lg:flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-50 hover:text-[#D60041] hover:border-pink-200 transition-all shadow-sm active:scale-95"
            >
              <X size={18} />
              <span>Cancel Application</span>
            </button>
          ) : isGuest ? (
            <div className="hidden lg:block relative group">
              <button className="flex items-center space-x-2 bg-[#D60041] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#b50037] transition-all shadow-md shadow-pink-200">
                <span>Access Portal</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-[24px] shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                <div className="px-5 py-2 mb-2 border-b border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Portal</p>
                </div>
                <button onClick={() => navigate('/login')} className="w-full flex items-center space-x-4 px-5 py-3.5 text-sm font-bold text-gray-700 hover:bg-pink-50 hover:text-[#D60041] transition-colors"><LogIn size={18} className="text-gray-400" /> <span>Login to Account</span></button>
                <button onClick={() => navigate('/register')} className="w-full flex items-center space-x-4 px-5 py-3.5 text-sm font-bold text-gray-700 hover:bg-pink-50 hover:text-[#D60041] transition-colors"><UserPlus size={18} className="text-gray-400" /> <span>Register New User</span></button>
              </div>
            </div>
          ) : (
            <>
              {/* Notification Bell */}
              <div className="relative mr-2" ref={notificationsRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border ${isNotificationsOpen ? 'bg-slate-900 border-slate-900 shadow-xl' : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-pink-100 hover:shadow-md hover:scale-105 active:scale-95'}`}
                >
                  <Bell size={20} className={isNotificationsOpen ? 'text-white' : 'text-gray-500'} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D60041] text-white text-[9px] font-black rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <NotificationDropdown 
                    userRole={userRole} 
                    notifications={notifications} 
                    onMarkAllRead={handleMarkAllRead}
                  />
                )}
              </div>
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className={`hidden lg:flex items-center space-x-4 border px-2 py-2 pr-5 rounded-full cursor-pointer transition-all duration-300 group ${isProfileOpen ? 'bg-gray-50 border-gray-200 shadow-inner' : 'hover:border-pink-200 border-gray-100 hover:shadow-md hover:bg-white bg-gray-50/50'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 overflow-hidden ${isProfileOpen ? 'bg-[#D60041] border-[#D60041] shadow-md shadow-pink-200' : 'bg-white border-gray-200 group-hover:border-pink-200'}`}>
                {profileImageUrl ? (
                  <img 
                    src={profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`items-center justify-center w-full h-full ${profileImageUrl ? 'hidden' : 'flex'}`}>
                  {isAdminRole ? <ShieldCheck className={`h-4 w-4 ${isProfileOpen ? 'text-white' : 'text-gray-600 group-hover:text-[#D60041]'}`} /> : <User className={`h-4 w-4 ${isProfileOpen ? 'text-white' : 'text-gray-600 group-hover:text-[#D60041]'}`} />}
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-0.5">{userRole}</span>
                <span className="text-xs font-bold text-gray-900 truncate max-w-[130px]">{userEmail}</span>
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ml-1 ${isProfileOpen ? 'rotate-180 text-[#D60041]' : 'group-hover:text-gray-600'}`} />
            </div>
            </>
          )}

          {isProfileOpen && !isGuest && (
            <div className="absolute right-0 top-[calc(100%+16px)] w-72 bg-white border border-gray-100 rounded-[24px] shadow-2xl py-3 z-[60] animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="px-6 py-4 border-b border-gray-50 mb-2">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{isAdminRole ? "Admin Session" : "Active Account"}</p>
                <p className="text-sm font-bold text-gray-900 truncate">{userEmail}</p>
              </div>
              <button onClick={() => navigate(isAdminRole ? '/admin/profile' : isHRRole ? '/hr/profile' : '/candidate/profile')} className="w-full text-left px-6 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center space-x-4 transition-all group">
                <User size={18} className="text-gray-400 group-hover:text-gray-600" /> <span>View Profile</span>
              </button>
              <button onClick={() => navigate(isAdminRole ? '/admin/settings' : isHRRole ? '/hr/settings' : '/candidate/settings')} className="w-full text-left px-6 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center space-x-4 transition-all group">
                <Settings size={18} className="text-gray-400 group-hover:text-gray-600" /> <span>Account Settings</span>
              </button>
              <button onClick={handleLogout} className="w-full text-left px-6 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center space-x-4 transition-all">
                <LogOut size={18} /> <span>Secure Sign Out</span>
              </button>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-red-50 hover:text-[#D60041] rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-2xl py-4 px-6 space-y-2 z-[100] animate-in slide-in-from-top-2 duration-300">

          {!isGuest && !isApplicationPage && (
            <div className="flex items-center space-x-4 p-4 mb-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-white shadow-md shadow-pink-200 overflow-hidden border border-gray-100">
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#D60041] flex items-center justify-center">
                    {isAdminRole ? <ShieldCheck size={20} /> : <User size={20} />}
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">{userRole}</p>
                <p className="text-sm font-bold text-gray-900 truncate">{userEmail}</p>
              </div>
            </div>
          )}

          {!isApplicationPage && (
            <div className="space-y-1.5">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${location.pathname === item.path
                      ? 'bg-red-50 text-[#D60041] shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <span className={location.pathname === item.path ? 'text-[#D60041]' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-gray-100">
            {isApplicationPage ? (
              <button onClick={() => navigate('/')} className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-[#D60041] rounded-2xl font-bold text-sm border border-pink-100 hover:bg-red-100 transition-all">
                <X size={20} /> <span>Cancel Application</span>
              </button>
            ) : isGuest ? (
              <div className="grid grid-cols-2 gap-3 p-2">
                <button onClick={() => navigate('/login')} className="flex items-center justify-center space-x-2 p-3.5 bg-gray-50 text-gray-700 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-100"><LogIn size={16} /> <span>Login</span></button>
                <button onClick={() => navigate('/register')} className="flex items-center justify-center space-x-2 p-3.5 bg-[#D60041] text-white rounded-xl font-bold text-sm shadow-md shadow-red-100 hover:bg-[#b50037]"><UserPlus size={16} /> <span>Register</span></button>
              </div>
            ) : (
              <>
                <button onClick={() => navigate(isAdminRole ? '/admin/profile' : isHRRole ? '/hr/profile' : '/candidate/profile')} className="w-full flex items-center space-x-4 p-4 text-gray-700 font-bold transition-all hover:bg-gray-50 rounded-xl mb-1">
                  <User size={18} className="text-gray-400" />
                  <span>View Profile</span>
                </button>
                <button onClick={() => navigate(isAdminRole ? '/admin/settings' : isHRRole ? '/hr/settings' : '/candidate/settings')} className="w-full flex items-center space-x-4 p-4 text-gray-700 font-bold transition-all hover:bg-gray-50 rounded-xl mb-1">
                  <Settings size={18} className="text-gray-400" />
                  <span>Account Settings</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center space-x-4 p-4 text-red-600 font-bold transition-all hover:bg-red-50 rounded-xl">
                  <LogOut size={18} />
                  <span>Secure Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;