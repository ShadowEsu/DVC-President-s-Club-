
import React, { useState, useEffect } from 'react';
import { User, Event, EventType } from '../types';
import { INITIAL_EVENTS, INITIAL_CLUBS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  Info,
  CheckCircle2
} from 'lucide-react';

const NewEventPage: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: EventType.ONE_TIME,
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    clubIds: user.clubIds || []
  });

  const [conflicts, setConflicts] = useState<Event[]>([]);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'checking' | 'published'>('idle');

  // Conflict Detection Logic
  const checkConflicts = () => {
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.location) return;

    const currentStart = new Date(`${formData.date}T${formData.startTime}`);
    const currentEnd = new Date(`${formData.date}T${formData.endTime}`);

    const overlapEvents = INITIAL_EVENTS.filter(e => {
      const eStart = new Date(e.start);
      const eEnd = new Date(e.end);

      // Time Overlap Check
      const hasTimeOverlap = (currentStart < eEnd) && (currentEnd > eStart);
      
      // Location Check
      const hasLocationConflict = e.location.toLowerCase() === formData.location.toLowerCase();

      return hasTimeOverlap && hasLocationConflict;
    });

    setConflicts(overlapEvents);
  };

  useEffect(() => {
    checkConflicts();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishStatus('checking');
    
    // Simulate API delay
    setTimeout(() => {
      setPublishStatus('published');
      setTimeout(() => navigate('/calendar'), 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-slate-900 font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <header className="mb-10">
            <div className="w-16 h-16 navy-gradient rounded-[24px] flex items-center justify-center mb-6 shadow-xl shadow-blue-900/20">
              <Plus className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Schedule New Session</h1>
            <p className="text-slate-500 font-medium mt-1">Create a public event or recurring club meeting.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Intro to Figma Workshop"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-0 focus:border-slate-200 text-sm font-bold transition-all"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <input 
                      type="date" 
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white text-sm font-bold transition-all"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location / Room</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., L-151 or Online Link"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white text-sm font-bold transition-all"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <input 
                      type="time" 
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white text-sm font-bold transition-all"
                      value={formData.startTime}
                      onChange={e => setFormData({...formData, startTime: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">End Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <input 
                      type="time" 
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white text-sm font-bold transition-all"
                      value={formData.endTime}
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-0 focus:border-slate-200 text-sm font-bold transition-all resize-none"
                  placeholder="Describe your session goals, materials needed, etc."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Conflict Warning Section */}
            {conflicts.length > 0 && (
              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-900 mb-1">Schedule Conflict Detected</h4>
                    <p className="text-xs font-bold text-amber-700/80 mb-4 leading-relaxed">
                      This event overlaps with existing sessions at the same time and location.
                    </p>
                    <div className="space-y-3">
                      {conflicts.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-amber-200/50">
                          <div className="text-xs font-bold text-slate-600 truncate max-w-[200px]">{c.title}</div>
                          <div className="text-[10px] font-black text-amber-600 uppercase">Room Clash</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={publishStatus !== 'idle'}
              className={`w-full py-5 rounded-[24px] font-black text-sm shadow-xl transition-all flex items-center justify-center ${
                publishStatus === 'published' 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'navy-gradient text-white shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {publishStatus === 'idle' && <>Publish Session <ShieldCheck className="w-5 h-5 ml-2" /></>}
              {publishStatus === 'checking' && <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />}
              {publishStatus === 'published' && <>Session Published! <CheckCircle2 className="w-5 h-5 ml-2" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEventPage;
