// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const db = require('../models')
const testutils = require('./testutils')

// Configure chai
chai.use(chaiHttp)
chai.should()

const EXPECTED_WHITE_LABEL = {
  name: 'fakeWhiteLabel',
  isConfirmed: true,
  companyName: 'fake company',
  streetAddress: '123 fake street',
  city: 'fake city',
  state: 'FF',
  country: 'USA',
  zipCode: '00000',
  title: 'The Best Fake White Label',
  aboutText: 'THIS IS THE BEST FAKE WHITE LABEL EVER!'
}

describe('WhiteLabels', () => {
  const getCurrentUserWhiteLabels = (token) => {
    let promise = chai.request(app)
      .get('/api/whitelabels/forcurrentuser')
    if (token) {
      promise = promise.set({ Authorization: `Bearer ${token}` })
    }
    return promise.send()
  }

  const checkCurrentUserWhiteLabels = (whiteLabels, token, done) => {
    getCurrentUserWhiteLabels(token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.have.lengthOf(whiteLabels.length)
        testutils.anObjectIncludesEachTest(res.body, whiteLabels)
        done()
      })
  }

  beforeEach(function (done) {
    testutils.setupUserThroughEBrochure(done)
  })

  afterEach(function (done) {
    testutils.teardownEBrochureThroughUser(done)
  })


  describe('GET /api/whitelabels/forcurrentuser', () => {
    it('should get all white labels for this travel agent when logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          checkCurrentUserWhiteLabels([EXPECTED_WHITE_LABEL], token, done)
        })
    })

    it('should return 401 when not logged in', done => {
      getCurrentUserWhiteLabels(null)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
  })

  describe('POST /api/whitelabels/update/:id', () => {
    it('should update the white label when logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          getCurrentUserWhiteLabels(token)
            .then(res => {
              const whiteLabel = res.body[0]
              let promise = chai.request(app)
                .post(`/api/whitelabels/update/${whiteLabel._id}`)
                .type('form')
                .set({ Authorization: `Bearer ${token}` })
              promise.send({
                companyName: 'fake company ALSO',
              })
                .then(res => {
                  checkCurrentUserWhiteLabels([Object.assign({}, EXPECTED_WHITE_LABEL, {companyName: 'fake company ALSO'})], token, done)
                })
            })
        })
    })

    it('should return a 401 when not logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          getCurrentUserWhiteLabels(token)
            .then( res => {
              const whiteLabel = res.body[0]
              let promise = chai.request(app)
                .post(`/api/whitelabels/update/${whiteLabel._id}`)
                .type('form')
              promise.send({
                companyName: 'fake company ALSO',
              })
                .end((err, res) => {       
                  res.should.have.status(401)
                  done()
                })
            })
        })
    })
  })
})
