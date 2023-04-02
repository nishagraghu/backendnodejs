const errorHandler = require('../../src/middlewares/errorHandler');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const middleware = require('../../src/middlewares/auth');
const sequelize = require('../../src/models');
const config = require('../../src/config/config');
require('dotenv').config();
const sinon = require('sinon');



// Mock request and response objects
const req = {
  headers: {
    authorization: `Bearer ${process.env.TEST_TOKEN}`
  },
};

const res = {
    status: function(code) {
        this.statusCode = code;
        return this;
      },
      send: function(data) {
        this.body = data;
        return this;
      }
    
};

const next = function () {};

describe('ERROR middleware', () => {
  it('should return an error if no token is provided', async () => {
    const err = new Error('Test error');
    await errorHandler(err,req, res, next);
   
    
    assert.strictEqual(res.statusCode, 500);
    assert.strictEqual(res.body.message,'Internal server error');
     
 
  });
});
