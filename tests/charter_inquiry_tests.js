// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require("../models");
const nock = require('nock');

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

  const mockSendgrid = () => {
    nock('https://api.sendgrid.com')
      .post('/v3/mail/send')
      .reply(200, {})    
  }

  const getCharterInquiries = (token) => {
    let promise = chai.request(app)
      .get('/api/charterinquiries/fakeWhiteLabel');
    if (token) {
      promise = promise.set({'Authorization': `Bearer ${token}`});
    }
    return promise.send()
  }

  const confirmCharterInquiry = (charterInquiry, token) => {
    let promise = chai.request(app)
      .get(`/api/charterinquiries/confirm/${charterInquiry._id}`);
    if (token) {
      promise = promise.set({'Authorization': `Bearer ${token}`});
    }
    mockSendgrid();
    return promise.send()
  }

  const makeCreateRequest = (eBrochure, yacht) => {
    let promise = chai.request(app)
          .post('/api/charterinquiries')
          .type('form');
    mockSendgrid();
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

  const anObjectIncludesEachTest = (array, testArray) => {
    testArray.forEach(test => {
      test.should.satisfy(testObject => {
        return !!array.find(object => {
          foundAll = true
          Object.keys(testObject).forEach(key => {
            if (object[key] !== testObject[key]) {
              foundAll = false
            } 
          })
          return foundAll
        })
      })
    })
  }

  const checkFakeInquiries = (unconfirmed, confirmed, token, done) => {
    getCharterInquiries(token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.confirmed.should.be.a('array')
        res.body.confirmed.should.have.lengthOf(confirmed.length)
        res.body.unconfirmed.should.be.a('array')
        res.body.unconfirmed.should.have.lengthOf(unconfirmed.length)
        anObjectIncludesEachTest(res.body.unconfirmed, unconfirmed)
        anObjectIncludesEachTest(res.body.confirmed, confirmed)
        done()
      })
  }

  describe('GET /api/charterinquiries/:whiteLabelName', () => {
    // Test to get all charter inquiries for a white label
    it('should get all charter inquiry records when logged in', (done) => {
      getToken('michaelarick+travelagent@gmail.com', 'Testing123')
        .then(token => {
          checkFakeInquiries([], [], token, done)
        })
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
    it('should add a charter inquiry', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure'})
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              makeCreateRequest(dbEBrochure, dbYacht)
                .then(() => {
                  getToken('michaelarick+travelagent@gmail.com', 'Testing123')
                    .then(token => {
                      checkFakeInquiries([{
                        firstName: 'Fake',
                        lastName: 'Person',
                        email: 'foo@bizzle.co',
                        estimatedPrice: 99999.99,
                        numberOfPassengers: 5,
                        confirmed: false,
                        sentPreferencesEmail: false,
                        sentOrientationEmail: false,
                      }], [], token, done);
                    })
                })
            })
        })
    })
  })

  describe('GET /api/charterinquiries/confirm/:id', () => {
    it('should set a charter inquiry as confirmed', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure'})
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person'})
                .then(dbCharterInquiry => {
                  getToken('michaelarick+travelagent@gmail.com', 'Testing123')
                    .then(token => {
                      confirmCharterInquiry(dbCharterInquiry, token)
                        .then(() => {
                          checkFakeInquiries([],
                            [{
                              firstName: 'Fake',
                              lastName: 'Person',
                              email: 'foo@bizzle.co',
                              estimatedPrice: 99999.99,
                              numberOfPassengers: 5,
                              confirmed: true,
                              sentPreferencesEmail: false,
                              sentOrientationEmail: false,
                            }], token, done
                          )
                        })
                    })
                })
            })
        })
    })

    it('should return a 401 when not logged in at all', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure'})
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person'})
                .then(dbCharterInquiry => {
                  confirmCharterInquiry(dbCharterInquiry, null)
                    .end((err, res) => {
                      res.should.have.status(401);
                      done();
                    })
                })
            })
        })
    })
  })
})