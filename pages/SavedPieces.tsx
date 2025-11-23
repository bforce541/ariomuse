import React, { useState, useEffect } from 'react';
import { Trash2, Music, Calendar, Play, Loader2 } from 'lucide-react';
import { getCompositions, deleteComposition } from '../services/storageService';
import { Composition, UserProfile } from '../types';
import SheetMusic from '../components/SheetMusic';

interface SavedPiecesProps {
  user: UserProfile;
}

const SavedPieces: React.FC<SavedPiecesProps> = ({ user }) => {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComp, setSelectedComp] = useState<Composition | null>(null);

  useEffect(() => {
    loadCompositions();
  }, [user.id]);

  const loadCompositions = async () => {
    setLoading(true);
    try {
      const comps = await getCompositions(user.id);
      setCompositions(comps);
    } catch (error) {
      console.error("Failed to load compositions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this composition?")) {
      await deleteComposition(id);
      // Refresh the list
      const comps = await getCompositions(user.id);
      setCompositions(comps);
      if (selectedComp?.id === id) setSelectedComp(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">Your Library</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* List */}
        <div className="lg:col-span-4 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 space-y-3">
          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-slate-400" />
            </div>
          ) : compositions.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <p className="text-slate-500">No saved pieces yet.</p>
            </div>
          ) : (
            compositions.map((comp) => (
              <div 
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedComp?.id === comp.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold truncate ${selectedComp?.id === comp.id ? 'text-primary-700 dark:text-primary-300' : 'text-slate-900 dark:text-white'}`}>
                    {comp.title}
                  </h3>
                  <button 
                    onClick={(e) => handleDelete(comp.id, e)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                   <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{comp.settings.instrument}</span>
                   <span>•</span>
                   <span>{comp.settings.complexity}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} />
                  {new Date(comp.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-8">
          {selectedComp ? (
            <div className="space-y-6 animate-fadeIn">
               <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                   <div>
                      <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{selectedComp.title}</h2>
                      <p className="text-sm text-slate-500">Composed on {new Date(selectedComp.createdAt).toLocaleString()}</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="block text-xs text-slate-400 uppercase">Key</span>
                      <span className="font-medium">{selectedComp.settings.key}</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="block text-xs text-slate-400 uppercase">Time</span>
                      <span className="font-medium">{selectedComp.settings.timeSignature}</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="block text-xs text-slate-400 uppercase">Tempo</span>
                      <span className="font-medium">{selectedComp.settings.tempo} BPM</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="block text-xs text-slate-400 uppercase">Mood</span>
                      <span className="font-medium">{selectedComp.settings.mood}</span>
                    </div>
                 </div>

                 {selectedComp.versions[0]?.commentary && (
                    <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-brand-500 text-sm text-slate-600 dark:text-slate-300 italic">
                      "{selectedComp.versions[0].commentary}"
                    </div>
                 )}

                 <SheetMusic abcNotation={selectedComp.versions[0].abcNotation || ""} title={selectedComp.title} />
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <Music size={48} className="mb-4 opacity-20" />
              <p>Select a composition to view details and sheet music.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPieces;