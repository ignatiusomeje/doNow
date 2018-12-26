const {Todos} = require('./../models/todo');
const mongoose = require('./../db/dbConnect')

async function todoById(id){
  console.log('id: ', id);
  try{
    const doc = await Todos.findOne({_id: id});
    return doc;
  } catch(e){
    return e;
  }
}

module.exports = {todoById};