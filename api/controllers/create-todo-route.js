const {createTodo} = require('./../data_access_layer/create-todo')

async function todoCreateRoute(req, res){
  try{
    const docs = await createTodo(req.body.activity,)
    res.send(docs)
  } catch(e) {
    res.send(e)
  }
}

module.exports = {todoCreateRoute};