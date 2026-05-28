import React, { useState } from 'react';

export function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/crm/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Network connection failure.');
    }
  };

  return (
    <div style={{ padding: '60px', minHeight: '80vh', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ letterSpacing: '3px', fontFamily: "'Syncopate', sans-serif", marginBottom: '30px' }}>
        LET'S CONNECT
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '15px', background: '#111', border: '1px solid #333', color: '#fff' }} required />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '15px', background: '#111', border: '1px solid #333', color: '#fff' }} required />
        <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="5" style={{ padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', resize: 'none' }} required></textarea>
        <button type="submit" style={{ padding: '15px', background: '#ff3c3c', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>SEND INQUIRY</button>
      </form>
      {status && <p style={{ marginTop: '20px', color: '#ff3c3c', fontFamily: 'monospace' }}>{status}</p>}
    </div>
  );
}