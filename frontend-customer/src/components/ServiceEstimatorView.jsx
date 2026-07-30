import React, { useState } from 'react';

const SERVICE_OPTIONS = [
  { id: 'oil', name: 'Full Synthetic Engine Oil Change (4L)', price: 12500, category: 'Maintenance' },
  { id: 'oilFilter', name: 'Genuine Oil Filter Replacement', price: 3200, category: 'Maintenance' },
  { id: 'airFilter', name: 'Engine Air Filter Renewal', price: 4500, category: 'Maintenance' },
  { id: 'acFilter', name: 'Cabin AC Dust Filter Renewal', price: 3800, category: 'Maintenance' },
  { id: 'sparkPlug', name: 'Iridium Spark Plugs Renewal (4 pcs)', price: 14500, category: 'Engine Tune Up' },
  { id: 'brakePad', name: 'Front Brake Pads Replacement', price: 9800, category: 'Brake System' },
];

const ServiceEstimatorView = () => {
  const [category, setCategory] = useState('Sedan');
  const [selectedServices, setSelectedServices] = useState(['oil', 'oilFilter']);

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const partsTotal = selectedServices.reduce((sum, id) => {
    const item = SERVICE_OPTIONS.find((s) => s.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const laborCharge = partsTotal > 0 ? Math.round(partsTotal * 0.18) : 0;
  const totalAmount = partsTotal + laborCharge;

  return (
    <div className="animated-view" style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.8rem' }}>
        
        {/* Left Side: Selectors */}
        <div className="glass-card">
          
          {/* 1. Category */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <label className="form-label" style={{ fontSize: '0.9rem', color: '#00d2ff', display: 'block', marginBottom: '8px' }}>
              1. Select Vehicle Category
            </label>
            <select
              className="dark-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ fontWeight: '600' }}
            >
              <option value="Sedan">Sedan / Saloon (e.g. Grace, Civic, Premio)</option>
              <option value="Hatchback">Hatchback / Small Car (e.g. Vitz, Alto, Axio)</option>
              <option value="SUV">SUV / Crossover (e.g. Vezel, CR-V, Montero)</option>
            </select>
          </div>

          {/* 2. Services List */}
          <div>
            <div style={{ fontSize: '0.9rem', color: '#00d2ff', fontWeight: '700', textAlign: 'center', marginBottom: '1rem' }}>
              2. Choose Required Services ({selectedServices.length} Selected)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto', paddingRight: '6px' }}>
              {SERVICE_OPTIONS.map((item) => {
                const isChecked = selectedServices.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleService(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: isChecked ? 'rgba(0, 210, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: isChecked ? '1px solid #00d2ff' : '1px solid #1e293b',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: '#00d2ff', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{item.name}</div>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: isChecked ? '#00d2ff' : '#94a3b8' }}>
                      LKR {item.price.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Summary Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📋 Estimate Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#94a3b8' }}>Spare Parts & Lubricants:</span>
                <span style={{ color: '#fff', fontWeight: '700' }}>LKR {partsTotal.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#94a3b8' }}>Estimated Labor Charge:</span>
                <span style={{ color: '#fff', fontWeight: '700' }}>LKR {laborCharge.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#94a3b8' }}>Applicable Taxes & Fees:</span>
                <span style={{ color: '#00e676', fontWeight: '700' }}>Included</span>
              </div>
            </div>

            {/* FIXED TOTAL ESTIMATED AMOUNT SECTION */}
            <div style={{ textAlign: 'center', margin: '1.8rem 0' }}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                TOTAL ESTIMATED AMOUNT
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#00d2ff' }}>LKR</span>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#00d2ff', lineHeight: '1' }}>
                  {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button className="glow-btn" style={{ textTransform: 'uppercase' }}>
            BOOK APPOINTMENT WITH ESTIMATE 📅
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceEstimatorView;