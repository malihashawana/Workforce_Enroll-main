import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminEmail, password })
    });
    
    if (response.ok) {
      login();
      history.push('/admin-dashboard');
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;