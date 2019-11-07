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
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
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
  })
})
