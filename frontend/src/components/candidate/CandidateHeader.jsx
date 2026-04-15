import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      isActive: true
    },
    {
      label: 'Find Jobs',
      sublabel: 'Browse Openings',
      path: '/candidate/jobs',
      icon: <Search size={16} />,
      isActive: false
    },
    {
      label: 'Applications',
      sublabel: 'Status Tracking',
      path: '/candidate/applications',
      icon: <FileText size={16} />,
      isActive: false
    }
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-3 sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        <div
          className="flex items-center space-x-3 cursor-pointer shrink-0"
          onClick={() => navigate('/candidate/dashboard')}
        >
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-gray-900">Candidate Portal</h1>
            <p className="text-[10px] text-gray-400">Resume Analysis System</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={item.isActive ? { backgroundColor: BRAND_RED } : {}}
              className={`px-5 py-2 rounded-xl flex flex-col items-center min-w-[130px] transition-all ${
                item.isActive ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
              <span className={`text-[10px] ${item.isActive ? 'opacity-80' : 'text-gray-400'}`}>
                {item.sublabel}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`hidden sm:flex items-center space-x-3 border px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
              isProfileOpen ? 'bg-gray-50 border-gray-300 shadow-sm' : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <div className="w-7 h-7 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
              <User className="h-4 w-4 text-[#D10043]" />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[10px] leading-none text-gray-400 font-medium uppercase tracking-wider">Account</span>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[180px]">
                {userEmail}
              </span>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-2 mb-1 border-b border-gray-50">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Signed in as</p>
                <p className="text-xs font-semibold text-gray-900 truncate">{userEmail}</p>
              </div>
              
              <button 
                onClick={() => { setIsProfileOpen(false); navigate('/candidate/profile'); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Settings size={16} className="text-gray-400" />
                <span>Account Settings</span>
              </button>

              <div className="my-1 border-t border-gray-50"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors font-medium"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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