// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../index')
const db = require('../../models')

// Configure chai
chai.use(chaiHttp)
chai.should()
describe('Boats', () => {
  describe('GET /api/boats', () => {
    // Test to get all boats record
    it('should get all boats record', (done) => {
      chai.request(app)
        .get('/api/boats')
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.should.have.length(4)
            done()
          }
        })
    })
    // Test to get single boat record
    it('should get a single boat record', (done) => {
      const id = '5ce5a4544d51a0797ad4f6a3'
      chai.request(app)
        .get(`/api/boats/${id}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.boatName.should.equal('Excess')
            res.body.year.should.equal(2011)
            res.body.maxPassengers.should.equal(8)
            res.body.manufacture.should.equal('Wood and fiberglass')
            res.body.crewBio.should.equal('There is no crew bio here, but I felt like it needed something.')
            res.body.pricePerWeek.should.equal(20000)
            done()
          }
        })
    })

    // Test to get single boat record
    it('should not get a single boat record', (done) => {
      const id = 5
      chai.request(app)
        .get(`/api/boats/${id}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            res.should.have.status(404)
            done()
          }
        })
    })
  })

  describe('POST /api/boats', () => {
    const makeCreateRequest = (token) => {
      let promise = chai.request(app)
        .post('/api/boats/')
        .type('form')
      if (token) {
        promise = promise.set({ Authorization: `Bearer ${token}` })
      }
      return promise.send({
        boatName: 'FakeBoat',
        year: 1999,
        maxPassengers: 5,
        manufacture: 'Anything',
        crewBio: 'No Bio Needed',
        pricePerWeek: 30000,
        cyaId: 123
      })
    }

    const getToken = (email, password) => {
      const userCredentials = {
        email: email,
        password: password
      }
      return chai.request(app)
        .post('/api/users/signin')
        .type('form')
        .send(userCredentials)
        .then(function (res) {
          return res.body.token
        })
    }

    after(function (done) {
      db.Boat.deleteMany({ boatName: 'FakeBoat' })
        .then(() => done())
    })

    describe('When not authenticated', () => {
      it('should return a 401', (done) => {
        makeCreateRequest(null)
          .end(function (err, res) {
            if (err) {
              done(err)
            } else {
              res.should.have.status(401)
              done()
            }
          })
      })
    })

    describe('When authenticated as a travel agent user', () => {
      it('should return a 401', (done) => {
        getToken('michaelarick+travelagent@gmail.com', 'Testing123')
          .then(token => {
            makeCreateRequest(token)
              .end(function (err, res) {
                if (err) {
                  done(err)
                } else {
                  res.should.have.status(401)
                  done()
                }
              })
          })
      })
    })

    describe('When authenticated as an admin user', () => {
      it('should add a yacht to the list of yachts', (done) => {
        getToken('michaelarick@gmail.com', 'Testing123')
          .then((token) => {
            makeCreateRequest(token)
              .end(function (err, res) {
                if (err) {
                  done(err)
                } else {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.boatName.should.equal('FakeBoat')
                  res.body.year.should.equal(1999)
                  res.body.maxPassengers.should.equal(5)
                  res.body.manufacture.should.equal('Anything')
                  res.body.crewBio.should.equal('No Bio Needed')
                  res.body.pricePerWeek.should.equal(30000)
                  done()
                }
              })
          })
      })
    })
  })
})
