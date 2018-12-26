const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username,
  firstName,
  lastName,
  email,
  password,
  
});

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users };