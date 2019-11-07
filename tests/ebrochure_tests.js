/* eslint-disable no-unused-expressions */
// Import the dependencies for testing
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../index')
const testutils = require('./testutils')
const db = require('../models')
// Configure chai
chai.use(chaiHttp)
describe('EBrochures', () => {
  beforeEach(function (done) {
    testutils.setupUserThroughEBrochure(done)
  })

  afterEach(function (done) {
    testutils.teardownEBrochureThroughUser(done)
  })

  describe('GET /api/ebrochures/:id', () => {
    it('should get the ebrochure with that ID', done => {
      db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
        .then(dbEBrochure => {
          const promise = chai.request(app)
            .get(`/api/ebrochures/${dbEBrochure._id}`)
          promise.send()
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.include(testutils.EXPECTED_EBROCHURE)
                expect(res.body._whiteLabel).to.include(testutils.EXPECTED_WHITE_LABEL)
                done()
              }
            })
        })
    })
  })

  describe('GET /api/ebrochures/:id/boats', () => {
    it('should get the empty array of yachts in the eBrochure with that ID', done => {
      db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
        .then(dbEBrochure => {
          const promise = chai.request(app)
            .get(`/api/ebrochures/${dbEBrochure._id}/boats`)
          promise.send()
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                expect(res.body.length).to.equal(1)
                expect(res.body[0]).to.include(testutils.EXPECTED_YACHT)
                done()
              }
            })
        })
    })
  })

  describe('POST /update/:id', () => {
    it('should update the list of yachts in the eBrochure if the user is logged in as the owner', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
            .populate('yachts')
            .then(dbEBrochure => {
              expect(dbEBrochure.yachts).to.be.a('array')
              expect(dbEBrochure.yachts.length).to.eq(1)
              const promise = chai.request(app)
                .post(`/api/ebrochures/update/${dbEBrochure._id}`)
                .type('form')
                .set({ Authorization: `Bearer ${token}` })
              promise.send({
                // NOTE: This had to be JSON.stringified (also the front-end code) and parsed on the backend because of an issue with chai-http
                yachts: JSON.stringify([])
              })
                .end((err, res) => {
                  if (err) {
                    done(err)
                  } else {
                    expect(res).to.have.status(200)
                    db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
                      .populate('yachts')
                      .then(dbEBrochure2 => {
                        expect(dbEBrochure2.yachts).to.be.a('array')
                        expect(dbEBrochure2.yachts.length).to.eq(0)
                        done()
                      })
                  }
                })
            })
        })
    })

    it('should return a 401 if the user is not logged in', done => {
      db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
        .then(dbEBrochure => {
          const promise = chai.request(app)
            .post(`/api/ebrochures/update/${dbEBrochure._id}`)
            .type('form')
          promise.send({
            // NOTE: This had to be JSON.stringified (also the front-end code) and parsed on the backend because of an issue with chai-http
            yachts: JSON.stringify([])
          })
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

  describe('POST /send/:id', () => {
    it('should use sendgrid API to send a link to the E-Brochure', done => {
      db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
        .then(dbEBrochure => {
          const promise = chai.request(app)
            .post(`/api/ebrochures/send/${dbEBrochure._id}`)
            .type('form')

          const nock = testutils.mockSendgrid({
            from: { email: 'bookings@caribbeansailingvacations.com' },
            subject: 'check this e-brochure out',
            content: [{
              type: 'text/html',
              value: `Dear Fake Person,\n\n<br>You should really consider chartering a yacht!\n\n<br>Click here for more details: http://localhost:3000/e-brochure/${dbEBrochure._id}<br>Thanks,<br>Fake Agent<br>faketravelagent@faker.com<br>(000)000-0000`
            }],
            reply_to: { email: 'faketravelagent@faker.com', name: 'Fake Agent' }
          })
          promise.send({
            subject: 'check this e-brochure out',
            firstName: 'Fake',
            lastName: 'Person',
            email: 'fakeperson@faker.com',
            message: 'You should really consider chartering a yacht!'
          })
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(nock.isDone()).to.be.true
                done()
              }
            })
        })
    })
  })

  describe('POST /:id/available', () => {
    it('finds all yachts from the e-brochure that are available during the dates included and with enough capacity for the numPassengers', done => {
      db.EBrochure.findOne(testutils.EXPECTED_EBROCHURE)
        .then(dbEBrochure => {
          const promise = chai.request(app)
            .post(`/api/ebrochures/${dbEBrochure._id}/available`)
            .type('form')
          promise.send({
            startDate: '12/25/2019',
            endDate: '12/31/2019',
            numPassengers: 1
          })
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res.body.yachts).to.be.a('array')
                expect(res.body.yachts.length).to.eq(1)
                expect(res.body.yachts[0]).to.include(testutils.EXPECTED_YACHT)
                done()
              }
            })
        })
    })
  })
})
