import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FileUp, 
  X, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck,
  Briefcase,
  Info
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const STATIC_JOBS = [
  { id: 1, title: "Production Supervisor", department: "Manufacturing" },
  { id: 2, title: "Quality Control Analyst", department: "Quality Assurance" },
  { id: 3, title: "HR Generalist", department: "Human Resources" },
  { id: 4, title: "Maintenance Technician", department: "Engineering" }
];

const ApplyForJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedJob = STATIC_JOBS.find(j => j.id === parseInt(jobId));
    if (selectedJob) {
      setJob(selectedJob);
    }
  }, [jobId]);

  const validateAndSetFile = (selectedFile) => {
    const validTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Invalid file type. Please upload a PDF or Word document.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover") setIsDragging(true);
    else setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const simulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          alert(`Application for ${job?.title} submitted successfully!`);
          navigate('/careers');
        }, 800);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-['Inter',_sans-serif]">
      <Helmet>
        <title>Apply | {job ? job.title : 'Careers'}</title>
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-[#D10043] transition-all mb-10 font-semibold text-sm group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </button>

        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          <div className="p-8 md:p-12 border-b border-slate-50 bg-gradient-to-b from-slate-50/50 to-transparent">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 bg-[#D10043] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-100">
                <Briefcase size={28} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D10043]">Application Portal</span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {job ? job.title : "Position Loading..."}
                </h1>
                <p className="text-sm text-slate-500 font-medium">{job?.department} Department</p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Complete your application by uploading your latest resume. Our system will automatically parse your experience for the hiring team.
            </p>
          </div>

          <div className="p-8 md:p-12">
            {!file ? (
              <div
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className={`group relative border-2 border-dashed rounded-[32px] p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                  ? "border-[#D10043] bg-pink-50/50" 
                  : "border-slate-200 hover:border-[#D10043]/30 hover:bg-slate-50"
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => validateAndSetFile(e.target.files[0])}
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                />
                <div className="w-20 h-20 bg-slate-100 text-slate-400 group-hover:text-[#D10043] group-hover:bg-pink-50 rounded-3xl mb-6 flex items-center justify-center mx-auto transition-all duration-300">
                  <FileUp size={40} />
                </div>
                <h3 className="text-lg font-bold mb-1">Upload Resume</h3>
                <p className="text-slate-400 text-sm mb-8 font-medium">Drag and drop or click to browse (PDF or DOCX)</p>
                <span className="inline-flex items-center bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#D10043] transition-colors shadow-md">
                  Select Document
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center p-6 bg-slate-50 rounded-[24px] border border-slate-100">
                  <div className="p-4 bg-white rounded-xl text-[#D10043] shadow-sm mr-5">
                    <FileText size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{file.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit</p>
                  </div>
                  {!isUploading && (
                    <button 
                      onClick={() => setFile(null)}
                      className="p-2.5 hover:bg-white hover:text-red-500 rounded-full transition-all text-slate-400 border border-transparent hover:border-slate-100"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {isUploading && (
                  <div className="px-2">
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#D10043] rounded-full animate-pulse" />
                        Analyzing with AI...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#D10043] h-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {!isUploading && (
                  <button 
                    onClick={simulateUpload}
                    className="w-full bg-[#D10043] hover:bg-slate-900 text-white py-5 rounded-[20px] font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl shadow-pink-100"
                  >
                    <ShieldCheck size={22} />
                    <span>Submit My Application</span>
                  </button>
                )}
              </div>
            )}

            <div className="mt-10 flex items-start p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <Info size={18} className="text-slate-400 mr-4 mt-0.5 shrink-0" />
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Your privacy matters. We use secure encryption to process your resume. By submitting, you agree to our recruitment terms and data processing policy.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-slate-200 pt-12">
          {[
            { label: "Smart Matching", desc: "AI-powered skill alignment" },
            { label: "Secure Data", desc: "Enterprise-grade encryption" },
            { label: "Direct Access", desc: "Sent straight to the hiring lead" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4 text-[#D10043]">
                <CheckCircle2 size={20} />
              </div>
              <h5 className="text-sm font-bold text-slate-900 mb-1">{item.label}</h5>
              <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

      </main>
       <Footer />
    </div>
  );
};

export default ApplyForJobPage;