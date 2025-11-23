import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Music, Clock, ArrowRight, Sparkles, Search, Filter, TrendingUp } from 'lucide-react';
import { UserProfile, Composition } from '../types';
import { getCompositions } from '../services/storageService';
import FadeIn from '../components/FadeIn';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompositions(user.id).then(comps => {
      setCompositions(comps);
      setLoading(false);
    });
  }, [user.id]);

  const recentCompositions = compositions.slice(0, 3);

  return (
    <div className="space-y-10 pb-10">
      {/* Background accent */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-50/50 to-transparent -z-10 pointer-events-none dark:from-brand-900/10"></div>

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Studio
            </h1>
            <p className="text-slate-500 mt-2 flex items-center gap-2 font-light">
              Welcome back, {user.username}.
            </p>
          </div>
          
          <Link 
            to="/compose"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <Plus size={20} />
            <span>New Composition</span>
          </Link>
        </div>
      </FadeIn>

      {/* Quick Stats / Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FadeIn className="md:col-span-2" delay={0.1}>
          <div className="h-full p-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-[2rem] text-white shadow-2xl shadow-brand-900/10 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold mb-6 border border-white/10">
                <Sparkles size={12} /> 
                <span className="tracking-wider">WEEKLY INSPIRATION</span>
              </div>
              <h3 className="font-serif font-bold text-3xl mb-3">Phrygian Dominant</h3>
              <p className="text-brand-100 text-sm max-w-md mb-8 leading-relaxed opacity-90">
                Add exotic flair to your next piece. This mode is perfect for creating tension in cinematic or flamenco-style compositions.
              </p>
              <Link to="/compose" className="text-xs font-bold uppercase tracking-wider bg-white text-brand-900 px-6 py-3 rounded-full hover:bg-brand-50 transition-colors inline-block shadow-lg">
                Try Generator
              </Link>
            </div>
            {/* Decorative bg elements */}
            <div className="absolute right-[-20px] bottom-[-40px] opacity-10 transform rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
              <Music size={240} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="h-full p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center hover:border-brand-200 dark:hover:border-slate-700 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-bl-full -mr-4 -mt-4 z-0"></div>
             
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Usage</span>
                 <div className="px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-200 rounded text-[10px] font-bold uppercase tracking-wide">{user.subscriptionTier} Plan</div>
               </div>
               <div className="flex items-baseline gap-2 mb-2">
                 <span className="text-5xl font-serif font-bold text-slate-900 dark:text-white">{compositions.length}</span>
                 <span className="text-lg text-slate-400 font-sans">/ {user.subscriptionTier === 'free' ? '10' : '∞'}</span>
               </div>
               <div className="text-sm text-slate-500 mb-6 font-medium">Compositions this month</div>
               
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mb-4">
                 <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(161,128,114,0.5)]" style={{ width: `${Math.min((compositions.length / 10) * 100, 100)}%` }}></div>
               </div>
               
               {user.subscriptionTier === 'free' && (
                 <Link to="/pricing" className="inline-flex items-center gap-1 text-xs text-brand-600 font-bold hover:text-brand-700 transition-colors">
                   <TrendingUp size={12} /> Upgrade for unlimited
                 </Link>
               )}
             </div>
          </div>
        </FadeIn>
      </div>

      {/* Recent Work */}
      <FadeIn delay={0.3}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">Recent Compositions</h2>
          <Link to="/saved" className="text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-2 transition-colors group">
            View Library <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] animate-pulse"></div>)}
           </div>
        ) : recentCompositions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCompositions.map((comp, i) => (
               <FadeIn key={comp.id} delay={0.1 * i}>
                 <div className="group bg-white dark:bg-slate-900 p-1 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 hover:border-brand-200 dark:hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none cursor-pointer h-full">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-300 rounded-2xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Music size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">{comp.settings.instrument}</span>
                      </div>
                      
                      <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 truncate font-serif">{comp.title}</h3>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
                         <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <Clock size={14} />
                            <span>{new Date(comp.createdAt).toLocaleDateString()}</span>
                         </div>
                         <div className="text-xs font-bold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                           Open Studio
                         </div>
                      </div>
                    </div>
                 </div>
               </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="inline-flex p-6 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300 mb-6">
              <Music size={40} strokeWidth={1} />
            </div>
            <p className="text-slate-900 dark:text-white font-bold text-xl mb-2 font-serif">No compositions yet</p>
            <p className="text-slate-500 mb-8 font-light">Your masterpiece is waiting to be discovered.</p>
            <Link to="/compose" className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
              Start Creating
            </Link>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default Dashboard;