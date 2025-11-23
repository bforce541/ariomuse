import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Music } from 'lucide-react';
import { UserProfile, Instrument, Complexity } from '../types';
import { updateUserProfile } from '../services/storageService';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface OnboardingProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ user, setUser }) => {
  const [step, setStep] = useState(1);
  const [primaryInstrument, setPrimaryInstrument] = useState<Instrument>(Instrument.Piano);
  const [level, setLevel] = useState<Complexity>(Complexity.Intermediate);
  const [goals, setGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleFinish = async () => {
    // Save to DB
    const updated = await updateUserProfile(user.id, {
      primaryInstrument,
      experienceLevel: level,
      goals,
      onboardingCompleted: true
    });
    
    setUser(updated);
    navigate('/');
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
             <div 
               key={s} 
               className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-brand-600' : 'bg-slate-100'}`}
             />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">What is your main instrument?</h1>
              <p className="text-slate-500 mb-8">We'll customize your default settings for this instrument.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.values(Instrument).slice(0, 8).map((inst) => (
                  <motion.button
                    key={inst}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPrimaryInstrument(inst as Instrument)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      primaryInstrument === inst 
                        ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-medium block">{inst}</span>
                  </motion.button>
                ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)} 
                className="w-full py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Continue <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">What is your experience level?</h1>
              <p className="text-slate-500 mb-8">This helps AI determine the complexity of generated scores.</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { val: Complexity.Beginner, desc: "I'm just starting out. Simple rhythms and keys." },
                  { val: Complexity.Intermediate, desc: "I can play most standard songs." },
                  { val: Complexity.Advanced, desc: "I perform professionally or study theory." },
                  { val: Complexity.Virtuoso, desc: "Challenge me with complex compositions." },
                ].map((opt) => (
                  <motion.button
                    key={opt.val}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setLevel(opt.val as Complexity)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${
                      level === opt.val
                        ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-600 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${level === opt.val ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'}`}>
                      {level === opt.val && <Check size={12} />}
                    </div>
                    <div>
                      <span className="font-bold block text-lg">{opt.val}</span>
                      <span className="text-slate-500 text-sm">{opt.desc}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex gap-4">
                 <button onClick={() => setStep(1)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-colors">
                  Back
                 </button>
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setStep(3)} 
                   className="flex-[2] py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                 >
                  Continue <ArrowRight size={18} />
                 </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">What are your goals?</h1>
              <p className="text-slate-500 mb-8">Select all that apply.</p>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  "Overcome writer's block",
                  "Create background music for videos",
                  "Practice sight-reading",
                  "Learn music theory",
                  "Prototype songs for a band"
                ].map((goal) => (
                   <motion.button
                    key={goal}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleGoal(goal)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      goals.includes(goal)
                        ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-medium">{goal}</span>
                    {goals.includes(goal) && <Check size={18} className="text-brand-600" />}
                  </motion.button>
                ))}
              </div>
              
               <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFinish} 
                className="w-full py-4 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 transition-colors shadow-xl shadow-brand-500/20"
              >
                  Complete Setup
               </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;