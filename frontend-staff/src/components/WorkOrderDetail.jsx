import React, { useState } from 'react';

export default function WorkOrderDetail({ vehicle }) {
  // 📋 Service Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Engine Oil & Filter Change', completed: true, price: 8500 },
    { id: 2, text: 'Full Body Wash & Vacuum', completed: false, price: 2000 },
    { id: 3, text: 'Brake Fluid & Pad Inspection', completed: false, price: 1500 },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPrice, setNewTaskPrice] = useState('');

  // 🚗 Mileage & History State
  const [mileage, setMileage] = useState('78,450');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 🏗️ Bay & Notes State
  const [selectedBay, setSelectedBay] = useState('Bay 01 (Hoist)');
  const [mechanicNote, setMechanicNote] = useState('කරුණාකර පිටුපස Brake Pad ගෙවී ඇත්දැයි පරීක්ෂා කරන්න.');

  // ⛽ Fuel Level & Condition State
  const [fuelLevel, setFuelLevel] = useState('1/2');
  const [conditions, setConditions] = useState({
    frontScratch: false,
    rearDent: false,
    spareWheel: true,
    toolKit: true,
  });

  // Mock Service History Data
  const serviceHistory = [
    { date: '2026-03-15', mileage: '72,100 km', service: 'Full Service + Brake Fluid Change', amount: 'LKR 14,500' },
    { date: '2025-11-10', mileage: '65,300 km', service: 'Engine Oil Change + Wheel Alignment', amount: 'LKR 9,800' },
    { date: '2025-06-02', mileage: '58,000 km', service: 'AC Filter Replacement + Wash', amount: 'LKR 5,200' },
  ];

  // Checkbox Toggle
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Condition Checkbox Toggle
  const toggleCondition = (key) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Add Task Function
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText) return;

    const newItem = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      price: Number(newTaskPrice) || 0,
    };

    setTasks([...tasks, newItem]);
    setNewTaskText('');
    setNewTaskPrice('');
  };

  // Total Amount Calculation
  const totalAmount = tasks.reduce((sum, task) => sum + task.price, 0);
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // 📲 WhatsApp Message Send Handler
  const sendWhatsAppUpdate = (type) => {
    const plate = vehicle?.plate || 'CAB-1234';
    const phone = vehicle?.phone || '94771234567'; // Customer phone number
    let message = '';

    if (type === 'STARTED') {
      message = `Hello ${vehicle?.owner || 'Customer'}, your vehicle ${plate} service has started at our Auto Care Center! We will update you once it's completed.`;
    } else if (type === 'READY') {
      message = `Hello ${vehicle?.owner || 'Customer'}, your vehicle ${plate} service is fully completed and ready for pickup! Total Amount: LKR ${totalAmount.toLocaleString()}. Thank you!`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 relative">
      
      {/* 🚗 Vehicle Basic Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-cyan-400 tracking-wide">
              {vehicle?.plate || 'CAB-1234'}
            </h2>
            <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full uppercase">
              {vehicle?.status || 'IN PROGRESS'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Owner: <span className="text-slate-200 font-medium">{vehicle?.owner || 'Kamal Perera'}</span> • Toyota Vitz (2018) • Silver
          </p>
        </div>

        {/* Mechanic Assign Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Assigned To:</span>
          <select className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500">
            <option>Nimal Silva (Lead Mechanic)</option>
            <option>Sunil Shantha (Technician)</option>
            <option>Kamal Perera (Washer)</option>
          </select>
        </div>
      </div>

      {/* ⏱️ MILEAGE, BAY ASSIGNMENT & SERVICE HISTORY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl">
        
        {/* Current Mileage */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Mileage:</span>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="bg-transparent text-xs font-bold text-cyan-400 w-16 focus:outline-none text-right"
            />
            <span className="text-xs font-medium text-slate-500">km</span>
          </div>
        </div>

        {/* Service Bay Selector */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Service Bay:</span>
          <select
            value={selectedBay}
            onChange={(e) => setSelectedBay(e.target.value)}
            className="bg-transparent text-xs font-bold text-amber-400 focus:outline-none text-right cursor-pointer"
          >
            <option value="Bay 01 (Hoist)" className="bg-slate-900 text-slate-200">Bay 01 (Hoist)</option>
            <option value="Bay 02 (Hoist)" className="bg-slate-900 text-slate-200">Bay 02 (Hoist)</option>
            <option value="Washing Ramp 01" className="bg-slate-900 text-slate-200">Washing Ramp 01</option>
            <option value="Inspection Bay" className="bg-slate-900 text-slate-200">Inspection Bay</option>
          </select>
        </div>

        {/* History Button */}
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5"
        >
          📜 View History ({serviceHistory.length})
        </button>
      </div>

      {/* ⛽ FUEL LEVEL & VEHICLE INSPECTION */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            ⛽ Fuel Level:
          </span>

          <div className="flex gap-1.5">
            {['Reserve', '1/4', '1/2', '3/4', 'Full'].map((level) => (
              <button
                key={level}
                onClick={() => setFuelLevel(level)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                  fuelLevel === level
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-800/60">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={conditions.frontScratch}
              onChange={() => toggleCondition('frontScratch')}
              className="accent-cyan-500 rounded"
            />
            <span>Front Scratch/Dent</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={conditions.rearDent}
              onChange={() => toggleCondition('rearDent')}
              className="accent-cyan-500 rounded"
            />
            <span>Rear Scratch/Dent</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={conditions.spareWheel}
              onChange={() => toggleCondition('spareWheel')}
              className="accent-cyan-500 rounded"
            />
            <span>Spare Wheel Included</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={conditions.toolKit}
              onChange={() => toggleCondition('toolKit')}
              className="accent-cyan-500 rounded"
            />
            <span>Jack & Toolkit</span>
          </label>
        </div>
      </div>

      {/* 📋 JOB CHECKLIST SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>📋 Service Checklist & Tasks</span>
            <span className="text-xs text-cyan-400 font-normal">({completedCount}/{tasks.length} Done)</span>
          </h3>

          <span className="text-xs font-bold text-slate-400">{progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-cyan-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Task List */}
        <div className="space-y-2 pt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through'
                  : 'bg-slate-950/60 border-slate-800 text-slate-100 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                />
                <span className="text-sm font-medium">{task.text}</span>
              </div>

              {task.price > 0 && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  task.completed ? 'bg-emerald-900/30 text-emerald-400' : 'bg-slate-800 text-cyan-400'
                }`}>
                  LKR {task.price.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new service task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="number"
            placeholder="Price (LKR)"
            value={newTaskPrice}
            onChange={(e) => setNewTaskPrice(e.target.value)}
            className="w-28 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            + Add Task
          </button>
        </form>
      </div>

      {/* 📝 MECHANIC NOTES */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          💬 Special Instructions / Mechanic Notes
        </label>
        <textarea
          rows="2"
          value={mechanicNote}
          onChange={(e) => setMechanicNote(e.target.value)}
          placeholder="Enter special instructions or notes..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
        ></textarea>
      </div>

      {/* 📲 STEP 5: CUSTOMER WHATSAPP NOTIFICATIONS & QUICK ACTIONS */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          ⚡ Quick Actions & WhatsApp Alerts
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Service Control Buttons */}
          <button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-bold px-3.5 py-2 rounded-xl transition-all">
            [1. Start Service]
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all">
            [2. Request Parts]
          </button>

          {/* 📲 WhatsApp Quick Notification Buttons */}
          <button
            onClick={() => sendWhatsAppUpdate('STARTED')}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            📲 WhatsApp: Service Started
          </button>

          <button
            onClick={() => sendWhatsAppUpdate('READY')}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            📲 WhatsApp: Ready for Pickup (LKR {totalAmount.toLocaleString()})
          </button>
        </div>
      </div>

      {/* 📜 SERVICE HISTORY POPUP MODAL */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  Service History for <span className="text-cyan-400">{vehicle?.plate || 'CAB-1234'}</span>
                </h3>
                <p className="text-xs text-slate-400">{vehicle?.owner || 'Kamal Perera'}</p>
              </div>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {serviceHistory.map((item, index) => (
                <div key={index} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-400">{item.date}</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">{item.mileage}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">{item.service}</p>
                  <div className="text-right text-xs font-bold text-emerald-400">
                    Total: {item.amount}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-2 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}