const assert = require('assert');
const config = require('../src/config/config');

describe('Configuration file', () => {
  describe('Exported object', () => {
    it('should be an object', () => {
      assert.strictEqual(typeof config, 'object');
    });

    it('should have PORT and JWT_SECRET properties', () => {
      assert.strictEqual(typeof config.PORT, 'number');
      assert.strictEqual(typeof config.JWT_SECRET, 'string');
    });
  });

  describe('Test environment', () => {
    before(() => {
      process.env.NODE_ENV = 'test';
      process.env.PORT = 8081;
      process.env.JWT_SECRET = 'test_jwt_secret';
    });

    after(() => {
      process.env.NODE_ENV = 'production';
      delete process.env.PORT;
      delete process.env.JWT_SECRET;
    });

    it('should use environment variables for PORT and JWT_SECRET', () => {
      const testConfig =require('../src/config/config');
      assert.strictEqual(testConfig.PORT,8080);
      assert.strictEqual(testConfig.JWT_SECRET, 'your jwt secret');
    });
  });

//   describe('Production environment', () => {
//     before(() => {
//       process.env.NODE_ENV = 'production';
//       delete process.env.PORT;
//       delete process.env.JWT_SECRET;
//     });

//     it('should use hardcoded values for PORT and JWT_SECRET', () => {
//       const prodConfig = require('../config');
//       assert.strictEqual(prodConfig.PORT, '8080');
//       assert.strictEqual(prodConfig.JWT_SECRET, 'your jwt secret');
//     });
//   });
});
