
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Info } from 'lucide-react';

const LoginPage: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo Authentication Logic
    if (email === 'president@dvc.edu' && password === 'leadership') {
      const mockUser: User = {
        id: 'u1',
        name: 'Isabela Chow',
        email: email,
        role: UserRole.PRESIDENT,
        clubIds: ['1']
      };
      onLogin(mockUser);
      navigate('/dashboard');
    } else if (email === 'admin@dvc.edu' && password === 'admin') {
      const mockUser: User = {
        id: 'u2',
        name: 'Council Admin',
        email: email,
        role: UserRole.ADMIN,
        clubIds: []
      };
      onLogin(mockUser);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use president@dvc.edu / leadership or admin@dvc.edu / admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[48px] p-10 md:p-14 shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="text-center mb-12">
            <div className="w-20 h-20 navy-gradient rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/20">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Council Portal</h1>
            <p className="text-slate-400 font-medium">Access your club's command center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-5 rounded-3xl flex items-start space-x-3 text-xs font-bold border border-red-100 animate-in fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="email"
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-transparent rounded-[24px] focus:bg-white focus:border-slate-200 transition-all text-sm font-bold text-slate-700 outline-none shadow-sm"
                  placeholder="name@dvc.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="password"
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-transparent rounded-[24px] focus:bg-white focus:border-slate-200 transition-all text-sm font-bold text-slate-700 outline-none shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 navy-gradient text-white rounded-[24px] font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Enter Hub <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-50">
             <div className="flex items-start space-x-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
               <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider">
                 Only verified DVC Club Presidents and Council Administrators are granted portal access. 
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
