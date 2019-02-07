const {ObjectID} = require('mongodb');
const {pick} = require('lodash');
const moment = require('moment');

const {Users} = require('./../../models/user')

async function changeDetails(userId, details){
  try{
    if (!ObjectID.isValid(userId)){
      return {
        status: 400,
        message: 'Invalid Id used'
      }
    }
    const body = pick(details, ['firstName', 'lastName', 'password', 'dob', 'address', 'phoneNumber'])
    const user = await Users.findById({_id: userId});
    if (!user){
      return {
        status: 400,
        message: 'Account not found'
      }
    }
    if (user.lastUpdate === null){
      body.lastUpdate = new Date();
      await user.set(body);
      await user.save()
      return {
        status: 200,
        message: 'Your details has been updated Successful'
      }
    }
    if (user.lastUpdate !== null){
      const time = moment(new Date()).diff(user.lastUpdate, "days");
      if (time <= 60){
        return {
          status: 400,
          message: 'your last time of update is less than 60 days'
        }
      }else {
        body.lastUpdate = new Date()
        await user.set(body);
        await user.save()
        return {
          status: 200,
          message: 'Your details has been updated Successful'
        }
      }
    }
  }catch(e){
    return {
      status: 404,
      message: 'Unable to update User\'s details'
    }
  }
}

module.exports = {changeDetails};