const {ObjectID} = require('mongodb')

const {Todos} = require('./../models/todo');
const mongoose = require('./../db/dbConnect');

async function deleteTodo(id, creator){
  try{
    if (!ObjectID.isValid(id)){
      return {message: 'invalid ID', status: '404'}
    }
    const doc = await Todos.findOneAndUpdate({_id: id, isDeleted: false, creator},{$set:{
      isDeleted: true
    }},{new: true});
    return doc
  } catch(e){
    return e
  }
}

module.exports = {deleteTodo};