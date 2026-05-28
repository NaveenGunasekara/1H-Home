import React, { useState, useEffect } from 'react';

export function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Client' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'Client' });

  // Pull database data contexts immediately upon component initialization mount
  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/auth/all-users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok) {
        setUsers(data);
      } else {
        setStatusMsg(`Clearance Error: ${data.message || 'Access Forbidden'}`);
      }
      setLoading(false);
    } catch (err) {
      setStatusMsg('Error querying authentication node array mapping.');
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/auth/admin-create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg('Success: Node registered into infrastructure.');
        setNewUser({ name: '', email: '', password: '', role: 'Client' });
        fetchUsersList(); // Instantly refresh data grid framework layout metrics
      } else {
        setStatusMsg(`Failed: ${data.message}`);
      }
    } catch (err) {
      setStatusMsg('Network infrastructure transaction error.');
    }
  };

  const startEditing = (user) => {
    setEditingId(user._id);
    setEditFormData({ name: user.name, email: user.email, role: user.role });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleUpdateUser = async (userId) => {
    setStatusMsg('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/auth/update-user-panel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, ...editFormData })
      });
      if (res.ok) {
        setStatusMsg('Success: Profile node modified.');
        setEditingId(null);
        fetchUsersList();
      } else {
        const data = await res.json();
        setStatusMsg(`Update Error: ${data.message}`);
      }
    } catch (err) {
      setStatusMsg('Transmission failure during update execution.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Wipe this profile node from database memory structures permanently?')) return;
    setStatusMsg('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/auth/delete-user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setStatusMsg('Success: Node destroyed from directory database.');
        fetchUsersList();
      } else {
        const data = await res.json();
        setStatusMsg(`Deletion Rejected: ${data.message}`);
      }
    } catch (err) {
      setStatusMsg('Network timeout during destruction protocol.');
    }
  };

  return (
    <div style={{ color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* HEADER SECTION METRICS */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '20px', letterSpacing: '3px', margin: '0 0 5px 0' }}>SYSTEM PROFILE CONSOLE CONTROL</h2>
          <p style={{ color: '#666', fontSize: '12px', fontFamily: 'monospace', margin: 0 }}>CHANNEL CLEARANCE ACTIVE // LIVE DATABASE DATA CONTEXT MAPPING</p>
        </div>
        <div style={{ background: '#111', padding: '10px 20px', border: '1px solid #222', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
          TOTAL CLOUD NODES: <span style={{ color: '#ff3c3c', fontWeight: 'bold' }}>{users.length}</span>
        </div>
      </div>

      {statusMsg && (
        <div style={{ background: '#141414', borderLeft: '3px solid #ff3c3c', padding: '15px', color: '#ff3c3c', fontSize: '13px', fontFamily: 'monospace', marginBottom: '30px' }}>
          {statusMsg}
        </div>
      )}

      {/* CREATE USER PROFILE FORM MODULE */}
      <section style={{ background: '#111', border: '1px solid #222', padding: '25px', borderRadius: '6px', marginBottom: '40px' }}>
        <h4 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '11px', letterSpacing: '2px', color: '#ff3c3c', margin: '0 0 20px 0' }}>REGISTER NEW NETWORK MEMBER</h4>
        <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Full Name</label>
            <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Email Address</label>
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Password</label>
            <input type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Role Clearance</label>
            <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px' }}>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Finance">Finance</option>
              <option value="Client">Client</option>
            </select>
          </div>
          <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '11px 20px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', borderRadius: '4px', cursor: 'pointer' }}>Add Profile</button>
        </form>
      </section>

      {/* SECURE DIRECTORY DISPLAY PORT TABLE */}
      {loading ? (
        <p style={{ fontFamily: 'monospace', color: '#444' }}>Querying secure user database collections...</p>
      ) : (
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '6px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#181818', color: '#777', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}>
                <th style={{ padding: '15px 20px' }}>Name</th>
                <th style={{ padding: '15px 20px' }}>Email Connection Node</th>
                <th style={{ padding: '15px 20px' }}>Security Clearance Status</th>
                <th style={{ padding: '15px 20px', textAlign: 'right' }}>Management System Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #222' }}>
                  {editingId === user._id ? (
                    <>
                      <td style={{ padding: '15px 20px' }}>
                        <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} style={{ padding: '8px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '13px' }} />
                      </td>
                      <td style={{ padding: '15px 20px' }}>
                        <input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} style={{ padding: '8px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace' }} />
                      </td>
                      <td style={{ padding: '15px 20px' }}>
                        <select value={editFormData.role} onChange={(e) => setEditFormData({...editFormData, role: e.target.value})} style={{ padding: '8px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '13px' }}>
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Finance">Finance</option>
                          <option value="Client">Client</option>
                        </select>
                      </td>
                      <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                        <button onClick={() => handleUpdateUser(user._id)} style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '6px 12px', marginRight: '10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Commit</button>
                        <button onClick={cancelEditing} style={{ background: '#c62828', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '20px', fontWeight: 'bold' }}>{user.name}</td>
                      <td style={{ padding: '20px', color: '#aaa', fontFamily: 'monospace' }}>{user.email}</td>
                      <td style={{ padding: '20px' }}>
                        <span style={{ 
                          background: user.role?.toLowerCase() === 'admin' ? 'rgba(255, 60, 60, 0.12)' : 'rgba(255,255,255,0.05)',
                          color: user.role?.toLowerCase() === 'admin' ? '#ff3c3c' : '#fff',
                          padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px'
                        }}>{user.role}</span>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'right' }}>
                        <button onClick={() => startEditing(user)} style={{ background: 'transparent', border: '1px solid #555', color: '#bbb', padding: '6px 12px', borderRadius: '4px', marginRight: '10px', fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDeleteUser(user._id)} style={{ background: 'transparent', border: '1px solid #ff3c3c', color: '#ff3c3c', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}>Wipe</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}