// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require("../models");

// Configure chai
chai.use(chaiHttp);
chai.should();
describe('Boats', () => {
  describe('GET /api/boats', () => {
    // Test to get all boats record
    it('should get all boats record', (done) => {
      chai.request(app)
          .get('/api/boats')
          .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('array');
             res.body.should.have.length(3);
             done();
          });
    });
    // Test to get single boat record
    it('should get a single boat record', (done) => {
      const id = '5ce5a4544d51a0797ad4f6a3';
      chai.request(app)
          .get(`/api/boats/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.boatName.should.equal('Excess');
            res.body.year.should.equal(2011);
            res.body.maxPassengers.should.equal(8);
            res.body.manufacture.should.equal('N/A');
            res.body.crewBio.should.equal('There is no crew bio here, but I felt like it needed something.');
            done();
          });
    });
         
    // Test to get single boat record
    it('should not get a single boat record', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/boats/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
     });
  });

  describe('POST /api/boats', () => {
    after(function(done) {
      db.Boat.deleteMany({boatName: 'FakeBoat'})
        .then(() => done());
    });

    describe('When not authenticated', () => {
      it('should return a 401', (done) => {
        chai.request(app)
          .post('/api/boats/')
          .type('form')
          .send({
            'boatName': 'FakeBoat',
            'year': 1999,
            maxPassengers: 5,
            manufacture: 'Anything',
            crewBio: 'No Bio Needed',
          })
          .end(function (err, res) {
            res.should.have.status(401);
            done();          
          });
      });
    })

    describe('When authenticated as a travel agent user', () => {
      const userCredentials = {
        email: 'michaelarick+travelagent@gmail.com', 
        password: 'Testing123'
      }
      let token = null

      before(function(done){
        chai.request(app)
          .post('/api/users/signin')
          .set({
            'Authorization': `Bearer ${token}`
          })
          .type('form')
          .send(userCredentials)
          .end(function(err, res){
            res.should.have.status(200);
            token = res.body.token;
            done();
          });
      });

      it('should return a 401', (done) => {
        chai.request(app)
          .post('/api/boats/')
          .type('form')
          .set({
            'Authorization': `Bearer ${token}`
          })
          .send({
            'boatName': 'FakeBoat',
            'year': 1999,
            maxPassengers: 5,
            manufacture: 'Anything',
            crewBio: 'No Bio Needed',
          })
          .end(function (err, res) {
            res.should.have.status(401);
            done();          
          });
      });
    })

    describe('When authenticated as an admin user', () => {
      const userCredentials = {
        email: 'michaelarick@gmail.com', 
        password: 'Testing123'
      }
      let token = null

      before(function(done){
        chai.request(app)
          .post('/api/users/signin')
          .type('form')
          .send(userCredentials)
          .end(function(err, res){
            res.should.have.status(200);
            token = res.body.token;
            done();
          });
      });

      it('should add a yacht to the list of yachts', (done) => {
        chai.request(app)
          .post('/api/boats/')
          .set({
            'Authorization': `Bearer ${token}`
          })
          .type('form')
          .send({
            'boatName': 'FakeBoat',
            'year': 1999,
            maxPassengers: 5,
            manufacture: 'Anything',
            crewBio: 'No Bio Needed',
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.boatName.should.equal('FakeBoat');
            done();          
          });
      });
    });
  });

});