const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: String, default: () => 'PRJ-' + Math.floor(1000 + Math.random() * 9000) },
  title: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Submitted', 'Under Review', 'Approved'], default: 'Submitted' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
});

module.exports = mongoose.model('Task', TaskSchema);
