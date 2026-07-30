import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ internId: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const { data } = await api.post(endpoint, form);
      if (isRegister) {
        setIsRegister(false);
        setError('Registered! Please login.');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('internId', data.internId);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass-card" style={{ width: '400px', margin: 'auto', textAlign: 'center' }}>
        <h1 className="logo">Intern<span>Pulse</span></h1>
        <p style={{ color: '#94a3b8', margin: '10px 0 30px' }}>Access your portal</p>
        {error && <p style={{ color: error.includes('Registered') ? '#34d399' : '#f87171', marginBottom: '15px', fontSize: '0.85rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Intern ID (e.g. SG-101)" value={form.internId} onChange={e => setForm({ ...form, internId: e.target.value })} required />
          <input type="password" placeholder="Access Key" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ marginBottom: '20px' }} />
          <button type="submit" className="btn-glow" style={{ width: '100%' }}>{isRegister ? 'Register' : 'Access Dashboard'}</button>
        </form>
        <p style={{ marginTop: '15px', color: '#64748b', fontSize: '0.85rem' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
      <footer><p>© 2026 <b>SoftGrow Tech</b>. All Rights Reserved. | Designed by Shivraj Gaike</p></footer>
    </div>
  );
}
