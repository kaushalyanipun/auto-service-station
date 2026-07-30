import React, { useState } from 'react';
import CustomCursor from './CustomCursor';

const TRACKER_STEPS = [
  { id: 1, title: 'Vehicle Checked-In', desc: 'Vehicle received & preliminary check complete', icon: '📝' },
  { id: 2, title: 'Inspection & Diagnosis', desc: 'OBD system scan & mechanic inspection', icon: '🔍' },
  { id: 3, title: 'Service In Progress', desc: 'Oil filter renewal & wheel alignment active', icon: '⚙️' },
  { id: 4, title: 'Ready for Pickup', desc: 'Final testing completed & washed', icon: '✨' },
];

const CHECKLIST_ITEMS = [
  { 
    id: 1, 
    name: 'Engine Oil & Filter Change', 
    status: 'Completed', 
    cost: 'LKR 8,500', 
    hasPhoto: true, 
    photoUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop',
    photoNote: 'Old oil drained & fresh Mobil1 5W-30 filled.'
  },
  { id: 2, name: 'Full Body Wash & Vacuum', status: 'Completed', cost: 'LKR 2,000', hasPhoto: false },
  { id: 3, name: 'Wheel Alignment & Balancing', status: 'In Progress', cost: 'LKR 2,344', hasPhoto: false },
  { 
    id: 4, 
    name: 'Brake Pad & Fluid Inspection', 
    status: 'In Progress', 
    cost: 'LKR 1,500', 
    hasPhoto: true, 
    photoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop',
    photoNote: 'Front brake pads worn out (approx. 2mm left).'
  },
  { id: 5, name: 'Spark Plugs & Air Filter Check', status: 'Pending', cost: 'LKR 3,800', hasPhoto: false },
  { id: 6, name: 'OBD Computer Diagnostic Scan', status: 'Pending', cost: 'Free Inspection', hasPhoto: false },
];

const WHY_CHOOSE_US = [
  { icon: '💯', title: '100% Guaranteed', desc: 'Quality & satisfaction guaranteed' },
  { icon: '🛡️', title: '100% Safe & Risk-Free', desc: 'Complete Peace of Mind' },
  { icon: '🚀', title: 'Live Tracking', desc: 'Real-time transparent progress' },
  { icon: '💎', title: 'Genuine Parts', desc: 'Certified OEM replacement spares' },
];

