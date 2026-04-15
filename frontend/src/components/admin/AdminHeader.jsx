import React from 'react';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Users, 
  Database, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';

const Header = () => {
  const userEmail = localStorage.getItem('saved_email') || 'Guest User';
  const userRole = localStorage.getItem('role') || 'Unknown';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    window.location.href = '/';
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-16 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/admin/dashboard'}>
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src="/src/assets/logo.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900">Admin Portal</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#D10043] font-bold">System Infrastructure</p>
        </div>
      </div>

      <nav className="flex items-center space-x-8">
        <div className="hidden lg:flex items-center space-x-8 text-[13px] font-semibold text-gray-500">
          <a href="/admin/dashboard" className="text-[#D10043] flex items-center gap-2 font-bold">
            <LayoutDashboard size={16} /> Dashboard
          </a>
          <a href="#" className="hover:text-[#D10043] transition-colors flex items-center gap-2">
            <Users size={16} /> Users
          </a>
          <a href="#" className="hover:text-[#D10043] transition-colors flex items-center gap-2">
            <Database size={16} /> Audit Logs
          </a>
        </div>

        <div className="relative group">
          <button className="flex items-center space-x-3 bg-white border border-gray-200 pl-2 pr-4 py-1.5 rounded-full text-xs font-bold hover:shadow-md transition-all group-hover:border-[#D10043]/30">
            <div className="w-8 h-8 bg-red-50 text-[#D10043] rounded-full flex items-center justify-center border border-red-100">
              <ShieldCheck size={16} />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-gray-700 leading-none capitalize">{userRole.toLowerCase()} Admin</span>
              <span className="text-[10px] text-gray-400 font-medium lowercase mt-0.5">{userEmail}</span>
            </div>
            <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2">
            <div className="p-2">
              <div className="px-4 py-3 border-b border-gray-50 mb-1 sm:hidden">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Signed in as</p>
                <p className="text-xs font-bold text-gray-900 truncate">{userEmail}</p>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[#D10043] hover:bg-red-50 rounded-xl text-xs font-bold transition-colors"
              >
                <LogOut size={16} />
                Sign Out Session
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;