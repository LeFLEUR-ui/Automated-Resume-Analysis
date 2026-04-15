import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogIn, UserPlus, Briefcase, Info } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-between px-6 md:px-16 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div 
        className="flex items-center space-x-3 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-9 w-9 object-contain" />
        <div>
          <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900">Mariwasa Portal</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Resume Analysis System</p>
        </div>
      </div>

      <nav className="flex items-center space-x-8">
        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-500">
          <a 
            href="/aboutpage" 
            className={`hover:text-[#D10043] transition-colors flex items-center gap-2 ${isActive('/aboutpage') ? 'text-[#D10043]' : ''}`}
          >
            <Info size={16} /> About
          </a>
          <button 
            onClick={() => navigate('/careerspage')}
            className={`hover:text-[#D10043] transition-colors flex items-center gap-2 ${isActive('/careerspage') ? 'text-[#D10043]' : ''}`}
          >
            <Briefcase size={16} /> Careers
          </button>
        </div>

        <div className="relative group">
          <button 
            className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#D10043] transition-all shadow-md shadow-gray-200"
          >
            <span>Access Portal</span>
            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
          </button>

          <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Get Started</p>
            </div>
            <button onClick={() => navigate('/login')} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#D10043] transition-colors text-left">
              <LogIn size={18} className="text-gray-400" />
              <span>Login here</span>
            </button>
            <button onClick={() => navigate('/register')} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#D10043] transition-colors text-left">
              <UserPlus size={18} className="text-gray-400" />
              <span>Register here</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;