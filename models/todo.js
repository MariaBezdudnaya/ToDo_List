const mongoose = require('mongoose');
const Scema = mongoose.Scema; // часть библиотеки mongoose, которая используется для работы с MongoDB, позволяет определить структуру документа в коллекции MongoDB

const TodoScema = new Scema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', TodoScema);