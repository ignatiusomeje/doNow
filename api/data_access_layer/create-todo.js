const mongoose = require('mongoose');

const {Todos} = require('./../models/todo');

mongoose.connect('mongodb://localhost:27017/UpgradedTodo', { useNewUrlParser: true });

async function createTodo(activity, creator){
  console.log(activity, creator);

  try{
    const todo = new Todos({
      activity: activity,
      // creator: creator
    });
    const docs = await todo.save();
    console.log(docs);
  } catch(e) {
    console.log(e)
  }
};

module.exports = {createTodo};