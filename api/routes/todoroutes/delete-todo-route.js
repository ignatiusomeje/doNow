// const {deleteTodo} = require('./../../data_access_layer/todo_access_layer/delete-todo')
// const {authenticate} = require('./../../utilities/authenticator');

// async function todoDeleteRoute(req, res){
//   try{
//     const user = await authenticate(req, res)
//     const doc = await deleteTodo(req.params.id, user.message._id);
//     res.status(doc.status).json(doc);
//   } catch(e){
//     res.status(400).json({
//       status: 400,
//       message: 'Unable to complete request'
//     });
//   }
// }

// module.exports = {todoDeleteRoute}