import React, { useState } from 'react';
import './App.css';

// Component Imports
import CustomerHeader from './components/CustomerHeader.jsx';
import LiveTrackerView from './components/LiveTrackerView.jsx';
import AppointmentBooking from './components/AppointmentBooking.jsx';
import ServiceEstimatorView from './components/ServiceEstimatorView.jsx';
import ServiceHistoryView from './components/ServiceHistoryView.jsx';
import FeedbackView from './components/FeedbackView.jsx';
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('liveTracker');

  // Logout Trigger Function
  const handleLogout = () => {
    if (window.confirm("ඔබට Dashboard එකෙන් Logout වීමට අවශ්‍යද?")) {
      // මෙතැනට Login view එකට Switch වන Logic එක යෙදිය හැක
      console.log("User Logged Out");
      alert("Logged out successfully!");
    }
  };

  return (
    <div className="app-layout">
      {/* Glow Cursor Component */}
      <CustomCursor />

      {/* Left Sidebar Navigation with Logout prop */}
      <CustomerHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'liveTracker' && <LiveTrackerView />}
        {activeTab === 'appointment' && <AppointmentBooking />}
        {activeTab === 'estimator' && <ServiceEstimatorView />}
        {activeTab === 'history' && <ServiceHistoryView />}
        {activeTab === 'feedback' && <FeedbackView />}
      </main>
    </div>
  );
}

export default App;