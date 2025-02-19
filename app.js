const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB (из документации)
mongoose.connect("mongodb://127.0.0.1:27017/todo-list").then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

const todoRoutes = require('./routes/todoRoutes'); // импортируем маршруты
app.use('/todos', todoRoutes); // и подключаем их с использованием функции todoRoutes

app.get('/', (req, res) => { // запрос на получение данных, в параметрах маршрут к корневому каталогу и функция callback, которая обрабатывает запрос
  res.redirect('/todos'); // перенаправление на каталог todos
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});