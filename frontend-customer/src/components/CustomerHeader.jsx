import React from 'react';

const CustomerHeader = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'liveTracker', label: 'Live Vehicle Tracker', icon: '🚘' },
    { id: 'appointment', label: 'Book Appointment', icon: '📅' },
    { id: 'estimator', label: 'Service Estimator', icon: '🧮' },
    { id: 'history', label: 'Service History', icon: '📜' },
    { id: 'feedback', label: 'Customer Feedback', icon: '💬' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Logo Header */}
      <div className="sidebar-brand">
        <div className="brand-title">AUTO SERVICE</div>
        <div className="brand-subtitle">CUSTOMER PORTAL</div>
      </div>

      {/* Left Vertical Menu */}
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CustomerHeader;