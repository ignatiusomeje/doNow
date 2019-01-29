const {isEmail} = require('validator');
const {pick} = require('lodash')

const {Users} = require('./../../models/user')

async function loginUser(usersData) {
  try{
    const body = pick(usersData,['name', 'password']);
    let user;
    if (isEmail(body.name)){
      user = await Users.findOne({email: body.name});
    } else {
      user = await Users.findOne({username: body.name});
    }
    if (!user){
      return {
        status: 404,
        message: 'Username/Email or Password is Invalid'
      }
    }
    if (user.password === body.password){
      if (user.authToken !== null){
        return {
          status: 400,
          message: 'please do verify your account from your email account'
        }
      }
      return {
        status: 200,
        message: user
      }
    } else {
      return {
        status: 404,
        message: 'Username/Email or Password is Invalid'
      }
    }
  }catch(e){
    return {
      status: 400,
      message: 'Unable to  validate user\'s login data'
    }
  }
}

module.exports = {loginUser}