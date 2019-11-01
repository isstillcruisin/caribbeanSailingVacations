// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require("../models");

// Configure chai
chai.use(chaiHttp);
chai.should();
describe('CharterInquiries', () => {

  const getToken = (email, password) => {
    const userCredentials = {
      email: email, 
      password: password
    }
    return chai.request(app)
      .post('/api/users/signin')
      .type('form')
      .send(userCredentials)
      .then(function(res){
        return res.body.token;
      });
  } 


  before(function(done) {
    db.User.findOne({email: 'michaelarick+travelagent@gmail.com'})
      .then(ta => {
        db.WhiteLabel.create({ 
          name: 'fakeWhiteLabel', 
          isConfirmed: true, 
          _travelAgent: ta 
        })
          .then(dbWhiteLabel => {
            db.Boat.create({
              'boatName': 'FakeBoat',
              'year': 1999,
              maxPassengers: 5,
              manufacture: 'Anything',
              crewBio: 'No Bio Needed',
              pricePerWeek: 30000,
              cyaId: 123
            })
              .then(dbYacht => {
                db.EBrochure.create({ 
                  name: 'FakeEBrochure', 
                  _whiteLabel: dbWhiteLabel, 
                  isConfirmed: true, 
                  yachts: [dbYacht] 
                })
                  .then(() => done());
              })
          })
      })
  })

  after(function(done) {
    db.CharterInquiry.deleteMany({ firstName: 'Fake', lastName: 'Person' })
      .then(() => {
        db.EBrochure.deleteMany({ name: 'FakeEBrochure'})
          .then(() => {
            db.Boat.deleteMany({boatName: 'FakeBoat'})
              .then(() => {
                db.WhiteLabel.deleteMany({name: 'fakeWhiteLabel'})
                  .then(() => done())
              })        
          })
      })
  })

  const getCharterInquiries = (token) => {
    let promise = chai.request(app)
      .get('/api/charterinquiries/fakeWhiteLabel');
    if (token) {
      promise = promise.set({'Authorization': `Bearer ${token}`});
    }
    return promise.send()
  }

  const makeCreateRequest = (eBrochure, yacht) => {
      let promise = chai.request(app)
            .post('/api/charterinquiries')
            .type('form');
      return promise.send({
        firstName: 'Fake',
        lastName: 'Person',
        startDate: new Date(),
        endDate: new Date(),
        email: 'foo@bizzle.co',
        estimatedPrice: 99999.99,
        numberOfPassengers: 5,
        confirmed: false,
        sentPreferencesEmail: false,
        sentOrientationEmail: false,
        eBrochure: { 
          _id: eBrochure._id.toString(), 
          _whiteLabel: {
            _id: eBrochure._whiteLabel._id.toString()
          }
        },
        yacht: { 
          _id: yacht._id.toString() 
        }
      });
  }

  const checkFakeInquiries = (unconfirmedCount, confirmedCount, done) => {
    getToken('michaelarick+travelagent@gmail.com', 'Testing123')
      .then(token => {
        getCharterInquiries(token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.confirmed.should.be.a('array')
            res.body.confirmed.should.have.lengthOf(confirmedCount)
            res.body.unconfirmed.should.be.a('array')
            res.body.unconfirmed.should.have.lengthOf(unconfirmedCount)
            done()
          })
      })
  }

  describe('GET /api/charterinquiries/:whiteLabelName', () => {
    // Test to get all charter inquiries for a white label
    it('should get all charter inquiry records when logged in', (done) => {
      checkFakeInquiries(0, 0, done)
    });

    it('should return 401 when not logged in', (done) => {
      getCharterInquiries(null)
        .end((err, res) => {
          res.should.have.status(401);
          done();          
        });
    });
  });

  describe('POST /api/charterinquiries', () => {
    it('should add a charter inquiry', (done) => {
      db.EBrochure.findOne({ name: 'FakeEBrochure'})
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              makeCreateRequest(dbEBrochure, dbYacht)
                .then(() => {
                  checkFakeInquiries(1, 0, done);
                })
            })
        })
    })
  })
})