import React, { useState } from 'react';

// 🛠️ Standard Fleet & Auto Service Default Parts Presets
const defaultInventoryParts = [
  { id: 101, sku: 'OIL-001', name: 'Engine Oils & Lubricants (5W-30 / 10W-40)', category: 'Oils & Fluids', stock: 15, minStock: 5, unitPrice: 12500 },
  { id: 102, sku: 'BRK-001', name: 'Brake Friction Components (Pads & Shoes)', category: 'Spare Parts', stock: 10, minStock: 4, unitPrice: 8500 },
  { id: 103, sku: 'ELC-001', name: 'Ignition & Electrical (Spark Plugs / Bulbs)', category: 'Spare Parts', stock: 25, minStock: 8, unitPrice: 1200 },
  { id: 104, sku: 'CHM-001', name: 'Maintenance Chemicals (WD-40 & Degreasers)', category: 'Oils & Fluids', stock: 12, minStock: 4, unitPrice: 1800 },
  { id: 105, sku: 'FST-001', name: 'Fasteners & Panel Mounting Hardware', category: 'Spare Parts', stock: 100, minStock: 20, unitPrice: 50 },
  { id: 106, sku: 'TPR-001', name: 'Pneumatic Tire Repair Specifications', category: 'Spare Parts', stock: 8, minStock: 3, unitPrice: 950 },
];

export default function InventoryView() {
  const [inventory, setInventory] = useState([
    ...defaultInventoryParts,
    { id: 2, sku: 'FLT-012', name: 'Toyota OEM Specification Oil Filter', category: 'Filters', stock: 3, minStock: 5, unitPrice: 2200 },
    { id: 4, sku: 'FLT-088', name: 'Universal High-Flow Air Filter Element', category: 'Filters', stock: 2, minStock: 5, unitPrice: 3100 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    sku: '', name: '', category: 'Oils & Fluids', stock: '', minStock: '', unitPrice: ''
  });

  const handleStockChange = (id, delta) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item));
  };

  const handleLoadDefaults = () => {
    const existingSkus = inventory.map(item => item.sku);
    const missingDefaults = defaultInventoryParts.filter(d => !existingSkus.includes(d.sku));
    setInventory([...inventory, ...missingDefaults]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.unitPrice) return;
    const itemToAdd = {
      id: Date.now(),
      sku: newItem.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newItem.name,
      category: newItem.category,
      stock: Number(newItem.stock) || 0,
      minStock: Number(newItem.minStock) || 5,
      unitPrice: Number(newItem.unitPrice) || 0,
    };
    setInventory([...inventory, itemToAdd]);
    setIsAddModalOpen(false);
    setNewItem({ sku: '', name: '', category: 'Oils & Fluids', stock: '', minStock: '', unitPrice: '' });
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalStockValue = inventory.reduce((sum, item) => sum + item.stock * item.unitPrice, 0);
  const lowStockCount = inventory.filter(item => item.stock <= item.minStock).length;

  return (
    <div className="space-y-6">
      {/* 📊 EXECUTIVE METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Total Inventory Items</p>
          <h3 className="text-2xl font-black text-cyan-400 mt-1">{inventory.length} <span className="text-xs text-slate-500 font-medium uppercase">SKUs Active</span></h3>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Total Stock Valuation</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">LKR {totalStockValue.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Critical Stock Alerts</p>
          <h3 className="text-2xl font-black text-rose-400 mt-1">{lowStockCount} <span className="text-xs text-slate-500 font-medium uppercase">Reorders Required</span></h3>
        </div>
      </div>

      {/* 🔍 FILTER & MANAGEMENT TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <input
            type="text"
            placeholder="🔍 Search by Item Specification or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500 min-w-[240px]"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            <option value="Oils & Fluids">Oils & Fluids</option>
            <option value="Filters">Filters & Filtration</option>
            <option value="Spare Parts">Spare Components</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadDefaults}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all"
            title="Populate Standard Garage Inventory Presets"
          >
            🔄 Load Standard Stock Presets
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/10"
          >
            + Register New Part
          </button>
        </div>
      </div>

      {/* 📦 INVENTORY DATA DATA TABLE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Item Details / SKU</th>
                <th className="p-4">Category Class</th>
                <th className="p-4 text-center">Current Qty</th>
                <th className="p-4 text-right">Unit Price (LKR)</th>
                <th className="p-4 text-center">Stock Status</th>
                <th className="p-4 text-center">Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInventory.map((item) => {
                const isLow = item.stock <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-all">
                    <td className="p-4">
                      <div className="font-bold text-slate-100">{item.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{item.sku}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-medium">{item.category}</span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-200">{item.stock} Units</td>
                    <td className="p-4 text-right font-semibold text-emerald-400">LKR {item.unitPrice.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      {isLow ? (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase">⚠️ Low Stock Level</span>
                      ) : (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase">Optimal Level</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => handleStockChange(item.id, -1)} className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg border border-slate-700 transition-all">-</button>
                        <button onClick={() => handleStockChange(item.id, 1)} className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-lg border border-slate-700 transition-all">+</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ➕ REGISTRATION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Register New Stock Item</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-100 text-lg font-bold">✕</button>
            </div>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Part Description / Title</label>
                <input type="text" required placeholder="e.g. Synthetic Gear Oil 75W-90" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">SKU Reference Code</label>
                  <input type="text" placeholder="OIL-005" value={newItem.sku} onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category Classification</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500">
                    <option value="Oils & Fluids">Oils & Fluids</option>
                    <option value="Filters">Filters</option>
                    <option value="Spare Parts">Spare Parts</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Initial Qty</label>
                  <input type="number" placeholder="10" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Min Threshold</label>
                  <input type="number" placeholder="5" value={newItem.minStock} onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Unit Price (LKR)</label>
                  <input type="number" placeholder="4500" value={newItem.unitPrice} onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-slate-800 text-slate-300 font-bold text-xs px-4 py-2 rounded-xl">Discard</button>
                <button type="submit" className="bg-cyan-500 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl hover:bg-cyan-400 transition-all">Confirm Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}