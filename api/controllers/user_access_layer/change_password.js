// const {ObjectID} = require('mongodb')

// const {Users} = require('./../../models/user');

// async function changePassword(userId, password){
//   try{
//     if (ObjectID.isValid(userId)){
//       const user = await Users.findById({_id: userId});
//       if (!user){
//         return {
//           status: 404,
//           message: 'No User Found'
//         }
//       }
//       if (!user.isValid){
//         return {
//           status: 400,
//           message: 'Invalid Access'
//         }
//       };
//       await user.set({password: password, isValid: false});
//       await user.save();
//       return {
//         status: 200,
//         message: 'Password Change was Successful'
//       }
//     }
//     return {
//       status: 400,
//       message: 'Invalid Id used'
//     }
//   }catch(e){
//     return {
//       status: 400,
//       message: `Unable to Change your password`
//     }
//   }
// }

// module.exports = {changePassword}