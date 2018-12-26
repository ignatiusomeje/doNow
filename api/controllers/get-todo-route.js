const {getTodos} = require('./../data_access_layer/get-todos');

async function getAllTodos(req, res){
  try{
    const docs = await getTodos();
    res.send(docs);
  } catch(e){
    res.send('no Todo found, why not you create one?');
  }
}

module.exports = {getAllTodos}