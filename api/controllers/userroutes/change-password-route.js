
const {changePassword} = require('./../../data_access_layer/user_access_layer/change_password')

async function userChangePasswordRoute(req, res){
  try{
    const user = await changePassword(req.params.id, req.body.password);
    res.status(user.status).json(user);
  }catch(e){
    res.status(400).json({
      status: 400,
      message: 'Password Change process cancelled'
    });
  }
}

module.exports = {userChangePasswordRoute}