import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedCursor from './components/AnimatedCursor';
import LiveStatusPage from './pages/LiveStatusPage';

function App() {
  return (
    <Router>
      <div>
        <AnimatedCursor />
        <Routes>
          {/* Main URL එකට ආවත් කෙලින්ම Live Status Page එකම පෙන්නන්න */}
          <Route path="/" element={<LiveStatusPage />} />

          {/* /live-status URL එකටත් පෙන්නන්න */}
          <Route path="/live-status" element={<LiveStatusPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;