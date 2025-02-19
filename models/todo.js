const mongoose = require('mongoose');
const Schema = mongoose.Schema; // часть библиотеки mongoose, которая используется для работы с MongoDB, позволяет определить структуру документа в коллекции MongoDB

const TodoSchema = new Schema({
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

module.exports = mongoose.model('Todo', TodoSchema);