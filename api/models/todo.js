const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  CreatedAt: {
    type: Date,
    default: new Date()
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDoneDate: {
    type: Date,
    default: null,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  durationCreatedAt:{
    type: String,
    default: null,
  },
  durationDoneAt:{
    type: String,
    default: null,
  }
});

const Todos = mongoose.model('Todos', TodoSchema)

module.exports = { Todos }