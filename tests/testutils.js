const db = require('../models')
const nock = require('nock')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)

const FAKE_TA = {
  email: 'faketravelagent@faker.com',
  password: 'Testing123'
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

const mockSendgrid = () => {
  nock('https://api.sendgrid.com')
    .post('/v3/mail/send')
    .reply(200, {})
}

const setupUserThroughEBrochure = done => {
  db.User.create({ 
    email: FAKE_TA.email,
    password: FAKE_TA.password,
    isAdmin: false,
    isVerified: true,
    firstName: 'Fake',
    lastName: 'Agent',
    phoneNumber: '(000)000-0000' 
  })
    .then(ta => {
      db.WhiteLabel.create({
        name: 'fakeWhiteLabel',
        isConfirmed: true,
        _travelAgent: ta
      })
        .then(dbWhiteLabel => {
          db.Boat.create({
            boatName: 'FakeBoat',
            year: 1999,
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
                .then(() => done())
            })
        })
    })
}

const teardownEBrochureThroughUser = done => {
  db.CharterInquiry.deleteMany({ firstName: 'Fake', lastName: 'Person' })
    .then(() => {
      db.EBrochure.deleteMany({ name: 'FakeEBrochure' })
        .then(() => {
          db.Boat.deleteMany({ boatName: 'FakeBoat' })
            .then(() => {
              db.WhiteLabel.deleteMany({ name: 'fakeWhiteLabel' })
                .then(() => {
                  db.User.deleteMany({ email: FAKE_TA.email })
                  .then(() => done())
                })
            })
        })
    })
}

module.exports = { 
  FAKE_TA, getToken, mockSendgrid, teardownEBrochureThroughUser, setupUserThroughEBrochure 
}