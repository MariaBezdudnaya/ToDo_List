// const express = require('express');
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');

// const path = require('path');

// const app = express();
// const PORT = 3000;

// Connect to MongoDB (из документации)
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-list")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

const db = mongoose.connection; // соединение с БД с помощью метода connection
let todos = []; // создаём пустой массив задач

const getTodos = async () => { // функция read
  try {
    todos = await db.collection('todos').find().toArray(); // подключаемся к БД через переменную db, запрашиваем каталог todos, находим там необходимые элементы и преобразуем в массив
    console.log('Todos: ', todos);
  } catch (err) {
    console.error('Error fetching todos', err);
  };
}


const createTodo = async (title, description) => {
  const todo = {
    title,
    description,
    completed: false // чекбокс
  }
  try {
    const result = await db.collection('todos').insertOne(todo); // добавляем в БД в созданную в Mongo коллекцию todos переменную todo
    console.log('Todo created:', result.insertedId);
    getTodos(); // При успешном выполнении запрашиваем новый список задач, функцию read
  } catch (err) {
    console.error('Error creating todo', err);
  }
};
// createTodo('Изучить MongoDB 2', 'Начинаем с CRUD операций 2');


const updateTodo = async (id, updates) => {
  try {
    const result = await db.collection('todos').updateOne(
      { _id: new mongoose.Types.ObjectId(id) }, // по id указываем, какую задачу хотим поправить
      { $set: updates } // устанавливаем изменения, какие понадобятся
    );
    console.log('Todo updated:', result.modifiedCount);
    getTodos(); 
  } catch (err) {
    console.error('Error updating todo', err);
  }
}
// updateTodo('67b505bb847324dad223dac2', { completed: true });


const deleteTodo = async (id) => {
  try {
    const result = await db.collection('todos').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    console.log('Todo deleted:', result.deletedCount);
    getTodos();
  } catch (err) {
    console.error('Error deleting todo', err);
  }
}
// deleteTodo('67b505bb847324dad223dac2');


// app.set('view engine', 'ejs'); // строка выполняет настройку движка шаблонов

// app.use(bodyParser.urlencoded({ extended: true })); // строка кода сообщает Express использовать body-parser

// app.use(express.static(path.join(__dirname, 'public'))); // строка кода позволяет Express использовать статические файлы из папки public

// const todoRoutes = require('./routes/todo');
// app.use('todos', todoRoutes);

// app.get('/', (req, res) => {
//   res.redirect('/todos')
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
