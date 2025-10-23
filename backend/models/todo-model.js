const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: {type: String, required: false},
  priority: { type: Number, default: 1, min: 1, max: 5 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = model('Todo', TodoSchema);