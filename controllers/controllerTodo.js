const ToDo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await ToDo.find(); // у модели ToDo используем метод find для поиска информации
    res.render('index', { todos }); // получаем и рендерим все задачи
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createTodo = async (req, res) => {
  const { title, description } = req.body; // забираем из запроса клиента заголовок и описание
  const newTodo = new ToDo({ title, description }); // и отправляем их в модель ToDo
  try {
    await newTodo.save();
    res.redirect('/todos'); 
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateTodo = async (req, res) => { // когда изменяем задачу, из запроса забираем  
  const { id } = req.params; // как параметры,
  const { title, description, completed } = req.body; // так и тело запроса
  try {
    await ToDo.findByIdAndUpdate(id, { title, description, completed: completed === 'on' }); // используем асинхронную операцию findByIdAndUpdate. Если модель будет найдена в БД по id, то все поля обновятся
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.deleteTodo = async (req, res) => { // когда удаляем задачу, из запроса забираем только параметры id
  const { id } = req.params; 
  try {
    await ToDo.findByIdAndDelete(id); // ...
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send(err);
  }
};