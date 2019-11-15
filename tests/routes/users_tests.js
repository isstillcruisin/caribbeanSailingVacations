// Import the dependencies for testing
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../index')
const db = require('../../models')
const testutils = require('../testutils')

// Configure chai
chai.use(chaiHttp)


// router.route('/current').get(userController.currentUser)

// router.route('/resetpasswordemail').post(userController.resetPasswordEmail)

// router.route('/resetpassword').post(userController.resetPassword)

// router.route('/update').post(userController.update)

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
  describe('POST /resetpasswordemail', () => {})
  describe('POST /resetpassword', () => {})
  describe('POST /update', () => {})
})    
