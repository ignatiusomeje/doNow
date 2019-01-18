const {getTodos} = require('./../../data_access_layer/todo_access_layer/get-todos');

async function todoGetAllRoute(req, res){
  try{
    const docs = await getTodos();
    res.status(docs.status).json(docs);
  } catch(e){
    res.status(400).json({
      status: 400,
      message: 'Unable to complete request'
    });
  }
}

module.exports = {todoGetAllRoute};
// req.user.id