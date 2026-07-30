const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ _id: -1 });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
