const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sequelize = require('../src/models');

const { sendSms } = require('../src/service/sms');
const { expect } = chai;
chai.use(chaiAsPromised);

describe('deactivateOTP', () => {
  
  it('should return status true sendSms', async () => {
   
    const result = await sendSms('1234567891', '654321', 'test');
    expect(result).to.deep.equal({
      status: true,
      msg: ''
    });
  });
  
  
});
