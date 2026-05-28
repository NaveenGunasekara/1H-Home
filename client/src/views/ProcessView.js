import React from 'react';

export function ProcessView() {
  return (
    <div style={{ padding: '60px', minHeight: '80vh' }}>
      <h2 style={{ letterSpacing: '3px', fontFamily: "'Syncopate', sans-serif", marginBottom: '40px' }}>
        OUR PROCESS
      </h2>
      <div style={{ display: 'grid', gap: '30px', maxWidth: '800px' }}>
        <div>
          <h3 style={{ color: '#ff3c3c' }}>01 / DISCOVERY</h3>
          <p style={{ color: '#888' }}>Understanding your brand core, vision, and market baseline goals.</p>
        </div>
        <div>
          <h3 style={{ color: '#ff3c3c' }}>02 / PRODUCTION</h3>
          <p style={{ color: '#888' }}>Executing premium assets, interface builds, and media pipelines.</p>
        </div>
        <div>
          <h3 style={{ color: '#ff3c3c' }}>03 / DEPLOYMENT</h3>
          <p style={{ color: '#888' }}>Launching secure system infrastructure and scaling performance metrics.</p>
        </div>
      </div>
    </div>
  );
}