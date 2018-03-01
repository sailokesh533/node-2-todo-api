//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to  Connect');
  }
  console.log('Successfully connected');
db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("5a959ec59aa7b92124816e90"),
},{
  $set:{
    'name':'Sai Lokesh Kanthi'
  },
  $inc:{
    age:1
  }
},
  {
    returnOrginal : false
  }).then((result)=>{
  console.log(JSON.stringify(result,undefined,2));
});

//  db.close();
});
