import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  const growCursor = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(6)';
      cursor.style.background = 'white';
      cursor.style.mixBlendMode = 'difference';
    }
  };

  const shrinkCursor = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = '#ff3c3c';
      cursor.style.mixBlendMode = 'normal';
    }
  };

  return (
    <header>
      <nav style={{ padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 100, background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        
        {/* Branding Logo */}
        <div 
          style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '14px', letterSpacing: '5px', fontWeight: 700 }}
          onMouseEnter={growCursor}
          onMouseLeave={shrinkCursor}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>EDIT<span style={{ color: '#ff3c3c' }}>.</span>CRAFT</Link>
        </div>

        {/* Public Navigation Directory links */}
        <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          <li><Link to="/projects" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Projects</Link></li>
          <li><Link to="/process" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Process</Link></li>
          <li><Link to="/contact" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Contact</Link></li>
        </ul>

        {/* Action Gateways */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => { shrinkCursor(); navigate('/admin/login'); }}
            onMouseEnter={growCursor}
            onMouseLeave={shrinkCursor}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, cursor: 'none' }}
          >
            Login
          </button>
          
          <button 
            onClick={() => { shrinkCursor(); navigate('/createaccount'); }}
            onMouseEnter={growCursor}
            onMouseLeave={shrinkCursor}
            style={{ background: '#ff3c3c', border: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, padding: '10px 20px', borderRadius: '4px', cursor: 'none', transition: 'background 0.2s' }}
            className="signup-nav-btn"
          >
            Sign Up
          </button>
        </div>

      </nav>
    </header>
  );
}