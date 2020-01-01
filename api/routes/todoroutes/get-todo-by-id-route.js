// const {todoById} = require('./../../data_access_layer/todo_access_layer/get-todo-by-id');
// const {authenticate} = require('./../../utilities/authenticator');

// async function todoGetOneRoute(req, res){
//   try{
//     const user = await authenticate(req, res)
//     const docs = await todoById(req.params.id, user.message._id);
//     res.status(docs.status).json(docs);
//   } catch(e){
//     res.status(400).json({
//       status: 400,
//       message: 'Unable to complete request'
//     })
//   }
// }

// module.exports = {todoGetOneRoute}