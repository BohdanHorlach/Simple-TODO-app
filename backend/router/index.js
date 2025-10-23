const Router = require('express').Router;
const todoController = require('../controllers/todo-controller');
const router = new Router();


router.get('/', todoController.getAll);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;