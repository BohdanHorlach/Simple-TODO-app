const Todo = require('../models/todo-model');

class TodoService {
  async getAll() {
    return await Todo.find().sort({ completed: 1, priority: -1, createdAt: -1 });
  }

  async create(title, description = '', priority = 0) {
    const newTodo = new Todo({ title, description, priority });
    return await newTodo.save();
  }

  async update(id, updateFields) {
    return await Todo.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoService();
