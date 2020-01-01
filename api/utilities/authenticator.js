const jwt = require('jsonwebtoken');

const {Users} = require('./../models/user');

module.exports = async (req, res, next) => {
  try{
    const tokenHeader = req.header('Bearer');
    const feedback = await Users.getUserByToken(tokenHeader);
    if (feedback.status !== 200){
      return res.status(feedback.status).json(feedback);
    }
     req.body.user = feedback
     next();
  }catch(e){
    return res.status(400).json({
      status: 400,
      message: 'Error while identifying User\'s identity'
    });
  }
};

// Bearer id:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU5YzZkN2ZjNjkxNzE3ZTg5ZGYyMzMiLCJ0aW1lIjoiMjAxOS0wMi0wN1QxNDoyNjo1MS4xNjRaIiwiYWNjZXNzIjoiQmVhcmVyIiwiaWF0IjoxNTQ5NTQ5NjExfQ.KDbU3cogs1uS9jOdi5V4nXrNUZGM17qsZEACi-Hrsno