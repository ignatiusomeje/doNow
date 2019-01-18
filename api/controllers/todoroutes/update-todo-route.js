
const {Update} = require('./../../data_access_layer/todo_access_layer/update-todo');

async function todoUpdateRoute(req, res){
  try{
    const doc = await Update(req.params.id, req.body, req.user.id);
    res.status(doc.status).json(doc)
  } catch(e){
    res.status(400).json({
      status: 400,
      message: 'Unable to complete request'
    });
  }
}

module.exports = {todoUpdateRoute}