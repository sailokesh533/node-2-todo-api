const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Users} = require('./../server/models/users');

// Users.remove({}).then((doc)=>{
//   console.log(doc);
//   console.log('Successfully removed data from Usres');
// });

// Removed user doc from find by id
Users.findByIdAndRemove('5aacc83dba009339ad9985f8').then((doc)=>{
  console.log(doc);
  console.log('Removed record in users table using findByIdAndRemove');
});

// Removed user doc based on findOne

Users.findOneAndRemove({user_name:'kanthi'}).then((doc)=>{
  console.log(doc);
  console.log('Removed record in users table using findOneAndRemove');
});
