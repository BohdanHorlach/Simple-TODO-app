const todoService = require('../services/todo-service');

class TodoController {
  async getAll(req, res) {
    try {
      const todos = await todoService.getAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: 'Ошибка при получении задач', error: err.message });
    }
  }

  async create(req, res) {
    try {
      const { title, description, priority } = req.body;
      const todo = await todoService.create(title, description, priority);
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ message: 'Ошибка при создании задачи', error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, priority, completed } = req.body;
      const updated = await todoService.update(id, {
        title,
        description,
        priority,
        completed
      });
      res.json(updated);
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Update failed' });
    }
  }
  

  async delete(req, res) {
    try {
      const { id } = req.params;
      await todoService.delete(id);
      res.json({ message: 'Deleted' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new TodoController();
