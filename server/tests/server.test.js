var expect = require('expect');
var request =  require('supertest');

var {app} = require('./../server');
var {Employee} = require('./../models/employee');

const emp_objects =[{
  emp_name:'Sai Lokesh'
},{
  emp_name:'Kanthi Shree'
},{
  emp_name:'Kinnu'
},{
  emp_name:'Vani'
}];

beforeEach((done)=>{
Employee.remove({}).then(()=>{
  return Employee.insertMany(emp_objects);
}).catch(()=>done());
});

describe('/Post employee',()=>{
  it('should test employee record',(done)=>{

    var emp_name='Sai kaaju';
    request(app)
    .post('/employee')
    .send({emp_name})
    .expect(200)
    .expect((res)=>{
      expect(res.body.emp_name).toBe(emp_name)
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      Employee.find().then((employee)=>{
        expect(employee.length).toBe(1);
        expect(employee[0].emp_name).toBe(emp_name);
        done();
      }).catch((err)=>done(err));
    });
  });
it('should test invalid data',(done)=>{
  request(app)
  .post('/employee')
  .send({})
  .expect(400)
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    Employee.find().then((employee)=>{
      expect(employee.length).toBe(0);
      done();
    }).catch((err)=>done(err));
  });
});
});
