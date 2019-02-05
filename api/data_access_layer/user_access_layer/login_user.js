const {isEmail} = require('validator');
const {pick} = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');

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
    if (bcrypt.compare(user.password, body.password)){
      if (user.authToken !== null){
        return {
          status: 400,
          message: 'please do verify your account from your email account'
        }
      }
      if (user.lastSeen === null){
        await Users.findOneAndUpdate({email: user.email, username: user.username},{$set:{
          lastSeen: new Date()
        }},{new: true});
        await user.generateAuth();
        user.lastSeen = moment().fromNow(user.lastSeen);
        return {
          status: 200,
          message: user
        }
      }
      const updateNeeded = await Users.getUserByToken(user.token.token)
      await Users.findOneAndUpdate({email: user.email, username: user.username},{$set:{
        lastSeen: updateNeeded.time
      }},{new: true});
      console.log(updateNeeded)
      user.lastSeen = moment(updateNeeded.time).calendar();
      await user.generateAuth();
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