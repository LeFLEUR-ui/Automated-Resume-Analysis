import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  User, Mail, Phone, MapPin,
  Cpu, Briefcase, GraduationCap,
  CheckCircle, ArrowLeft, Edit3
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

const CandidatePreviewAndVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Simulated extracted data for candidate profile
  const extractedData = {
    personal: {
      name: "Alex Thompson",
      email: "alex.t@example.com",
      phone: "+1 (555) 000-1234",
      location: "Chicago, IL"
    },
    skills: ["Process Optimization", "Team Leadership", "Lean Manufacturing", "Safety Compliance", "ERP Systems"],
    experience: {
      title: "Senior Operations Lead",
      company: "Global Tech Manufacturing",
      relevance: "7+ years in high-volume production environments"
    },
    education: {
      degree: "B.S. in Industrial Engineering",
      college: "University of Illinois"
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-['Inter',_sans-serif]">
      <Helmet>
        <title>Verify Application | {state?.job?.title || 'Candidate Portal'}</title>
      </Helmet>

      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">

        <div className="flex justify-between items-end mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-500 hover:text-[#D10043] transition-all mb-4 font-semibold text-sm group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Upload
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Review Profile Updates</h1>
            <p className="text-slate-500 font-medium">
              Verify the information extracted from your new resume <span className="text-slate-900 font-bold">{state?.fileName || "upload"}</span>.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center text-slate-300">
              {localStorage.getItem('profile_image_url') ? (
                <img src={localStorage.getItem('profile_image_url')} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Application Identity</p>
              <p className="text-sm font-black text-slate-900">{extractedData.personal.name}</p>
            </div>
          </div>
          <button
            id="btn-edit-details"
            onClick={() => navigate(jobId ? `/candidate/update-profile/${jobId}` : '/candidate/update-profile', { state: { ...extractedData, fileName: state?.fileName, job: state?.job } })}
            className="flex items-center text-sm font-bold text-[#D60041] hover:underline bg-pink-50 px-4 py-2 rounded-xl transition-colors"
          >
            <Edit3 size={16} className="mr-2" /> Manual Edit
          </button>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 text-[#D60041]">
              <div className="p-2.5 bg-pink-50 rounded-xl">
                <User size={20} />
              </div>
              <h2 className="font-bold uppercase tracking-widest text-xs">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<User size={16} />} label="Full Name" value={extractedData.personal.name} />
              <InfoItem icon={<Mail size={16} />} label="Email Address" value={extractedData.personal.email} />
              <InfoItem icon={<Phone size={16} />} label="Phone" value={extractedData.personal.phone} />
              <InfoItem icon={<MapPin size={16} />} label="Location" value={extractedData.personal.location} />
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 mb-4 text-[#D60041]">
                <div className="p-2.5 bg-pink-50 rounded-xl">
                  <Cpu size={20} />
                </div>
                <h2 className="font-bold uppercase tracking-widest text-xs">Skills Found</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedData.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100 hover:border-slate-200 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 text-[#D60041]">
                <div className="p-2.5 bg-pink-50 rounded-xl">
                  <Briefcase size={20} />
                </div>
                <h2 className="font-bold uppercase tracking-widest text-xs">Latest Experience</h2>
              </div>
              <h4 className="font-black text-slate-900 mb-1">{extractedData.experience.title}</h4>
              <p className="text-sm font-bold text-slate-500 mb-4">{extractedData.experience.company}</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{extractedData.experience.relevance}</p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 text-[#D60041]">
                <div className="p-2.5 bg-pink-50 rounded-xl">
                  <GraduationCap size={20} />
                </div>
                <h2 className="font-bold uppercase tracking-widest text-xs">Education</h2>
              </div>
              <h4 className="font-black text-slate-900 mb-1">{extractedData.education.degree}</h4>
              <p className="text-sm font-bold text-slate-500 bg-slate-50 inline-block px-3 py-1.5 rounded-lg border border-slate-100 mt-2">{extractedData.education.college}</p>
            </section>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => navigate('/candidate/dashboard')}
              className="flex-1 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 py-5 rounded-[24px] font-bold transition-all active:scale-95"
            >
              Cancel Update
            </button>
            <button
              onClick={() => navigate(jobId ? `/candidate/update-profile/${jobId}` : '/candidate/update-profile', { state: { ...extractedData, fileName: state?.fileName, job: state?.job } })}
              className="flex-[2] bg-[#D60041] hover:bg-slate-900 text-white py-5 rounded-[24px] font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-pink-100 active:scale-95"
            >
              <CheckCircle size={22} />
              Confirm & Save Profile Changes
            </button>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-transparent hover:border-slate-100 transition-colors">
    <div className="mt-0.5 text-slate-400 bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
      <p className="font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default CandidatePreviewAndVerify;
