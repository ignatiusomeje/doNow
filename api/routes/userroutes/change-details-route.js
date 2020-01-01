// const {changeDetails} = require('./../../data_access_layer/user_access_layer/change_details');
// const {authenticate} = require('./../../utilities/authenticator')

// async function userChangeDetailsRoute(req, res){
//   try{
//     const authenticator = await authenticate(req, res)
//     const updates = await changeDetails(authenticator.message._id, req.body);
//     res.status(updates.status).json(updates);
//   }catch(e){
//     res.status(400).json({
//       status: 400,
//       message: 'Details Update process cancelled'
//     });
//   }
// }

// module.exports = {userChangeDetailsRoute}