//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to  Connect');
  }
  console.log('Successfully connected');
db.collection('Users').deleteMany({
  'name':'Sai Lokesh'
}).then((result)=>{
  console.log(JSON.stringify(result,undefined,2));
});
// db.collection('Users').deleteOne({
//   _id:new ObjectID('5a95a14b1e246332c0038ff8')
// }).then((result)=>{
//   console.log(result);
// });

// db.collection('Users').findOneAndDelete({
//   'name':'Kinnu'
// }).then((result)=>{
//   console.log(JSON.stringify(result,undefined,2));
// });
  db.close();
});
