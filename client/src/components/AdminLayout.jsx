import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/admin/login');
  };

  // Inline styling formula tracking dynamic tab selections
  const dynamicTabState = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#666666',
    fontWeight: isActive ? '700' : '400',
    fontFamily: 'monospace',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'block',
    transition: 'color 0.15s ease'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
      
      {/* Structural Sidebar Content Element Wrapper */}
      <aside style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '13px', letterSpacing: '4px', fontWeight: 'bold', marginBottom: '60px', color: '#fff' }}>
            EDIT<span style={{ color: '#ff3c3c' }}>.</span>CONSOLE
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '25px' }}>
            <li>
              <NavLink to="/admin" end style={dynamicTabState}>[01] Overview</NavLink>
            </li>
            <li>
              <NavLink to="/admin/inventory" style={dynamicTabState}>[02] Inventory</NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports" style={dynamicTabState}>[03] Metrics</NavLink>
            </li>
            <li>
              <NavLink to="/admin/roles" style={dynamicTabState}>[04] Users CRUD</NavLink>
            </li>
          </ul>

          <div style={{ marginTop: '60px' }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: '#ff3c3c', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ← View Live Site
            </NavLink>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ background: 'transparent', border: '1px solid #ff3c3c', color: '#ff3c3c', padding: '12px', width: '100%', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          Disconnect
        </button>
      </aside>

      {/* Main Panel Viewport Shell */}
      <main style={{ flex: 1, padding: '40px', background: '#0e0e0e', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
}

// Fallback handling layer to secure export pipeline parameters
export default AdminLayout;