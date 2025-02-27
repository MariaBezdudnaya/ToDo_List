const express = require('express');
const { body } = require('express-validator'); // импортируем body из express-validator для валидации данных
const router = express.Router(); // получаем роутер из библиотеки Express
const todoController = require('../controllers/controllerTodo'); // импортируем контроллеры

// реализация маршрутов:
router.get('/', todoController.getTodos);

// Валидация для создания новой задачи:
router.post('/', 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').isLength({ max: 40 }).withMessage('Description cannot be longer then 40 characters')
  ], todoController.createTodo);

// Валидация для обновления задачи:
router.put('/update/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').isLength({ max: 40 }).withMessage('Description cannot be longer then 40 characters')
], todoController.updateTodo);

// Удаление задачи:
router.delete('/delete/:id', todoController.deleteTodo); //npm install method-override - установили библиотеку, которая позволяет html понимать методы put и delete (также переопределяем их в файле index.ejs) 

module.exports = router;