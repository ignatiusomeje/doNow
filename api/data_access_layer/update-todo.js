const {ObjectID} = require('mongodb');
const {isBoolean, pick} = require('lodash');

const {Todos} = require('./../models/todo')

async function Update(id, data, creator){

  try{
    if (!ObjectID.isValid(id)){
      return 'Invalid Id'
    }

    const body = pick(data,['activity', 'isDone']);
    if (body.isDone && isBoolean(body.isDone)){
      body.isDoneDate = Date.now();
    } else {
      body.isDone = false;
      body.isDoneDate = null;
    }

    const doc = Todos.findOneAndUpdate({_id: id, 
      // creator, 
      isDeleted: false},
      { $set: body },
      { new: true }
    );

    if (!doc){
      return 'No Document found or document has been deleted';
    } else{
      return doc;
    }
  } catch(e){
    console.log(e)
  }
}

module.exports = {Update}