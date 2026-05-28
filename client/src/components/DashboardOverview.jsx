import React, { useState, useEffect } from 'react';

export function DashboardOverview() {
  const [metrics, setMetrics] = useState({ totalAssets: 0, alertAssets: 0, criticalStatus: 'NOMINAL' });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/inventory', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const lowStock = data.filter(item => item.quantity < 5).length;
          setMetrics({
            totalAssets: data.length,
            alertAssets: lowStock,
            criticalStatus: lowStock > 0 ? 'ATTENTION REQUIRED' : 'NOMINAL OPERATIONAL STATE'
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div data-aos="fade-in">
      <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '11px', color: '#ff3c3c', letterSpacing: '3px', marginBottom: '10px' }}>SYSTEM CONTROL INDEX</p>
      <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '28px', letterSpacing: '2px', marginBottom: '40px', fontWeight: 700 }}>CORE OPERATIONAL SUMMARY</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        <div style={{ background: '#121212', border: '1px solid #222', padding: '30px' }}>
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '11px', color: '#888' }}>SYS::TRACKED_ITEMS</span>
          <h3 style={{ fontSize: '48px', fontWeight: '300', marginTop: '15px', color: '#fff' }}>{metrics.totalAssets}</h3>
        </div>
        <div style={{ background: '#121212', border: '1px solid #222', padding: '30px' }}>
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '11px', color: '#ff3c3c' }}>SYS::LOW_STOCK_ALERTS</span>
          <h3 style={{ fontSize: '48px', fontWeight: '300', marginTop: '15px', color: metrics.alertAssets > 0 ? '#ff3c3c' : '#fff' }}>{metrics.alertAssets}</h3>
        </div>
        <div style={{ background: '#121212', border: '1px solid #222', padding: '30px' }}>
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '11px', color: '#888' }}>SYS::HEALTH_INDEX</span>
          <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '12px', letterSpacing: '1px', marginTop: '25px', color: metrics.alertAssets > 0 ? '#ff3c3c' : '#3ea6ff', fontWeight: '700' }}>{metrics.criticalStatus}</p>
        </div>
      </div>
    </div>
  );
}