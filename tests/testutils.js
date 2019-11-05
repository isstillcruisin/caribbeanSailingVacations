const db = require('../models')
const nock = require('nock')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const _ = require('lodash')
const expect = chai.expect

chai.use(chaiHttp)

const FAKE_TA = {
  email: 'faketravelagent@faker.com',
  password: 'Testing123'
}

const FAKE_ADMIN = {
  email: 'fakeadmin@faker.com',
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

const mockSendgrid = (expectedBody) => {
  return nock('https://api.sendgrid.com')
    .post('/v3/mail/send', body => {
      return _.matches(expectedBody)(body)
    })
    .reply(200, {})
}

const setupAdminUser = done => {
  db.User.create({
    email: FAKE_ADMIN.email,
    password: FAKE_ADMIN.password,
    isAdmin: true,
    isVerified: true,
    firstName: 'Fake',
    lastName: 'Admin',
    phoneNumber: '(000)000-0000'
  })
    .then(() => done())
}

const teardownAdminUser = done => {
  db.User.deleteMany({ email: FAKE_ADMIN.email })
    .then(() => done())
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
        companyName: 'fake company',
        streetAddress: '123 fake street',
        city: 'fake city',
        state: 'FF',
        country: 'USA',
        zipCode: '00000',
        title: 'The Best Fake White Label',
        aboutText: 'THIS IS THE BEST FAKE WHITE LABEL EVER!',
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
              db.WhiteLabel.deleteMany({ name: { $regex: /fakeWhiteLabel/ } })
                .then(() => {
                  db.User.deleteMany({ email: FAKE_TA.email })
                    .then(() => done())
                })
            })
        })
    })
}

const anObjectIncludesEachTest = (array, testArray) => {
  testArray.forEach(test => {
    expect(test).to.satisfy(testObject => {
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

module.exports = {
  FAKE_TA, getToken, mockSendgrid, teardownEBrochureThroughUser, setupUserThroughEBrochure, anObjectIncludesEachTest
}
