const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const Sequelize = require('sequelize');
const Url = require('../server/db/model/url')

chai.use(chaiHttp);

describe('Route', function(){

  describe('showAllUrl', () => {

    it('Show all url page should work', (done) => {
      chai.request('http://localhost:3000')
        .get('/showAllUrl')
        .end((err,res) => {
          if(err) return done(err);
          res.should.have.status(200);
          done();
        });
    });

  });

});