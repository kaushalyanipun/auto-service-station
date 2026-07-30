import React, { useState } from 'react';

export default function AppointmentsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-03-29');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial Sample Appointments Data
  const [appointments, setAppointments] = useState([
    {
      id: 'APT-101',
      customer: 'Saman Kumara',
      phone: '0771234567',
      vehicle: 'CAB-1234 (Toyota Vitz)',
      service: 'Full Synthetic Oil Change & Filter',
      date: '2026-03-29',
      time: '09:00 AM',
      status: 'CONFIRMED'
    },
    {
      id: 'APT-102',
      customer: 'Dilshan Silva',
      phone: '0719876543',
      vehicle: 'WP CAD-5678 (Honda Vezel)',
      service: 'Brake Pad Replacement & Inspection',
      date: '2026-03-29',
      time: '11:30 AM',
      status: 'PENDING'
    },
    {
      id: 'APT-103',
      customer: 'Kasun Fernando',
      phone: '0755551234',
      vehicle: 'CBB-9012 (Nissan Grace)',
      service: 'Wheel Alignment & Balancing',
      date: '2026-03-29',
      time: '02:00 PM',
      status: 'CONFIRMED'
    },
    {
      id: 'APT-104',
      customer: 'Nuwan Pradeep',
      phone: '0784443322',
      vehicle: 'CAE-4321 (Suzuki Alto)',
      service: 'AC Service & Gas Top-up',
      date: '2026-03-30',
      time: '10:00 AM',
      status: 'PENDING'
    }
  ]);

  // Form State for New Appointment
  const [newApt, setNewApt] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    service: 'Full Service',
    date: '2026-03-29',
    time: '09:00 AM',
    status: 'CONFIRMED'
  });

  // Handle Add Appointment
  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newApt.customer || !newApt.vehicle) return;

    const created = {
      ...newApt,
      id: `APT-${Math.floor(100 + Math.random() * 900)}`
    };

    setAppointments([created, ...appointments]);
    setIsModalOpen(false);
    setNewApt({ customer: '', phone: '', vehicle: '', service: 'Full Service', date: '2026-03-29', time: '09:00 AM', status: 'CONFIRMED' });
  };

  // Change Appointment Status
  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
    const matchesDate = !selectedDate || apt.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Quick Stats
  const totalToday = appointments.filter(a => a.date === '2026-03-29').length;
  const pendingCount = appointments.filter(a => a.status === 'PENDING').length;
  const confirmedCount = appointments.filter(a => a.status === 'CONFIRMED').length;

  return (
    <div className="space-y-6">
      
      {/* 📊 SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Total</p>
            <h3 className="text-xl font-black text-slate-100 mt-1">{totalToday} Booking(s)</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-lg font-bold">
            📅
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Confirmation</p>
            <h3 className="text-xl font-black text-amber-400 mt-1">{pendingCount} Requests</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-lg font-bold">
            ⏳
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirmed Slots</p>
            <h3 className="text-xl font-black text-emerald-400 mt-1">{confirmedCount} Scheduled</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-lg font-bold">
            ✅
          </div>
        </div>
      </div>

      {/* 🔍 FILTER & SEARCH BAR */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search customer, phone, plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />

          {/* Date Picker Filter */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Status Filter Tabs & Action Button */}
        <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 flex-shrink-0"
          >
            ➕ Book Slot
          </button>
        </div>
      </div>

      {/* 📅 APPOINTMENTS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl space-y-4 transition-all"
          >
            {/* Top Row: ID, Time, Status */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                  ⏰ {apt.time}
                </span>
                <span className="text-[10px] font-bold text-slate-400">({apt.date})</span>
              </div>

              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                  apt.status === 'CONFIRMED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : apt.status === 'PENDING'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : apt.status === 'COMPLETED'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}
              >
                ● {apt.status}
              </span>
            </div>

            {/* Middle Row: Customer & Vehicle Details */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{apt.customer}</h4>
                  <p className="text-xs text-slate-400">📞 {apt.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
                    🚗 {apt.vehicle}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Service Required:</p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">🛠️ {apt.service}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
              {apt.status === 'PENDING' && (
                <button
                  onClick={() => updateStatus(apt.id, 'CONFIRMED')}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                >
                  ✓ Confirm Slot
                </button>
              )}

              {apt.status === 'CONFIRMED' && (
                <button
                  onClick={() => updateStatus(apt.id, 'COMPLETED')}
                  className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                >
                  ☑ Mark Completed
                </button>
              )}

              {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                <button
                  onClick={() => updateStatus(apt.id, 'CANCELLED')}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                >
                  ✕ Cancel
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="md:col-span-2 p-12 text-center text-slate-500 text-xs font-bold border border-slate-800 rounded-2xl bg-slate-900/30">
            No appointments found for the selected filter/date.
          </div>
        )}
      </div>

      {/* ➕ BOOK APPOINTMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">📅 Book New Appointment</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-3.5 text-xs font-bold">
              <div>
                <label className="block text-slate-400 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Kalhara"
                  value={newApt.customer}
                  onChange={(e) => setNewApt({ ...newApt, customer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="077xxxxxxx"
                    value={newApt.phone}
                    onChange={(e) => setNewApt({ ...newApt, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Vehicle Plate / Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CAB-1234 (Vitz)"
                    value={newApt.vehicle}
                    onChange={(e) => setNewApt({ ...newApt, vehicle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Service Requested</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engine Tune-up & Full Service"
                  value={newApt.service}
                  onChange={(e) => setNewApt({ ...newApt, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newApt.date}
                    onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Time Slot</label>
                  <select
                    value={newApt.time}
                    onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>08:30 AM</option>
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:30 AM</option>
                    <option>01:30 PM</option>
                    <option>03:00 PM</option>
                    <option>04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}