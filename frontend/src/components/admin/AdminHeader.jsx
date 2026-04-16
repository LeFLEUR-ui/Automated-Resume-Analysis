import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Users, 
  Database, 
  ShieldCheck, 
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';

const BRAND_RED = "#D10043";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userEmail = localStorage.getItem('saved_email') || 'admin@system.com';
  const userRole = localStorage.getItem('role') || 'Administrator';

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
      sublabel: 'Overview',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={16} />,
    },
    {
      label: 'User Management',
      sublabel: 'Access Control',
      path: '/admin/users',
      icon: <Users size={16} />,
    },
    {
      label: 'Audit Logs',
      sublabel: 'System History',
      path: '/admin/auditlog',
      icon: <Database size={16} />,
    }
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-3 sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        <div
          className="flex items-center space-x-3 cursor-pointer shrink-0 group"
          onClick={() => navigate('/admin/dashboard')}
        >
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-red-100 transition-all">
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-gray-900 group-hover:text-[#D10043] transition-colors leading-tight">Admin Portal</h1>
            <p className="text-[10px] text-[#D10043] font-bold uppercase tracking-widest">System Infrastructure</p>
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
                className={`px-5 py-2 rounded-xl flex flex-col items-center min-w-[140px] transition-all duration-300 group ${
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
            className={`flex items-center space-x-3 border px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 group ${
              isProfileOpen 
                ? 'bg-gray-50 border-gray-300 shadow-sm' 
                : 'hover:bg-white hover:border-[#D10043] hover:shadow-lg hover:shadow-gray-100 border-gray-200'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
              isProfileOpen ? 'bg-[#D10043] border-[#D10043]' : 'bg-red-50 border-red-100'
            }`}>
              <ShieldCheck className={`h-4 w-4 transition-colors ${isProfileOpen ? 'text-white' : 'text-[#D10043]'}`} />
            </div>
            <div className="hidden sm:flex flex-col items-start overflow-hidden">
              <span className="text-[10px] leading-none text-gray-400 font-bold uppercase tracking-widest mb-0.5">Role</span>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[120px] capitalize">
                {userRole.toLowerCase()}
              </span>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-[#D10043]' : 'group-hover:text-gray-600'}`} />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 mb-1 border-b border-gray-50">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Admin Session</p>
                <p className="text-xs font-bold text-gray-900 truncate mt-0.5">{userEmail}</p>
              </div>
              
              <button 
                onClick={() => { setIsProfileOpen(false); navigate('/admin/settings'); }}
                className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#D10043] flex items-center space-x-3 transition-all group"
              >
                <Settings size={16} className="text-gray-400 group-hover:text-[#D10043] group-hover:rotate-45 transition-transform" />
                <span className="font-semibold text-xs">System Settings</span>
              </button>

              <div className="my-1 border-t border-gray-50"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all font-bold"
              >
                <LogOut size={16} />
                <span className="text-xs">End Admin Session</span>
              </button>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-red-50 hover:text-[#D10043] rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-4 p-3 rounded-xl transition-all ${
                location.pathname === item.path ? 'bg-red-50 text-[#D10043]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <div className="text-left">
                <p className="text-xs font-bold">{item.label}</p>
                <p className="text-[10px] opacity-70">{item.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default AdminHeader;