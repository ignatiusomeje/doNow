// const tokenGenerator = require('token-generator')({
//   salt: 'welcome to this api',
//   timestampMap: "abcdefg123"
// })

const {Users, tokenGenerator} = require('./../../models/user');

async function verifyAccount(data){
  try{
    if (tokenGenerator.isValid(data.params.token)){
      if (data.query.q){
        const user = await Users.findOneAndUpdate({email: data.params.email, authToken: data.params.token, isValid: false},{$set:{
          authToken: null,
          isValid: true
        }},{new: true});
        if (!user){
          return {
            status: 404,
            message: 'Email or Token is Invalid'
          }
        }
        return {
          status: 200,
          message: user
        }
      }else{
        const user = await Users.findOneAndUpdate({email: data.params.email, authToken: data.params.token},{$set:{
          authToken: null,
        }},{new: true});
        if (!user){
          return {
            status: 404,
            message: 'Email or Token is Invalid'
          }
        }
        return {
          status: 200,
          message: user
        }
      }
    }
    return {
      status: 404,
      message: 'Invalid Token'
    }
  }catch(e){
    return {
      status: 400,
      message: 'Unable to  verify account details'
    }
  }
}

module.exports = {verifyAccount}