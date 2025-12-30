
import React, { useState, useMemo } from 'react';
import { TimeEntry } from './types';
import { calculateDuration } from './utils/timeHelpers';
import { PlusIcon, TrashIcon, ClockIcon, CalculatorIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: crypto.randomUUID(), startTime: '09:00', endTime: '17:00' }
  ]);

  const addEntry = () => {
    const lastEntry = entries[entries.length - 1];
    setEntries([
      ...entries,
      { 
        id: crypto.randomUUID(), 
        startTime: lastEntry?.endTime || '09:00', 
        endTime: lastEntry?.endTime || '10:00' 
      }
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof TimeEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const totals = useMemo(() => {
    const totalMinutes = entries.reduce((acc, curr) => {
      const result = calculateDuration(curr.startTime, curr.endTime);
      return acc + result.totalMinutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { totalMinutes, hours, minutes };
  }, [entries]);

  const resetSession = () => {
    setEntries([{ id: crypto.randomUUID(), startTime: '09:00', endTime: '17:00' }]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center text-slate-100 bg-[#0f172a]">
      <div className="w-full max-w-3xl bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
        
        {/* Header Section */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tighter mb-2 flex items-center gap-3 drop-shadow-md">
                <ClockIcon className="w-10 h-10 sm:w-12 sm:h-12" />
                CHRONOS
              </h1>
              <p className="text-indigo-100/80 font-medium text-lg tracking-wide uppercase text-xs">Time Logistics Intelligence</p>
            </div>
            <div className="hidden sm:block opacity-30">
              <CalculatorIcon className="w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-5">
            {entries.map((entry, index) => {
              const dur = calculateDuration(entry.startTime, entry.endTime);
              return (
                <div 
                  key={entry.id} 
                  className="group relative flex flex-wrap items-end gap-4 p-6 bg-slate-800/30 border border-slate-700/40 rounded-3xl hover:border-indigo-500/40 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Arrival</label>
                    <input 
                      type="time" 
                      value={entry.startTime}
                      onChange={(e) => updateEntry(entry.id, 'startTime', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/50 text-white font-semibold rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center text-slate-700 h-14 pb-2">
                    <div className="w-6 h-[1px] bg-slate-700"></div>
                  </div>

                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Departure</label>
                    <input 
                      type="time" 
                      value={entry.endTime}
                      onChange={(e) => updateEntry(entry.id, 'endTime', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/50 text-white font-semibold rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>

                  <div className="w-full sm:w-36 flex flex-col justify-end">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Elapsed</label>
                    <div className="h-[58px] flex items-center justify-center bg-indigo-500/10 text-indigo-300 font-black rounded-2xl border border-indigo-500/20 shadow-inner">
                      {dur.hours}h {dur.minutes}m
                    </div>
                  </div>

                  {entries.length > 1 && (
                    <button 
                      onClick={() => removeEntry(entry.id)}
                      className="absolute -right-3 -top-3 sm:static p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-lg"
                      title="Remove row"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={addEntry}
            className="w-full flex items-center justify-center gap-3 py-5 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-3xl text-slate-500 hover:text-indigo-400 font-bold transition-all group tracking-wider uppercase text-sm"
          >
            <PlusIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            Append New Duration
          </button>
        </div>

        {/* RESULTS DASHBOARD */}
        <div className="relative mt-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            
            <div className="bg-slate-950 p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    
                    {/* Main Counter Display */}
                    <div className="flex flex-col items-center lg:items-start group">
                        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Total Accumulated Time</h3>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative flex items-baseline gap-1 font-heading">
                                <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-indigo-400 leading-none">
                                    {totals.hours}
                                </span>
                                <span className="text-2xl sm:text-3xl font-bold text-indigo-500/60 mr-4">HRS</span>
                                <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-200 to-fuchsia-400 leading-none">
                                    {totals.minutes}
                                </span>
                                <span className="text-2xl sm:text-3xl font-bold text-fuchsia-500/60">MIN</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 w-full">
                            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex flex-col items-center lg:items-end">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Minutes</span>
                                <span className="text-2xl font-black text-slate-200">{totals.totalMinutes.toLocaleString()}</span>
                            </div>
                            <button 
                                onClick={resetSession}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-300 font-black rounded-2xl transition-all border border-slate-700 hover:border-rose-500/30 group"
                            >
                                <ArrowPathIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                RESET SESSION
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <footer className="mt-12 text-slate-600 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4">
        <span className="w-8 h-px bg-slate-800"></span>
        Chronos Engine v2.0
        <span className="w-8 h-px bg-slate-800"></span>
      </footer>
    </div>
  );
};

export default App;
