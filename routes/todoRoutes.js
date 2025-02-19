const express = require('express');
const router = express.Router(); // получаем роутер из библиотеки Express
const todoController = require('../controllers/controllerTodo'); // импортируем контроллеры

// реализация маршрутов:
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
//npm install method-override - установили библиотеку, которая позволяет html понимать методы put и delete (также переопределяем их в файле index.ejs)
router.put('/update/:id', todoController.updateTodo); // используется параметризированный маршрут с id
router.delete('/delete/:id', todoController.deleteTodo); 

module.exports = router;