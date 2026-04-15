import React from 'react';
import { ChevronUp } from 'lucide-react';

const ApplicationTrends = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm h-[400px] mb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">Application Trends</h3>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
            Daily submission trends and average scores
          </p>
        </div>
        <ChevronUp className="h-4 w-4 text-gray-300" />
      </div>

      <div className="w-full h-[250px] relative border-b border-l border-gray-200 mt-10">
        <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 font-medium">
          <span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
        </div>

        <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-gray-400 px-2 font-medium tracking-wide">
          <span>Jan 15</span><span>Jan 14</span><span>Jan 13</span>
          <span>Jan 12</span><span>Jan 11</span><span>Jan 10</span><span>Jan 09</span>
        </div>

        <div className="w-full h-full flex flex-col justify-between">
          {[1,2,3,4].map(i => (
            <div key={i} className="border-t border-gray-100 border-dashed w-full h-px"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTrends;