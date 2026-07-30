const router = require('express').Router();
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
const Task = require('../models/Task');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

router.post('/coach', auth, async (req, res) => {
  const { message, history } = req.body;
  const tasks = await Task.find({ user: req.user.id });

  const taskSummary = tasks.length
    ? tasks.map(t => `- "${t.title}" (${t.category}) | Status: ${t.status} | Repo: ${t.link}`).join('\n')
    : 'No tasks submitted yet.';

  const systemPrompt = `You are an AI Internship Coach for InternPulse, a platform by SoftGrow Tech.
You have access to this intern's submitted projects:
${taskSummary}

Your role:
- Give specific, actionable feedback on their projects and skills
- Suggest improvements based on their category (Frontend/Backend/UI-UX)
- Recommend next steps, technologies to learn, and portfolio tips
- Be encouraging but honest. Keep responses concise (3-5 sentences max).`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(history || []),
    { role: 'user', content: message },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 300,
  });

  res.json({ reply: completion.choices[0].message.content });
});

module.exports = router;
