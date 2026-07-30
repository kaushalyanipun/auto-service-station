import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [selectedService, setSelectedService] = useState('Full Service');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Time Slots
  const timeSlots = [
    '08:30 AM', '09:30 AM', '10:30 AM', 
    '01:30 PM', '02:30 PM', '04:00 PM'
  ];

  // Service Pricing Estimate Indicator
  const serviceEstimates = {
    'Full Service': 'LKR 25,000 - 35,000',
    'Oil Change & Filter': 'LKR 8,500 - 12,000',
    'Brake System Service': 'LKR 12,000 - 18,000',
    'Wheel Alignment & Balancing': 'LKR 4,500 - 6,000',
    'Engine Diagnostics': 'LKR 5,000 - 8,000',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000); // Success message timeout
  };

  return (
    <div className="animated-view" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#fff' }}>
          Service Appointment Booking 📅
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Select your vehicle, service type, and preferred time slot for express check-in.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        
        {/* Left Side: Interactive Booking Form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span> Book New Service Slot
          </h3>

          {isSubmitted && (
            <div style={{
              background: 'rgba(0, 230, 118, 0.15)',
              border: '1px solid var(--accent-green)',
              color: 'var(--accent-green)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              fontWeight: '600'
            }}>
              ✅ Appointment request submitted successfully! We will confirm shorty.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Vehicle Number Input */}
            <div className="form-group">
              <label className="form-label">Vehicle Registration Number</label>
              <input 
                type="text" 
                className="dark-input" 
                placeholder="e.g. WP CAD-5678 or CB-1234" 
                required 
              />
            </div>

            {/* Service Category */}
            <div className="form-group">
              <label className="form-label">Select Service Package</label>
              <select 
                className="dark-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="Full Service">Full Service Package</option>
                <option value="Oil Change & Filter">Oil Change & Filter Renewal</option>
                <option value="Brake System Service">Brake Pad / Rotor Service</option>
                <option value="Wheel Alignment & Balancing">Wheel Alignment & Balancing</option>
                <option value="Engine Diagnostics">Full Engine Computer Scan</option>
              </select>
              {/* Live Cost Estimate Preview */}
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', marginTop: '6px', fontWeight: '600' }}>
                💡 Estimated Cost Range: {serviceEstimates[selectedService]}
              </div>
            </div>

            {/* Preferred Date */}
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input type="date" className="dark-input" required />
            </div>

            {/* Time Slot Picker */}
            <div className="form-group">
              <label className="form-label">Select Available Time Slot</label>
              <div className="time-slots-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="form-group">
              <label className="form-label">Specific Issues / Special Requests (Optional)</label>
              <textarea 
                className="dark-input" 
                rows="3" 
                placeholder="Mention any unusual sounds, vibrations, or extra repair requests..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="glow-btn">
              CONFIRM APPOINTMENT BOOKING
            </button>
          </form>
        </div>

        {/* Right Side: Active & Past Bookings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Active Booking Box */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>📋 Scheduled Appointments</span>
              <span className="badge-green">1 Active</span>
            </h3>

            <div className="appointment-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--accent-cyan)' }}>
                  WP CAD-5678
                </span>
                <span className="status-pill" style={{ background: 'rgba(0, 230, 118, 0.15)', color: 'var(--accent-green)', borderColor: 'rgba(0, 230, 118, 0.3)' }}>
                  CONFIRMED
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: '#e2e8f0' }}>
                Full Service & Brake Inspection
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '600' }}>
                <span>📅 Tomorrow at 09:30 AM</span>
              </div>
            </div>
          </div>

          {/* Quick Help / Info Card */}
          <div className="glass-card" style={{ background: 'rgba(0, 210, 255, 0.03)', borderColor: 'rgba(0, 210, 255, 0.15)' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
              ℹ️ Need Immediate Assistance?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
              For emergency breakdowns or service rescheduling within 2 hours, please call our hotline directly at <strong>+94 11 234 5678</strong>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AppointmentBooking;