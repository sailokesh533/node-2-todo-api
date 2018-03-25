var {Users} = require('./../models/users');

var authenticate = (req,res,next)=>{
  var token = req.header('x-auth');
  Users.findByToken(token).then((user)=>{
    if(!user){
      console.log('test');
      return res.status(404).send();
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });
};

module.exports = {authenticate};
