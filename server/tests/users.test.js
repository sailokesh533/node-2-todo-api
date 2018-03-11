var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Users} = require('./../models/users');

const user_objects = [
  {
    user_name:'Sai Lokesh',
    user_id:2
  },{
    user_name:'Kanthi Shree',
    user_id:5
  }
]
beforeEach((done)=>{
  Users.remove({}).then(()=>{
    return Users.insertMany(user_objects);
  }).then(()=>done());
});


describe('/Post user data',()=>{
it('should test user data',(done)=>{
  var user_name = 'Sai Lokesh';
  var user_id = 1;
  request(app)
  .post('/users')
  .send({user_name,user_id})
  .expect(200)
  .expect((res)=>{
    expect(res.body.user_name).toBe(user_name);
    expect(res.body.user_id).toBe(1);
  }).end((err,res)=>{
    if(err){
      return done(err);
    }
    Users.find().then((user)=>{
      expect(user.length).toBe(3);
      expect(user[1].user_id).toBe(5);
     done();
    }).catch((err)=>done(err));
  })
});
});
