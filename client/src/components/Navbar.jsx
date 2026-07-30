import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ showActions }) {
  const navigate = useNavigate();
  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <nav className="navbar">
      <h1 className="logo">Intern<span>Pulse</span></h1>
      {showActions && (
        <div>
          <button onClick={() => { const tasks = JSON.parse(localStorage.getItem('cachedTasks') || '[]'); if (!tasks.length) return alert('No data!'); const data = tasks.map(t => `${t.id} | ${t.title} | ${t.status} | ${t.date}`).join('\n'); const blob = new Blob([`SOFTGROW TECH - INTERNSHIP REPORT\n\n${data}`], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Internship_Report.txt'; a.click(); }} className="btn-glow" style={{ background: 'transparent', border: '1px solid var(--primary)', marginRight: '10px' }}>Export Report</button>
          <Link to="/submit" className="btn-glow" style={{ textDecoration: 'none', marginRight: '10px' }}>+ New Task</Link>
          <Link to="/coach" className="btn-glow" style={{ textDecoration: 'none', marginRight: '10px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>🤖 AI Coach</Link>
          <button onClick={logout} className="btn-glow" style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>Logout</button>
        </div>
      )}
    </nav>
  );
}
