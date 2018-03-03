//Outside Imports
var express =  require('express');
var bodyParser = require('body-parser');

//Local Imports
var {mongoose} = require('./db/mongoose');
var {Employee} = require('./models/employee');


var app = express();

//Middleware setup

app.use(bodyParser.json());

//Service call for Post through post man

app.post('/employee',(req,res)=>{
var newEmployee = new Employee({
  emp_name:req.body.emp_name,
  age:req.body.age,
  address:req.body.address,
  email_id:req.body.email_id
});

newEmployee.save().then((doc)=>{
res.send(doc);
},(e)=>{
  res.status(400).send(e);
  console.log('Unable to save record in database');
});

});

//Setup listen port
app.listen(3000,()=>{
  console.log('Server is up on port number 3000');
})
