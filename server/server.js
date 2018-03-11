//Outside Imports
var express =  require('express');
var bodyParser = require('body-parser');

//Local Imports
var {mongoose} = require('./db/mongoose');
var {Employee} = require('./models/employee');
var {Users} = require('./models/users');

var app = express();

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


app.post('/users',(req,res)=>{
  var user = new Users({
    user_name:req.body.user_name,
    user_id:req.body.user_id
  });

  user.save().then((doc1)=>{
    res.send(doc1);
    console.log('Record is saved in database');
  },(err)=>{
    res.status(400).send(err);
    console.log('Unable to save user data');
  });
});

app.get('/users',(req,res)=>{
  Users.find().then((doc)=>{
    res.send({doc});
  },(e)=>{
    res.status(400).send(e);
  })
});



//Setup listen port
app.listen(3000,()=>{
  console.log('Server is up on port number 3000');
});

module.exports = {app};
