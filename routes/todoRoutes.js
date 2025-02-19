const express = require('express');
const router = express.Router(); // получаем роутер из библиотеки Express
const todoController = require('../controllers/controllerTodo'); // импортируем контроллеры

// реализация маршрутов:
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/update/:id', todoController.updateTodo); // используется параметризированный маршрут с id
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;