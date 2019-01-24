
const {createUser} = require('./../../data_access_layer/user_access_layer/create_user');

async function userCreateRoute(req,res){
  try{
    await createUser(req.body, (err, result)=>{
      if(err){
        return res.status(err.status).json(err);
      };
      res.status(result.status).json(result);
    });
  }catch(e){
    res.status(400).json({
      status: 400,
      message: 'Account creation process cancelled'
    });
  }
}

module.exports = {userCreateRoute}