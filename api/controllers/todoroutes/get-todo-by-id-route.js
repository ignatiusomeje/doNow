const {todoById} = require('./../../data_access_layer/todo_access_layer/get-todo-by-id');

async function todoGetOneRoute(req, res){
  try{
    const docs = await todoById(req.params.id, req.user.id);
    res.status(docs.status).json(docs);
  } catch(e){
    res.status(400).json({
      status: 400,
      message: 'Unable to complete request'
    })
  }
}

module.exports = {todoGetOneRoute}