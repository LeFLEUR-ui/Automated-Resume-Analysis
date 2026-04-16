import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  UserCheck, 
  UserX, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Calendar,
  Settings2
} from 'lucide-react';
import Header from '../../components/Header';
// import Header from '../../components/admin/AdminHeader';

const USERS_DATA = [
  { id: 1, name: "Marcus Aurelius", email: "marcus@empire.gov", role: "Super Admin", status: "Active", joined: "Oct 2023", location: "Rome, IT", avatar: "M" },
  { id: 2, name: "Helena Troi", email: "helena.t@design.co", role: "Editor", status: "Active", joined: "Nov 2023", location: "Athens, GR", avatar: "H" },
  { id: 3, name: "Julian Casablancas", email: "julian@voidz.com", role: "Moderator", status: "Inactive", joined: "Jan 2024", location: "New York, US", avatar: "J" },
  { id: 4, name: "Sophia Loren", email: "sophia@cinema.it", role: "User Manager", status: "Active", joined: "Feb 2024", location: "Naples, IT", avatar: "S" },
  { id: 5, name: "Thomas Bangalter", email: "thomas@robot.fr", role: "Viewer", status: "Pending", joined: "Mar 2024", location: "Paris, FR", avatar: "T" },
  { id: 6, name: "Syd Barrett", email: "syd@moon.uk", role: "Editor", status: "Active", joined: "Apr 2024", location: "Cambridge, UK", avatar: "S" },
];

const UsersPage = () => {
  return (
    <div className="bg-[#FCFCFC] text-gray-800 antialiased min-h-screen font-['Inter']">
      <Header />

      <main className="max-w-[1400px] mx-auto px-10 py-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide mt-1">
              Manage team access levels, permissions, and account security.
            </p>
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-red-100 transition-all outline-none"
              />
            </div>
            <button className="bg-[#D10043] text-white px-5 py-2.5 rounded-xl hover:bg-[#b00038] transition-all text-xs font-bold tracking-tight flex items-center justify-center shadow-lg shadow-red-100">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 uppercase text-[10px] tracking-[0.1em] text-gray-400 font-bold bg-gray-50/30">
                      <th className="px-8 py-5">User Profile</th>
                      <th className="px-6 py-5">Role & Access</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {USERS_DATA.map((user) => (
                      <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{user.name}</p>
                              <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                                <Mail size={12} /> {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <Shield size={14} className="text-gray-300" />
                            <span className="text-xs font-semibold text-gray-700">{user.role}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1 ml-5">
                            Joined {user.joined}
                          </p>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                            user.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50"><ChevronLeft size={18} /></button>
                  <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50"><ChevronRight size={18} /></button>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page 1 of 12</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings2 size={18} className="text-[#D10043]" /> User Insights
              </h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Now</p>
                    <p className="text-xl font-bold text-gray-900">128</p>
                  </div>
                  <UserCheck className="text-emerald-500 opacity-20" size={32} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deactivated</p>
                    <p className="text-xl font-bold text-gray-900">14</p>
                  </div>
                  <UserX className="text-red-500 opacity-20" size={32} />
                </div>
                <hr className="border-gray-50" />
                <div>
                  <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                    Most users are currently connecting from <span className="text-gray-900 font-bold">North America</span> and <span className="text-gray-900 font-bold">Europe</span> regions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#111] rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Access Reviews</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  It's been 30 days since your last security role audit. 
                </p>
                <button className="w-full bg-[#D10043] hover:bg-[#b00038] py-3 rounded-xl text-xs font-bold transition-all">
                  Start Compliance Check
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UsersPage;