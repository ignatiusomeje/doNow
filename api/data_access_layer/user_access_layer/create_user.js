const tokenGenerator = require('token-generator')({
  salt: 'welcome to this api',
  timestampMap: "abcdefg123"
})

const {Users} = require('./../../models/user');
const {emailer} = require('./../../utilities/emailsender');

const url = "localhost:3000";

async function createUser(userInfo, callback){
  try{
    const token = await tokenGenerator.generate();

    const user = new Users({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      dob: userInfo.dob,
      address: userInfo.address,
      phoneNumber: userInfo.phoneNumber,
      authToken: token,
    });
    const data = {
      subject: 'ACCOUNT VERIFICATION',
      text:`HI, ${userInfo.email} <br> Welcome to our App, but to continue with our app usage please on the link below to activate your account: <br> ${url}/${userInfo.email}/${token} `
    }
    await emailer(userInfo.email, data, async (err, data)=>{
      if (err){
        return callback(err)
      };
      callback(data);
    });
    await user.save()
  }catch(e){
    return {
      status: 400,
      message: 'Unable to create a user account'
    }
  }
}

module.exports = {createUser}