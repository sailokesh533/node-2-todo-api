const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Users} = require('./../server/models/users');

var id = '5aa4da62da184dc838107685';
var user_name ='Sai Lokesh';

if(!ObjectID.isValid(id)){
  console.log('User id not found');
}
Users.find({
  user_name
}).then((users)=>{
  console.log('Id found ',users);
});


Users.findOne({
  _id:id
}).then((user)=>{
  console.log('Getting list based id ',user);
});

Users.findById(id).then((user)=>{
if(!user){
  console.log('User not found ');
}
console.log('Users getting based on by id ',user);
console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
});
