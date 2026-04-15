import React, { useState } from 'react';
import axios from 'axios';
import { Users, Briefcase, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('saved_email') || '';
  });
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CANDIDATE');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    localStorage.setItem('saved_email', value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login', {
        email: email,
        password: password,
      });

      const { access_token, role: verifiedRole } = response.data;

      if (role !== verifiedRole) {
        setError(`Account mismatch: This email is registered as a ${verifiedRole}.`);
        setLoading(false);
        return;
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('role', verifiedRole);

      alert("Login Successful!");
      
      window.location.href = verifiedRole === 'HR' ? '/hr/dashboard' : '/candidate/dashboard';
      
    } catch (err) {
      const message = err.response?.data?.detail || "Invalid email or password";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-white via-[#fff5f7] to-[#ffeef2] font-sans antialiased text-gray-800">
      
      <a href="/" className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-10 transition-colors group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </a>

      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <img src="src/assets/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-500">Sign in to access the Resume Analysis System</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Sign In</h2>
          {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs font-medium text-[#D60041] hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setRole('CANDIDATE')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition ${role === 'CANDIDATE' ? 'border-[#D60041] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <Users size={18} className={role === 'CANDIDATE' ? 'text-[#D60041]' : 'text-gray-600'} />
              </div>
              <span className="text-xs font-medium text-gray-700">Candidate</span>
            </div>
          
            <div 
              onClick={() => setRole('HR')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition ${role === 'HR' ? 'border-[#D60041] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <Briefcase size={18} className={role === 'HR' ? 'text-[#D60041]' : 'text-gray-600'} />
              </div>
              <span className="text-xs font-medium text-gray-700">HR Staff</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D60041] hover:bg-[#b50037] text-white font-semibold py-3 rounded-lg transition text-sm shadow-md active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In to Portal"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?
            <a href="/register" className="text-[#D60041] font-semibold hover:underline ml-1">
              Create Account
            </a>
          </p>
        </div>
      </div>

      <footer className="mt-12 text-center text-xs text-gray-400 space-y-1 tracking-wide">
        <p>&copy; 2026 Mariwasa Siam Ceramics Inc.</p>
        <p className="opacity-60">Secure Enterprise Portal v2.0</p>
      </footer>
    </div>
  );
};

export default Login;