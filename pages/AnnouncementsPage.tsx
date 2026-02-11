
import React, { useState } from 'react';
import { INITIAL_ANNOUNCEMENTS } from '../constants';
import { Announcement, User, UserRole } from '../types';
import { 
  Bell, 
  Search, 
  Pin, 
  Clock, 
  User as UserIcon, 
  Megaphone, 
  Tag, 
  Plus,
  ArrowUpRight
} from 'lucide-react';

const AnnouncementsPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [filter, setFilter] = useState('all');

  const filtered = announcements.filter(a => filter === 'all' || a.category === filter);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Council Updates</h1>
          <p className="text-slate-500 font-medium">Official announcements and resource alerts for DVC leaders.</p>
        </div>

        {user && user.role === UserRole.ADMIN && (
          <button className="px-8 py-4 navy-gradient text-white rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Post Update
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Categories</h3>
            <div className="space-y-1">
              {['all', 'urgent', 'funding', 'reminders', 'general'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                    filter === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Megaphone className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h4 className="font-black text-lg mb-3">Newsletter</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">Receive the weekly Council Digest directly in your inbox.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black transition-all border border-white/10 backdrop-blur-sm">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="lg:col-span-3 space-y-8">
          {filtered.map(item => (
            <div 
              key={item.id} 
              className={`bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm transition-all hover:shadow-xl relative overflow-hidden ${
                item.pinned ? 'border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    item.category === 'urgent' ? 'bg-red-50 text-red-600' :
                    item.category === 'funding' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {item.category}
                  </div>
                  {item.pinned && (
                    <span className="flex items-center text-blue-600 text-[10px] font-black uppercase tracking-wider">
                      <Pin className="w-3 h-3 mr-1" /> Pinned
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                   <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                   <span className="flex items-center"><UserIcon className="w-3 h-3 mr-1.5" /> {item.createdBy}</span>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                {item.title}
              </h2>

              <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-3xl">
                {item.body}
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-400">
                      <UserIcon className="w-5 h-5" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-black">
                    +12
                  </div>
                </div>
                <button className="flex items-center text-sm font-black text-slate-900 hover:text-blue-600 transition-all">
                  Read Full Update <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
