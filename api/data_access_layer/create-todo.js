const mongoose = require('./../db/dbConnect');

const {Todos} = require('./../models/todo');

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