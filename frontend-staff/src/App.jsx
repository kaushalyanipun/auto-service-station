import React, { useState } from 'react';
import WorkOrderDetail from './components/WorkOrderDetail';
import InventoryView from './components/InventoryView';
import BillingView from './components/BillingView';
import AppointmentsView from './components/AppointmentsView';
import CustomCursor from './components/CustomCursor';

// Professional SVG Icons imports from lucide-react
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  CalendarDays, 
  Car, 
  Trash2, 
  Plus, 
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation Active Tab State
  const [activeTab, setActiveTab] = useState('dashboard');

  // 🚗 Vehicles List State
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: 'CAB-1234',
      owner: 'Kamal Perera',
      phone: '94771234567',
      model: 'Toyota Vitz (2018)',
      color: 'Silver',
      status: 'IN PROGRESS',
    },
    {
      id: 2,
      plate: 'WP CAD-5678',
      owner: 'Nimal Jayasinghe',
      phone: '94719876543',
      model: 'Honda Vezel (2016)',
      color: 'Black',
      status: 'PENDING',
    }
  ]);

  // Selected Vehicle State
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  // Add Vehicle Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    owner: '',
    phone: '',
    model: '',
    color: '',
    status: 'IN PROGRESS'
  });

  // Handle Add New Vehicle
  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.plate || !newVehicle.owner) return;

    const createdVehicle = {
      ...newVehicle,
      id: Date.now()
    };

    setVehicles([...vehicles, createdVehicle]);
    setSelectedVehicle(createdVehicle);
    setNewVehicle({ plate: '', owner: '', phone: '', model: '', color: '', status: 'IN PROGRESS' });
    setIsAddModalOpen(false);
  };

  // Handle Delete Vehicle
  const handleDeleteVehicle = (e, idToDelete) => {
    e.stopPropagation(); // Prevent tab switching when clicking delete icon
    if (confirm('Are you sure you want to remove this vehicle entry?')) {
      const filtered = vehicles.filter(v => v.id !== idToDelete);
      setVehicles(filtered);
      if (selectedVehicle?.id === idToDelete) {
        setSelectedVehicle(filtered.length > 0 ? filtered[0] : null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      
      {/* ANIMATED CURSOR COMPONENT */}
      <CustomCursor />

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900/90 backdrop-blur-md border-r border-slate-800/80 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          
          {/* Logo & Header */}
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-cyan-500/20 tracking-tighter">
              A
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-slate-100 leading-tight">Auto Service</h1>
              <p className="text-[11px] font-medium text-slate-400">Staff Command Center</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={17} className={activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'} />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'inventory'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Package size={17} className={activeTab === 'inventory' ? 'text-cyan-400' : 'text-slate-400'} />
              Inventory & Parts
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'billing'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Receipt size={17} className={activeTab === 'billing' ? 'text-cyan-400' : 'text-slate-400'} />
              Billing & Invoices
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'appointments'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <CalendarDays size={17} className={activeTab === 'appointments' ? 'text-cyan-400' : 'text-slate-400'} />
              Appointments
            </button>
          </nav>
        </div>

        {/* User Info Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center font-bold text-xs text-cyan-400">
            AR
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-bold text-slate-200 truncate">Akash (Admin)</h4>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> On Duty
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN DISPLAY AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        
        {/* TOP HEADER BAR */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              {activeTab === 'dashboard' && 'Staff Dashboard'}
              {activeTab === 'inventory' && 'Inventory & Parts'}
              {activeTab === 'billing' && 'Billing & Invoices'}
              {activeTab === 'appointments' && 'Appointments'}
            </h2>
            <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              Completed Today: <span className="text-cyan-400 font-bold">12 Jobs</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              Shift Revenue: <span className="text-emerald-400 font-bold">LKR 145,000</span>
            </div>
          </div>
        </header>

        {/* CONTENT DYNAMIC SWITCHING */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* 1. DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* VEHICLE SELECTOR TOP BAR */}
              <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800/80">
                
                {/* Vehicles List Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Vehicles:</span>
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v)}
                      className={`group cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                        selectedVehicle?.id === v.id
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm'
                          : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Car size={14} className={selectedVehicle?.id === v.id ? 'text-cyan-400' : 'text-slate-400'} />
                      <span>{v.plate}</span>
                      <span className="text-[10px] opacity-60 font-normal">({v.owner})</span>
                      
                      {/* Integrated Delete Icon on Tab */}
                      <button
                        onClick={(e) => handleDeleteVehicle(e, v.id)}
                        title="Remove vehicle"
                        className="ml-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-0.5 rounded transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2 pl-3 border-l border-slate-800 flex-shrink-0">
                  {selectedVehicle && (
                    <button
                      onClick={(e) => handleDeleteVehicle(e, selectedVehicle.id)}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <Trash2 size={13} /> Delete Current
                    </button>
                  )}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/10"
                  >
                    <Plus size={14} /> Add Vehicle
                  </button>
                </div>
              </div>

              {/* WORK ORDER DETAIL / SELECTED VEHICLE VIEW */}
              {selectedVehicle ? (
                <WorkOrderDetail vehicle={selectedVehicle} />
              ) : (
                <div className="p-12 text-center border border-slate-800/80 rounded-2xl bg-slate-900/30 text-slate-400 space-y-2">
                  <div className="flex justify-center text-slate-500">
                    <Car size={32} />
                  </div>
                  <p className="text-sm font-semibold text-slate-300">No vehicles in queue.</p>
                  <p className="text-xs text-slate-500">Click "+ Add Vehicle" above to add a new service job.</p>
                </div>
              )}

            </div>
          )}

          {/* 2. INVENTORY & PARTS VIEW */}
          {activeTab === 'inventory' && <InventoryView />}

          {/* 3. BILLING & INVOICES VIEW */}
          {activeTab === 'billing' && <BillingView />}

          {/* 4. APPOINTMENTS VIEW */}
          {activeTab === 'appointments' && <AppointmentsView />}

        </main>

      </div>

      {/* ADD VEHICLE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Plus size={15} className="text-cyan-400" /> Add New Vehicle Job
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-xs font-semibold flex items-center gap-1"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">Vehicle Plate No (e.g. CAB-1234)</label>
                <input
                  type="text"
                  required
                  value={newVehicle.plate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                  placeholder="e.g. WP CAA-9988"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  value={newVehicle.owner}
                  onChange={(e) => setNewVehicle({ ...newVehicle, owner: e.target.value })}
                  placeholder="e.g. Kasun Kalhara"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newVehicle.phone}
                    onChange={(e) => setNewVehicle({ ...newVehicle, phone: e.target.value })}
                    placeholder="9477xxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    placeholder="e.g. Toyota Axio"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Add Vehicle Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}