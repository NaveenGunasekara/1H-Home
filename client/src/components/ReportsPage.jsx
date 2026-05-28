import React, { useState, useEffect } from 'react';

export function ReportsPage() {
  const [dataReport, setDataReport] = useState([]);

  useEffect(() => {
    const generateInternalData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/inventory', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const raw = await res.json();
          setDataReport(raw);
        }
      } catch (err) {
        console.error(err);
      }
    };
    generateInternalData();
  }, []);

  return (
    <div data-aos="fade-in">
      <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '11px', color: '#ff3c3c', letterSpacing: '3px', marginBottom: '10px' }}>COMPLIANCE ARCHIVE ARCHITECT</p>
      <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '28px', letterSpacing: '2px', marginBottom: '40px', fontWeight: 700 }}>DATABASE BALANCING REPORT</h2>
      
      <div style={{ background: '#121212', border: '1px solid #222', padding: '40px', fontFamily: "'Courier New', Courier, monospace" }}>
        <div style={{ color: '#666', marginBottom: '20px', fontSize: '12px' }}>
          SYSTEM GENERATED DATASTREAM: SECURE REPORT GENERATED OK // 2026-05-28
        </div>
        <hr style={{ borderColor: '#222', marginBottom: '20px' }} />
        {dataReport.map((item, index) => (
          <div key={item._id} style={{ color: '#aaa', fontSize: '13px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span>LINE_{index.toString().padStart(3, '0')} :: {item.name.toUpperCase().padEnd(30, '.')}</span>
            <span style={{ color: '#fff' }}>QTY_{item.quantity.toString().padStart(4, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}