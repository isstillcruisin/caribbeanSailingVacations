// Import the dependencies for testing
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../index')
const db = require('../../models')
const testutils = require('../testutils')

// Configure chai
chai.use(chaiHttp)

describe('Users', () => {
  beforeEach(function (done) {
    testutils.setupUserThroughEBrochure(done)
  })

  afterEach(function (done) {
    testutils.teardownEBrochureThroughUser(done)
  })

  describe('POST /signin', () => {
    before(function (done) {
      testutils.setupAdminUser(done)
    })

    after(function (done) {
      testutils.teardownAdminUser(done)
    })

    it('signs in the user', done => {
      const promise = chai.request(app)
        .post(`/api/users/signin`)
        .type('form')
      promise.send({
        email: testutils.FAKE_TA.email,
        password: testutils.FAKE_TA.password
      })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body.token).to.be.a.string
            expect(res.body.adminMode).to.be.false
            done()
          }
        })
    })
    it('signs in the admin user', done => {
      const promise = chai.request(app)
        .post(`/api/users/signin`)
        .type('form')
      promise.send({
        email: testutils.FAKE_ADMIN.email,
        password: testutils.FAKE_ADMIN.password
      })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body.token).to.be.a.string
            expect(res.body.adminMode).to.be.true
            done()
          }
        })
    })
    it('returns a 401 if the passed-in password does not match the user password', done => {
      const promise = chai.request(app)
        .post(`/api/users/signin`)
        .type('form')
      promise.send({
        email: testutils.FAKE_TA.email,
        password: 'notTheCorrectPassword'
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
  describe('POST /signup', () => {
    after(function (done) {
      db.User.deleteMany({ email: 'test@faker.com' })
        .then(() => done())
    })
    it('sends an email to the admin users if the user successfully signs up', done => {
      const promise = chai.request(app)
        .post(`/api/users/signup`)
        .type('form'),
        nock = testutils.mockSendgrid({
          from: { email: 'bookings@caribbeansailingvacations.com' },
          subject: 'Charter Assistant Email Verification'
        })
      promise.send({
        email: 'test@faker.com',
        password: testutils.FAKE_TA.password,
        firstName: 'Test',
        lastName: 'User'
      })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body.user).to.include({
              email: 'test@faker.com',
              firstName: 'Test',
              lastName: 'User'
            })
            expect(nock.isDone()).to.be.true
            done()
          }
        })  
    })

    it('returns a 400 if the passed-in username has already been taken', done => {
      const promise = chai.request(app)
        .post(`/api/users/signup`)
        .type('form')
      promise.send({
        email: testutils.FAKE_TA.email,
        password: testutils.FAKE_TA.password,
        firstName: 'Test',
        lastName: 'User'
      })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(400)
            done()
          }
        })
    })
  })
  describe('GET /confirmation/:id', () => {
    it('sets the account to be confirmed if the passed in token is valid', done => {
      db.User.findOneAndUpdate({email: testutils.FAKE_TA.email}, {isVerified: false})
        .then(dbUser => {
          db.Token.create({
            _userId: dbUser._id,
            token: 'ABCDEF',
            type: 'confirm'
          })
            .then(() => {
              const promise = chai.request(app)
                .get('/api/users/confirmation/ABCDEF')
              promise.send()
                .end((err, res) => {
                  if (err) {
                    done(err)
                  } else {
                    expect(res).to.have.status(200)
                    expect(res.body).to.deep.equal({message: 'This Travel Agent account has been verified. Please log in.'})
                    done()
                  }
                })
            })
        })
    })

    it('returns a 400 if the token is not valid', done => {
      const promise = chai.request(app)
        .get('/api/users/confirmation/ABACABA999ABACABA')
      promise.send()
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(400)
            done()
          }
        })
    })
  })
  describe('GET /current', () => {
    it('returns the user whose token we have', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          const promise = chai.request(app)
            .get('/api/users/current')
            .set({ Authorization: `Bearer ${token}` })
          promise.send()
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                const { password, ...expected_props } = testutils.EXPECTED_USER
                expect(res).to.have.status(200)
                expect(res.body).to.include(expected_props)
                done()
              }
            })
        })     
    })
  })
  describe('POST /resetpasswordemail', () => {
    it('sends an email to the user with a reset token', done => {
      const promise = chai.request(app)
        .post('/api/users/resetpasswordemail')
        .type('form'),
        nock = testutils.mockSendgrid({
          from: { email: 'bookings@caribbeansailingvacations.com' },
          subject: 'Password Reset',
        })
      promise.send({email: testutils.FAKE_TA.email})
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
  describe('POST /resetpassword', () => {
    it('lets you reset the password via the reset token', done => {
      db.User.findOne({email: testutils.FAKE_TA.email})
        .then(dbUser => {
          db.Token.create({
            _userId: dbUser._id,
            token: 'ABCDEF',
            type: 'passwordreset'
          })
            .then(() => {
              const promise = chai.request(app)
                .post('/api/users/resetpassword')
                .type('form')
              promise.send({password: 'NewPassword', token: 'ABCDEF'}) 
                .end((err, res) => {
                  if (err) {
                    done(err)
                  } else {
                    testutils.getToken(testutils.FAKE_TA.email, 'NewPassword')
                      .then(token => {
                        const promise = chai.request(app)
                          .get('/api/users/current')
                          .set({ Authorization: `Bearer ${token}` })
                        promise.send()
                          .end((err, res) => {
                            if (err) {
                              done(err)
                            } else {
                              const { password, ...expected_props } = testutils.EXPECTED_USER
                              expect(res).to.have.status(200)
                              expect(res.body).to.include(expected_props)
                              done()
                            }
                          })
                      })
                  }
                })     
            })
        })
    })

    it('does not lets you reset the password if the token is bad', done => {
      db.User.findOne({email: testutils.FAKE_TA.email})
        .then(dbUser => {
          db.Token.create({
            _userId: dbUser._id,
            token: 'ABCDEF',
            type: 'passwordreset'
          })
            .then(() => {
              const promise = chai.request(app)
                .post('/api/users/resetpassword')
                .type('form')
              promise.send({password: 'NewPassword', token: 'ABCDEF0'}) 
                .end((err, res) => {
                  if (err) {
                    done(err)
                  } else {
                    expect(res).to.have.status(401)
                    //Make sure the old password still works:
                    testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
                      .then(token => {
                        const promise = chai.request(app)
                          .get('/api/users/current')
                          .set({ Authorization: `Bearer ${token}` })
                        promise.send()
                          .end((err, res) => {
                            if (err) {
                              done(err)
                            } else {
                              const { password, ...expected_props } = testutils.EXPECTED_USER
                              expect(res).to.have.status(200)
                              expect(res.body).to.include(expected_props)
                              done()
                            }
                          })
                      })
                  }
                }) 
            })
        })
    })
  })
  describe('POST /update', () => {
    it('updates the information about the user if the token is passed in', done => {
      testutils.getToken(testutils.FAKE_TA.email, testutils.FAKE_TA.password)
        .then(token => {
          const promise = chai.request(app)
            .post('/api/users/update')
            .set({ Authorization: `Bearer ${token}` })
            .type('form')
          promise.send({
            firstName: 'AlsoFake',
            lastName: 'AlsoAgent',
            phoneNumber: '(111)111-1111',
          })
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res).to.have.status(200)
                const promise2 = chai.request(app)
                  .get('/api/users/current')
                  .set({ Authorization: `Bearer ${token}` })
                promise2.send()
                  .end((err, res) => {
                    if (err) {
                      done(err)
                    } else {
                      const { password, ...expected_props } = 
                        Object.assign({}, testutils.EXPECTED_USER, {
                          firstName: 'AlsoFake',
                          lastName: 'AlsoAgent',
                          phoneNumber: '(111)111-1111',
                        })
                      expect(res).to.have.status(200)
                      expect(res.body).to.include(expected_props)
                      done()
                    }
                  })
              }
            })
        })
    })

    it('returns a 401 unauthorized if no token is passed in', done => {
      const promise = chai.request(app)
        .post('/api/users/update')
        .type('form')
      promise.send({
        firstName: 'AlsoFake',
        lastName: 'AlsoAgent',
        phoneNumber: '(111)111-1111',
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
