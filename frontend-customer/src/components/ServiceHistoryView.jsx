import React from 'react';

const ServiceHistory = () => {
  const history = [
    { id: "INV-2026-001", date: "2026-03-15", vehicle: "WP CAD-5678", service: "Full Service + Oil Change", cost: "LKR 18,500" },
    { id: "INV-2025-089", date: "2025-11-02", vehicle: "WP CAD-5678", service: "Brake Pad Replacement", cost: "LKR 12,200" }
  ];

  return (
    <div className="dark-card">
      <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.25rem', marginTop: 0 }}>📜 Service History & Invoices</h2>
      
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#090f19', color: 'var(--text-muted)', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '0.85rem' }}>Invoice</th>
              <th style={{ padding: '0.85rem' }}>Date</th>
              <th style={{ padding: '0.85rem' }}>Vehicle</th>
              <th style={{ padding: '0.85rem' }}>Service</th>
              <th style={{ padding: '0.85rem' }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>{item.id}</td>
                <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{item.date}</td>
                <td style={{ padding: '0.85rem', fontWeight: '600' }}>{item.vehicle}</td>
                <td style={{ padding: '0.85rem' }}>{item.service}</td>
                <td style={{ padding: '0.85rem', color: 'var(--accent-green)', fontWeight: '700' }}>{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceHistory;