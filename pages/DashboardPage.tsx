
import React from 'react';
import { User, UserRole } from '../types';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Calendar, 
  Megaphone, 
  Settings, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const DashboardPage: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 navy-gradient rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-900/20">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Council Portal</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
              Welcome Back, {user.name} • <span className="text-blue-600">{user.role}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            to="/events/new"
            className="flex-grow md:flex-none flex items-center justify-center px-8 py-4 navy-gradient text-white rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-[1.02] transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> New Session
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
              <div>
                <div className="text-4xl font-black text-slate-900 mb-2">1.2k</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Reach</div>
              </div>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
            </div>
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
              <div>
                <div className="text-4xl font-black text-slate-900 mb-2">45</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saves/RSVPs</div>
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Conflict Hub / Active Management */}
          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Management</h3>
              <Link to="/calendar" className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center uppercase tracking-widest">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Weekly Meeting', status: 'Published', date: 'Tomorrow, 3PM' },
                { title: 'Collaboration Workshop', status: 'Published', date: 'Fri, 2PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] hover:bg-slate-100 transition-all cursor-pointer group">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.status}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-all">
                      <Settings className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10">
               <ShieldCheck className="w-40 h-40" />
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 leading-tight">Admin<br/>Quick Tools</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/10 backdrop-blur-md">
                    Manage Club Profile <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/10 backdrop-blur-md">
                    Invite Presidents <Plus className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/10 backdrop-blur-md">
                    Audit Conflicts <Activity className="w-4 h-4" />
                  </button>
                </div>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
              <Megaphone className="w-4 h-4 mr-2" /> Recent Update
            </h4>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-900 leading-relaxed">Funding applications for next semester are now live.</p>
              <p className="text-[10px] font-bold text-slate-400">2 hours ago</p>
            </div>
            <button className="mt-8 text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">
              Manage Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
