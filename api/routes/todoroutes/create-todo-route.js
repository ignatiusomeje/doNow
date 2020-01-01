// const {createTodo} = require('./../../data_access_layer/todo_access_layer/create-todo');
// const {authenticate} = require('./../../utilities/authenticator');

// async function todoCreateRoute(req, res){
//   // return console.log(req);
//   try{
//     // const user = await authenticate(req, res)
//     const docs = await createTodo(req.body.activity, user.message._id)
//     res.status(docs.status).json(docs)
//   } catch(e) {
//     console.log(e)
//     res.status(400).json({
//       status: 400,
//       message: 'Unable to complete request'
//     })
//   }
// }

// module.exports = {todoCreateRoute};