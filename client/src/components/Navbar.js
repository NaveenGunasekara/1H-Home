import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header>
      <nav style={{ 
        padding: '30px 60px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'fixed', 
        width: '100%', 
        top: 0, 
        zIndex: 100, 
        mixBlendMode: 'difference' 
      }}>
        <div style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '14px', letterSpacing: '5px', fontWeight: 700 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            EDIT<span style={{ color: '#ff3c3c' }}>.</span>CRAFT
          </Link>
        </div>
        <ul style={{ display: 'flex', gap: '40px', listStyle: 'none' }}>
          <li>
            <Link to="/projects" style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/process" style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              Process
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}