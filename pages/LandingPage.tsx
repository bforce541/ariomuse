import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Sparkles, ArrowRight, CheckCircle2, PlayCircle, Star, Shield, Zap, Globe } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const LandingPage: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden font-sans selection:bg-brand-200 selection:text-brand-900">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 glass-nav"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Music size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">ArioMuse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-brand-600 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-brand-600 dark:hover:text-white transition-colors">Log in</Link>
            <Link to="/login" className="px-5 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={targetRef} className="relative pt-32 pb-32 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden mesh-gradient-hero dark:bg-slate-950">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob opacity-70 dark:bg-brand-900/20 dark:mix-blend-normal"></div>
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 opacity-70 dark:bg-indigo-900/20 dark:mix-blend-normal"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 opacity-70 dark:bg-slate-800/30 dark:mix-blend-normal"></div>

        <motion.div style={{ opacity, scale, y }} className="max-w-5xl mx-auto text-center z-10 relative">
          <FadeIn delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide mb-8 shadow-sm hover:bg-white/80 transition-colors cursor-default">
              <Sparkles size={12} className="text-brand-600" />
              <span>AI-POWERED COMPOSITION V2.5</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.1]">
              Compose your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 italic pr-2">masterpiece.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Turn natural language into professional sheet music. 
              ArioMuse creates valid, playable notation for any instrument in seconds.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/login" className="group px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-bold text-lg shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2">
                Start Composing Free <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <button className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-full font-semibold text-lg flex items-center gap-2 transition-all">
                <PlayCircle size={20} />
                View Gallery
              </button>
            </div>
          </FadeIn>
          
          {/* Floating Stats */}
          <FadeIn delay={0.6} className="mt-20 flex justify-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-2">
                <Globe size={20} /> <span className="font-semibold">100k+ Compositions</span>
             </div>
             <div className="flex items-center gap-2">
                <Zap size={20} /> <span className="font-semibold">Instant MIDI</span>
             </div>
             <div className="flex items-center gap-2">
                <Shield size={20} /> <span className="font-semibold">Copyright Free</span>
             </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* Interface Preview Section */}
      <section className="py-10 px-4 -mt-20 relative z-20">
        <FadeIn delay={0.2} direction="up">
           <div className="max-w-6xl mx-auto rounded-2xl border-[8px] border-slate-900/5 dark:border-white/5 shadow-2xl bg-slate-900 overflow-hidden transform hover:scale-[1.01] transition-transform duration-700 ease-out">
             <div className="relative aspect-[16/10] bg-slate-800">
                {/* Mock UI Header */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/80 backdrop-blur flex items-center px-4 border-b border-white/5 z-10">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                   </div>
                </div>
                {/* Content Image */}
                <img src="https://placehold.co/2400x1500/0f172a/e2e8f0?text=ArioMuse+Interface+Preview" alt="App Interface" className="w-full h-full object-cover opacity-90" />
                
                {/* Floating Overlay Card */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl max-w-xs text-white hidden md:block"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><CheckCircle2 size={16} /></div>
                    <div className="text-sm font-medium">Generation Complete</div>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-full bg-green-400"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-mono">Rendered in 1.2s</p>
                </motion.div>
             </div>
           </div>
        </FadeIn>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-24 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gradient">Everything you need to create</h2>
               <p className="text-slate-500 text-xl font-light">Powerful tools for beginners and professionals alike, wrapped in a beautiful interface.</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Natural Language", desc: "Describe the mood, instrument, and style. ArioMuse understands music theory constraints and writes the notes for you.", icon: Sparkles },
              { title: "Multi-Instrument", desc: "Compose for Piano, Violin, Guitar, Flute, and ensembles with accurate ranges, articulations, and dynamics.", icon: Music },
              { title: "Studio Export", desc: "Download your creations as MIDI for your DAW, PDF for printing, or MusicXML for editing in Finale/Sibelius.", icon: ArrowRight }
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="up">
                <div className="group bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 h-full relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100/50 dark:bg-brand-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                   
                   <div className="w-14 h-14 bg-white dark:bg-slate-800 text-brand-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm relative z-10 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                     <f.icon size={28} strokeWidth={1.5} />
                   </div>
                   
                   <h3 className="text-2xl font-bold mb-4 font-serif text-slate-900 dark:text-white relative z-10">{f.title}</h3>
                   <p className="text-slate-500 dark:text-slate-400 leading-relaxed relative z-10 font-light">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section id="how-it-works" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-900"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
             <FadeIn direction="right">
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                 From idea to <br/>
                 <span className="text-brand-400">composition</span> <br/>
                 in seconds.
               </h2>
               <div className="space-y-10">
                 {[
                   { step: "01", title: "Describe your vision", desc: "Tell ArioMuse you need a 'melancholy cello solo in D minor'." },
                   { step: "02", title: "AI Generation", desc: "Our model constructs the melody, harmony, and rhythm based on theory rules." },
                   { step: "03", title: "Refine & Export", desc: "Listen to the preview, tweak parameters, and download the MIDI/PDF." },
                 ].map((s, i) => (
                   <div key={i} className="flex gap-6 group">
                     <span className="text-2xl font-mono text-slate-700 group-hover:text-brand-400 transition-colors">{s.step}</span>
                     <div>
                       <h4 className="text-xl font-bold mb-2 group-hover:text-brand-100 transition-colors">{s.title}</h4>
                       <p className="text-slate-400 font-light leading-relaxed">{s.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </FadeIn>

             <FadeIn direction="left" delay={0.2}>
               <div className="relative">
                 <div className="absolute inset-0 bg-brand-500 blur-[80px] opacity-20"></div>
                 <div className="relative bg-slate-800/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                   <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-6">
                     <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center font-serif italic">A</div>
                     <div className="text-sm text-slate-300 italic">"I need an upbeat jazz piano intro, around 120bpm."</div>
                   </div>
                   
                   <div className="space-y-3">
                      <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                      <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                      <div className="h-32 mt-6 bg-slate-900/50 rounded-xl border border-white/5 flex items-center justify-center">
                         <div className="flex gap-1 items-end h-16">
                           {[40, 60, 30, 80, 50, 90, 40, 60].map((h, i) => (
                             <motion.div 
                               key={i}
                               initial={{ height: 10 }}
                               whileInView={{ height: h + '%' }}
                               transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 + (i * 0.1) }}
                               className="w-2 bg-brand-400 rounded-t-sm"
                             />
                           ))}
                         </div>
                      </div>
                   </div>
                 </div>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-20">Loved by Composers</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
               <FadeIn key={i} delay={i * 0.15} className="h-full">
                 <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-1 text-brand-500 mb-6">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 italic leading-relaxed flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 font-bold font-serif text-lg">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{t.role}</p>
                      </div>
                    </div>
                 </div>
               </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-700 rounded-[3rem] transform -rotate-1 opacity-90 blur-sm"></div>
          <FadeIn>
            <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-brand-500/30 rounded-full blur-[100px]"></div>
              
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white relative z-10">Ready to start <br/> your opus?</h2>
              <p className="text-slate-300 mb-12 text-lg md:text-xl max-w-2xl mx-auto relative z-10 font-light">Join thousands of musicians using AI to enhance their workflow. No credit card required for free tier.</p>
              
              <Link to="/login" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-brand-50 transition-all hover:scale-105 shadow-2xl group">
                Get Started Free <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-50 dark:bg-slate-950 text-slate-500 text-sm border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
              <div className="w-6 h-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md flex items-center justify-center">
                <Music size={12} />
              </div>
              <span className="font-serif font-bold text-lg">ArioMuse</span>
            </div>
            <p className="max-w-xs font-light leading-relaxed mb-6">Empowering musicians with artificial intelligence. Built for the future of creativity and music education.</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-brand-500 hover:text-white transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-brand-500 hover:text-white transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-brand-500 hover:text-white transition-colors cursor-pointer"></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Showcase</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Copyright</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
           <p>© 2025 ArioMuse Inc. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <span>Made with music in San Francisco</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;