import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function SubmitTask() {
  const [form, setForm] = useState({ title: '', link: '', category: 'Frontend' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '60px 20%' }}>
        <div className="glass-card">
          <h2>New Task Submission</h2>
          <form onSubmit={handleSubmit}>
            <label>Task Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
            </select>
            <label>Project Title</label>
            <input type="text" placeholder="Project Name" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <label>GitHub/Repo Link</label>
            <input type="url" placeholder="https://..." value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} required style={{ marginBottom: '20px' }} />
            <button type="submit" className="btn-glow" style={{ width: '100%' }}>Submit To Cloud</button>
          </form>
        </div>
      </div>
      <footer><p>© 2026 <b>SoftGrow Tech</b>. All Rights Reserved. | Designed by Shivraj Gaike</p></footer>
    </>
  );
}
