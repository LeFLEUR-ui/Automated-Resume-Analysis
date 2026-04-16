import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/candidate/CandidateHeader';

const BRAND_RED = "#D10043";

const ApplicationTracking = () => {
  const jobDetails = {
    role: "Senior Frontend Developer",
    company: "Mariwasa Siam Ceramics",
    location: "Sto. Tomas, Batangas (Hybrid)",
    appliedDate: "Oct 12, 2023",
    status: "Interview Stage",
    statusColor: "text-blue-500 bg-blue-50",
  };

  const TIMELINE_STEPS = [
    {
      label: "Application Submitted",
      date: "Oct 12, 2023 • 09:15 AM",
      description: "Your application was successfully received by the recruitment team.",
      status: "completed"
    },
    {
      label: "Initial Screening",
      date: "Oct 15, 2023 • 02:30 PM",
      description: "Recruiter reviewed your profile and resume.",
      status: "completed"
    },
    {
      label: "Technical Interview",
      date: "Oct 20, 2023 • 10:00 AM",
      description: "Live coding and architectural discussion with the Engineering Lead.",
      status: "current"
    },
    {
      label: "Final Interview",
      date: "Pending",
      description: "Interview with the Head of Digital Transformation.",
      status: "upcoming"
    },
    {
      label: "Job Offer",
      date: "Pending",
      description: "Final decision and salary negotiation.",
      status: "upcoming"
    }
  ];

  const ATTACHMENTS = [
    { name: "Resume_Updated.pdf", size: "1.2 MB", date: "Oct 12" },
    { name: "Portfolio_Link.url", size: "External", date: "Oct 12" },
    { name: "Technical_Assessment.zip", size: "4.5 MB", date: "Oct 18" }
  ];

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-10 py-8">
        <div className="mb-8">
          <button className="flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-gray-100 p-8 rounded-[24px] shadow-sm">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <Briefcase className="w-8 h-8 text-[#D10043]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{jobDetails.role}</h1>
                <div className="flex flex-wrap gap-y-2 gap-x-4 mt-1 text-sm text-gray-400 font-medium">
                  <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1.5" /> {jobDetails.company}</span>
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5" /> {jobDetails.location}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" /> Applied on {jobDetails.appliedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${jobDetails.statusColor}`}>
                {jobDetails.status}
              </span>
              <button className="p-2.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-8">Application Timeline</h3>
              
              <div className="relative">
                {TIMELINE_STEPS.map((step, index) => (
                  <div key={index} className="relative pl-10 pb-10 last:pb-0">
                    {index !== TIMELINE_STEPS.length - 1 && (
                      <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-gray-100"></div>
                    )}
                    
                    <div className="absolute left-0 top-1">
                      {step.status === 'completed' ? (
                        <div className="bg-red-50 p-1 rounded-full">
                          <CheckCircle2 className="w-5 h-5 text-[#D10043]" />
                        </div>
                      ) : step.status === 'current' ? (
                        <div className="bg-white border-2 border-[#D10043] w-5 h-5 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#D10043] rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-gray-200 fill-white" />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className={`font-bold text-sm ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>
                          {step.label}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1 max-w-md leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">
                        {step.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900">Documents</h3>
                <button style={{ color: BRAND_RED }} className="text-xs font-bold">Add New</button>
              </div>
              <div className="space-y-3">
                {ATTACHMENTS.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 group hover:border-red-100 transition-all">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#D10043]" />
                      <div>
                        <p className="text-[13px] font-semibold text-gray-700 truncate max-w-[120px]">{doc.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                      <Download className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-[24px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-orange-900 text-sm">Next Step Reminder</h3>
              </div>
              <p className="text-sm text-orange-800/80 leading-relaxed font-medium">
                Please ensure you have a stable internet connection and a working webcam for your Technical Interview tomorrow.
              </p>
              <div className="mt-6 pt-6 border-t border-orange-200/50">
                <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-orange-900 uppercase tracking-widest hover:opacity-70 transition-opacity">
                  Review Interview Tips <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationTracking;