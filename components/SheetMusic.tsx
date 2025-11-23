import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Download, Music, Loader2 } from 'lucide-react';

interface SheetMusicProps {
  abcNotation: string;
  title: string;
  isLoading?: boolean;
}

const SheetMusic: React.FC<SheetMusicProps> = ({ abcNotation, title, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !window.ABCJS || isLoading) return;

    // Render with customized visual params
    const visualObj = window.ABCJS.renderAbc(containerRef.current, abcNotation, {
      responsive: "resize",
      scale: 1.2,
      add_classes: true,
      paddingtop: 30,
      paddingbottom: 30,
      paddingright: 30,
      paddingleft: 30,
      staffwidth: 800, // Max width constraint
    });

    // Setup Audio
    if (window.ABCJS.synth.supportsAudio()) {
      const synthInstance = new window.ABCJS.synth.CreateSynth();
      
      synthInstance.init({
        visualObj: visualObj[0],
        audioContext: new (window.AudioContext || (window as any).webkitAudioContext)(),
        millisecondsPerMeasure: visualObj[0].millisecondsPerMeasure()
      }).then(() => {
        return synthInstance.prime();
      }).then(() => {
        setSynth(synthInstance);
        setIsReady(true);
      }).catch((error: any) => {
        console.warn("Audio synth error:", error);
      });
    }
    
    // Cleanup
    return () => {
      if (synth) synth.stop();
    };
  }, [abcNotation, isLoading]);

  const togglePlayback = () => {
    if (!synth) return;
    if (isPlaying) {
      synth.stop();
      setIsPlaying(false);
    } else {
      synth.start();
      setIsPlaying(true);
    }
  };

  const downloadFile = (type: 'midi' | 'xml') => {
    if (!window.ABCJS) return;
    
    // For MIDI
    if (type === 'midi') {
      const midi = window.ABCJS.synth.getMidiFile(abcNotation, { midiOutputType: "encoded" });
      const link = document.createElement('a');
      link.href = midi;
      link.download = `${title.replace(/\s+/g, '_')}.midi`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    // For XML (mock implementation as abcjs doesn't export XML directly in basic version)
    // In a real app, we'd use a converter utility here.
    else {
      const blob = new Blob([abcNotation], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.txt`; // Saving as ABC txt for now
      document.body.appendChild(link);
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-brand-600 animate-spin relative z-10" />
        </div>
        <p className="text-slate-500 font-serif mt-6 text-lg animate-pulse">Composing masterpiece...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={togglePlayback}
            disabled={!isReady}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isPlaying 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            {isPlaying ? 'Stop' : 'Play Preview'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-slate-200 dark:bg-slate-800 h-6 w-px mx-2"></div>
          <button 
            onClick={() => downloadFile('midi')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Download MIDI"
          >
            <Download size={14} />
            MIDI
          </button>
          <button 
            onClick={() => downloadFile('xml')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Download ABC/XML"
          >
            <Music size={14} />
            ABC
          </button>
        </div>
      </div>

      {/* Score Rendering Area */}
      <div className="p-8 overflow-x-auto flex justify-center bg-white dark:bg-slate-950 min-h-[400px]">
        <div ref={containerRef} className="w-full max-w-4xl text-slate-900 dark:text-slate-100 paper-texture" />
      </div>
    </div>
  );
};

export default SheetMusic;