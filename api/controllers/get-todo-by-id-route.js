const {todoById} = require('./../data_access_layer/get-todo-by-id');

async function getTodo(req, res){
  console.log(req.params)
  try{
    const docs = await todoById(req.params.id);
    res.send(docs);
  } catch(e){
    res.send('no docs found, create one')
  }
}

module.exports = {getTodo}