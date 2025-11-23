import React, { useState, useEffect } from 'react';
import { Wand2, Save, Play, Dice5, Music, Settings2, Sparkles, ChevronDown, History, Gauge } from 'lucide-react';
import { UserProfile, Instrument, Complexity, KeySignature, TimeSignature, Mood, CompositionSettings, Composition } from '../types';
import { INSTRUMENT_OPTIONS, COMPLEXITY_OPTIONS, KEY_OPTIONS, TIME_OPTIONS, MOOD_OPTIONS, PRESETS, DEFAULT_ABC } from '../constants';
import { generateMusic, generateIdea } from '../services/geminiService';
import { saveComposition } from '../services/storageService';
import SheetMusic from '../components/SheetMusic';

interface GeneratorProps {
  user: UserProfile;
}

const getTempoMarking = (bpm: number) => {
  if (bpm < 60) return 'Largo';
  if (bpm < 66) return 'Larghetto';
  if (bpm < 76) return 'Adagio';
  if (bpm < 108) return 'Andante';
  if (bpm < 120) return 'Moderato';
  if (bpm < 168) return 'Allegro';
  if (bpm < 200) return 'Presto';
  return 'Prestissimo';
};

const Generator: React.FC<GeneratorProps> = ({ user }) => {
  // Default state based on user preferences if available
  const [settings, setSettings] = useState<CompositionSettings>({
    prompt: "",
    instrument: user.primaryInstrument || Instrument.Piano,
    complexity: user.experienceLevel || Complexity.Intermediate,
    key: KeySignature.C_Major,
    timeSignature: TimeSignature.FourFour,
    tempo: 100,
    mood: Mood.Happy
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAbc, setCurrentAbc] = useState<string>(DEFAULT_ABC);
  const [currentTitle, setCurrentTitle] = useState("Untitled Composition");
  const [commentary, setCommentary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
       setError("Missing API Key. Please add your Google Gemini API Key to the environment.");
       return;
    }

    if (!settings.prompt && !settings.mood) {
      setError("Please describe your idea or select a mood.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCommentary(null);

    try {
      const result = await generateMusic(settings);
      setCurrentAbc(result.abc);
      setCurrentTitle(result.title);
      setCommentary(result.commentary);
    } catch (err) {
      console.error(err);
      setError("Failed to generate music. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    const newComp: Composition = {
      id: crypto.randomUUID(),
      userId: user.id,
      title: currentTitle,
      settings: settings,
      currentVersionId: crypto.randomUUID(),
      versions: [{
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        abcNotation: currentAbc,
        commentary: commentary || undefined
      }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isFavorite: false,
      tags: []
    };
    await saveComposition(newComp);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInspire = async () => {
    const idea = await generateIdea();
    setSettings(prev => ({ ...prev, prompt: idea }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-fade-in">
      
      {/* Left Panel: Studio Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative z-10">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
             <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">Studio Controls</h2>
             <p className="text-xs text-slate-500 mt-1">Configure your virtual ensemble.</p>
          </div>

          <div className="p-6 space-y-6">
             {/* Prompt */}
             <div>
               <div className="flex items-center justify-between mb-2">
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                 <button onClick={handleInspire} className="text-xs flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium">
                   <Dice5 size={12} /> Inspire Me
                 </button>
               </div>
               <textarea 
                 value={settings.prompt}
                 onChange={(e) => setSettings({...settings, prompt: e.target.value})}
                 className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm transition-all"
                 placeholder="e.g. A melancholy violin solo that builds into a rapid, hopeful crescendo..."
               />
             </div>

             {/* Main Selects */}
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Instrument</label>
                  <div className="relative">
                    <select 
                      value={settings.instrument}
                      onChange={e => setSettings({...settings, instrument: e.target.value as Instrument})}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:border-brand-500 appearance-none"
                    >
                      {INSTRUMENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={14} />
                  </div>
                </div>

                 <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Mood</label>
                  <div className="relative">
                    <select 
                      value={settings.mood}
                      onChange={e => setSettings({...settings, mood: e.target.value as Mood})}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:border-brand-500 appearance-none"
                    >
                      {MOOD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={14} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Key</label>
                  <div className="relative">
                    <select 
                      value={settings.key}
                      onChange={e => setSettings({...settings, key: e.target.value as KeySignature})}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:border-brand-500 appearance-none"
                    >
                      {KEY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={14} />
                  </div>
                </div>

                 <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Time Sig</label>
                  <div className="relative">
                    <select 
                      value={settings.timeSignature}
                      onChange={e => setSettings({...settings, timeSignature: e.target.value as TimeSignature})}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:border-brand-500 appearance-none"
                    >
                      {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={14} />
                  </div>
                </div>
             </div>

             {/* Complexity */}
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 block">Complexity</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {COMPLEXITY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSettings({...settings, complexity: opt as Complexity})}
                      className={`flex-1 text-[10px] py-2 rounded-lg font-medium transition-all ${settings.complexity === opt ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-700 dark:text-brand-400 scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {opt === 'Intermediate' ? 'Medium' : opt}
                    </button>
                  ))}
                </div>
             </div>

             {/* Advanced Tempo Slider */}
             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
               <div className="flex justify-between items-end mb-3">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                   <Gauge size={12} /> Tempo
                 </label>
                 <div className="text-right">
                   <div className="text-brand-600 dark:text-brand-400 font-bold text-xl leading-none font-serif tabular-nums">{settings.tempo}</div>
                   <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{getTempoMarking(settings.tempo)}</div>
                 </div>
               </div>
               
               <div className="relative flex items-center gap-3">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Largo</span>
                 <input 
                    type="range" 
                    min="40" 
                    max="220" 
                    value={settings.tempo} 
                    onChange={e => setSettings({...settings, tempo: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 hover:accent-brand-500 transition-all"
                 />
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Presto</span>
               </div>
             </div>

             {/* Action */}
             <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Composing...</span>
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  <span>Generate Sheet Music</span>
                </>
              )}
            </button>
             {error && <p className="text-red-500 text-xs text-center mt-2 bg-red-50 p-2 rounded">{error}</p>}
          </div>
        </div>
      </div>

      {/* Right Panel: Stage */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-900 dark:text-white truncate max-w-md">{currentTitle}</h1>
            <p className="text-xs text-slate-500">Generated by ArioMuse AI</p>
          </div>
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              showSuccess 
              ? 'bg-green-50 text-green-600 border border-green-200' 
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-500'
            }`}
          >
            <Save size={16} />
            <span>{showSuccess ? "Saved to Library" : "Save"}</span>
          </button>
        </div>

        {commentary && (
          <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex gap-4 shadow-sm">
            <div className="flex-shrink-0 pt-1">
              <Sparkles size={20} className="text-brand-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Composer's Note</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic font-serif">
                "{commentary}"
              </p>
            </div>
          </div>
        )}

        <SheetMusic abcNotation={currentAbc} title={currentTitle} isLoading={isGenerating} />
      </div>
    </div>
  );
};

export default Generator;