const Todo = require('../models/todo');
const { validationResult } = require('express-validator');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // у модели ToDo используем метод find для поиска информации
    res.render('index', { // получаем и рендерим все задачи
      todos,
      errors: null,
      title: '',
      description: '',
      todoToUpdate: null
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createTodo = async (req, res) => {
  const errors = validationResult(req); // валидация
  
  if (!errors.isEmpty()) {
    const todos = await Todo.find();
    return res.status(400).render('index', { 
      todos: todos,
      errors: errors.array(),
      title: req.body.title,
      description: req.body.description,
      todoToUpdate: null
    });
  }

  const { title, description } = req.body; // забираем из запроса клиента заголовок и описание
  const newTodo = new Todo({ title, description }); // и отправляем их в модель Todo
  try {
    await newTodo.save();
    res.redirect('/todos'); 
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTodo = async (req, res) => {
  const todoId = req.params.id; // когда изменяем задачу, из запроса забираем id
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const todos = await Todo.find();
      const todoToUpdate = await Todo.findById(todoId);

      if (!todoToUpdate) {
        return res.status(404).render('index', {
          todos: todos,
          errors: [{ msg: 'Todo not found' }],
          updatedTitle: '',
          updatedDescription: '',
          todoToUpdate: null
        });
      }

      const modifiedErrors = errors.array().map(error => ({ ...error, todoId }));
      return res.status(400).render('index', {
        todos,
        errors: modifiedErrors,
        updatedTitle: req.body.title || todoToUpdate.title,
        updatedDescription: req.body.description || todoToUpdate.description,
        todoToUpdate
      });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }

  const { title, description, completed } = req.body;
  try {
    await Todo.findByIdAndUpdate(todoId, { title, description, completed: completed === 'on' });
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => { // когда удаляем задачу, из запроса забираем только параметры id
  const { id } = req.params; 
  try {
    await Todo.findByIdAndDelete(id); // ...
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};