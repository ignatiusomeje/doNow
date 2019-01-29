
const {verifyAccount} = require('./../../data_access_layer/user_access_layer/verify_user_account')

async function userVerifyAccountRoute(req, res){
  try{
    const info = await verifyAccount(req);
    res.status(info.status).json(info);
  }catch(e){
    res.status(400).json({
      status: 400,
      message: 'Account Verification process cancelled'
    });
  }
}

module.exports = {userVerifyAccountRoute}