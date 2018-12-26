const {Todos} = require('./../models/todo');
const mongoose = require('./../db/dbConnect')

async function getTodos(){
  try{
    const docs = await Todos.find({});
    return docs;
  } catch(e) {
    return e;
  }
}

module.exports = {getTodos};