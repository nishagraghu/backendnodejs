const assert = require('assert');
const config = require('../src/config/db.config');

describe('Configuration file', () => {
  describe('Exported object', () => {
    it('should be an object', () => {
      assert.strictEqual(typeof config, 'object');
    });

    it('should have HOST, USER, PASSWORD, and DB properties', () => {
      assert.strictEqual(typeof config.HOST, 'string');
      assert.strictEqual(typeof config.USER, 'string');
      assert.strictEqual(typeof config.PASSWORD, 'string');
      assert.strictEqual(typeof config.DB, 'string');
    });
  });

  describe('Test environment', () => {
    before(() => {
      process.env.NODE_ENV = 'test';
      process.env.HOST = 'testhost';
      process.env.USER = 'testuser';
      process.env.PASSWORD = 'testpassword';
      process.env.DB = 'testdb';
    });

    after(() => {
      process.env.NODE_ENV = 'production';
      delete process.env.HOST;
      delete process.env.USER;
      delete process.env.PASSWORD;
      delete process.env.DB;
    });
  });

  describe('Production environment', () => {
    before(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should use hardcoded values for database credentials', () => {
      const prodConfig = require('../src/config/db.config');
      assert.strictEqual(prodConfig.HOST, 'localhost');
      assert.strictEqual(prodConfig.USER, 'root');
      assert.strictEqual(prodConfig.PASSWORD, '');
      assert.strictEqual(prodConfig.DB, 'backendvahicleparts');
    });
  });
});
