import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown, LayoutDashboard, Users, Database, ShieldCheck, LogOut,
  Settings, Menu, X, FileText, Search, User, Building2, Mail, Info, Briefcase, LogIn, UserPlus
} from 'lucide-react';

const BRAND_RED = "#D10043";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userEmail = localStorage.getItem('saved_email') || 'user@system.com';
  const userRole = localStorage.getItem('role') || 'Guest';

  // --- 1. CONFIGURATION LOGIC ---
  // Identify which "mode" the header is in based on the URL
  const isLanding = location.pathname === '/' || location.pathname === '/aboutpage' || location.pathname === '/careerspage';
  const isAdmin = location.pathname.startsWith('/admin');
  const isHR = location.pathname.startsWith('/hr');
  const isCandidate = location.pathname.startsWith('/candidate');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Define Navigation Items based on the role
  const getNavItems = () => {
    if (isAdmin) return [
      { label: 'Dashboard', sublabel: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
      { label: 'User Management', sublabel: 'Access Control', path: '/admin/users', icon: <Users size={16} /> },
      { label: 'Audit Logs', sublabel: 'System History', path: '/admin/auditlog', icon: <Database size={16} /> },
    ];
    if (isHR) return [
      { label: 'Dashboard', sublabel: 'Analytics', path: '/hr/dashboard', icon: <Building2 size={16} /> },
      { label: 'Screening', sublabel: 'Applications', path: '/hr/screeningportal', icon: <User size={16} /> },
      { label: 'Jobs', sublabel: 'Positions', path: '/hr/jobmanagement', icon: <Settings size={16} /> },
    ];
    if (isCandidate) return [
      { label: 'Dashboard', sublabel: 'My Progress', path: '/candidate/dashboard', icon: <LayoutDashboard size={16} /> },
      { label: 'Find Jobs', sublabel: 'Browse', path: '/candidate/findjobs', icon: <Search size={16} /> },
      { label: 'Applications', sublabel: 'Tracking', path: '/candidate/applicationtracking', icon: <FileText size={16} /> },
    ];
    return [ // Landing Page Defaults
      { label: 'About', path: '/aboutpage', icon: <Info size={16} /> },
      { label: 'Careers', path: '/careerspage', icon: <Briefcase size={16} /> },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-3 sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0 group" onClick={() => navigate(isLanding ? '/' : location.pathname)}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-all ${!isLanding && 'group-hover:ring-2 group-hover:ring-red-100'}`}>
            <img src="/src/assets/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <div className={isLanding ? "" : "hidden md:block"}>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">
              {isAdmin ? "Admin Portal" : isHR ? "HR Portal" : isCandidate ? "Candidate Portal" : "Mariwasa Portal"}
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isLanding ? 'text-gray-400' : 'text-[#D10043]'}`}>
              Resume Analysis System
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                style={isActive && !isLanding ? { backgroundColor: BRAND_RED } : {}}
                className={`px-5 py-2 rounded-xl flex flex-col items-center min-w-[130px] transition-all duration-300 group ${
                  isActive 
                    ? (isLanding ? 'text-[#D10043]' : 'text-white shadow-md shadow-red-100') 
                    : 'text-gray-500 hover:bg-red-50 hover:text-[#D10043]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="transition-transform group-hover:-translate-y-0.5">{item.icon}</span>
                  <span className="text-xs font-bold tracking-tight">{item.label}</span>
                </div>
                {item.sublabel && (
                  <span className={`text-[10px] font-medium ${isActive ? 'opacity-80' : 'text-gray-400'}`}>
                    {item.sublabel}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT SIDE SECTION (Profile or Access Button) */}
        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          {isLanding ? (
            // LANDING PAGE BUTTON
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#D10043] transition-all">
                <span>Access Portal</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                <button onClick={() => navigate('/login')} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#D10043] transition-colors"><LogIn size={18}/> <span>Login</span></button>
                <button onClick={() => navigate('/register')} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#D10043] transition-colors"><UserPlus size={18}/> <span>Register</span></button>
              </div>
            </div>
          ) : (
            // APP PROFILE DROPDOWN
            <>
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center space-x-3 border px-4 py-2 rounded-xl cursor-pointer transition-all group ${isProfileOpen ? 'bg-gray-50 border-gray-300' : 'hover:border-[#D10043] border-gray-200'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${isProfileOpen ? 'bg-[#D10043]' : 'bg-red-50'}`}>
                  {isAdmin ? <ShieldCheck className="h-4 w-4 text-white" /> : <User className={`h-4 w-4 ${isProfileOpen ? 'text-white' : 'text-[#D10043]'}`} />}
                </div>
                <div className="hidden sm:flex flex-col items-start overflow-hidden">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{userRole}</span>
                  <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{userEmail}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-[60] animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-[10px] text-gray-400 font-black uppercase">{isAdmin ? "Admin Session" : "Account"}</p>
                    <p className="text-xs font-bold text-gray-900 truncate">{userEmail}</p>
                  </div>
                  <button onClick={() => navigate(isAdmin ? '/admin/settings' : '/candidate/profile')} className="w-full text-left px-4 py-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center space-x-3">
                    <Settings size={16} /> <span>Settings</span>
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center space-x-3">
                    <LogOut size={16} /> <span>Sign Out</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden p-2 text-gray-600 hover:bg-red-50 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;