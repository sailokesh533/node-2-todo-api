const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to  Connect');
  }
  console.log('Successfully connected');
db.collection('Todo').insertOne({
  'name':'Sai',
  age:25
},(err,results)=>{
  if(err){
    return console.log('Unable to insert record in mongo database');
  }
  console.log(JSON.stringify(results.ops,undefined,2));
});

db.collection('Users').insertOne({
  'name':'Sai Lokesh',
  age:25,
  'location':'Hyderbad'
},(err,results)=>{
  if(err){
    return console.log('Unable to insert record in monog db');
  }
  console.log(JSON.stringify(results.ops,undefined,2));
});

  db.close();
});
