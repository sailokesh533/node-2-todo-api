const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserShema =  new mongoose.Schema({
  user_name:{
    required:true,
    minlength:4,
    trim:true,
    type:String
  },
  email:{
    type:String,
    required:true,
    minlength:4,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:`{VALUE} is not an email`
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserShema.methods.toJSON =  function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};
UserShema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  //user.tokens.push({access,token});
  // push command having some inconsistecy in mongo db version problem
  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });
};

UserShema.statics.findByToken =  function(token){
var Users = this;
var decode;

try{
  decode = jwt.verify(token,'abc123');
console.log('try');
} catch(e){
  console.log('catch');
  return Promise.reject();
}
return Users.findOne({
  '_id':decode._id,
  'tokens.token':token,
  'tokens.access':'auth'
});
};

var Users = mongoose.model('Users',UserShema);


module.exports = {Users};
