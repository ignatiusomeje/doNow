const mongoose = require('./../../db/dbConnect');
const {Todos} = require('./../../models/todo');

async function createTodo(activity, creator){
  try{
    if (activity.trim() == ""){
      return {
        status: 400,
        message: 'Your Activity is an Empty String'
      }
    }

    const todo = new Todos({
      activity: activity,
      creator: creator
    });
    
    const docs = await todo.save();
    if (!docs){
      throw Error();
    }
    return {
      status: 200,
      message: docs
    };
  } catch(e) {
    return {
      status: 400,
      message: 'Error while Creating Todo'
    }
  }
};

module.exports = {createTodo};