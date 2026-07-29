import React from 'react';

const CustomerHeader = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'liveTracker', label: 'Live Vehicle Tracker', icon: '🚘' },
    { id: 'appointment', label: 'Book Appointment', icon: '📅' },
    { id: 'estimator', label: 'Service Estimator', icon: '🧮' },
    { id: 'history', label: 'Service History', icon: '📜' },
    { id: 'feedback', label: 'Customer Feedback', icon: '💬' },
  ];

  return (
    <aside 
      className="sidebar"
      style={{
        width: '260px',
        height: '100vh',
        backgroundColor: '#0f172a',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.2rem 1rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Section: Brand + Menu */}
      <div>
        {/* Brand Logo Header */}
        <div className="sidebar-brand" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div className="brand-title" style={{ color: '#00d2ff', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>
            AUTO SERVICE
          </div>
          <div className="brand-subtitle" style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '1.5px', marginTop: '2px' }}>
            CUSTOMER PORTAL
          </div>
        </div>

        {/* Left Vertical Menu */}
        <nav className="nav-menu" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #00d2ff' : '1px solid transparent',
                  background: isActive ? 'rgba(0, 210, 255, 0.12)' : 'transparent',
                  color: isActive ? '#00d2ff' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: User Profile & Logout Action */}
      <div 
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1rem',
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* User Avatar */}
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: '0.85rem',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)'
            }}
          >
            CU
          </div>
          
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff' }}>
              Customer
            </div>
            <div style={{ fontSize: '0.68rem', color: '#00e676', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e676', display: 'inline-block' }}></span>
              Active
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          title="Logout"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default CustomerHeader;