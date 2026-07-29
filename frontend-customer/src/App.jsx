import React, { useState } from 'react';
import './App.css';

// Component Imports
import CustomerHeader from './components/CustomerHeader.jsx';
import LiveTrackerView from './components/LiveTrackerView.jsx';
import AppointmentBooking from './components/AppointmentBooking.jsx';
import ServiceEstimatorView from './components/ServiceEstimatorView.jsx';
import ServiceHistoryView from './components/ServiceHistoryView.jsx';
import FeedbackView from './components/FeedbackView.jsx'; // 👈 Feedback Component එක Import කරගන්න
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('liveTracker');

  return (
    <div className="app-layout">
      {/* Left Sidebar Navigation */}
      <CustomerHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'liveTracker' && <LiveTrackerView />}
        {activeTab === 'appointment' && <AppointmentBooking />}
        {activeTab === 'estimator' && <ServiceEstimatorView />}
        {activeTab === 'history' && <ServiceHistoryView />}
        {activeTab === 'feedback' && <FeedbackView />} {/* 👈 Active Tab එක එකතු කරන්න */}
      </main>
    </div>
  );
}

export default App;