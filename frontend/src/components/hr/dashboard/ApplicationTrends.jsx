import React from 'react';
import {
  MoreHorizontal, TrendingUp, Calendar, Zap,
  PieChart as PieIcon, Briefcase, Filter, ChevronRight
} from 'lucide-react';

const ApplicationTrends = () => {
  const chartData = [
    { day: 'Mon', date: 'Jan 09', applications: 25, height: '30%', growth: '+12%' },
    { day: 'Tue', date: 'Jan 10', applications: 45, height: '55%', growth: '+24%' },
    { day: 'Wed', date: 'Jan 11', applications: 30, height: '40%', growth: '-5%' },
    { day: 'Thu', date: 'Jan 12', applications: 65, height: '80%', growth: '+38%' },
    { day: 'Fri', date: 'Jan 13', applications: 50, height: '60%', growth: '+15%' },
    { day: 'Sat', date: 'Jan 14', applications: 75, height: '90%', growth: '+42%', isPeak: true },
    { day: 'Sun', date: 'Jan 15', applications: 55, height: '70%', growth: '+18%' },
  ];

  const distributionData = [
    { label: 'Engineering', value: 45, color: '#D60041', percentage: '45%' },
    { label: 'Production', value: 25, color: '#F43F5E', percentage: '25%' },
    { label: 'Marketing', value: 15, color: '#FDA4AF', percentage: '15%' },
    { label: 'Admin', value: 15, color: '#E2E8F0', percentage: '15%' },
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* 1. Bar Chart Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden group/container">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-50/30 rounded-full blur-3xl pointer-events-none group-hover/container:bg-pink-100/40 transition-colors duration-700"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">Application Trends</h3>
              <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-green-100">
                <TrendingUp size={10} /> +12.5%
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-bold tracking-tight">Submission volume analysis for the past 7 days</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 mr-4 pr-4 border-r border-gray-100">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Weekly Peak</p>
                <p className="text-sm font-black text-gray-900">75 Applications</p>
              </div>
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                <Zap className="text-[#D60041] h-5 w-5" />
              </div>
            </div>
            <button className="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-xl transition-all group shadow-sm border border-gray-100">
              <Calendar className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-xl transition-all group shadow-sm border border-gray-100">
              <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-[#D60041]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide pb-12 -mx-2 px-2 relative z-10">
          <div className="min-w-[700px] h-[320px] relative mt-6 pl-10">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[11px] text-gray-400 font-black tracking-widest py-0 pr-4">
              <span>100</span><span>75</span><span>50</span><span>25</span><span className="text-gray-300">0</span>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 pl-10 flex flex-col justify-between w-full h-full pointer-events-none">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-t border-gray-100/80 w-full h-px relative" />
              ))}
            </div>

            {/* Chart Bars */}
            <div className="w-full h-full flex items-end justify-between px-10 relative">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center group h-full justify-end w-1/12 relative">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-2xl z-20 min-w-[120px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{data.date}</span>
                      <span className={`text-[9px] font-black ${data.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.growth}</span>
                    </div>
                    <div className="text-sm font-black">{data.applications} Applications</div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                  </div>

                  <div className="w-full flex flex-col items-center h-full justify-end cursor-pointer">
                    {data.isPeak && (
                      <div className="absolute top-0 mb-2 flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="text-[9px] font-black text-[#D60041] uppercase tracking-tighter bg-pink-50 px-2 py-0.5 rounded-full mb-1">Peak Day</div>
                        <div className="w-px h-full bg-[#D60041] border-dashed border-l border-pink-200"></div>
                      </div>
                    )}
                    <div
                      className={`w-full max-w-[48px] relative rounded-t-[14px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                        ${data.isPeak
                          ? 'bg-gradient-to-t from-[#D60041] to-[#ff4d7d] shadow-[0_4px_20px_rgba(214,0,65,0.2)]'
                          : 'bg-gradient-to-t from-gray-50 to-gray-200 group-hover:from-pink-100 group-hover:to-[#D60041] group-hover:shadow-[0_4px_20px_rgba(214,0,65,0.15)]'
                        }`}
                      style={{ height: data.height }}
                    >
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-[14px]"></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 flex flex-col items-center">
                    <span className="text-[11px] text-gray-900 font-black tracking-tight group-hover:text-[#D60041] transition-colors">{data.day}</span>
                    <span className="text-[9px] text-gray-400 font-bold mt-0.5">{data.date.split(' ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-8 pt-8 border-t border-gray-50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-[#D60041]"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Submissions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pending Reviews</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs font-bold text-gray-400">
            <Calendar size={14} /> Last Updated: 16:50 PM
          </div>
        </div>
      </div>

      {/* 2. Pie Chart Section (Application Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm group/pie relative overflow-hidden">
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-blue-50/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                <PieIcon size={20} className="text-[#D60041]" />
                Job Distribution
              </h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">By Department</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#D60041] transition-colors">
              <Filter size={14} /> Filter Dept
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-12 relative z-10">
            {/* Visual Pie Representation (CSS Based) */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
              <div className="absolute inset-0 rounded-full border-[18px] border-gray-50"></div>
              {/* This is a simplified visual representation using conic-gradient to match your data */}
              <div
                className="absolute inset-0 rounded-full border-[18px] transition-transform duration-1000 group-hover/pie:scale-105"
                style={{
                  borderImageSource: `conic-gradient(#D60041 0% 45%, #F43F5E 45% 70%, #FDA4AF 70% 85%, #E2E8F0 85% 100%)`,
                  borderImageSlice: 1,
                  borderRadius: '50%',
                  background: `conic-gradient(#D60041 0% 45%, #F43F5E 45% 70%, #FDA4AF 70% 85%, #E2E8F0 85% 100%)`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '18px'
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900">345</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Total Apps</span>
              </div>
            </div>

            {/* Legend & Stats */}
            <div className="flex-grow w-full space-y-4">
              {distributionData.map((item, idx) => (
                <div key={idx} className="group/item cursor-pointer">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-bold text-gray-700 group-hover/item:text-[#D60041] transition-colors">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{item.percentage}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 delay-300"
                      style={{ width: item.percentage, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Insight Card */}
        <div className="bg-gradient-to-br from-[#D60041] to-[#b50037] rounded-[32px] p-8 text-white shadow-lg shadow-pink-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Briefcase size={80} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h4 className="text-xl font-black mb-2">Hiring Velocity</h4>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-8">
              Engineering roles are seeing a <span className="text-white font-bold underline underline-offset-4">45% increase</span> in qualified leads this week.
            </p>
            <button className="mt-auto w-full bg-white text-[#D60041] py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors">
              Deep Analytics <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTrends;