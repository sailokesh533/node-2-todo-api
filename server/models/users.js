var mongoose = require('mongoose');

var Users = mongoose.model('Users',{

  user_name:{
    required:true,
    minlength:4,
    trim:true,
    type:String
  },
  age:{
    type:Number
  }
});


module.exports = {Users};
