import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, signUp } from '../services/storageService';
import { UserProfile } from '../types';
import { Music, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  setUser: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        setError(error);
      } else if (user) {
        setUser(user);
        navigate('/');
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      {/* Left Panel - Brand */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-900 p-16 text-white relative overflow-hidden">
         {/* Gradients */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] -mr-20 -mt-20 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[100px] -ml-20 -mb-20"></div>
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/sheet-music.png')] mix-blend-overlay"></div>
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="relative z-10"
         >
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center">
               <Music size={20} />
             </div>
             <span className="text-2xl font-serif font-bold tracking-tight">ArioMuse</span>
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="relative z-10 max-w-lg"
         >
           <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">Compose without <br/>limits.</h1>
           <p className="text-slate-300 text-lg font-light leading-relaxed">
             "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything."
           </p>
         </motion.div>

         <div className="relative z-10 text-sm text-slate-500">
           © 2025 ArioMuse Inc.
         </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="mb-10">
             <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">{isLogin ? 'Welcome back' : 'Create account'}</h2>
             <p className="text-slate-500">
               {isLogin ? 'Enter your credentials to access your studio.' : 'Start composing your first masterpiece.'}
             </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-lg transform active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
             <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors"
             >
               {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
             </button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center bg-slate-50 -mx-10 -mb-10 p-4 rounded-b-3xl">
            Demo Access: <strong>admin@ariomuse.com / 12345678</strong>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;