/* eslint-disable no-unused-expressions */
// Import the dependencies for testing
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../index')
const testutils = require('./testutils')

// Configure chai
chai.use(chaiHttp)

// router.route('/:name')
//   .get(whiteLabelController.findByName)

// router.route('/:id/ebrochures/')
//   .post(eBrochureController.create)

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
        if (err) {
          done(err)
        } else {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(whiteLabels.length)
          testutils.anObjectIncludesEachTest(res.body, whiteLabels)
          done()
        }
      })
  }

  beforeEach(function (done) {
    testutils.setupUserThroughEBrochure(done)
  })

  afterEach(function (done) {
    testutils.teardownEBrochureThroughUser(done)
  })

  describe('GET /api/whitelabels/', () => {
    before(function(done) {
      testutils.setupAdminUser(done)
    })

    after(function(done) {
      testutils.teardownAdminUser(done)
    })

    it('should get all white labels when logged in as an administrator', done => {
      testutils.getToken(testutils.FAKE_ADMIN.email, testutils.FAKE_ADMIN.password)
        .then(token => {
          let promise = chai.request(app)
            .get('/api/whitelabels/')
            .set({ Authorization: `Bearer ${token}` })
          promise.send()
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                testutils.anObjectIncludesEachTest(res.body, [EXPECTED_WHITE_LABEL])
                done()
              }
            })
        })
    })

    it('should return 401 when not logged in', done => {
      let promise = chai.request(app)
        .get('/api/whitelabels/')
      promise.send()
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

  describe('GET /api/whitelabels/:name', () => {
    it('should get the named white label if logged in as the travel agent who owns the white label', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          let promise = chai.request(app)
            .get('/api/whitelabels/fakeWhiteLabel')
            .set({ Authorization: `Bearer ${token}` })
          promise.send()
            .end((err, res) => {
               if (err) {
                done(err)
              } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.include(EXPECTED_WHITE_LABEL)
                done()
              }
            })
        })
    })
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
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(401)
            done()
          }
        })
    })
  })

  describe('POST /api/whitelabels', () => {
    it('should create a new white label when logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          const promise = chai.request(app)
            .post('/api/whitelabels')
            .type('form')
            .set({ Authorization: `Bearer ${token}` })

          const nock = testutils.mockSendgrid({
            from: { email: 'bookings@caribbeansailingvacations.com' },
            subject: 'New White Label',
            content: [{
              type: 'text/html',
              value: 'A Travel Agent has signed up for a White Label: <table><tr><td>White Label:</td><td>fakeWhiteLabel2<tr><td>Travel Agent Name:</td><td>Fake Agent</td></tr><tr><td>Travel Agent Email:</td><td>faketravelagent@faker.com</td></tr></table>'
            }]
          })
          promise.send({ name: 'fakeWhiteLabel2' })
            .then(() => {
              expect(nock.isDone()).to.be.true
              checkCurrentUserWhiteLabels([{ name: 'fakeWhiteLabel2' }, EXPECTED_WHITE_LABEL], token, done)
            })
        })
    })

    it('should return 401 when not logged in', done => {
      const promise = chai.request(app)
        .post('/api/whitelabels')
        .type('form')
      promise.send({ name: 'fakeWhiteLabel2' })
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

  describe('POST /api/whitelabels/update/:id', () => {
    it('should update the white label when logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          getCurrentUserWhiteLabels(token)
            .then(res => {
              const whiteLabel = res.body[0]

              const promise = chai.request(app)
                .post(`/api/whitelabels/update/${whiteLabel._id}`)
                .type('form')
                .set({ Authorization: `Bearer ${token}` })
              promise.send({
                companyName: 'fake company ALSO'
              })
                .then(res => {
                  checkCurrentUserWhiteLabels([Object.assign({}, EXPECTED_WHITE_LABEL, { companyName: 'fake company ALSO' })], token, done)
                })
            })
        })
    })

    it('should return a 401 when not logged in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          getCurrentUserWhiteLabels(token)
            .then(res => {
              const whiteLabel = res.body[0]
              const promise = chai.request(app)
                .post(`/api/whitelabels/update/${whiteLabel._id}`)
                .type('form')
              promise.send({
                companyName: 'fake company ALSO'
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

  describe('POST /api/whitelabels/:id/contact', () => {
    it('should send the contact request to the travel agent who created the white label', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          getCurrentUserWhiteLabels(token)
            .then(res => {
              const whiteLabel = res.body[0]

              const promise = chai.request(app)
                .post(`/api/whitelabels/${whiteLabel._id}/contact`)
                .type('form')

              const nock = testutils.mockSendgrid({
                subject: 'Contact Message: Fake Subject',
                content: [
                  {
                    type: 'text/html',
                    value: 'Dear Fake Agent,\n\n<br><br>You have received a message from Fake Visitor (fakevisitor@faker.com).\n<br>The message is:</br><pre>This is a fake message</pre>'
                  }
                ],
                reply_to: { email: 'fakevisitor@faker.com', name: 'Fake Visitor' }
              })
              promise.send({
                subject: 'Fake Subject',
                email: 'fakevisitor@faker.com',
                message: 'This is a fake message',
                firstName: 'Fake',
                lastName: 'Visitor'
              })
                .end((err, res) => {
                  if (err) {
                    done(err)
                  } else {
                    expect(res).to.have.status(200)
                    expect(nock.isDone()).to.be.true
                    done()
                  }
                })
            })
        })
    })
  })
})
