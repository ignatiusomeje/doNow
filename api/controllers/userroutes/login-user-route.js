
const {loginUser} = require('./../../data_access_layer/user_access_layer/login_user')

async function userLoginRoute(req, res) {
  try{
    const user = await loginUser(req.body);
    res.status(user.status).json(user)
  }catch(e){
    res.status(400).json({
      status: 400,
      message: 'Login process cancelled'
    });
  }
}

module.exports = {userLoginRoute}