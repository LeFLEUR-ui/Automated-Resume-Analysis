import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyPage = () => {
  const navigate = useNavigate();

  // STUBBED DATA: Replacing dynamic fetch with static job info
  const staticJob = {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Manila, Philippines",
    job_type: "Full-time",
    is_active: true
  };

  // STUBBED DATA: Replacing AI extraction results with static info
  const staticResumeData = {
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    phone: "+63 912 345 6789",
    location: "Quezon City, Metro Manila"
  };

  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  // Mock processing function
  const handleProcessStatic = () => {
    setIsExtracting(true);
    // Simulate a brief delay to mimic AI processing
    setTimeout(() => {
      setIsExtracting(false);
      setStep(2);
    }, 800);
  };

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <div className="text-gray-800 bg-[#fcfbfc] min-h-screen font-['Inter',_sans-serif]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-gray-900">Resume Analysis System</h1>
            <p className="text-[10px] text-gray-400">Static Preview Mode</p>
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="text-xs font-semibold text-gray-600 hover:text-black">
          Back to Jobs
        </button>
      </nav>

      <div className={`mx-auto mt-12 px-4 pb-20 transition-all duration-300 ${step === 2 ? 'max-w-6xl' : 'max-w-4xl'}`}>
        
        {/* Job Header Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 flex justify-between items-start shadow-sm">
          <div>
            <h2 className="text-2xl font-bold mb-1">{staticJob.title}</h2>
            <p className="text-sm text-gray-400 font-medium lowercase first-letter:uppercase">
              {staticJob.department} • {staticJob.location} • {staticJob.job_type}
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
            {staticJob.is_active ? 'Active' : 'Closed'}
          </span>
        </div>

        {/* STEP 1: Static Upload UI */}
        {step === 1 && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 shadow-sm flex flex-col items-center w-full">
            <h3 className="font-bold text-gray-900 mb-8">Upload Your Resume</h3>

            <div className={`w-full border border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center ${!selectedFile ? 'hover:bg-gray-50 cursor-pointer' : ''}`}>
              {!selectedFile ? (
                <>
                  <input 
                    type="file" 
                    className="hidden" 
                    id="fileUpload" 
                    onChange={(e) => setSelectedFile(e.target.files[0])} 
                  />
                  <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer w-full text-center">
                    <p className="font-bold text-sm mb-1 text-gray-700 px-4">Drag and drop your resume here, or click to browse</p>
                    <div className="mt-8 bg-gray-100 px-6 py-2 rounded-xl text-xs font-bold">Choose File</div>
                  </label>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="font-bold text-sm text-gray-800 mb-1">{selectedFile.name}</p>
                  <button onClick={() => setSelectedFile(null)} className="text-xs font-bold text-gray-500 hover:underline">Remove File</button>
                </div>
              )}
            </div>

            {selectedFile && (
              <button 
                onClick={handleProcessStatic} 
                className="mt-8 bg-pink-600 text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95"
              >
                {isExtracting ? "Processing Mock Data..." : "Process with AI"}
              </button>
            )}
          </div>
        )}

        {/* STEP 2: Static Data Review */}
        {step === 2 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 mb-8 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-6 text-xl">Extracted Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Full Name</p>
                <p className="text-lg font-medium border-b border-gray-50 pb-2">{staticResumeData.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</p>
                <p className="text-lg font-medium border-b border-gray-50 pb-2">{staticResumeData.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</p>
                <p className="text-lg font-medium border-b border-gray-50 pb-2">{staticResumeData.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Location</p>
                <p className="text-lg font-medium border-b border-gray-50 pb-2">{staticResumeData.location}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setStep(1)} className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-black">
                Back
              </button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-pink-600 text-white rounded-xl font-bold shadow-md hover:bg-pink-700">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Static Final Submission */}
        {step === 3 && (
          <div className="max-w-md mx-auto text-center py-10 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Ready to Submit?</h2>
            <p className="text-sm text-gray-500 mb-8">Review your details one last time. Once submitted, you won't be able to edit your resume for this position.</p>
            
            <div className="flex flex-col gap-3">
                <button onClick={handleSubmit} className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-700 transition-colors">
                Submit Application
                </button>
                <button onClick={() => setStep(2)} className="text-sm font-bold text-gray-400 hover:text-gray-600">
                Go Back
                </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyPage;