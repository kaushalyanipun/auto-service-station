import React, { useState, useEffect } from 'react';
import { mockWorkOrders } from '../api/mocks/workOrders.mock';
import { Search, Plus, Trash2, Clock, CheckCircle2, AlertCircle, Wrench, User, Sparkles, Gauge, ShieldCheck } from 'lucide-react';
import garageBg from '../assets/garage-bg.jpg';

// 🎨 1. Status Badge Configuration (Color Map)
const STATUS_STYLES = {
  in_progress: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  awaiting_parts: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  ready_to_bill: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const CARD_CLASS = 'rounded-xl border border-slate-800 bg-slate-900/85 p-4 shadow-[0_8px_24px_rgba(2,6,23,0.2)] transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-[0_10px_28px_rgba(34,211,238,0.12)]';
const INPUT_CLASS = 'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-200 transition-all duration-150 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60';
const BUTTON_CLASS = 'flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-150 hover:from-cyan-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60';

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  const label = status.replace('_', ' ').toUpperCase();
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border ${style}`}>
      {label}
    </span>
  );
};

const LiveStatusPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form & Feedback States
  const [newItem, setNewItem] = useState({ name: '', price: '', qty: 1 });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [highlightedItemId, setHighlightedItemId] = useState(null);
  
  // Modal States for New Vehicle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicleForm, setNewVehicleForm] = useState({ plate: '', owner: '', status: 'in_progress' });
  const [isSubmittingVehicle, setIsSubmittingVehicle] = useState(false);

  const stats = {
    totalActive: orders.length,
    inProgress: orders.filter((order) => order.status === 'in_progress').length,
    readyToBill: orders.filter((order) => order.status === 'ready_to_bill').length,
  };

  // ⏱️ 2. Loading State Simulation (Micro-interaction)
  useEffect(() => {
    const fetchOrders = async () => {
      // Simulate API call delay
      setTimeout(() => {
        setOrders(mockWorkOrders);
        setSelectedOrder(mockWorkOrders[0]);
        setLoading(false);
      }, 800);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!highlightedItemId) return;
    const timer = window.setTimeout(() => setHighlightedItemId(null), 1200);
    return () => window.clearTimeout(timer);
  }, [highlightedItemId]);

  const filteredOrders = orders.filter(o => 
    o.vehicle.plate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.vehicle.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📝 3. Handle Add Item with Simulated Saving State
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    setIsSubmitting(true);

    // Simulate saving delay
    setTimeout(() => {
      const addedTotal = parseFloat(newItem.price) * parseInt(newItem.qty);
      const itemObj = {
        id: Date.now(),
        product_name: newItem.name,
        quantity: parseInt(newItem.qty),
        unit_price: parseFloat(newItem.price),
      };

      const updatedOrder = {
        ...selectedOrder,
        items: [...selectedOrder.items, itemObj],
        running_total: selectedOrder.running_total + addedTotal
      };

      setSelectedOrder(updatedOrder);
      setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
      setNewItem({ name: '', price: '', qty: 1 });
      setToast({ message: '✓ Added to order' });
      setHighlightedItemId(itemObj.id);
      setIsSubmitting(false);
    }, 400); // 400ms Fake Delay
  };

  const handleDeleteItem = (itemId) => {
    const itemToRemove = selectedOrder.items.find(i => i.id === itemId);
    if (!itemToRemove) return;

    const updatedOrder = {
      ...selectedOrder,
      items: selectedOrder.items.filter(i => i.id !== itemId),
      running_total: selectedOrder.running_total - (itemToRemove.unit_price * itemToRemove.quantity)
    };

    setSelectedOrder(updatedOrder);
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  // 🚗 Handle New Vehicle Submission
  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicleForm.plate || !newVehicleForm.owner) return;

    setIsSubmittingVehicle(true);

    // Simulate saving delay
    setTimeout(() => {
      const newVehicle = {
        id: Date.now(),
        vehicle: {
          plate_number: newVehicleForm.plate.toUpperCase(),
          owner_name: newVehicleForm.owner,
        },
        status: newVehicleForm.status,
        started_at: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        items: [],
        running_total: 0,
      };

      const updatedOrders = [newVehicle, ...orders];
      setOrders(updatedOrders);
      setSelectedOrder(newVehicle);
      setNewVehicleForm({ plate: '', owner: '', status: 'in_progress' });
      setIsModalOpen(false);
      setToast({ message: `✓ ${newVehicle.vehicle.plate_number} added to queue` });
      setIsSubmittingVehicle(false);
    }, 400);
  };

  // 🚧 Empty / Loading States
  if (loading) {
    return (
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(167,139,250,0.2),_transparent_30%),#020617] text-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent,rgba(255,255,255,0.04))]" />
        <div className="relative z-10 flex flex-col items-center gap-4 rounded-3xl border border-cyan-400/20 bg-slate-900/70 px-8 py-8 text-center shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-xl">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Wrench className="animate-spin" size={32} />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-100">Preparing your service workspace</p>
            <p className="mt-2 text-sm text-slate-400">Syncing live queue data and customer updates...</p>
          </div>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden text-slate-200 font-sans"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 14, 23, 0.92), rgba(10, 14, 23, 0.97)), url(${garageBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.88),rgba(2,6,23,0.82),rgba(2,6,23,0.93))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.12),_transparent_40%),radial-gradient(ellipse_at_bottom,_rgba(168,85,247,0.14),_transparent_45%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-8%] right-[-6%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="absolute left-6 top-24 rounded-full border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-transform duration-150 hover:scale-105">
        <Sparkles size={18} />
      </div>
      <div className="absolute right-8 top-28 rounded-full border border-violet-400/20 bg-violet-400/10 p-3 text-violet-200 shadow-[0_0_25px_rgba(167,139,250,0.15)] transition-transform duration-150 hover:scale-105">
        <Gauge size={18} />
      </div>
      <div className="absolute bottom-20 left-16 rounded-full border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-200 shadow-[0_0_25px_rgba(74,222,128,0.15)] transition-transform duration-150 hover:scale-105">
        <ShieldCheck size={18} />
      </div>

      <div className="relative flex min-h-screen flex-col overflow-hidden">
      {toast && (
        <div aria-live="polite" className="fixed right-4 top-4 z-50 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-lg backdrop-blur">
          {toast.message}
        </div>
      )}
      
      {/* 🚗 New Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.4)]">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
              title="Close modal"
            >
              <span className="text-xl">✕</span>
            </button>
            
            {/* Modal Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-100">Add New Vehicle</h2>
                <p className="text-xs text-slate-400">Register a vehicle to the queue</p>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleAddVehicle} className="space-y-4">
              {/* Plate Number */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-400">Plate Number</label>
                <input
                  type="text"
                  placeholder="e.g. CBA-9988"
                  value={newVehicleForm.plate}
                  onChange={(e) => setNewVehicleForm({ ...newVehicleForm, plate: e.target.value })}
                  required
                  maxLength="10"
                  className={INPUT_CLASS}
                />
              </div>
              
              {/* Owner Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-400">Owner Name</label>
                <input
                  type="text"
                  placeholder="e.g. Saman Kumara"
                  value={newVehicleForm.owner}
                  onChange={(e) => setNewVehicleForm({ ...newVehicleForm, owner: e.target.value })}
                  required
                  maxLength="50"
                  className={INPUT_CLASS}
                />
              </div>
              
              {/* Initial Status */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-400">Initial Status</label>
                <select
                  value={newVehicleForm.status}
                  onChange={(e) => setNewVehicleForm({ ...newVehicleForm, status: e.target.value })}
                  className={`${INPUT_CLASS} appearance-none cursor-pointer`}
                >
                  <option value="in_progress" className="bg-slate-900">IN PROGRESS</option>
                  <option value="awaiting_parts" className="bg-slate-900">AWAITING PARTS</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-150 hover:bg-slate-700 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingVehicle}
                  className={BUTTON_CLASS + ' flex-1 justify-center'}
                >
                  {isSubmittingVehicle ? (
                    <><Clock size={16} className="animate-spin" /> Adding...</>
                  ) : (
                    <>Add Vehicle</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 🟢 Header - Visual Hierarchy Added */}
      <header className="z-10 border-b border-slate-800/80 bg-slate-900/55 px-6 py-4 shadow-[0_8px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-2.5 text-cyan-400">
              <Wrench size={20} />
            </div>
            <div>
              <h1 className="m-0 text-xl font-semibold text-slate-50">Auto Service Station</h1>
              <p className="m-0 text-xs font-medium text-slate-400">Staff command center • live queue and billing workflow</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-200">Live & connected</span>
          </div>
        </div>
      </header>

      {/* 📱 4. Responsive Layout (flex-col on small screens, flex-row on large) */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* ⬅️ Left Panel: Active Queue */}
        <div className="w-full lg:w-[350px] border-r border-slate-800/70 bg-slate-900/80 flex flex-col backdrop-blur-xl">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between items-center">
              Active Queue <span className="flex items-center gap-2">{filteredOrders.length} Vehicles<button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 px-2 py-1.5 text-[11px] font-semibold hover:bg-cyan-500/20 transition-all duration-150" title="Add new vehicle"><Plus size={14} /> New</button></span>
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search Plate or Owner..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-9 pr-4 py-2.5 text-sm text-slate-200 transition-all duration-150 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''}`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredOrders.length === 0 ? (
              <div className="text-center p-6 text-slate-500 text-sm">
                <AlertCircle className="mx-auto mb-2 opacity-50" size={24} />
                No vehicles found.
              </div>
            ) : (
              filteredOrders.map((ord) => {
                const isSelected = selectedOrder?.id === ord.id;
                return (
                  <div 
                    key={ord.id} 
                    onClick={() => setSelectedOrder(ord)}
                    className={`rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
                      isSelected 
                        ? 'border-cyan-400/50 bg-slate-800 shadow-[0_0_20px_rgba(34,211,238,0.12)]' 
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-100 text-lg">{ord.vehicle.plate_number}</span>
                      <StatusBadge status={ord.status} />
                    </div>
                    <div className="flex items-center text-xs text-slate-400 gap-1">
                      <User size={12} /> {ord.vehicle.owner_name}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ➡️ Right Panel: Details (Breathing Room Added) */}
        <div className="flex-1 overflow-y-auto bg-slate-950/40 p-4 lg:p-8 backdrop-blur-sm">
          {selectedOrder ? (
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Vehicles in Queue', value: stats.totalActive, tone: 'from-cyan-500/20 to-sky-500/10 text-cyan-300' },
                  { label: 'In Progress', value: stats.inProgress, tone: 'from-amber-500/20 to-orange-500/10 text-amber-300' },
                  { label: 'Ready to Bill', value: stats.readyToBill, tone: 'from-emerald-500/20 to-lime-500/10 text-emerald-300' },
                ].map((card) => (
                  <div key={card.label} className={`rounded-xl border border-slate-800 bg-gradient-to-br ${card.tone} p-4 shadow-[0_8px_24px_rgba(2,6,23,0.2)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(34,211,238,0.12)]`}>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{card.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-100">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Order Header Card */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/85 p-4 shadow-[0_8px_24px_rgba(2,6,23,0.2)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(2,6,23,0.24)]">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-1">
                    Work Order: <span className="text-purple-400">{selectedOrder.vehicle.plate_number}</span>
                  </h2>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><User size={14}/> {selectedOrder.vehicle.owner_name}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> Started: {selectedOrder.started_at}</span>
                  </div>
                </div>
                <StatusBadge status={selectedOrder.status} />
              </div>

              {/* Items Table Card */}
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(2,6,23,0.24)]">
                <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h3 className="font-semibold text-slate-200 text-sm">Services & Parts Ledger</h3>
                </div>
                
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3 font-medium">Item Description</th>
                      <th className="px-6 py-3 font-medium text-center">Qty</th>
                      <th className="px-6 py-3 font-medium text-right">Unit Price</th>
                      <th className="px-6 py-3 font-medium text-right">Total</th>
                      <th className="px-6 py-3 font-medium text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {selectedOrder.items.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                          No items added yet. Use the form below to start.
                        </td>
                      </tr>
                    ) : (
                      selectedOrder.items.map((it) => (
                        <tr key={it.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-300">{it.product_name}</td>
                          <td className="px-6 py-4 text-center text-slate-400">{it.quantity}</td>
                          <td className="px-6 py-4 text-right text-slate-400">LKR {it.unit_price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right font-semibold text-slate-200">
                            LKR {(it.unit_price * it.quantity).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => handleDeleteItem(it.id)}
                              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Total Footer */}
                <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Running Total Estimated</span>
                  <span className="text-xl font-bold text-emerald-400 transition-all duration-300">
                    LKR {selectedOrder.running_total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 🛠️ 5. Enhanced Form (Proper Labels, Grid, and Button States) */}
              <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.24)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.14)]">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Plus size={16} /> Add Service / Spare Part
                </h3>
                
                <form onSubmit={handleAddItem}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Item Description</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Engine Oil 4L" 
                        value={newItem.name} 
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Unit Price (LKR)</label>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        value={newItem.price} 
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Quantity</label>
                      <input 
                        type="number" 
                        min="1"
                        value={newItem.qty} 
                        onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                        required
                        className={`${INPUT_CLASS} text-center`}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={BUTTON_CLASS}
                    >
                      {isSubmitting ? (
                        <><Clock size={16} className="animate-spin" /> Adding...</>
                      ) : (
                        'Add Item to Order'
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <User size={48} className="mb-4 opacity-20" />
              <p>Select a vehicle from the queue to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default LiveStatusPage;