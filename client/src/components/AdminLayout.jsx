import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function AdminLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar Control Panel */}
      <div style={{ width: '260px', background: '#121212', borderRight: '1px solid #222', padding: '40px 30px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '12px', letterSpacing: '4px', fontWeight: 700, marginBottom: '50px' }}>
          EDIT<span style={{ color: '#ff3c3c' }}>.</span>CONSOLE
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
          <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', fontSize: '11px', fontFamily: "'Syncopate', sans-serif", letterSpacing: '2px' }}>
            [01] OVERVIEW
          </Link>
          <Link to="/admin/inventory" style={{ color: '#888', textDecoration: 'none', fontSize: '11px', fontFamily: "'Syncopate', sans-serif", letterSpacing: '2px', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>
            [02] INVENTORY
          </Link>
          <Link to="/admin/reports" style={{ color: '#888', textDecoration: 'none', fontSize: '11px', fontFamily: "'Syncopate', sans-serif", letterSpacing: '2px', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>
            [03] METRICS
          </Link>
          <Link to="/" style={{ color: '#ff3c3c', textDecoration: 'none', fontSize: '11px', fontFamily: "'Syncopate', sans-serif", letterSpacing: '2px', marginTop: '20px' }}>
            ← VIEW LIVE SITE
          </Link>
        </nav>
        
        <button onClick={handleLogout} style={{ padding: '12px', background: 'transparent', border: '1px solid #ff3c3c', color: '#ff3c3c', fontFamily: "'Syncopate', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' }}>
          DISCONNECT
        </button>
      </div>
      
      {/* Main Panel Display Viewport */}
      <div style={{ flexGrow: 1, padding: '60px', overflowY: 'auto', background: '#0a0a0a' }}>
        <Outlet />
      </div>
    </div>
  );
}