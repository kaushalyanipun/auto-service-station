import React, { useState } from 'react';

export default function BillingView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Sample Invoice Data
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2026-001',
      vehicle: 'CAB-1234',
      customer: 'Kamal Perera',
      date: '2026-03-29',
      amount: 12000,
      status: 'PAID',
      items: ['Engine Oil Change', 'Full Body Wash']
    },
    {
      id: 'INV-2026-002',
      vehicle: 'WP CAD-5678',
      customer: 'Nimal Jayasinghe',
      date: '2026-03-29',
      amount: 8500,
      status: 'PENDING',
      items: ['Brake Pad Replacement']
    },
    {
      id: 'INV-2026-003',
      vehicle: 'CBB-9012',
      customer: 'Saman Kumara',
      date: '2026-03-28',
      amount: 45000,
      status: 'PAID',
      items: ['Full Service', 'Wheel Alignment', 'Filter Replace']
    },
  ]);

  // Selected Invoice for Detailed View / Print Preview
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);

  // Toggle Payment Status
  const toggleStatus = (id) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        const newStatus = inv.status === 'PAID' ? 'PENDING' : 'PAID';
        const updated = { ...inv, status: newStatus };
        if (selectedInvoice?.id === id) setSelectedInvoice(updated);
        return updated;
      }
      return inv;
    }));
  };

  // Filtered Invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inv.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      
      {/* 📜 LEFT SIDE: INVOICE LIST & SEARCH */}
      <div className="lg:col-span-2 space-y-4">
        
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
          <input
            type="text"
            placeholder="Search invoice #, plate, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['ALL', 'PAID', 'PENDING'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === st
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Table / Cards List */}
        <div className="space-y-2.5">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => setSelectedInvoice(inv)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedInvoice?.id === inv.id
                  ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs text-cyan-400">{inv.id}</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-bold">
                    🚗 {inv.vehicle}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-200">{inv.customer}</p>
                <p className="text-[10px] text-slate-400">📅 {inv.date}</p>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs font-black text-slate-100">
                  LKR {inv.amount.toLocaleString()}
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(inv.id);
                    }}
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border transition-all ${
                      inv.status === 'PAID'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                    }`}
                  >
                    ● {inv.status}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredInvoices.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs font-bold border border-slate-800 rounded-2xl">
              No matching invoices found.
            </div>
          )}
        </div>
      </div>

      {/* 🧾 RIGHT SIDE: INVOICE PREVIEW / RECEIPT */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
        {selectedInvoice ? (
          <>
            <div className="space-y-6">
              {/* Receipt Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-100">INVOICE RECEIPT</h3>
                  <p className="text-[10px] text-cyan-400 font-bold">{selectedInvoice.id}</p>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                  selectedInvoice.status === 'PAID'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  ● {selectedInvoice.status}
                </span>
              </div>

              {/* Customer & Vehicle Info */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">CUSTOMER:</span>
                  <span className="font-bold text-slate-200">{selectedInvoice.customer}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">VEHICLE PLATE:</span>
                  <span className="font-bold text-cyan-400">{selectedInvoice.vehicle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">DATE:</span>
                  <span className="font-bold text-slate-300">{selectedInvoice.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">PAYMENT METHOD:</span>
                  <span className="font-bold text-slate-300">Cash / Card</span>
                </div>
              </div>

              {/* Billed Items List */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Services Billed:</h4>
                <div className="space-y-1.5">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/50">
                      <span className="text-slate-300 font-medium">• {item}</span>
                      <span className="text-slate-400 font-bold">Done</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">TOTAL AMOUNT:</span>
                <span className="text-lg font-black text-emerald-400">
                  LKR {selectedInvoice.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                onClick={() => window.print()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                🖨️ Print Invoice Receipt
              </button>
              <button
                onClick={() => toggleStatus(selectedInvoice.id)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-xs transition-all"
              >
                Mark as {selectedInvoice.status === 'PAID' ? 'PENDING' : 'PAID'}
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs font-bold">
            Select an invoice to view details
          </div>
        )}
      </div>

    </div>
  );
}