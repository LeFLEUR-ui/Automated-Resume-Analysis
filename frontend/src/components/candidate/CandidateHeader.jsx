import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  Search,
  LayoutDashboard,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';

const BRAND_RED = "#D10043";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userEmail = localStorage.getItem('saved_email') || 'guest@example.com';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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

  const navItems = [
    {
      label: 'Dashboard',
      sublabel: 'My Progress',
      path: '/candidate/dashboard',
      icon: <LayoutDashboard size={16} />,
    },
    {
      label: 'Find Jobs',
      sublabel: 'Browse Openings',
      path: '/candidate/findjobs',
      icon: <Search size={16} />,
    },
    {
      label: 'Applications',
      sublabel: 'Status Tracking',
      path: '/candidate/applicationtracking',
      icon: <FileText size={16} />,
    }
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-3 sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        <div
          className="flex items-center space-x-3 cursor-pointer shrink-0 group"
          onClick={() => navigate('/candidate/dashboard')}
        >
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-red-100 transition-all">
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-gray-900 group-hover:text-[#D10043] transition-colors">Candidate Portal</h1>
            <p className="text-[10px] text-gray-400">Resume Analysis System</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                style={isActive ? { backgroundColor: BRAND_RED } : {}}
                className={`px-5 py-2 rounded-xl flex flex-col items-center min-w-[130px] transition-all duration-300 group ${
                  isActive 
                    ? 'text-white shadow-md shadow-red-100' 
                    : 'text-gray-500 hover:bg-red-50 hover:text-[#D10043]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`transition-transform duration-300 ${!isActive && 'group-hover:-translate-y-0.5'}`}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold tracking-tight">{item.label}</span>
                </div>
                <span className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'opacity-80' : 'text-gray-400 group-hover:text-red-400'
                }`}>
                  {item.sublabel}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`hidden sm:flex items-center space-x-3 border px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 group ${
              isProfileOpen 
                ? 'bg-gray-50 border-gray-300 shadow-sm' 
                : 'hover:bg-white hover:border-[#D10043] hover:shadow-lg hover:shadow-gray-100 border-gray-200'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
              isProfileOpen ? 'bg-red-100 border-red-200' : 'bg-pink-50 border-pink-100 group-hover:bg-red-50'
            }`}>
              <User className={`h-4 w-4 transition-colors ${isProfileOpen ? 'text-[#D10043]' : 'text-[#D10043]'}`} />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[10px] leading-none text-gray-400 font-bold uppercase tracking-widest">Account</span>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[140px]">
                {userEmail}
              </span>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-[#D10043]' : 'group-hover:text-gray-600'}`} />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-60 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 mb-1 border-b border-gray-50">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Signed in as</p>
                <p className="text-xs font-bold text-gray-900 truncate mt-0.5">{userEmail}</p>
              </div>
              
              <button 
                onClick={() => { setIsProfileOpen(false); navigate('/candidate/profile'); }}
                className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#D10043] flex items-center space-x-3 transition-all group"
              >
                <Settings size={16} className="text-gray-400 group-hover:text-[#D10043] group-hover:rotate-45 transition-transform" />
                <span className="font-semibold">Account Settings</span>
              </button>

              <div className="my-1 border-t border-gray-50"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all font-bold"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-red-50 hover:text-[#D10043] rounded-xl transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;