const LiveTrackerView = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div style={{ width: '100%', padding: '0.8rem', boxSizing: 'border-box' }}>
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* 🌟 WHY CHOOSE US BANNER */}
      <div 
        style={{ 
          marginBottom: '0.8rem', 
          padding: '0.8rem 1rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(0, 210, 255, 0.3)',
          boxShadow: '0 0 15px rgba(0, 210, 255, 0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <h3 style={{ fontSize: '0.95rem', color: '#00d2ff', margin: 0, fontWeight: '800' }}>
            🌟 WHY CHOOSE OUR AUTO SERVICE CENTER?
          </h3>
          <span style={{ background: 'rgba(0, 230, 118, 0.2)', border: '1px solid #00e676', color: '#00e676', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>
            100% TRUSTED
          </span>
        </div>

        {/* Strictly 4 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
          {WHY_CHOOSE_US.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <span style={{ fontSize: '1.1rem', background: 'rgba(0, 210, 255, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                {item.icon}
              </span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ffffff' }}>{item.title}</div>
                <div style={{ fontSize: '0.68rem', color: '#cbd5e1', lineHeight: '1.2' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Summary Header */}
      <div style={{ 
        marginBottom: '0.8rem', 
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0, color: '#00d2ff' }}>
              WP CAD-5678
            </h2>
            <span style={{ background: 'rgba(0, 230, 118, 0.2)', color: '#00e676', border: '1px solid #00e676', padding: '2px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 'bold' }}>
              IN WORKSHOP
            </span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginTop: '3px' }}>
            Toyota Vitz (2018) • Silver • Assigned to: <b style={{ color: '#fff' }}>Nimal Silva (Lead Mechanic)</b>
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.68rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Estimated Bill</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#00e676' }}>LKR 18,144</div>
        </div>
      </div>

      {/* Repair Steps (4 in 1 Row) */}
      <div style={{ 
        marginBottom: '0.8rem', 
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.8rem', marginTop: 0 }}>
          ⚡ LIVE REPAIR PROGRESS
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
          {TRACKER_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  background: isActive 
                    ? 'rgba(0, 210, 255, 0.12)' 
                    : isCompleted 
                    ? 'rgba(0, 230, 118, 0.06)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isActive 
                    ? '2px solid #00d2ff' 
                    : isCompleted 
                    ? '1px solid #00e676' 
                    : '1px solid #1e293b',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{step.icon}</span>
                  <span style={{ 
                    fontSize: '0.68rem', 
                    fontWeight: '800', 
                    padding: '2px 6px', 
                    borderRadius: '6px',
                    color: isActive ? '#00d2ff' : isCompleted ? '#00e676' : '#64748b',
                    background: isActive ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                  }}>
                    {isCompleted ? '✓ Done' : isActive ? '● Active' : `Step ${step.id}`}
                  </span>
                </div>

                <div style={{ 
                  fontSize: '0.82rem', 
                  fontWeight: '700', 
                  color: isActive ? '#ffffff' : isCompleted ? '#e2e8f0' : '#94a3b8',
                  marginBottom: '2px' 
                }}>
                  {step.title}
                </div>

                <div style={{ fontSize: '0.68rem', color: '#cbd5e1', lineHeight: '1.2' }}>
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Checklist */}
      <div style={{ 
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.8rem', marginTop: 0 }}>
          📋 SERVICE CHECKLIST BREAKDOWN
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {CHECKLIST_ITEMS.map((item) => {
            let borderColor = '#475569';
            let statusColor = '#94a3b8';
            let icon = '⏱️';
            let bg = 'rgba(255, 255, 255, 0.02)';

            if (item.status === 'Completed') {
              borderColor = '#00e676';
              statusColor = '#00e676';
              icon = '✓';
              bg = 'rgba(0, 230, 118, 0.03)';
            } else if (item.status === 'In Progress') {
              borderColor = '#00d2ff';
              statusColor = '#00d2ff';
              icon = '⏳';
              bg = 'rgba(0, 210, 255, 0.05)';
            }

            return (
              <div 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 12px', 
                  background: bg, 
                  borderRadius: '8px', 
                  borderLeft: `3px solid ${borderColor}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: statusColor, fontWeight: 'bold', fontSize: '0.85rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: '500' }}>{item.name}</span>
                  
                  {item.hasPhoto && (
                    <button
                      onClick={() => setSelectedPhoto(item)}
                      style={{
                        background: 'rgba(0, 210, 255, 0.15)',
                        border: '1px solid #00d2ff',
                        color: '#00d2ff',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      📷 Photo Proof
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '0.78rem', color: statusColor, fontWeight: '600' }}>
                  {item.status} ({item.cost})
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            style={{ 
              maxWidth: '420px', 
              width: '90%', 
              padding: '1rem', 
              borderRadius: '12px',
              background: '#0f172a',
              border: '1px solid #00d2ff',
              boxShadow: '0 0 25px rgba(0, 210, 255, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <h4 style={{ color: '#00d2ff', margin: 0, fontSize: '0.95rem' }}>
                📷 Inspection Proof
              </h4>
              <button 
                onClick={() => setSelectedPhoto(null)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>
              {selectedPhoto.name}
            </div>

            <img 
              src={selectedPhoto.photoUrl} 
              alt="Inspection Proof" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #1e293b' }}
            />

            <div style={{ marginTop: '8px', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', borderLeft: '3px solid #00d2ff' }}>
              <span style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'block' }}>Mechanic Note:</span>
              <span style={{ fontSize: '0.78rem', color: '#fff' }}>{selectedPhoto.photoNote}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LiveTrackerView;