
import React, { useState, useMemo } from 'react';
import { INITIAL_EVENTS, INITIAL_CLUBS, CATEGORIES } from '../constants';
import { User, Event, EventType, DayOfWeek, Club } from '../types';
import { 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  List, 
  MapPin, 
  Clock, 
  Bookmark,
  ExternalLink,
  Users,
  LayoutGrid,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // 9 AM to 6 PM

const CalendarPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [view, setView] = useState<'table' | 'list'>('table');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('saved_event_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                           e.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || e.tags.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, [events, search, categoryFilter]);

  // Conflict Logic for Table View
  const getClubsForSlot = (day: DayOfWeek, hour: number) => {
    return INITIAL_CLUBS.filter(club => {
      if (!club.schedule) return false;
      return club.schedule.some(s => {
        const startH = parseInt(s.startTime.split(':')[0]);
        const endH = parseInt(s.endTime.split(':')[0]);
        // Simple check: Is the meeting active during this hour?
        return s.day === day && hour >= startH && hour < endH;
      });
    });
  };

  const toggleSave = (id: string) => {
    const newSaved = savedIds.includes(id) 
      ? savedIds.filter(sid => sid !== id) 
      : [...savedIds, id];
    setSavedIds(newSaved);
    localStorage.setItem('saved_event_ids', JSON.stringify(newSaved));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-navy-900 tracking-tight mb-2">Campus Schedule</h1>
          <p className="text-slate-500 font-medium">Coordinate your semester. Detect conflicts. Sync impact.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {user && user.role !== 'STUDENT' && (
            <Link 
              to="/events/new"
              className="flex-grow md:flex-none flex items-center justify-center px-6 py-3.5 navy-gradient text-white rounded-2xl font-black shadow-xl shadow-navy-900/20 hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" /> New Event
            </Link>
          )}
        </div>
      </header>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search clubs or keywords..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-0 focus:border-slate-200 text-sm font-bold transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setView('table')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all text-sm font-black ${view === 'table' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="w-4 h-4" /> <span>Table</span>
            </button>
            <button 
              onClick={() => setView('list')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all text-sm font-black ${view === 'list' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-4 h-4" /> <span>List</span>
            </button>
          </div>

          <select 
            className="px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 focus:ring-0"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {view === 'table' ? (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-6 border-b border-slate-100 bg-slate-50/50">
              <div className="p-6 border-r border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">Time</div>
              {DAYS.map(day => (
                <div key={day} className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r last:border-r-0 border-slate-100">
                  {day}
                </div>
              ))}
            </div>

            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-6 border-b last:border-b-0 border-slate-100">
                <div className="p-6 border-r border-slate-100 text-sm font-black text-slate-500 text-center flex flex-col justify-center">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                {DAYS.map(day => {
                  const slots = getClubsForSlot(day, hour);
                  const isConflict = slots.length > 1;
                  
                  return (
                    <div key={day} className={`p-2 min-h-[100px] border-r last:border-r-0 border-slate-100 transition-colors ${isConflict ? 'bg-red-50/50' : 'bg-white'}`}>
                      {slots.length > 0 && (
                        <div className="space-y-2">
                          {isConflict && (
                            <div className="flex items-center space-x-1 mb-2 px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[8px] font-black uppercase tracking-widest">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Conflict</span>
                            </div>
                          )}
                          {slots.map(club => (
                            <div 
                              key={club.id} 
                              className={`p-3 rounded-2xl text-[10px] font-bold shadow-sm border border-white/50 transition-all hover:scale-105 cursor-pointer ${
                                club.category === 'STEM' ? 'bg-blue-100 text-blue-700' :
                                club.category === 'Cultural' ? 'bg-purple-100 text-purple-700' :
                                club.category === 'Service' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-slate-100 text-slate-700'
                              }`}
                              title={`${club.name} | ${club.schedule?.[0].location}`}
                            >
                              <div className="truncate mb-1">{club.name}</div>
                              <div className="opacity-60 flex items-center">
                                <MapPin className="w-2.5 h-2.5 mr-1" />
                                {club.schedule?.[0].location}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center space-x-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div> STEM</div>
             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-purple-100 mr-2"></div> Cultural</div>
             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-100 mr-2"></div> Service</div>
             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-slate-100 mr-2"></div> Others</div>
             <div className="flex items-center ml-8 text-red-500"><AlertTriangle className="w-3 h-3 mr-2" /> Conflicts Highlighted</div>
          </div>
        </div>
      ) : (
        /* List View remains existing implementation with enhancements */
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-32 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[32px] shrink-0">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      {new Date(event.start).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-4xl font-black text-navy-900 leading-none">
                      {new Date(event.start).getDate()}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-black text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm font-bold text-slate-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-slate-300" />
                        {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-300" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => toggleSave(event.id)}
                        className={`flex-grow sm:flex-none flex items-center justify-center px-8 py-3.5 rounded-2xl font-black text-sm transition-all ${
                          savedIds.includes(event.id) 
                            ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 mr-2 ${savedIds.includes(event.id) ? 'fill-current' : ''}`} />
                        {savedIds.includes(event.id) ? 'Saved' : 'Save Event'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100">
              <Info className="w-10 h-10 text-slate-200 mx-auto mb-6" />
              <h3 className="text-xl font-black text-navy-900 mb-2">No matching events</h3>
              <p className="text-slate-400">Try broadening your search or category filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
