const {ObjectID} = require('mongodb')

const {Todos} = require('./../../models/todo');
const mongoose = require('./../../db/dbConnect');

async function deleteTodo(id, creator){
  try{
    if (!ObjectID.isValid(id)){
      return {
        status: '400',
        message: 'Invalid Request Credentials'
      }
    }
    const doc = await Todos.findOneAndUpdate({_id: id, isDeleted: false, creator},{$set:{
      isDeleted: true
    }},{new: true});
    return {
      status: '200',
      message: doc
    }
  } catch(e){
    return {
      status: '400',
      message: doc
    }
  }
}

module.exports = {deleteTodo};