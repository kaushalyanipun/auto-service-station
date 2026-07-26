import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Package, 
  Receipt, 
  Calendar, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gate', label: 'Gate / ANPR Entry', icon: Car },
    { id: 'inventory', label: 'Inventory & Parts', icon: Package },
    { id: 'billing', label: 'Billing & Invoices', icon: Receipt },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-cyan-500/20">
          A
        </div>
        <div>
          <h1 className="font-bold text-slate-100 text-lg leading-tight">Auto Service</h1>
          <p className="text-xs text-slate-400">Staff Command Center</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info / Logout */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-200">
              AR
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Akash (Admin)</p>
              <p className="text-[10px] text-emerald-400">● On Duty</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-400 transition-colors p-1.5">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}