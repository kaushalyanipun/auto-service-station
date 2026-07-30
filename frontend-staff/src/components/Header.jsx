import React from 'react';
import { Bell, Search, TrendingUp, CheckCircle2, User } from 'lucide-react';

export default function Header({ title }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Title & Live Status */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live & Connected
        </span>
      </div>

      {/* Center: Shift Quick Stats */}
      <div className="hidden lg:flex items-center gap-4 bg-slate-950/60 border border-slate-800 px-4 py-1.5 rounded-xl">
        <div className="flex items-center gap-2 border-r border-slate-800 pr-4">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <div className="text-xs">
            <span className="text-slate-400">Completed Today: </span>
            <span className="font-bold text-slate-200">12 Jobs</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-cyan-400" />
          <div className="text-xs">
            <span className="text-slate-400">Shift Revenue: </span>
            <span className="font-bold text-cyan-400">LKR 145,000</span>
          </div>
        </div>
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative w-48 hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search plate..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Quick Notifications Bell */}
        <button className="relative p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
        </button>

        {/* User Profile & Role Badge */}
        <div className="flex items-center gap-2.5 border-l border-slate-800 pl-4">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
            KP
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-200 leading-tight">Kamal Perera</p>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20 font-mono">
              Technician / Lead
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}