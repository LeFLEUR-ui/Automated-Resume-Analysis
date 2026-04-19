import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const ApplicationTrends = () => {
  const chartData = [
    { day: 'Jan 09', applications: 25, height: '30%' },
    { day: 'Jan 10', applications: 45, height: '55%' },
    { day: 'Jan 11', applications: 30, height: '40%' },
    { day: 'Jan 12', applications: 65, height: '80%' },
    { day: 'Jan 13', applications: 50, height: '60%' },
    { day: 'Jan 14', applications: 75, height: '90%' },
    { day: 'Jan 15', applications: 55, height: '70%' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 mb-8">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-gray-900">Application Trends</h3>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">
            Daily submission trends and candidate volume over the last 7 days
          </p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors group">
          <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-[#D60041] transition-colors" />
        </button>
      </div>

      <div className="w-full h-[280px] relative border-b-2 border-l-2 border-gray-100 mt-6 pl-4 pb-2">
        <div className="absolute -left-8 top-0 h-[280px] flex flex-col justify-between text-[11px] text-gray-400 font-bold tracking-wider py-2">
          <span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
        </div>

        <div className="absolute inset-0 pl-4 pb-2 flex flex-col justify-between w-full h-[280px] pointer-events-none">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-t border-gray-100 border-dashed w-full h-px opacity-70"></div>
          ))}
        </div>

        <div className="w-full h-full flex items-end justify-between px-2 sm:px-6 relative z-10">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center group h-full justify-end w-1/12 relative cursor-pointer">
              <div className="absolute -top-10 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-xl whitespace-nowrap z-20">
                {data.applications} Apps
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>

              <div
                className="w-full max-w-[40px] bg-gradient-to-t from-pink-50 to-pink-200 group-hover:from-pink-100 group-hover:to-[#D60041] rounded-t-xl transition-all duration-500 ease-out group-hover:shadow-[0_0_15px_rgba(214,0,65,0.3)]"
                style={{ height: data.height }}
              ></div>
            </div>
          ))}
        </div>

        <div className="absolute -bottom-8 left-0 pl-4 w-full flex justify-between text-[11px] text-gray-500 font-bold px-2 sm:px-6 tracking-wide">
          {chartData.map((data, index) => (
            <span key={index} className="w-1/12 text-center group-hover:text-gray-900 transition-colors">{data.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTrends;