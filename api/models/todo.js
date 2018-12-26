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
    default: Date.now()
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
    required: false, //needs to be true but not now till every thing is settled.,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

const Todos = mongoose.model('Todos', TodoSchema)

module.exports = { Todos }