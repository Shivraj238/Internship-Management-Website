import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/tasks').then(({ data }) => {
      setTasks(data);
      localStorage.setItem('cachedTasks', JSON.stringify(data));
    });
  }, []);

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  const approved = tasks.filter(t => t.status === 'Approved').length;
  const progress = tasks.length ? (approved / tasks.length) * 100 : 0;

  return (
    <>
      <Navbar showActions />
      <div style={{ padding: '40px 8%' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div className="glass-card" style={{ flex: 1 }}>
            <p style={{ color: '#64748b', fontSize: '0.75rem' }}>COMPLETION PROGRESS</p>
            <div className="progress-container"><div className="progress-bar" style={{ width: `${progress}%` }}></div></div>
            <small>{tasks.length}</small> Projects Submitted
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <p style={{ color: '#64748b', fontSize: '0.75rem' }}>ACCOUNT STATUS</p>
            <h2 style={{ color: '#34d399', marginTop: '5px' }}>Active Intern — {localStorage.getItem('internId')}</h2>
          </div>
        </div>
        <div className="glass-card">
          <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.05)' }} />
          <table className="dashboard-table" style={{ width: '100%' }}>
            <thead><tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.8rem' }}><th>ID</th><th>PROJECT</th><th>CATEGORY</th><th>STATUS</th><th>DATE</th><th>ACTION</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t._id}>
                  <td style={{ color: '#64748b' }}>{t.id}</td>
                  <td style={{ fontWeight: 600 }}>{t.title}</td>
                  <td style={{ color: '#94a3b8' }}>{t.category}</td>
                  <td><span className={`badge ${t.status === 'Approved' ? 'approved' : 'pending'}`}>{t.status}</span></td>
                  <td>{t.date}</td>
                  <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <a href={t.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>View →</a>
                    <button onClick={() => deleteTask(t._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px' }}>No tasks found.</p>}
        </div>
      </div>
      <footer><p>© 2026 <b>SoftGrow Tech</b>. All Rights Reserved. | Designed by Shivraj Gaike</p></footer>
    </>
  );
}
