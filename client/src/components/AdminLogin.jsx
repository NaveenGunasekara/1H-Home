import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication rejected.');
      
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <form onSubmit={handleLogin} style={{ background: '#121212', border: '1px solid #222', padding: '40px', borderRadius: '2px', width: '360px', boxShadow: '0 10px 30px rgba(0,0,0,0.7)' }}>
        <div style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '12px', letterSpacing: '4px', fontWeight: 700, color: '#ff3c3c', marginBottom: '24px', textAlign: 'center' }}>
          EDIT.CRAFT // SYSTEM ACCESS
        </div>
        
        {error && <p style={{ color: '#ff3c3c', fontSize: '12px', marginBottom: '16px', background: 'rgba(255,60,60,0.1)', padding: '10px', borderLeft: '2px solid #ff3c3c' }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="SECURE EMAIL" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '14px', background: '#1c1c1c', border: '1px solid #333', color: '#fff', marginBottom: '16px', borderRadius: '0', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '1px' }} 
        />
        <input 
          type="password" 
          placeholder="ACCESS KEY" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          style={{ width: '100%', padding: '14px', background: '#1c1c1c', border: '1px solid #333', color: '#fff', marginBottom: '24px', borderRadius: '0', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '1px' }} 
        />
        
        <button type="submit" style={{ width: '100%', padding: '14px', background: '#ff3c3c', color: '#fff', border: 'none', fontFamily: "'Syncopate', sans-serif", fontSize: '11px', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' }}>
          INITIALIZE ENTRY
        </button>
      </form>
    </div>
  );
}