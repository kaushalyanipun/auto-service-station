import React, { useState } from 'react';
import { Receipt, Printer, CreditCard, DollarSign, Smartphone, Percent } from 'lucide-react';

export default function Billing() {
  const [subtotal, setSubtotal] = useState(12000);
  const [discount, setDiscount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  // Calculating total dynamically
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * taxPercent) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  const handlePrint = () => {
    window.print(); // Simple thermal direct print action
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Ready-to-Bill Cards */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <h3 className="font-bold text-slate-100 text-base">Ready For Checkout</h3>
          <p className="text-xs text-slate-400">Select work order to complete billing</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 to-cyan-950/20 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-cyan-400">WORK ORDER: #WO-2104</span>
            <h4 className="font-bold text-slate-100 text-xl mt-1">CAB-1234 (Toyota Vitz)</h4>
            <p className="text-xs text-slate-400">Customer: Kamal Perera</p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
              READY TO BILL
            </span>
            <p className="text-lg font-bold text-slate-100 mt-2">LKR 12,000</p>
          </div>
        </div>
      </div>

      {/* Checkout Section: Tax, Discount, Payment & Print */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="font-bold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <Receipt size={18} className="text-cyan-400" /> Checkout Calculator
        </h3>

        {/* Subtotal Display */}
        <div className="flex justify-between text-sm text-slate-300">
          <span>Subtotal:</span>
          <span className="font-semibold text-slate-100">LKR {subtotal.toLocaleString()}</span>
        </div>

        {/* Tax & Discount Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Discount (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="0"
              />
              <Percent size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">VAT / Tax (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={taxPercent} 
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="0"
              />
              <Percent size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-400">Grand Total:</span>
          <span className="text-xl font-extrabold text-cyan-400">LKR {grandTotal.toLocaleString()}</span>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="text-[11px] text-slate-400 block mb-2">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'CASH', label: 'Cash', icon: DollarSign },
              { id: 'CARD', label: 'Card', icon: CreditCard },
              { id: 'ONLINE', label: 'Online', icon: Smartphone },
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-all ${
                    isSelected 
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-semibold' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Print Invoice Button */}
        <button 
          onClick={handlePrint}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Printer size={18} /> Print Thermal Invoice
        </button>
      </div>
    </div>
  );
}