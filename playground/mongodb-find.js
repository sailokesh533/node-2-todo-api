//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to  Connect');
  }
  console.log('Successfully connected');
// db.collection('Todo').insertOne({
//   'name':'Sai',
//   age:25
// },(err,results)=>{
//   if(err){
//     return console.log('Unable to insert record in mongo database');
//   }
//   console.log(JSON.stringify(results.ops,undefined,2));
// });
//
// db.collection('Users').insertOne({
//   'name':'Kanthi Shree',
//   age:23,
//   'location':'Hyderbad'
// },(err,results)=>{
//   if(err){
//     return console.log('Unable to insert record in monog db');
//   }
//   console.log(JSON.stringify(results.ops,undefined,2));
// });
//
//find by name
// db.collection('Users').find({'name':'Sai Lokesh'}).toArray().then((docs)=>{
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('Unable to fetch record from database');
// });

//Count
// db.collection('Users').find().count().then((count)=>{
// console.log(`Number of records present in db is ${count}`);
// },(err)=>{
//   console.log('Unable to get count from database');
// });

//Find by objectId

// db.collection('Users').find({
//   _id:new ObjectID('5a9595bedef9030d50134759')
// }).toArray().then((docs)=>{
// console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('Unable find object id');
// });

//Insert multiple records

db.collection('Users').insertMany([
  {
  'name':'Kinnu',
  age:28,
  'location':'Visakhapatnam'
},
{
  'name':'Jyothi',
  age:26,
  'location':'vijaynagaram'
}
]).then((docs)=>{
console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log('Unable to insert multiple records in db');
});


  db.close();
});
