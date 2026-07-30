import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const SUGGESTIONS = [
  'Review my submitted projects',
  'What should I learn next?',
  'How can I improve my portfolio?',
  'Give me tips for my category',
];

export default function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hey ${localStorage.getItem('internId')} 👋 I'm your AI Internship Coach. I've already reviewed your submitted projects. Ask me anything — feedback, next steps, or career tips!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    const history = messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0)
      .map(({ role, content }) => ({ role, content }));
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const { data } = await api.post('/ai/coach', { message: userMsg, history });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Could not reach AI. Check your OpenAI API key in server/.env' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar showActions />
      <div style={{ padding: '30px 8%', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🤖</div>
          <div>
            <h2 style={{ margin: 0 }}>AI Internship Coach</h2>
            <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Powered by GPT · Knows your projects</p>
          </div>
        </div>

        {/* Suggestion chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} className="btn-glow"
              style={{ padding: '6px 14px', fontSize: '0.75rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', boxShadow: 'none' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="glass-card" style={{ height: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '12px 16px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.role === 'user' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'rgba(255,255,255,0.06)',
                border: m.role === 'assistant' ? '1px solid var(--glass-border)' : 'none',
                fontSize: '0.9rem', lineHeight: '1.5',
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--glass-border)' }}>
                <span style={{ display: 'inline-flex', gap: '4px' }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask your coach anything..."
            style={{ flex: 1, margin: 0 }}
          />
          <button onClick={() => send()} className="btn-glow" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
            Send ↑
          </button>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`}</style>
      <footer><p>© 2026 <b>SoftGrow Tech</b>. All Rights Reserved. | Designed by Shivraj Gaike</p></footer>
    </>
  );
}
