// var chai = require('chai');
// var expect = chai.expect;
// var sinon = require('sinon');
// var auth = require('../../middlewares/auth.js');
// var jwt = require('jsonwebtoken');


// describe('Test Auth Middleware', function(){
//     var request;
//     var response;
//     var next;

//     beforeEach(function() {
//         request = {};
//         response = {
//             status: sinon.stub().returnsThis(),
//             json: sinon.spy()
//         };
//         next = sinon.spy();
//     });

//     it('next should not be called if no token provided', function() {
//         auth(request, response, next);
//         expect(next.called).to.equal(false);
//     });

//     it('should return 401 status code if no token provided', function() {
//         auth(request, response, next);
//         expect(response.status.getCall(0).args[0]).to.equal(401);
//     });

//     it('next should not be called if bad token was provided', function() {
//         request.headers = {};
//         request.headers.authorization = 'some authorization header';
//         auth(request, response, next);
//         expect(next.called).to.equal(false);
//     });

//     it('shoudl return 401 status code if bad token was provided', function() {
//         request.headers = {};
//         request.headers.authorization = 'some authorization header';
//         auth(request, response, next);
//         expect(response.status.getCall(0).args[0]).to.equal(401);
//     });

//     it('request should contain user info if good token was provided', function() {
//         request.headers = {};
//         request.headers.authorization = jwt.sign({ id: 1 }, config.JWT_SECRET);
//         auth(request, response, next);
//         expect(request).to.have.property('user');
//         expect(request.user).to.have.property('id');
//         expect(request.user.id).to.be.equal(1);
//     });

//     it('next should be called once if good token was provided', function() {
//         request.headers = {};
//         request.headers.authorization = jwt.sign({ id: 1 }, config.JWT_SECRET);
//         auth(request, response, next);
//         expect(next.calledOnce).to.equal(true);
//     });
// });



const assert = require('assert');
const jwt = require('jsonwebtoken');
const middleware = require('../../src/middlewares/auth');
const sequelize = require('../../src/models');
var config = require('../../src/config/config');
// Mock request and response objects
const req = {
  headers: {},
};
const res = {
  status: function (code) {
    this.statusCode = code;
    return this;
  },
  json: function (data) {
    this.body = data;
    return this;
  },
};
const next = function () {};

describe('Auth middleware', () => {
  it('should return an error if no token is provided', async () => {
    await middleware(req, res, next);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.error.msg, 'No token!');
  });

  it('should return an error if the token is invalid', async () => {
    req.headers.authorization = 'Bearer invalid_token';
    await middleware(req, res, next);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.error.msg, 'Failed to authenticate token!');
  });

  it('should return an error if the token is expired', async () => {
    // Create an expired token
    const token = jwt.sign({ mobilenumber: '1234567890', updated_at: Date.now() - 10000 }, 'wrong_secret', { expiresIn: '1s' });
    req.headers.authorization = `Bearer ${token}`;
    await middleware(req, res, next);
    // assert.strictEqual(res.statusCode, 422)
    assert.strictEqual(res.body.error.msg, 'invalid token');
  });

//   it('should return an error if the token is not in the database', async () => {
//     // Create a valid token
//     const token = jwt.sign({ mobilenumber: '1234567890', updated_at: Date.now() }, config.JWT_SECRET, { expiresIn: '1h' });
//     req.headers.authorization = `Bearer ${token}`;
//     // Mock the `findOne` method to return `null`
//     sequelize.models.mobil_user.findOne = async () => null;
//     await middleware(req, res, next);
//     assert.strictEqual(res.statusCode, 401);
//     assert.strictEqual(res.body.error.msg, 'Failed to authenticate token!');
//   });

//   it('should return an error if the token has been updated since it was issued', async () => {
//     // Create a valid token
//     const token = jwt.sign({ mobilenumber: '1234567890', updated_at: Date.now() }, config.JWT_SECRET, { expiresIn: '1h' });
//     req.headers.authorization = `Bearer ${token}`;
//     // Mock the `findOne` method to return a different `updated_at` value
//     sequelize.models.mobil_user.findOne = async () => ({ updated_at: Date.now() - 10000 });
//     await middleware(req, res, next);
//     assert.strictEqual(res.statusCode, 422);
//     assert.strictEqual(res.body.error.msg, 'invalid token');
//   });

//   it('should set the `mobilenumber` property of the response object if the token is valid', async () => {
//     // Create a valid token
//     const token = jwt.sign({ mobilenumber: '1234567890', updated_at: Date.now() }, config.JWT_SECRET, { expiresIn: '1h' });
//     req.headers.authorization = `Bearer ${token}`;
//     // Mock the `findOne` method to return a matching user object
//     sequelize.models.mobil_user.findOne = async () => ({ updated_at: new Date() });
//     await middleware(req, res, next);
//     assert.strictEqual(res.mobilenumber.mobilenumber, '1234567890');
//   });
});
