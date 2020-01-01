
// const{resetPassword} = require('./../../data_access_layer/user_access_layer/reset_password')

// async function userPasswordResetRoute(req, res){
//   try{
//     resetPassword(req.body.email, (err, result) => {
//       if (err){
//         res.status(err.status).json(err)
//       }
//       res.status(result.status).json(result)
//     });
//   }catch(e){
//     res.status(400).json({
//       status: 400,
//       message: 'Password Reset process cancelled'
//     });
//   }
// }

// module.exports = {userPasswordResetRoute}