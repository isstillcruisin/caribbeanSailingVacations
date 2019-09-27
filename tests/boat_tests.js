// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Boats", () => {
  describe("GET /Boats", () => {
    // Test to get all boats record
    it("should get all boats record", (done) => {
      chai.request(app)
          .get('/api/boats')
          .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('array');
             res.body.should.have.length(3);
             done();
          });
    });
    // Test to get single boat record
    it("should get a single boat record", (done) => {
      const id = '5ce5a4544d51a0797ad4f6a3';
      chai.request(app)
          .get(`/api/boats/${id}`)
          .end((err, res) => {
            console.log("****", res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('boatName');
            done();
          });
    });
         
        // // Test to get single boat record
        // it("should not get a single boat record", (done) => {
        //      const id = 5;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(404);
        //              done();
        //           });
        //  });
  });
});