const assert = require('assert');
const sequelize = require('../src/models');
const { insertOTP } = require('../src/service/otp');

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
  it('should throw an error if the mobile number is invalid', async function() {
    const mobile = '1234567890';
    const otp = '12345678';
    //  should throw an error if the otp is invalid 
    try {
      await insertOTP(mobile, otp);
    }
    catch (error) {
      assert.strictEqual(error.message, 'Error while inserting OTP into the database');
    } 
    
    

  });
});
