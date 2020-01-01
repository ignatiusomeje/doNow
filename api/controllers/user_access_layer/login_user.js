// const {pick} = require('lodash');
// const bcrypt = require('bcryptjs');
// const moment = require('moment');

// const {Users} = require('./../../models/user')

// async function loginUser(usersData) {
//   try{
//     const body = pick(usersData,['name', 'password']);
//     const user = await Users.findOne({$or: [{email: body.name},{username: body.name}]});
//     if (!user){
//       return {
//         status: 404,
//         message: 'Username/Email or Password is Invalid'
//       }
//     }
//     if (await bcrypt.compare(body.password, user.password)){
//       if (user.authToken !== null){
//         return {
//           status: 400,
//           message: 'please do verify your account from your email account'
//         }
//       }
//       if (user.lastSeen === null){
//         await user.set({lastSeen: new Date()});
//         await user.generateAuth();
//         user.lastSeen = moment(user.lastSeen).calendar();
//         await user.save()
//         return {
//           status: 200,
//           message: user
//         }
//       }
//       const updateNeeded = await Users.getUserByToken(user.token.token)
//       await user.set({lastSeen: updateNeeded.time});
//       user.lastSeen = moment(updateNeeded.time).calendar();
//       await user.generateAuth();
//       await user.save()
//       return {
//         status: 200,
//         message: user
//       }
//     } else {
//       return {
//         status: 404,
//         message: 'Username/Email or Password is Invalid'
//       }
//     }
//   }catch(e){
//     return {
//       status: 400,
//       message: 'Unable to  validate user\'s login data'
//     }
//   }
// }

// module.exports = {loginUser}