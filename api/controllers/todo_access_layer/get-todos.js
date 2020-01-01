// const moment = require('moment');

// const {Todos} = require('./../../models/todo');
// const mongoose = require('./../../db/dbConnect');

// async function getTodos(creator){
//   try{
//     const docs = await Todos.find({isDeleted: false, creator}).sort({$natural: -1});
//     if (!docs){
//       throw Error();
//     }
//     let modifiedDocs = docs.map(doc => {
//       if (doc.isDone === true){
//         doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//         doc.durationDoneAt = moment(doc.isDoneDate).calendar();
//         return doc;
//       }
//       doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
//       return doc;
//     })
//     return {
//       status: 200,
//       message: modifiedDocs
//     }
//   } catch(e) {
//     return {
//       status: 404,
//       message: 'No Todo found'
//     }
//   }
// }

// module.exports = {getTodos};