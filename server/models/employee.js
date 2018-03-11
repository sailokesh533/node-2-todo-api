var mongoose = require('mongoose');
var Employee = mongoose.model('Employee',{
emp_name:{
  type:String,
  required:true,
  minlength:6,
  trim:true
}
,
age:{
  type:Number,
  required:false,
  trim:true
},
address:{
  type:String,
  required:false,
  minlength:1
},
email_id:{
  type:String,
  required:false,
  trim:true
}
});

// var addNewEmployee = new Employee({
//   name:'Sai Lokesh',
//   age:25,
//   address:'Hyderabad',
//   email_id:'sailokesh533@gmail.com'
// });

// var secondEmployee = new Employee({
//   emp_name:'Kanthi Shree',
//   age:23,
//   address:'Visakhapatnam',
//   email_id:'    kanthi@gmail.com   '
//
// });

// var thirdEmployee = new Employee({
//   emp_name:'Kanthi Shree',
//   age:23,
//   address:2424242,
//   email_id:'    kanthi@gmail.com   '
//
// });


module.exports = {Employee};
