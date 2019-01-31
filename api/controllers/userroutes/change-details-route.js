// const moment = require('moment');

const {changeDetails} = require('./../../data_access_layer/user_access_layer/change_details')

async function userChangeDetailsRoute(req, res){
  // console.log(req.query)
  try{
    const updates = await changeDetails(req.query.id, req.body);
    console.log(updates)
    res.status(updates.status).json(updates);
  }catch(e){
    console.log(e);
    res.status(400).json({
      status: 400,
      message: 'Details Update process cancelled'
    });
  }
}

module.exports = {userChangeDetailsRoute}