import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Music, Mic2, LayoutGrid, FolderOpen, Settings, LogOut, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { UserProfile } from './types';
import { getSession, signOut } from './services/storageService';

// Pages
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import SavedPieces from './pages/SavedPieces';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';

// --- Navigation Components ---

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1 ${
      active 
        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium shadow-lg shadow-slate-900/20' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
    }`}
  >
    <Icon size={18} className={`${active ? 'text-white dark:text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`} />
    <span className="text-sm">{label}</span>
  </Link>
);

// --- Layouts ---

interface AppLayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  setUser: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, user, setUser }) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleLogout = () => {
    signOut();
    setUser(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans selection:bg-brand-200 selection:text-brand-900">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0
      `}>
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Music size={18} />
            </div>
            <span className="text-xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">ArioMuse</span>
          </Link>

          <div className="mb-8">
            <Link to="/compose" className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-500/20 transition-all transform active:scale-95 border border-white/10">
              <Sparkles size={16} />
              <span>Create New</span>
            </Link>
          </div>

          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Studio</p>
            <SidebarItem to="/" icon={LayoutGrid} label="Dashboard" active={location.pathname === '/'} />
            <SidebarItem to="/saved" icon={FolderOpen} label="Library" active={location.pathname === '/saved'} />
            
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 mt-8">Settings</p>
            <SidebarItem to="/pricing" icon={Settings} label="Plan & Billing" active={location.pathname === '/pricing'} />
          </nav>
        </div>

        <div className="mt-auto p-6 mx-4 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-brand-600 font-bold text-sm border border-slate-200 dark:border-slate-600 shadow-sm">
               {user.username.substring(0,2).toUpperCase()}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.username}</p>
               <p className="text-xs text-slate-500 truncate capitalize font-medium">{user.subscriptionTier} Member</p>
             </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-white rounded-lg transition-all">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-slate-50 dark:bg-slate-950">
         {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-40">
          <div className="font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
             <div className="w-6 h-6 bg-brand-600 rounded text-white flex items-center justify-center"><Music size={14}/></div>
             ArioMuse
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto p-6 md:p-10 min-h-[calc(100vh-80px)]">
           {children}
        </div>
      </main>

      {mobileMenu && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenu(false)} />}
    </div>
  );
};

// --- Route Logic ---

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <div className="text-brand-900 font-serif font-bold animate-pulse">ArioMuse</div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/onboarding" element={user ? <Onboarding user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        
        {/* App Routes */}
        <Route path="/" element={
           user ? (
             user.onboardingCompleted ? (
               <AppLayout user={user} setUser={setUser}><Dashboard user={user} /></AppLayout>
             ) : <Navigate to="/onboarding" />
           ) : <Navigate to="/landing" />
        } />
        
        <Route path="/compose" element={
          user && user.onboardingCompleted ? (
            <AppLayout user={user} setUser={setUser}><Generator user={user} /></AppLayout>
          ) : <Navigate to="/" />
        } />
        
        <Route path="/saved" element={
          user && user.onboardingCompleted ? (
            <AppLayout user={user} setUser={setUser}><SavedPieces user={user} /></AppLayout>
          ) : <Navigate to="/" />
        } />

        <Route path="/pricing" element={
          user && user.onboardingCompleted ? (
            <AppLayout user={user} setUser={setUser}><Pricing /></AppLayout>
          ) : <Navigate to="/" />
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}