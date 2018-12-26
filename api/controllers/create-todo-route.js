const {createTodo} = require('./../data_access_layer/create-todo')

// console.log('HI');
async function createTodoRoute(req, res){
  // console.log(req.body);
  try{
    const docs = await createTodo(req.body.activity,)
    // console.log('HI');
    // console.log(docs);

  } catch(e) {

  }
}

module.exports = {createTodoRoute};