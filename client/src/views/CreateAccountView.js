import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAccountView() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'admin' // Grants structural management permissions immediately
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account provisioned successfully! Transferring to access portal...');
        setTimeout(() => {
          shrinkCursor();
          navigate('/admin/login');
        }, 2500);
      } else {
        setErrorMessage(data.error || data.message || 'Registration request declined.');
      }
    } catch (err) {
      setErrorMessage('Communication error with secure authentication layer.');
    }
  };

  return (
    <div style={{ padding: '100px 60px', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid #222', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.7)' }} data-aos="fade-up">
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '10px', color: '#ff3c3c', letterSpacing: '3px', margin: '0 0 5px 0' }}>SECURE ACCESS</p>
          <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '20px', letterSpacing: '1px', margin: 0 }}>CREATE PROFILE</h2>
        </div>

        {errorMessage && <div style={{ background: 'rgba(255, 60, 60, 0.1)', border: '1px solid #ff3c3c', color: '#ff3c3c', padding: '12px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px', fontFamily: 'monospace' }}>{errorMessage}</div>}
        {successMessage && <div style={{ background: 'rgba(60, 255, 120, 0.1)', border: '1px solid #3cff78', color: '#3cff78', padding: '12px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px', fontFamily: 'monospace' }}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '14px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
          </div>
          
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '14px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
          </div>

          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Account Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '14px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
          </div>

          <button 
            type="submit"
            onMouseEnter={growCursor}
            onMouseLeave={shrinkCursor}
            style={{ background: '#fff', color: '#000', border: 'none', padding: '16px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px', marginTop: '10px', cursor: 'none', transition: 'background 0.2s' }}
            className="auth-submit-btn"
          >
            Register Corporate Node
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '25px', margin: '25px 0 0 0' }}>
          Already possess entry keys? <span onClick={() => navigate('/admin/login')} style={{ color: '#ff3c3c', cursor: 'pointer' }}>Log In</span>
        </p>

      </div>
    </div>
  );
}