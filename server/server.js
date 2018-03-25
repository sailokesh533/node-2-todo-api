require('./config/config');

//Outside Imports

const _ = require('lodash');
const express =  require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local Imports
var {mongoose} = require('./db/mongoose');
var {Employee} = require('./models/employee');
var {Users} = require('./models/users');


var app = express();

const port = process.env.PORT;

//Middleware setup

app.use(bodyParser.json());

//Service call for Post through post man

app.post('/employee',(req,res)=>{
var newEmployee = new Employee({
  emp_name:req.body.emp_name
  // age:req.body.age,
  // address:req.body.address,
  // email_id:req.body.email_id
});

newEmployee.save().then((doc)=>{
res.send(doc);
console.log('Employee data saved in database');
},(e)=>{
  res.status(400).send(e);
  console.log('Unable to save record in database');
});

});

app.get('/employee',(req,res)=>{
  Employee.find().then((doc)=>{
    res.send({doc});
  },(e)=>{
    res.status(400).send(e);
  });
});


// app.post('/users',(req,res)=>{
//   var user = new Users({
//     user_name:req.body.user_name,
//     user_id:req.body.user_id
//   });
//
//   user.save().then((doc1)=>{
//     res.send(doc1);
//     console.log('Record is saved in database');
//   },(err)=>{
//     res.status(400).send(err);
//     console.log('Unable to save user data');
//   });
// });

app.get('/users',(req,res)=>{
  Users.find().then((doc)=>{
    res.send({doc});
  },(e)=>{
    res.status(400).send(e);
  })
});

//Getting user details based on id

app.get('/users/:id',(req,res)=>{

  var id = req.params.id;
// Validating id

if(!ObjectID.isValid(id)){
  return res.status(400).send();
}

Users.findById(id).then((user)=>{
  if(!user){
    return res.status(404).send();
  }
  res.send({user});
}).catch(()=>res.status(400).send());
});


// Deleting users based on id

app.delete('/delete/:id',(req,res)=>{
  var id = req.params.id;
if(!ObjectID.isValid(id)){
  return res.status(404).send();
}
    Users.findByIdAndRemove(id).then((doc)=>{

    if(!doc){
      return res.status(404).send();
    }
res.send(doc);
  }).catch(()=>res.status(400).send());
});

app.patch('/patch/:id',(req,res)=>{
  var userId =  req.params.id;
  var body = _.pick(req.body,['user_name','age']);

  if(!ObjectID.isValid(userId)){
    return res.status(404).send();
  }
  if(_.isLength(body.user_name)>4){
    body.user_name ="Sai Lokesh Kanthi";
  }


Users.findByIdAndUpdate(userId,{$set:body},{new:true}).then((doc)=>{
  if(!doc){
    return res.status(404).send();
  }
  res.send({doc});
}).catch((e)=>{
  return res.status(404).send();
});
});


app.post('/users',(req,res)=>{
var body = _.pick(req.body,['user_name','email','password']);
var user = new Users(body);

user.save().then(()=>{
  return user.generateAuthToken();
}).then((token)=>{
  res.header('x-auth',token).send(user);
}).catch((e)=>{
  res.status(404).send(e);
});

});

//Setup listen port
app.listen(port,()=>{
  console.log(`Server started up port : ${port}`);
});

module.exports = {app};
