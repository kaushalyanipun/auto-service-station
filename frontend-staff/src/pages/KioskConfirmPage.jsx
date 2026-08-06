import React, { useState } from 'react';

const KioskConfirmPage = () => {
  const [vehicleData] = useState({
    vehicleNumber: 'CAB-1234',
    ownerName: 'John Doe',
    appointment: 'Today, 02:30 PM',
    serviceType: 'Full Service'
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmCheckIn = () => {
    setConfirmed(true);
  };

  const handleReScan = () => {
  alert("Manual Entry Mode / Camera Re-scanning Triggered!");
};

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#060913',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        background: '#0b1120',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '35px 30px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        {/* 🔵 TOP BADGE */}
        <div style={{
          border: '1px solid #1d3e6d',
          background: 'rgba(14, 30, 60, 0.6)',
          color: '#3672bc',
          padding: '6px 18px',
          borderRadius: '30px',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '1.5px',
          marginBottom: '18px',
          textTransform: 'uppercase'
        }}>
          <i>ANPR KIOSK TERMINAL</i>
        </div>

        {/* 📑 GLOWING NEON HEADING */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <span style={{
            color: '#00f0ff',
            fontSize: '1.3rem',
            fontWeight: '900',
            fontStyle: 'italic',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textShadow: '0 0 5px #0c3f43, 0 0 10px #0a5257, 0 0 20px rgba(0, 240, 255, 0.6), 0 0 35px rgba(0, 240, 255, 0.4)'
          }}>
            <i>VEHICLE ARRIVAL CONFIRMATION</i>
          </span>
        </div>

        {confirmed ? (
  /* ✅ SUCCESS SCREEN WITH POP & GLOW ANIMATION */
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0' }}>
    
    {/* CSS Animations */}
    <style>{`
      @keyframes checkPop {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes greenGlow {
        0% { box-shadow: 0 0 0px rgba(34, 197, 94, 0.4); }
        50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
        100% { box-shadow: 0 0 0px rgba(34, 197, 94, 0.4); }
      }
    `}</style>

    <div style={{
      width: '65px',
      height: '65px',
      background: 'rgba(22, 163, 74, 0.2)',
      border: '2px solid #22c55e',
      color: '#22c55e',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      animation: 'checkPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, greenGlow 2s infinite 0.5s',
      textShadow: '0 0 10px #22c55e'
    }}>✓</div>

    <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '8px', marginTop: 0 }}>
      Check-in Confirmed!
    </h3>

    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '0 0 5px 0' }}>
      Welcome, <strong>{vehicleData.ownerName}</strong>.
    </p>

    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 15px 0' }}>
      Please proceed to Bay 02. Our team is ready for your service.
    </p>

   <button 
  onClick={() => setConfirmed(false)}
  style={{
    background: 'linear-gradient(90deg, #00f0ff 0%, #3b82f6 100%)',
    color: '#000000',
    padding: '12px 28px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '15px',
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
    transition: 'all 0.3s ease'
  }}
>
  Reset Terminal
</button>
  </div>
) : (
          /* 📋 CONFIRMATION DETAILS & BUTTONS */
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <p style={{ color: '#8fa0be', fontSize: '0.85rem', marginBottom: '10px', marginTop: 0 }}>
              Detected License Plate
            </p>
            
            {/* 🟡 YELLOW LICENSE PLATE (EXTRA BOLD & BOLD FONT) */}
<div style={{
  background: '#d9b41f',
  color: '#000000',
  fontWeight: '700', 
  fontSize: '2.2rem', 
  padding: '8px 28px',
  borderRadius: '10px',
  border: '3px solid #000000',
  letterSpacing: '4px', 
  boxShadow: '0 0 20px rgba(250, 204, 21, 0.3)',
  marginBottom: '24px',
  fontFamily: "Impact, 'Arial Black', sans-serif", 
  WebkitTextStroke: '1px #000000' 
}}>
  {vehicleData.vehicleNumber}
</div>

           {/* 📦 DETAILS CARD WITH NEON GLOW BORDER */}
<div style={{
  background: '#0f172a',
  border: '1px solid #00f0ff', 
  boxShadow: '0 0 15px rgba(0, 240, 255, 0.35)', 
  width: '100%',
  padding: '10px 20px',
  marginBottom: '20px',
  boxSizing: 'border-box'
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
  }}>
    <span style={{ color: '#8fa0be', fontSize: '0.9rem' }}>Owner Name:</span>
    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{vehicleData.ownerName}</span>
  </div>

  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
  }}>
    <span style={{ color: '#8fa0be', fontSize: '0.9rem' }}>Appointment:</span>
    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{vehicleData.appointment}</span>
  </div>

  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0'
  }}>
    <span style={{ color: '#8fa0be', fontSize: '0.9rem' }}>Service Type:</span>
    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{vehicleData.serviceType}</span>
  </div>
</div>

            {/* 🔘 ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              
              {/* 🟠 RE-SCAN / EDIT */}
              <button 
                type="button" 
                onClick={handleReScan}
                style={{
                  flex: '1',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid #f59e0b',
                  color: '#fbbf24',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Re-Scan / Edit
              </button>

           {/* 🟢 CONFIRM & CHECK-IN (RESPONSIVE NO-WRAP STYLE) */}
<button 
  type="button" 
  onClick={handleConfirmCheckIn}
  style={{
    flex: '1.5',
    background: 'linear-gradient(90deg, #00f0ff 0%, #3b82f6 100%)',
    color: '#000000',
    padding: '12px 8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    whiteSpace: 'nowrap', 
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
    transition: 'all 0.3s ease'
  }}
>
  Confirm & Check-In
</button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default KioskConfirmPage;