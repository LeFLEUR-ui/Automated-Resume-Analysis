import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Settings, Building2, Mail } from 'lucide-react';

const Header = () => {
  const brandPink = "#D10043";
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('User');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAdminOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const navItems = [
    {
      label: 'Dashboard',
      sublabel: 'Analytics & Overview',
      path: '/hr/dashboard',
      icon: <Building2 size={16} />,
      isActive: window.location.pathname === '/hr/dashboard'
    },
    {
      label: 'Screening',
      sublabel: 'Review Applications',
      path: '/hr/screeningportal',
      badge: 89,
      icon: <User size={16} />,
      isActive: window.location.pathname === '/hr/screeningportal'
    },
    {
      label: 'Jobs',
      sublabel: 'Manage Positions',
      path: '/hr/jobmanagement',
      icon: <Settings size={16} />,
      isActive: window.location.pathname === '/hr/jobmanagement'
    }
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-3 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => navigate('/hrdashboard')}>
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
                src="../src/assets/logo.png" 
                alt="description" 
                className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold tracking-tight text-gray-900 leading-snug">HR Portal</h1>
            <p className="text-[10px] text-gray-400 tracking-wide font-medium">Resume Analysis System</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={item.isActive ? { backgroundColor: brandPink } : {}}
              className={`px-5 py-2 rounded-xl transition-all flex flex-col items-center justify-center min-w-[130px] hover:shadow-sm ${
                item.isActive ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="text-xs font-semibold tracking-tight">{item.label}</span>
              </div>
              <span className={`text-[10px] tracking-wide font-medium ${item.isActive ? 'opacity-80' : 'text-gray-400'}`}>
                {item.sublabel}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          <div
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`hidden sm:flex items-center space-x-2 border px-3 py-1.5 rounded-xl transition-all cursor-pointer group ${
              isAdminOpen ? 'border-pink-200 bg-pink-50' : 'border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
              isAdminOpen ? 'bg-white' : 'bg-gray-100 group-hover:bg-pink-50'
            }`}>
              <User className={`h-4 w-4 ${isAdminOpen ? 'text-[#D10043]' : 'text-gray-400 group-hover:text-[#D10043]'}`} />
            </div>
            <span className="text-xs font-semibold tracking-tight text-gray-700">HR Admin</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} />
          </div>

          {isAdminOpen && (
            <div className="absolute right-0 top-[110%] w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">Account Management</p>
              </div>

              <div className="px-4 py-3 flex items-center space-x-3 border-b border-gray-50 mb-1 overflow-hidden">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <span className="text-xs font-semibold tracking-tight text-gray-700 truncate">{userEmail}</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold tracking-tight text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout Session</span>
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

      {isMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 py-4 px-4 space-y-2 shadow-xl">
          <div className="px-4 py-2 mb-2 bg-gray-50 rounded-lg overflow-hidden">
            <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Logged in as</p>
            <p className="text-xs font-medium tracking-tight text-gray-700 truncate">{userEmail}</p>
          </div>

          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                item.isActive ? 'bg-pink-50 text-[#D10043]' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                {item.icon}
                <div className="text-left">
                  <p className="text-sm font-semibold tracking-tight">{item.label}</p>
                  <p className="text-[10px] tracking-wide font-medium opacity-70">{item.sublabel}</p>
                </div>
              </div>
            </button>
          ))}

          <div className="border-t border-gray-50 pt-2 mt-2">
            <button onClick={handleLogout} className="w-full flex items-center space-x-4 p-4 text-red-500 font-semibold tracking-tight">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <LogOut size={16} />
              </div>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;