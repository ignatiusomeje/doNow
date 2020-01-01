// const {ObjectID} = require('mongodb');
// const moment = require('moment');

// const {Todos} = require('./../../models/todo');
// const mongoose = require('./../../db/dbConnect');

// async function deleteTodo(id, creator){
//   try{
//     if (!ObjectID.isValid(id)){
//       return {
//         status: 400,
//         message: 'Invalid Request Credentials'
//       }
//     }
//     const doc = await Todos.findOneAndUpdate({_id: id, isDeleted: false, creator},{$set:{
//       isDeleted: true
//     }},{new: true});
//     if (doc.isDone === true){
//       doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//       doc.durationDoneAt = moment(doc.isDoneDate).calendar();
//       return  {
//         status: 200,
//         message: doc
//       };
//     }
//     doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//     return {
//       status: 200,
//       message: doc
//     }
//   } catch(e){
//     return {
//       status: 400,
//       message: 'Error while Creating Todo'
//     }
//   }
// }

// module.exports = {deleteTodo};