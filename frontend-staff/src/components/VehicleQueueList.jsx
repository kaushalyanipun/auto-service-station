import React from 'react';

export default function VehicleQueueList({ vehicles = [], selectedVehicle, onSelectVehicle, onRemoveVehicle }) {
  return (
    <div className="space-y-2">
      {vehicles.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-sm">
          Active queue එකේ වාහන නොමැත.
        </div>
      ) : (
        vehicles.map((v) => {
          const isSelected = selectedVehicle && selectedVehicle.plate === v.plate;

          return (
            <div
              key={v.plate || v.id}
              onClick={() => onSelectVehicle(v)}
              className={`group relative p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected
                  ? 'border-cyan-500/50 bg-slate-800/80 shadow-lg shadow-cyan-500/5'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900'
              }`}
            >
              {/* Vehicle Details */}
              <div>
                <h4 className="font-bold text-slate-100">{v.plate}</h4>
                <p className="text-xs text-slate-400">{v.owner || v.ownerName}</p>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
                  {v.status || 'IN PROGRESS'}
                </span>

                {/* 🛑 DELETE / REMOVE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Card එක select වීම වැළැක්වීමට
                    if (window.confirm(`${v.plate} වාහනය Queue එකෙන් ඉවත් කිරීමට තහවුරු කරන්න?`)) {
                      onRemoveVehicle(v.plate || v.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Remove Vehicle"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}