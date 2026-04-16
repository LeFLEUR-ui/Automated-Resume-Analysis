import React, { useState } from 'react';
import axios from 'axios';
import { Users, Briefcase, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const [role, setRole] = useState('CANDIDATE');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    managedRegion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    let endpoint = 'http://127.0.0.1:8000/candidate/register';
    if (role === 'HR') {
      endpoint = 'http://127.0.0.1:8000/hr/register';
    } else if (role === 'ADMIN') {
      endpoint = 'http://127.0.0.1:8000/admins/register';
    }

    const payload = {
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    if (role === 'HR') {
      payload.company_name = "Mariwasa Siam Ceramics Inc.";
      payload.department = "General";
    } else if (role === 'ADMIN') {
      payload.managed_region = formData.managedRegion || "Main Headquarters";
    } else {
      payload.resume_url = null;
      payload.experience_years = 0;
    }

    try {
      const response = await axios.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully!");
        window.location.href = "/login";
      }
    } catch (error) {
      const errorData = error.response?.data?.detail;
      let errorMessage = "Registration failed.";

      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (Array.isArray(errorData)) {
        errorMessage = errorData[0]?.msg || errorMessage;
      }

      alert(errorMessage);
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-white via-[#fff5f7] to-[#ffeef2] font-sans antialiased text-gray-800">
      <Helmet>
        <title>Mariwasa - Register</title>
      </Helmet>
      <a href="/login" className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-10 transition-colors group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </a>

      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <img src="src/assets/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Join the Mariwasa Resume Analysis System
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Registration
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Fill in your details to set up your profile
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              required
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
              />
            </div>
          </div>

          {role === 'ADMIN' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Managed Region / Office
              </label>
              <input
                name="managedRegion"
                type="text"
                onChange={handleChange}
                placeholder="e.g. Sto. Tomas, Batangas"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#D60041] transition text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              I am registering as
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label 
                className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${role === 'CANDIDATE' ? 'border-[#D60041] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setRole('CANDIDATE')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <Users size={16} className={role === 'CANDIDATE' ? 'text-[#D60041]' : 'text-gray-600'} />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Candidate</span>
              </label>

              <label 
                className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${role === 'HR' ? 'border-[#D60041] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setRole('HR')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <Briefcase size={16} className={role === 'HR' ? 'text-[#D60041]' : 'text-gray-600'} />
                </div>
                <span className="text-[10px] font-medium text-gray-700">HR Staff</span>
              </label>

              <label 
                className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${role === 'ADMIN' ? 'border-[#D60041] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setRole('ADMIN')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <ShieldCheck size={16} className={role === 'ADMIN' ? 'text-[#D60041]' : 'text-gray-600'} />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D60041] hover:bg-[#b50037] text-white font-semibold py-3 rounded-lg transition text-sm shadow-md active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create My Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-[#D60041] font-semibold hover:underline ml-1">
              Sign In
            </a>
          </p>
        </div>
      </div>

      <footer className="mt-12 text-center text-xs text-gray-400 space-y-1 tracking-wide">
        <p>&copy; 2026 Mariwasa Siam Ceramics Inc.</p>
        <p className="opacity-60">Join the Future of Manufacturing</p>
      </footer>
    </div>
  );
};

export default Register;