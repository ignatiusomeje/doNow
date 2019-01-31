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
      body.lastUpdate = new Date()
      await Users.findByIdAndUpdate({_id: userId},{$set:
        body
      },{new: true});
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
        await Users.findByIdAndUpdate({_id: userId},{$set:
          body
        },{new: true});
        return {
          status: 200,
          message: 'Your details has been updated Successful'
        }
      }
    }
  }catch(e){

  }
}

module.exports = {changeDetails};