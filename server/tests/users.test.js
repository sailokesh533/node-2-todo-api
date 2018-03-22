var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Users} = require('./../models/users');

const user_objects = [
  {
    user_name:'Sai Lokesh',
    _id:new ObjectID()
  },{
    user_name:'Kanthi Shree',
    _id:new ObjectID()
  }
];
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
  .send({user_name})
  .expect(200)
  .expect((res)=>{
    expect(res.body.user_name).toBe(user_name);
    //expect(res.body.user_id).toBe(1);
  }).end((err,res)=>{
    if(err){
      return done(err);
    }
    Users.find().then((user)=>{
      expect(user.length).toBe(3);
      //expect(user[1].user_id).toBe(5);
     done();
    }).catch((err)=>done(err));
  })
});
});

describe('/Get request by id',()=>{
  it('should test users getting by id',(done)=>{
    request(app)
      .get(`/Users/${user_objects[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.user.user_name).toBe(user_objects[0].user_name);
      }).end(done);
  });

it('should test 404: getting users by user id ',(done)=>{
  var hexId = new ObjectID().toHexString();
  request(app)
  .get(`/Users/${hexId}`)
  .expect(404)
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    Users.find(hexId).then((user)=>{
      expect(user.length).toBe(0);
      done();
    }).catch(()=>done());
  });
});

});

describe('/Delete user by id',()=>{
it('should test delete by id ',(done)=>{

  var hexId = user_objects[1]._id.toHexString();

  request(app)
  .delete(`/delete/${hexId}`)
  .expect(200)
  .expect((res)=>{
    expect(res.body._id).toBe(hexId);
  }).end((err,res)=>{
    if(err){
      return done(err);
    }
    Users.findById(hexId).then((doc)=>{
      if(doc){
        return res.status(404).send();
      }
      expect(doc).toNotExist();
      done();
    }).catch((e)=>done(e));
  });
});

it('should test 404 delete by id',(done)=>{
  var hexId = new ObjectID().toHexString();
  request(app)
  .delete(`/delete/${hexId}`)
  .expect(404)
  .end(done)
});
});
