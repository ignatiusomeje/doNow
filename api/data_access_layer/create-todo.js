const mongoose = require('./../db/dbConnect');

const {Todos} = require('./../models/todo');

async function createTodo(activity, creator){

  try{
    const todo = new Todos({
      activity: activity,
      // creator: creator
    });
    const docs = await todo.save();
    return docs;
  } catch(e) {
    return e;
  }
};

module.exports = {createTodo};