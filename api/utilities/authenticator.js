const jwt = require('jsonwebtoken');

const {Users} = require('./../models/user')

async function authenticate(req, res, next){
  try{
    const tokenHeader = req.header('Bearer');
    const feedback = await Users.getUserByToken(tokenHeader);
    console.log(feedback)
    if (feedback.status !== 200){
      res.status(feedback.status).json(feedback)
    }
    return feedback
  }catch(e){
    res.status(400).json({
      status: 400,
      message: 'Error while identifying User\'s identity'
    })
  }
}

module.exports = {authenticate}