import React, { useState } from 'react';
import VehicleQueueList from '../components/VehicleQueueList';
import WorkOrderDetail from '../components/WorkOrderDetail';
import Billing from '../components/Billing';

export default function LiveStatusPage() {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'CAB-1234', owner: 'Kamal Perera', status: 'IN PROGRESS' },
    { id: 2, plate: 'WP-3456', owner: 'Nimal Silva', status: 'AWAITING PARTS' }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0] || null);
  
  // ➕ Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const [newOwner, setNewOwner] = useState('');

  // 🛑 Delete Function
  const handleRemoveVehicle = (identifier) => {
    setVehicles((prev) => prev.filter((v) => v.plate !== identifier && v.id !== identifier));
    if (selectedVehicle && (selectedVehicle.plate === identifier || selectedVehicle.id === identifier)) {
      setSelectedVehicle(null);
    }
  };

  // ➕ Add New Vehicle Function
  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newPlate || !newOwner) return alert("කරුණාකර විස්තර ලබාදෙන්න!");

    const newEntry = {
      id: Date.now(),
      plate: newPlate.toUpperCase(),
      owner: newOwner,
      status: 'IN QUEUE'
    };

    setVehicles((prev) => [...prev, newEntry]);
    setNewPlate('');
    setNewOwner('');
    setIsModalOpen(false); // Modal එක Close කිරීම
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      
      {/* Left Column - Active Queue List */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <span>Active Queue</span>
            <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-400">
              {vehicles.length} Vehicles
            </span>
          </h2>

          {/* ➕ Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-lg shadow-cyan-500/20"
          >
            + New
          </button>
        </div>
        
        <VehicleQueueList
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
          onRemoveVehicle={handleRemoveVehicle}
        />
      </div>

      {/* Middle & Right Column - Details / Billing */}
      <div className="lg:col-span-2 space-y-6">
        {selectedVehicle ? (
          <>
            <WorkOrderDetail vehicle={selectedVehicle} />
            <Billing vehicle={selectedVehicle} />
          </>
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            Queue එකෙන් වාහනයක් තෝරන්න.
          </div>
        )}
      </div>

      {/* 🚀 ADD VEHICLE POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Add New Vehicle to Queue</h3>
            
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Plate Number</label>
                <input
                  type="text"
                  placeholder="e.g. CAB-1234"
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.value ? e.value : e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Owner Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sunil Perera"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}