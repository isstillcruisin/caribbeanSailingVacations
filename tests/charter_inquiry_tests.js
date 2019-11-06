/* eslint-disable no-unused-expressions */
// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const db = require('../models')
const testutils = require('./testutils')
const expect = chai.expect

// Configure chai
chai.use(chaiHttp)

const EXPECTED_INQUIRY = {
  firstName: 'Fake',
  lastName: 'Person',
  email: 'foo@bizzle.co',
  estimatedPrice: 99999.99,
  numberOfPassengers: 5,
  confirmed: false,
  sentPreferencesEmail: false,
  sentOrientationEmail: false,
  startDate: new Date(2021, 0, 1).toISOString(),
  endDate: new Date(2021, 0, 7).toISOString()
}

describe('CharterInquiries', () => {
  before(function (done) {
    testutils.setupUserThroughEBrochure(done)
  })

  after(function (done) {
    testutils.teardownEBrochureThroughUser(done)
  })

  const getCharterInquiries = (token) => {
    let promise = chai.request(app)
      .get('/api/charterinquiries/fakeWhiteLabel')
    if (token) {
      promise = promise.set({ Authorization: `Bearer ${token}` })
    }
    return promise.send()
  }

  const confirmCharterInquiry = (charterInquiry, token) => {
    let promise = chai.request(app)
      .get(`/api/charterinquiries/confirm/${charterInquiry._id}`)
    if (token) {
      promise = promise.set({ Authorization: `Bearer ${token}` })
    }
    return promise.send()
  }

  const sendCharterInquiryOrientation = (charterInquiry, token) => {
    let promise = chai.request(app)
      .get(`/api/charterinquiries/orientation/${charterInquiry._id}`)
    if (token) {
      promise = promise.set({ Authorization: `Bearer ${token}` })
    }
    return promise.send()
  }

  const makeCreateRequest = (eBrochure, yacht) => {
    const promise = chai.request(app)
      .post('/api/charterinquiries')
      .type('form')
    return promise.send(
      Object.assign(
        {},
        EXPECTED_INQUIRY,
        {
          eBrochure: {
            _id: eBrochure._id.toString(),
            _whiteLabel: {
              _id: eBrochure._whiteLabel._id.toString()
            }
          },
          yacht: {
            _id: yacht._id.toString()
          }
        }
      )
    )
  }

  const checkFakeInquiries = (unconfirmed, confirmed, token, done) => {
    getCharterInquiries(token)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body.confirmed).to.be.a('array')
          expect(res.body.confirmed).to.have.lengthOf(confirmed.length)
          expect(res.body.unconfirmed).to.be.a('array')
          expect(res.body.unconfirmed).to.have.lengthOf(unconfirmed.length)
          testutils.anObjectIncludesEachTest(res.body.unconfirmed, unconfirmed)
          testutils.anObjectIncludesEachTest(res.body.confirmed, confirmed)
          done()
        }
      })
  }

  describe('GET /api/charterinquiries/:whiteLabelName', () => {
    // Test to get all charter inquiries for a white label
    it('should get all charter inquiry records when logged in', (done) => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          checkFakeInquiries([], [], token, done)
        })
    })

    it('should return 401 when not logged in', (done) => {
      getCharterInquiries(null)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(401)
            done()
          }
        })
    })
  })

  describe('POST /api/charterinquiries', () => {
    it('should add a charter inquiry', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure' })
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              const nock = testutils.mockSendgrid({
                from: {
                  email: 'bookings@caribbeansailingvacations.com'
                },
                subject: 'Yacht Charter Inquiry',
                content:
                  [
                    {
                      type: 'text/html',
                      value: 'Dear Fake Agent:<br>You have received the following Yacht Charter Inquiry:<table><tr><td>Name:</td><td>Fake Person</td></tr><tr><td>Email:</td><td>foo@bizzle.co</td></tr><tr><td>Yacht:</td><td>FakeBoat</td></tr><tr><td>Number of Passengers:</td><td>5</td></tr><tr><td>Dates:</td><td>January 1, 2021 - January 7, 2021</td></tr><tr><tr>Price Per Week:</td><td>$30,000.00</td></tr><tr><tr>Estimated Price:</td><td>$99,999.99</td></tr></table>'
                    }
                  ]
              })
              makeCreateRequest(dbEBrochure, dbYacht)
                .then(() => {
                  testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
                    .then(token => {
                      expect(nock.isDone()).to.be.true
                      checkFakeInquiries([EXPECTED_INQUIRY], [], token, done)
                    })
                })
            })
        })
    })
  })

  describe('GET /api/charterinquiries/confirm/:id', () => {
    it('should set a charter inquiry as confirmed', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure' })
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person' })
                .then(dbCharterInquiry => {
                  testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
                    .then(token => {
                      const nock = testutils.mockSendgrid({
                        from: { email: 'bookings@caribbeansailingvacations.com' },
                        subject: 'Yacht Charter Confirmed',
                        content: [{
                          type: 'text/html',
                          value: 'Dear Fake Person,<br><br>Congratulations! The dates you requested have been reserved and all parties have signed the contract!</br></br><br>Yacht: FakeBoat</br><br>Dates: January 1, 2021 - January 7, 2021<br><br>Thanks,<br><br>Fake Agent'
                        }]
                      })
                      confirmCharterInquiry(dbCharterInquiry, token)
                        .then(() => {
                          expect(nock.isDone()).to.be.true
                          checkFakeInquiries(
                            [],
                            [Object.assign({}, EXPECTED_INQUIRY, { confirmed: true })],
                            token,
                            done
                          )
                        })
                    })
                })
            })
        })
    })

    it('should return a 401 when not logged in at all', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure' })
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person' })
                .then(dbCharterInquiry => {
                  confirmCharterInquiry(dbCharterInquiry, null)
                    .end((err, res) => {
                      if (err) {
                        done(err)
                      } else {
                        expect(res).to.have.status(401)
                        done()
                      }
                    })
                })
            })
        })
    })
  })

  describe('GET /api/charterinquiries/orientation/:id', () => {
    it('should set a charter inquiry as sentOrientationEmail', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure' })
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person' })
                .then(dbCharterInquiry => {
                  testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
                    .then(token => {
                      const nock = testutils.mockSendgrid({
                        from: { email: 'bookings@caribbeansailingvacations.com' },
                        subject: 'Yacht Charter Orientation',
                        content: [{
                          type: 'text/html',
                          value: 'Dear Fake Person,\n\n<br><br>Congratulations on your scheduled Yacht Charter! \n<br>Please download and read the material in this orientation PDF:\n https://charter-assistant.s3.amazonaws.com/Charter+Orientation+2019.pdf<br><br>Thanks,<br><br>Fake Agent<br><br>faketravelagent@faker.com</br></br>'
                        }]
                      })
                      sendCharterInquiryOrientation(dbCharterInquiry, token)
                        .then(() => {
                          expect(nock.isDone()).to.be.true
                          checkFakeInquiries(
                            [],
                            [Object.assign({}, EXPECTED_INQUIRY, { confirmed: true, sentOrientationEmail: true })],
                            token,
                            done
                          )
                        })
                    })
                })
            })
        })
    })

    it('should return a 401 when not logged in at all', done => {
      db.EBrochure.findOne({ name: 'FakeEBrochure' })
        .populate('_whiteLabel')
        .then(dbEBrochure => {
          db.Boat.findOne({ boatName: 'FakeBoat' })
            .then(dbYacht => {
              db.CharterInquiry.findOne({ firstName: 'Fake', lastName: 'Person' })
                .then(dbCharterInquiry => {
                  sendCharterInquiryOrientation(dbCharterInquiry, null)
                    .end((err, res) => {
                      if (err) {
                        done(err)
                      } else {
                        expect(res).to.have.status(401)
                        done()
                      }
                    })
                })
            })
        })
    })
  })
})
