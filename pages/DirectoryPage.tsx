
import React, { useState, useMemo } from 'react';
import { INITIAL_CLUBS as CLUBS, CATEGORIES } from '../constants';
import { User } from '../types';
import { Search, Users, Mail, Clock, ExternalLink, Filter, ArrowUpRight } from 'lucide-react';

const DirectoryPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'president' | 'category'>('alphabetical');

  const filteredClubs = useMemo(() => {
    let result = CLUBS.filter(club => {
      const matchesSearch = 
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.leaders.some(p => p.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'All' || club.category === category;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      if (sortBy === 'president') return a.leaders[0].localeCompare(b.leaders[0]);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [search, category, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl font-black text-navy-900 mb-6 tracking-tight">Organization Directory</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            The comprehensive guide to student-led impact at Diablo Valley College. Connect with leaders and find your community.
          </p>
        </header>

        {/* Dynamic Filter Bar */}
        <div className="glass p-6 rounded-[32px] shadow-2xl shadow-navy-900/5 mb-12 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by club name or president..."
              className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all text-sm font-bold text-navy-900 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex w-full lg:w-auto gap-3">
            <div className="relative flex-grow lg:flex-none">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <select
                className="w-full pl-10 pr-10 py-4 bg-slate-100/50 border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-navy-800 outline-none appearance-none hover:bg-slate-100 transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <select
              className="flex-grow lg:flex-none px-6 py-4 bg-navy-900 text-white border-transparent rounded-2xl text-xs font-black uppercase tracking-widest outline-none hover:bg-navy-800 transition-colors"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="alphabetical">A-Z Name</option>
              <option value="president">President Name</option>
              <option value="category">By Category</option>
            </select>
          </div>
        </div>

        {/* Grid Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredClubs.map(club => (
            <div key={club.id} className="bg-white rounded-[48px] border border-slate-100 p-10 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
                  club.category === 'STEM' ? 'bg-blue-50 text-blue-600' :
                  club.category === 'Cultural' ? 'bg-purple-50 text-purple-600' :
                  club.category === 'Service' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {club.category}
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-gold-500 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-3xl font-black text-navy-900 mb-4 tracking-tight leading-tight group-hover:text-gold-600 transition-colors">
                {club.name}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                {club.description}
              </p>

              <div className="space-y-4 mb-10 pt-6 border-t border-slate-50">
                <div className="flex items-center text-navy-800 text-xs font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-gold-500 mr-3"></span>
                  {club.leaders.join(' & ')}
                </div>
                <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 mr-2.5" />
                  {club.defaultMeetingTime || 'Schedule TBD'}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${club.contactEmail}`}
                  className="flex-grow flex items-center justify-center py-4 bg-navy-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy-800 shadow-xl shadow-navy-900/10 transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4 mr-2" /> Contact
                </a>
                <button className="p-4 bg-slate-50 text-navy-900 rounded-2xl hover:bg-slate-100 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-32 glass rounded-[60px] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-navy-200" />
            </div>
            <h3 className="text-3xl font-black text-navy-900 mb-2 tracking-tight">No organizations found</h3>
            <p className="text-slate-500 font-medium">Try broadening your search or adjusting filters.</p>
            <button 
              onClick={() => {setSearch(''); setCategory('All');}}
              className="mt-8 px-8 py-4 bg-navy-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy-800 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;
