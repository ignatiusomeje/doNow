const mongoose = require('mongoose');
const {isEmail, isMobilePhone} = require('validator');

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
    type: String,
    default: null,
  },
  isValid:{
    type: String,
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

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users };