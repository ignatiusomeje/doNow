const mongoose = require('mongoose');
const {isEmail, isMobilePhone} = require('validator');
const tokenGenerator = require('token-generator')({
  salt: 'welcome to this api',
  timestampMap: "abcdefg123"
});
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken') 

const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    // unique: true,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    // unique: true,
    validate:{
      validator: isEmail,
      message: props => `${props.value} is not a valid email`
    }
  },
  password:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  dob:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  address:{
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  phoneNumber:{
    type: String,
    required: true,
    trim: true,
    minlength: 9,
    validate:{
      validator: isMobilePhone,
      message: props => `${props.value} is not a valid Phone Number`
    }
  },
  lastSeen:{
    type: String,
    default: null,
  },
  lastUpdate:{
    type: Date,
    default: null,
  },
  isValid:{
    type: Boolean,
    default: false,
  },
  token:{
    access:{
      type: String,
      // required: true,
      default: null,
    },
    token:{
      type: String,
      // required: true,
      default: null
    }
  },
  authToken:{
    type: String,
    default: null,
  }
  
});

UserSchema.pre('save', function(next){
  try{
    const user = this;
    if (user.isModified('password')){
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function (err, hash){
          user.password = hash;
          user.save()
          next();
          return user;
        })
      })
    }
    next()
  }catch(e){
    next();
  }
});

UserSchema.methods.generateAuth = async function(){
  try{
    const user = this;
    const access = "Bearer";
    const token = jwt.sign({_id: user.id, time: new Date(), access}, 'hackers').toString();
    user.token.access = access;
    user.token.token = token;
    await user.save();
    return token;
  }catch(e){
    return {
      status: 400,
      message: 'Unable to generate the user\'s token'
    }
  }
}

UserSchema.statics.getUserByToken = async function(token){
  try{
    const Users = this;
    if (!token){
      return {
        status: 403,
        message: 'An Unintelligent Hacker Found'
      }
    }
    const decoded =  await jwt.verify(token, 'hackers');
    const verified = await Users.findOne({_id: decoded._id, "token.access": decoded.access, "token.token": token});
    if (!verified){
      return {
        status: 403,
        message: 'Unauthorised access noticed'
      }
    }
    return {
      status: 200,
      message: verified, 
      time: decoded.time
    }
  }catch(e){
    return {
      status: 400,
      message: 'Unable to find the User using the user\'s token'
    }
  }
}

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users, tokenGenerator };