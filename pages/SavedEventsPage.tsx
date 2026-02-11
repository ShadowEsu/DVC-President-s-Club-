
import React, { useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../constants';
import { Event } from '../types';
import { 
  Bookmark, 
  ArrowLeft, 
  Calendar, 
  Download, 
  Share2, 
  X,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('saved_event_ids');
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  const savedEvents = INITIAL_EVENTS.filter(e => savedIds.includes(e.id));

  const removeSaved = (id: string) => {
    const next = savedIds.filter(sid => sid !== id);
    setSavedIds(next);
    localStorage.setItem('saved_event_ids', JSON.stringify(next));
  };

  const exportICS = () => {
    alert("Exporting .ICS for your personal calendar...");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Schedule</h1>
          <p className="text-slate-500 font-medium">Your curated journey through the semester.</p>
        </div>
        
        {savedEvents.length > 0 && (
          <button 
            onClick={exportICS}
            className="flex items-center px-6 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black shadow-sm hover:bg-slate-50 transition-all"
          >
            <Download className="w-5 h-5 mr-2" /> Export to Calendar
          </button>
        )}
      </div>

      {savedEvents.length > 0 ? (
        <div className="space-y-6">
          {savedEvents.map(event => (
            <div key={event.id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex flex-col items-center justify-center shrink-0">
                <div className="text-[10px] font-black text-slate-400 uppercase">{new Date(event.start).toLocaleString('default', { month: 'short' })}</div>
                <div className="text-2xl font-black text-slate-900">{new Date(event.start).getDate()}</div>
              </div>

              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-black text-slate-900 mb-2">{event.title}</h3>
                <div className="text-sm font-bold text-slate-400 flex items-center justify-center sm:justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.location}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all" title="Share Event">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => removeSaved(event.id)}
                  className="p-4 bg-red-50 text-red-400 hover:text-red-600 rounded-2xl transition-all" 
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Bookmark className="w-12 h-12 text-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">No saved events</h2>
          <p className="text-slate-400 max-w-xs mx-auto mb-10 leading-relaxed font-medium">
            Browse the campus calendar and bookmark events that matter to you.
          </p>
          <button 
            onClick={() => navigate('/calendar')}
            className="px-10 py-4 navy-gradient text-white rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-all"
          >
            Browse Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedEventsPage;
