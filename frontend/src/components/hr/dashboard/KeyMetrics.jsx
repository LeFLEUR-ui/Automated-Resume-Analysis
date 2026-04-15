import React from 'react';
import { ChevronUp, FileText, Clock, Briefcase, Zap } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, trendColor, bgColor, iconColor }) => (
  <div className="flex items-center space-x-4 p-4 border border-gray-50 rounded-2xl hover:border-pink-100 hover:shadow-md transition-all group bg-white">
    <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
      <Icon className={`h-6 w-6 ${iconColor}`} />
    </div>
    <div>
      <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">{label}</p>
      <h4 className="text-2xl font-extrabold tracking-tight text-gray-900">{value}</h4>
      {trend && (
        <p className={`text-[10px] font-medium tracking-wide ${trendColor}`}>
          {trend}
        </p>
      )}
    </div>
  </div>
);

const KeyMetrics = ({ stats }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-8 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-semibold text-sm tracking-tight text-gray-900">Key Metrics</h3>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
            Overview of recruitment performance
          </p>
        </div>
        <ChevronUp className="h-4 w-4 text-gray-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard icon={FileText} label="Total Resumes" value={stats.total} trend="Live Database" trendColor="text-gray-400" bgColor="bg-pink-50" iconColor="text-[#D10043]" />
        <StatCard icon={Clock} label="Pending Review" value={stats.pending} trend="Requires attention" trendColor="text-orange-500" bgColor="bg-orange-50" iconColor="text-orange-400" />
        <StatCard icon={Briefcase} label="Active Jobs" value={stats.activeJobs} trend="Current Openings" trendColor="text-blue-500" bgColor="bg-blue-50" iconColor="text-blue-400" />
        <StatCard icon={Zap} label="Avg Processing" value="1.8s" trend="AI analysis time" trendColor="text-gray-400" bgColor="bg-purple-50" iconColor="text-purple-400" />
      </div>
    </div>
  );
};

export default KeyMetrics;