const assert = require('assert');
const sequelize = require('../models');
const { insertOTP } = require('../path/to/insertOTP.js');

describe('insertOTP', function() {
  beforeEach(async function() {
    // Delete all records from the mobil_user table before each test
    await sequelize.models.mobil_user.destroy({ truncate: true });
  });

  it('should create a new record with a valid mobile number and OTP', async function() {
    const mobile = '1234567890';
    const otp = '123456';

    await insertOTP(mobile, otp);

    // Retrieve the record from the mobil_user table
    const record = await sequelize.models.mobil_user.findOne({ where: { mobile: mobile } });

    // Check that the record has the expected values
    assert.strictEqual(record.mobile, mobile);
    assert.strictEqual(record.otp, otp);
  });
});
