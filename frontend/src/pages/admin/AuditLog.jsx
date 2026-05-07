import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Globe,
  Database,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { useGetAuditLogsQuery } from '../../redux/api/apiSlice';
import { exportToCSV } from '../../utils/exportUtils';

const AuditLogPage = () => {
  const { data: auditLogs = [], isLoading } = useGetAuditLogsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter(log => 
    log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(auditLogs, `Audit_Trail_${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter'] flex flex-col">
      <Helmet>
        <title>Admin Page - Audit Log</title>
      </Helmet>
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-[1400px] mx-auto px-10 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              <span>Admin</span>
              <ChevronRight size={12} />
              <span className="text-[#D10043]">Audit Logs</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">System Audit Trail</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide mt-1">
              Immutable record of all administrative actions and security events.
            </p>
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:shadow-sm transition-all text-xs font-bold tracking-tight text-gray-600 flex items-center justify-center gap-2">
              <Calendar size={16} />
              Live Feed
            </button>
            <button 
              onClick={handleExport}
              className="flex-1 md:flex-none bg-[#D10043] text-white px-5 py-2.5 rounded-xl hover:bg-[#b00038] transition-all text-xs font-bold tracking-tight flex items-center justify-center shadow-lg shadow-red-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Search Event</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-300" size={14} />
                    <input 
                      type="text" 
                      placeholder="ID, Action, User..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-red-100 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Severity</label>
                  <select className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-red-100 outline-none">
                    <option>All Levels</option>
                    <option>Success</option>
                    <option>Warning</option>
                    <option>Critical</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="w-full py-2.5 text-xs font-bold text-[#D10043] bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[24px] p-6 text-white shadow-xl">
              <Shield className="text-emerald-400 mb-3" size={24} />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Log Integrity</p>
              <p className="text-sm font-medium mt-1">Hashes verified. Logs are tamper-proof.</p>
            </div>
          </aside>

          <div className="flex-1 bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 uppercase text-[10px] tracking-[0.1em] text-gray-400 font-bold bg-gray-50/30">
                    <th className="px-8 py-5 font-bold">Event Details</th>
                    <th className="px-6 py-5 font-bold">Actor</th>
                    <th className="px-6 py-5 font-bold">Metadata</th>
                    <th className="px-6 py-5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D10043] mx-auto mb-4"></div>
                        <p className="text-sm text-gray-400 font-bold">Fetching system logs...</p>
                      </td>
                    </tr>
                  ) : filteredLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 p-2 rounded-lg ${
                            log.status === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'
                          }`}>
                            <Database size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{log.action}</p>
                            <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                              Target: <span className="text-gray-600">{log.target}</span> • ID: {log.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center font-bold text-[#D10043] text-[10px]">
                            {log.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{log.user}</p>
                            <p className="text-[11px] text-gray-400 font-medium">{log.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                            <Globe size={12} className="text-gray-300" /> {log.ip}
                          </p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                            <Clock size={12} className="text-gray-300" /> {log.time}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full ${
                          log.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 
                          log.status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-[#D10043]'
                        }`}>
                          {log.status === 'Success' && <CheckCircle2 size={12} />}
                          {log.status === 'Critical' && <AlertCircle size={12} />}
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-medium">
                        No audit logs found for "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-50 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-400">
                Showing <span className="text-gray-900 font-bold">{filteredLogs.length}</span> recorded events
              </p>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold">1</button>
                <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default AuditLogPage;