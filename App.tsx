
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  LayoutDashboard, 
  Info, 
  Search, 
  Menu, 
  X, 
  Bell,
  Plus,
  Bookmark,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import DirectoryPage from './pages/DirectoryPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NewEventPage from './pages/NewEventPage';
import SavedEventsPage from './pages/SavedEventsPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { User, UserRole } from './types';

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Directory', path: '/directory', icon: Users },
    { name: 'Updates', path: '/announcements', icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 navy-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/10 group-hover:scale-105 transition-transform">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-none tracking-tight">Council Hub</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DVC Student Life</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-4" />
            
            <Link to="/saved" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all" title="Saved Events">
              <Bookmark className="w-5 h-5" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/dashboard" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all" title="Dashboard">
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
                <button onClick={onLogout} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-600 font-black text-xs">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <Link to="/login" className="ml-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                Log In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition-all">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-6 px-4 space-y-3 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-4 w-full px-5 py-4 rounded-2xl font-bold ${
                isActive(item.path) ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          <Link to="/saved" onClick={() => setIsOpen(false)} className="flex items-center space-x-4 w-full px-5 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50">
            <Bookmark className="w-5 h-5" />
            <span>Saved Events</span>
          </Link>
          <div className="pt-4 mt-4 border-t border-slate-100">
            {!user ? (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg">
                Login to Portal
              </Link>
            ) : (
              <button onClick={() => { onLogout(); setIsOpen(false); }} className="flex items-center justify-center w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('hub_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hub_user');
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage user={user} />} />
            <Route path="/directory" element={<DirectoryPage user={user} />} />
            <Route path="/announcements" element={<AnnouncementsPage user={user} />} />
            <Route path="/saved" element={<SavedEventsPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route 
              path="/events/new" 
              element={user && user.role !== UserRole.STUDENT ? <NewEventPage user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
               <ShieldCheck className="text-slate-400 w-8 h-8" />
               <div>
                 <p className="font-black text-slate-900 uppercase tracking-tighter">Council Hub</p>
                 <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Diablo Valley College</p>
               </div>
            </div>
            <div className="flex space-x-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
            <p className="text-xs font-bold text-slate-300">© 2023 DVC Presidents Club. No tracking enabled.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
