const {createTodo} = require('./../../data_access_layer/todo_access_layer/create-todo')

async function todoCreateRoute(req, res){
  try{
    const docs = await createTodo(req.body.activity, req.user.id)
    res.status(docs.status).json(docs)
  } catch(e) {
    res.status(400).json({
      status: 400,
      message: 'Unable to complete request'
    })
  }
}

module.exports = {todoCreateRoute};