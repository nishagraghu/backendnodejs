var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
const sinon = require('sinon');
const { insertOTP, verifyOTP, deactivateOTP } = require('../../src/service/otp');
const {sendSms} = request('../../src/service/sms');

const app = require('../../src/routes/index');

describe('POST /create', function () {
    let mockSendSms;
    const mobile = '1234567890';
    const otp = 123456;
    const otpmsg = `${otp} is the OTP to login into your account.We don't ask for your OTP/bank info.Don't shate it with anyone`;
   
  beforeEach(() => {
    // Create a mock for the sendSms function
    mockSendSms = sinon.mock(sendSms);
  });
    afterEach(() => {
        sinon.restore();
        // mockSendSms.restore();

    });
    it('it responds with 200 status for create', function (done) {
        request(app)
            .post('/auth/create')
            .type('json')
            .send('{"mobilenumber":"8867460746"}')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).have.property('msg');
                done();
            });
    });
 

    it('it responds with 401 status code if bad mobilenumber or otp', function (done) {
        request(app)
            .post('/auth/login')
            .type('json')
            .expect(401)
            .end(function (err, res) {
                expect(res.body.error).have.property('msg');

                done();
            });
    });
    it('it responds with 401 status code logout without token', function (done) {
        request(app)
            .get('/auth/logout')
            .type('json')
            .expect(401)
            .end(function (err, res) {
                expect(res.body).have.property('msg');

                done();
            });
    });
    

    //     it('it responds with 200 status code if good username or password', function(done) {
    //         request(app)
    //             .post('/login')
    //             .type('json')
    //             .send('{"username":"admin","password":"admin"}')
    //             .expect(200)
    //             .end(function(err, res) {
    //                 if (err) return done(err);
    //                 done();
    //         });
    //     });

    //     it('it returns JWT token if good username or password', function(done) {
    //         request(app)
    //             .post('/login')
    //             .type('json')
    //             .send('{"username":"admin","password":"admin"}')
    //             .end(function(err, res) {
    //                 if (err) return done(err);

    //                 expect(res.body).have.property('jwt');

    //                 done();
    //         });
    //     });
});
