import React, { useState } from 'react';
import './CustomerBookingPage.css';

// ⚡ Electric Vehicles Service Options
const evServices = [
  { value: "EV Diagnostics", label: "⚡ EV Battery & Health Checkup" },
  { value: "Full Service", label: "🧼 Full Wash & EV Inspection" },
  { value: "Wheel Alignment", label: "🛞 Wheel Alignment & Tires" },
  { value: "Brakes Check", label: "🛑 Brakes & Fluid Service" },
  { value: "General Checkup", label: "🛠️ General Repair / Checkup" }
];

// ⛽ Petrol & Diesel Vehicles Service Options
const fuelServices = [
  { value: "Full Service", label: "🧼 Full Service & Wash" },
  { value: "Oil Change", label: "🛢️ Oil & Filter Change" },
  { value: "Wheel Alignment", label: "🛞 Wheel Alignment & Tires" },
  { value: "General Checkup", label: "🛠️ General Repair / Checkup" }
];

// 🌐 Country Codes and Digits Configuration (Leading 0 Removed Format)
const COUNTRY_CODES = [
  { code: '+94', country: 'LK', label: 'LK (+94)', digits: 9, placeholder: '771234567' },
  { code: '+1', country: 'US', label: 'US (+1)', digits: 10, placeholder: '2015550123' },
  { code: '+44', country: 'UK', label: 'UK (+44)', digits: 10, placeholder: '7911123456' },
  { code: '+61', country: 'AU', label: 'AU (+61)', digits: 9, placeholder: '412345678' },
  { code: '+971', country: 'AE', label: 'UAE (+971)', digits: 9, placeholder: '501234567' },
  { code: '+91', country: 'IN', label: 'IN (+91)', digits: 10, placeholder: '9876543210' },
];

const CustomerBookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    vehicleNumber: '',
    vehicleModel: '',
    fuelType: '',
    serviceType: '',
    date: '',
    time: ''
  });

  
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [submitted, setSubmitted] = useState(false);

  
  const handleCountryChange = (e) => {
    const country = COUNTRY_CODES.find(c => c.code === e.target.value);
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, phone: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === 'phone') {
      let onlyNums = value.replace(/\D/g, ''); 

      
      if (onlyNums.startsWith('0')) {
        onlyNums = onlyNums.substring(1);
      }

      
      if (onlyNums.length > selectedCountry.digits) {
        onlyNums = onlyNums.slice(0, selectedCountry.digits);
      }

      setFormData(prev => ({ ...prev, phone: onlyNums }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (formData.phone.length !== selectedCountry.digits) {
      alert(`❌ Invalid Phone Number! For ${selectedCountry.label}, please enter exactly ${selectedCountry.digits} digits (without leading 0).`);
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      vehicleNumber: '',
      vehicleModel: '',
      fuelType: 'Petrol',
      serviceType: 'Full Service',
      date: '',
      time: ''
    });
    setSelectedCountry(COUNTRY_CODES[0]);
    setSubmitted(false);
  };

  // 🗓️ Past Date Block
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-page-container">
      <div className="booking-card">
        
        <h2 className="booking-title-clean">
          <span className="title-text">VEHICLE</span>

          <div className="car-track">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#00f2fe" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="moving-car"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>

          <span className="title-text">SERVICE BOOKING</span>
        </h2>
        <p className="page-subtitle"><font color="white"><i>Schedule your appointment with our service center easily.</i></font></p>

        {submitted ? (
          <div className="success-message">
            <h3 style={{ color: '#00ff87', marginBottom: '8px' }}>
              Appointment Submitted Successfully!
            </h3>

            <p style={{ fontSize: '1.05rem', color: '#e0e0e0', marginBottom: '20px' }}>
              Thank you for choosing our service, <strong>{formData.fullName}</strong>!
            </p>

            <div className="summary-box" style={{
              background: 'rgba(13, 22, 40, 0.6)',
              border: '1px solid #0c4144',
              borderRadius: '12px',
              padding: '20px',
              margin: '20px 0',
              boxShadow: '0 0 15px rgba(0, 242, 254, 0.15), inset 0 0 15px rgba(0, 242, 254, 0.05)',
              textAlign: 'left'
            }}>
              <p><span>Contact:</span> {selectedCountry.code} {formData.phone}</p>
              <p><span>Vehicle:</span> {formData.vehicleNumber} ({formData.vehicleModel})</p>
              <p><span>Fuel Type:</span> {formData.fuelType}</p>
              <p><span>Service:</span> {formData.serviceType}</p>
              <p><span>Scheduled:</span> {formData.date} at {formData.time}</p>
            </div>

            <button 
              type="button"
              className="btn-secondary" 
              onClick={handleReset}
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="form-group">
              <label><i>Full Name</i></label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-row">
              {/* 📞 PHONE NUMBER GROUP WITH COUNTRY CODE */}
              <div className="form-group">
                <label><i>Phone Number</i></label>
                <div className="phone-input-container">
                  
                  {/* Country Select */}
                  <select 
                    value={selectedCountry.code} 
                    onChange={handleCountryChange}
                    className="country-select"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder={selectedCountry.placeholder}
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    className="phone-number-input"
                  />
                </div>
                <small className="country-hint">
                  {selectedCountry.digits} digits required for {selectedCountry.code} (Enter without leading 0)
                </small>
              </div>

              {/* 🚗 VEHICLE NUMBER GROUP */}
              <div className="form-group">
                <label><i>Vehicle Number</i></label>
                <input 
                  type="text" 
                  name="vehicleNumber" 
                  placeholder="e.g. CAB-1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            {/* 🚗 Vehicle Model */}
            <div className="form-group">
              <label><i>Vehicle Model</i></label>
              <input 
                type="text" 
                name="vehicleModel" 
                placeholder="e.g. Toyota Axio, Honda Dio" 
                value={formData.vehicleModel}
                onChange={handleChange}
              />
            </div>

            {/* ⚡ POWER / FUEL TYPE BOX */}
            <div className="form-group">
              <label><i>Power / Fuel Type</i></label>
              
              <div className="fuel-type-box">
                <label className={`fuel-option ${formData.fuelType === 'Petrol' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="fuelType" 
                    value="Petrol" 
                    checked={formData.fuelType === 'Petrol'}
                    onChange={handleChange}
                  />
                  ⛽ Petrol / Hybrid
                </label>

                <label className={`fuel-option ${formData.fuelType === 'Electric' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="fuelType" 
                    value="Electric" 
                    checked={formData.fuelType === 'Electric'}
                    onChange={handleChange}
                  />
                  ⚡ Electric (EV)
                </label>

                <label className={`fuel-option ${formData.fuelType === 'Diesel' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="fuelType" 
                    value="Diesel" 
                    checked={formData.fuelType === 'Diesel'}
                    onChange={handleChange}
                  />
                  🛢️ Diesel
                </label>
              </div>
            </div>

            {/* 🛠️ DYNAMIC SERVICE TYPE DROPDOWN */}
            <div className="form-group">
              <label><i>Service Type</i></label>
              <select 
                name="serviceType" 
                value={formData.serviceType} 
                onChange={handleChange}
                required
              >
                <option value="">-- Select Service Type --</option>
                
                {/* Petrol/Diesel or Electric (EV) Options Auto change */}
                {(formData.fuelType === 'Electric' ? evServices : fuelServices).map((service, index) => (
                  <option key={index} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Row */}
            <div className="form-row">
              <div className="form-group">
                <label><i>Preferred Date</i></label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  required 
                  min={todayDate}
                />
              </div>

              <div className="form-group">
                <label><i>Preferred Time</i></label>
                <input 
                  type="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                color: '#040718',
                fontWeight: '700',
                letterSpacing: '1px',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
                border: 'none',
                borderRadius: '8px',
                padding: '14px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              BOOK APPOINTMENT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerBookingPage;