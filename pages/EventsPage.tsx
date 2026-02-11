
import React from 'react';
import { Calendar as CalendarIcon, MapPin, Share2, Users, ArrowUpRight } from 'lucide-react';

const EVENTS = [
  {
    id: '1',
    name: 'Stem x Business Networking Mixer',
    hostClubs: ['WIB', 'WICS', 'ABG'],
    date: 'Oct 24, 2023',
    location: 'DVC Student Center (Main Hall)',
    description: 'A massive networking event specifically designed to bridge the gap between technical and business students.',
    image: 'https://picsum.photos/seed/event1/800/400'
  },
  {
    id: '2',
    name: 'Cultural Food Festival',
    hostClubs: ['ISC', 'Kabayan Club', 'Latinx Student Alliance', 'Persian Club'],
    date: 'Nov 02, 2023',
    location: 'Pleasant Hill Commons',
    description: 'Celebrate DVC\'s diversity with food from across the globe. Organized by multiple cultural clubs.',
    image: 'https://picsum.photos/seed/event2/800/400'
  },
  {
    id: '3',
    name: 'Inter-Club Soccer Tournament',
    hostClubs: ['Soccer Club', 'ISC'],
    date: 'Nov 15, 2023',
    location: 'DVC Sports Field',
    description: 'Gather your teams for the annual club tournament. Winning club takes home the Council Cup.',
    image: 'https://picsum.photos/seed/event3/800/400'
  }
];

const EventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-slate-900 mb-4">Campus Collaboration</h1>
            <p className="text-slate-500">
              The central source for all cross-club initiatives. Discover how student organizations are working together to build a better campus experience.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center">
            Submit Collaboration Request <ArrowUpRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Featured Events</h2>
            {EVENTS.map(event => (
              <div key={event.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative overflow-hidden h-64 md:h-auto">
                    <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                        <div className="text-xs font-black text-slate-900 uppercase tracking-wider">{event.date.split(',')[0]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col">
                    <div className="flex -space-x-2 mb-4">
                      {event.hostClubs.map((club, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" title={club}>
                          {club.substring(0, 2)}
                        </div>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{event.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{event.description}</p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-slate-700 text-sm font-semibold">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" /> {event.location}
                      </div>
                      <div className="flex items-center text-slate-700 text-sm font-semibold">
                        <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" /> {event.date}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-grow py-3 navy-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20">
                        RSVP Now
                      </button>
                      <button className="p-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Campus Calendar</h2>
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">October 2023</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">←</button>
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">→</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['S','M','T','W','T','F','S'].map(day => (
                  <div key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = day === 24 || day === 15;
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square flex items-center justify-center text-sm font-bold rounded-xl transition-all cursor-pointer ${
                        hasEvent 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Today's Deadlines</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">ICC Meeting Minutes</div>
                      <div className="text-[10px] text-slate-400">Due at 5:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">AGS Scholarship Form</div>
                      <div className="text-[10px] text-slate-400">Due in 2 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal clock component helper
const Clock = ({className}: {className?: string}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default EventsPage;
