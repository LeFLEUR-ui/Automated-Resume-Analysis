import React from 'react';
import { MoreHorizontal, FileText, Clock, Briefcase, Zap, Users, CheckCircle2, X } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, trendColor, bgColor, iconColor }) => (
  <div className="flex flex-col p-6 border border-gray-100 bg-gray-50/50 rounded-[24px] hover:bg-white hover:border-pink-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
    </div>
    
    <div className="mt-auto">
      <h4 className="text-3xl font-black tracking-tight text-gray-900 mb-1">{value}</h4>
      <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">{label}</p>
      
      {trend && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100/80">
          <div className={`w-1.5 h-1.5 rounded-full ${iconColor.replace('text', 'bg')}`}></div>
          <p className={`text-[10px] font-bold tracking-wide uppercase ${trendColor}`}>
            {trend}
          </p>
        </div>
      )}
    </div>
  </div>
);

const KeyMetrics = ({ stats, activeJobsCount, totalCandidates, totalResumes, appStats }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 lg:p-10 mb-8 shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-gray-900">Key Metrics</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
            Real-time overview of your recruitment performance
          </p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors group">
          <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-[#D60041]" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FileText} 
          label="Total Resumes" 
          value={totalResumes} 
          trend="Live Database" 
          trendColor="text-gray-500" 
          bgColor="bg-pink-50" 
          iconColor="text-[#D60041]" 
        />
        
        {/* Combined Status Card */}
        <div className="flex flex-col p-6 border border-gray-100 bg-gray-50/50 rounded-[24px] hover:bg-white hover:border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="text-2xl font-black tracking-tight text-gray-900">{appStats?.pending || 0}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Pending</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-black tracking-tight text-green-600">{appStats?.accepted || 0}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Accepted</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-black tracking-tight text-red-600">{appStats?.rejected || 0}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Rejected</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-orange-400" style={{ width: `${(appStats?.pending / (totalResumes || 1)) * 100}%` }}></div>
              <div className="h-full bg-green-500" style={{ width: `${(appStats?.accepted / (totalResumes || 1)) * 100}%` }}></div>
              <div className="h-full bg-red-500" style={{ width: `${(appStats?.rejected / (totalResumes || 1)) * 100}%` }}></div>
            </div>
            <p className="text-[10px] text-gray-500 font-bold tracking-wide uppercase mt-3">Review Status</p>
          </div>
        </div>

        <StatCard 
          icon={Briefcase} 
          label="Active Jobs" 
          value={activeJobsCount} 
          trend="Open Positions" 
          trendColor="text-blue-600" 
          bgColor="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <StatCard 
          icon={Users} 
          label="Total Candidates" 
          value={totalCandidates} 
          trend="Registered Users" 
          trendColor="text-purple-600" 
          bgColor="bg-purple-50" 
          iconColor="text-purple-500" 
        />
      </div>
    </div>
  );
};

export default KeyMetrics;