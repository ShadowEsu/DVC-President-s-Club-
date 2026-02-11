
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
  BarChart3,
  Rocket
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] navy-gradient opacity-[0.03] rounded-b-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-50 text-navy-800 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-gold-500" />
            Empowering the Next Generation of Leaders
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-navy-900 leading-[1] mb-8 tracking-tight">
            Uniting <span className="text-gradient">Student Hub</span> <br className="hidden md:block" /> at Diablo Valley
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
            The central ecosystem for club presidents to schedule sessions, manage resources, and scale student impact across campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/calendar"
              className="w-full sm:w-auto px-10 py-5 navy-gradient text-white rounded-2xl font-black shadow-2xl shadow-navy-900/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
            >
              Explore Calendar 
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/directory"
              className="w-full sm:w-auto px-10 py-5 bg-white text-navy-900 border-2 border-slate-100 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              View Directory
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { label: 'Active Clubs', val: '50+' },
              { label: 'Leaders Unified', val: '120+' },
              { label: 'Annual Events', val: '400+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-navy-900 mb-1 tracking-tighter">{stat.val}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-navy-900 mb-6 tracking-tight">Built for Student Infrastructure</h2>
            <p className="text-slate-500 text-lg font-medium">We solved the biggest headaches in club management so you can focus on leading.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Calendar, 
                title: "Conflict Detection", 
                desc: "Our engine automatically alerts you if another club is booking the same room or time, preventing double-bookings instantly."
              },
              { 
                icon: MessageSquare, 
                title: "Unified Updates", 
                desc: "Post announcements, funding alerts, and meeting minutes in a central feed that students actually check."
              },
              { 
                icon: Globe, 
                title: "Public Directory", 
                desc: "Every club gets a beautiful profile. Searchable, filterable, and always up-to-date for new students."
              }
            ].map((feature, i) => (
              <div key={i} className="glass p-10 rounded-[40px] hover:shadow-2xl hover:shadow-navy-900/5 transition-all group">
                <div className="w-16 h-16 navy-gradient rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-navy-900/10 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-navy-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-navy-900 tracking-tight leading-tight">
                Data-Driven <br /><span className="text-gold-500">Campus Impact</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Track engagement across your organization. Our dashboard provides real-time insights into which categories are growing and how clubs are collaborating.
              </p>
              <div className="space-y-4">
                {[
                  "Automated ICC Funding Workflows",
                  "Cross-Club Collaboration Requests",
                  "Member Engagement Analytics"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 font-bold text-navy-800">
                    <CheckCircle2 className="w-5 h-5 text-gold-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center text-navy-900 font-black hover:text-gold-600 transition-colors pt-4 group">
                Learn about our mission <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-navy-900 rounded-[50px] p-12 shadow-2xl relative z-10 text-white group overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <BarChart3 className="w-64 h-64" />
                </div>
                <div className="relative z-20 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-gold-400 uppercase tracking-widest mb-1">Growth Forecast</div>
                      <div className="text-3xl font-black">+24% Participation</div>
                    </div>
                    <ActivityIcon className="w-10 h-10 text-gold-400" />
                  </div>
                  <div className="h-40 flex items-end justify-between gap-4">
                    {[60, 40, 90, 70, 50, 85].map((h, i) => (
                      <div key={i} className="w-full bg-white/10 rounded-t-xl hover:bg-gold-500 transition-all duration-500" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <p className="text-xs text-navy-200 font-bold uppercase tracking-widest text-center">Engagement Trends 2023-2024</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="navy-gradient rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <Rocket className="w-16 h-16 text-gold-400 mx-auto mb-8 animate-bounce" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to scale your <br /> club's legacy?</h2>
              <p className="text-navy-100 text-lg md:text-xl font-medium mb-12 opacity-80">
                Join 50+ presidents who have already unified their organizations on the Hub. Start managing your sessions like a professional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-gold-500 text-navy-900 rounded-2xl font-black shadow-xl hover:bg-gold-400 transition-all">
                  Join the Council
                </Link>
                <Link to="/directory" className="w-full sm:w-auto px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black backdrop-blur-md hover:bg-white/20 transition-all">
                  Browse Clubs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Internal icon helpers
const ActivityIcon = ({className}: {className?: string}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);

export default HomePage;
