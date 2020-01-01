
// const {Users, tokenGenerator} = require('./../../models/user');
// const {emailer} = require('./../../utilities/emailsender');

// const url = "http://localhost:3000";//check create_user.js for editing

// async function resetPassword(email, callback){
//   try{
//     const user = await Users.findOne({email: email});
//     if (!user){
//       const err = {
//         status: 404,
//         message: `No User with such Email Address`
//       }
//       return callback(err);
//     }
//     const token = await tokenGenerator.generate();
//     const data = {
//       subject: 'PASSWORD RESET AUTHORIZATION',
//       text:`HI, ${email} a password reset has been initialized on your account with us. if you are the one that initialised it click on this link below else ignore this message ${url}/${email}/${token}?q=true `
//     }
//     emailer(user.email, data, async (err, result) => {
//       if (err){
//         return callback(err)
//       }
//       await user.set({
//         authToken: token
//       });
//       const update = await user.save();
//       if (!update){
//         const err = {
//           status: 400,
//           message: `error while reseting your password`
//         }
//         callback(err);
//       }
//       callback(undefined, result);
//     });
//   }catch(e){
//     const err = {
//       status: 400,
//       message: `Unable to reset your password`
//     }
//     return callback(err);
//   }
// }

// module.exports = {resetPassword}