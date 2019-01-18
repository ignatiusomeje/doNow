
const {deleteTodo} = require('./../../data_access_layer/todo_access_layer/delete-todo')

async function todoDeleteRoute(req, res){
  try{
    const doc = await deleteTodo(req.params.id, null);
    res.send(doc);
  } catch(e){
    res.send(e);
  }
}

module.exports = {todoDeleteRoute}