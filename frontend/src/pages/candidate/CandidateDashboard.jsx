import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

// Sub-components
import WelcomeHeader from '../../components/candidate/dashboard/WelcomeHeader';
import ApplicationList from '../../components/candidate/dashboard/ApplicationList';
import ProfileStrength from '../../components/candidate/dashboard/ProfileStrength';
import UpcomingInterviews from '../../components/candidate/dashboard/UpcomingInterviews';
import QuickActions from '../../components/candidate/dashboard/QuickActions';
import ChatWidget from '../../components/layout/ChatWidget';

const CandidateDashboard = () => {
  const APPLICATION_STATUS = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "Mariwasa Siam Ceramics",
      appliedDate: "Oct 12, 2023",
      status: "Interview",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      step: 3,
      totalSteps: 5
    },
    {
      id: 2,
      role: "Production Supervisor",
      company: "Mariwasa Siam Ceramics",
      appliedDate: "Oct 08, 2023",
      status: "Reviewing",
      statusColor: "text-orange-600 bg-orange-50 border-orange-100",
      step: 1,
      totalSteps: 4
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen font-['Inter',_sans-serif] flex flex-col">
      <Helmet>
        <title>Mariwasa - Candidate Dashboard</title>
      </Helmet>

      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-[1400px] mx-auto px-6 py-12 w-full flex-grow">

          <WelcomeHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left-6 duration-700">
              <ApplicationList applications={APPLICATION_STATUS} />
              <ProfileStrength />
            </div>

            <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-700">
              <UpcomingInterviews />
              <QuickActions />
            </div>

          </div>
          <ChatWidget />
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;