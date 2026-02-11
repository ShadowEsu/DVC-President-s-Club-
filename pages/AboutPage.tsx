
import React from 'react';
import { Target, Eye, Rocket, Award, ShieldCheck, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Intro */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider mb-8">
            Our Foundation
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
            Empowering the Pillars of <br/><span className="navy-gradient text-transparent bg-clip-text">Student Leadership</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The DVC Presidents Club was founded in 2023 with a singular mission: to unify the leaders of Diablo Valley College's student organizations.
          </p>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-900 rounded-[48px] p-12 text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-6">Our Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              To provide a centralized infrastructure for student leaders that fosters open communication, resource sharing, and meaningful cross-cultural and academic collaboration.
            </p>
            <ul className="space-y-4">
              {['Increase club visibility', 'Streamline administrative processes', 'Boost student engagement'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-200 font-medium">
                  <ShieldCheck className="w-5 h-5 text-gold-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-[48px] p-12 text-slate-900 border border-slate-100">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-6">Our Vision</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              We envision a campus where every student organization operates as part of a cohesive ecosystem, sharing strengths to overcome challenges and creating a world-class collegiate experience.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-[32px] border border-slate-200">
                <div className="text-3xl font-black text-slate-900 mb-1">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inclusion</div>
              </div>
              <div className="p-6 bg-white rounded-[32px] border border-slate-200">
                <div className="text-3xl font-black text-slate-900 mb-1">50+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Clubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Why Join the Council?</h2>
            <p className="text-slate-500">Beyond just a title, the Presidents Club offers tangible benefits to your organization.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "Accelerated Growth", desc: "Gain access to the combined reach of all Council member organizations." },
              { icon: Award, title: "Leadership Training", desc: "Participate in exclusive workshops and networking events with DVC faculty." },
              { icon: Heart, title: "Community Impact", desc: "Be part of larger-scale charity and campus improvement initiatives." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 navy-gradient rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/10">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
