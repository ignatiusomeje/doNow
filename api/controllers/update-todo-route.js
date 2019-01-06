
const {Update} = require('./../data_access_layer/update-todo');

async function todoUpdateRoute(req, res){
  try{
    const doc = await Update(req.params.id, req.body);
    res.send(doc)
  } catch(e){
    res.send(e)
  }
}

module.exports = {todoUpdateRoute}