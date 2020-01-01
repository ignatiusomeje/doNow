// const moment = require('moment');
// const {ObjectID} = require('mongodb');

// const {Todos} = require('./../../models/todo');
// const mongoose = require('./../../db/dbConnect');

// async function todoById(id, creator){
//   try{
//     if (!ObjectID.isValid(id)){
//       return {
//         status: 400,
//         message: 'Invalid Request Credentials'
//       }
//     }
//     const doc = await Todos.findOne({_id: id, creator});
//     if (!doc){
//       throw Error();
//     }
//     if (doc.isDone === true){
//       doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//       doc.durationDoneAt = moment(doc.isDoneDate).calendar();
//       return {
//         status: 200,
//         message: doc
//       }
//     } else {
//       doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//       return {
//         status: 200,
//         message: doc
//       };
//     }
//   } catch(e){
//     return {
//       status: 404,
//       message: 'No Todo found'
//     }
//   }
// }

// module.exports = {todoById};