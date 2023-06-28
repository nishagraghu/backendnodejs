const assert = require('assert');
const sequelize = require('../src/models');
const { insertOTP, deactivateOTP, verifyOTP } = require('../src/service/otp');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('insertOTP', function () {
  let findOrCreate;

  beforeEach(() => {
    findOrCreate = sinon.stub(sequelize.models.mobil_user, 'findOrCreate');
  });

  afterEach(() => {
    findOrCreate.restore();
  });
  it('should create a new record with a valid mobile number and OTP', async function () {
    const mobile = '1234567891';
    const otp = '123456';
    const mockResult = [{
      id: 1,
      mobile: '1234567890',
      otp: '1234',
      created_at: '2023-04-03T12:00:00.000Z',
      updated_at: '2023-04-03T12:00:00.000Z'
    },
      true
    ];
    findOrCreate.returns(mockResult);
    const result = await insertOTP(mobile, otp);
    expect(result).to.deep.equal({
      status: true,
      msg: 'OTP inserted successfully'
    });



  });
  it('should throw an error if the mobile number is invalid', async function () {
    const mobile = '1234567891';
    const otp = '12345678';
    findOrCreate.returns(
      Promise.reject(new Error('Error while inserting OTP into the database'))
    );
    //  should throw an error if the otp is invalid 
    try {
      await insertOTP(mobile, otp);
    }
    catch (error) {
      assert.strictEqual(error.message, 'Error while inserting OTP into the database 12');
    }
  });
  it('should create a new record with a valid mobile number and OTP', async function () {
    const mobile = '1234567891';
    const otp = '123456';
    const mockResult = [{
      id: 1,
      mobile: '1234567890',
      otp: '1234',
      created_at: '2023-04-03T12:00:00.000Z',
      updated_at: '2023-04-03T12:00:00.000Z'
    },
      true
    ];
    findOrCreate.returns(mockResult);
    const result = await insertOTP(mobile, otp);
    expect(result).to.deep.equal({
      status: true,
      msg: 'OTP inserted successfully'
    });



  });

  it('should update record with a valid mobile number and OTP', async function () {
    const mobile = '1234567891';
    const otp = '123456';
    const mockResult = [{
      id: 1,
      mobile: '1234567890',
      otp: '1234',
      created_at: '2023-04-03T12:00:00.000Z',
      updated_at: '2023-04-03T12:00:00.000Z',
      save: () => { }
    },
      false
    ];
    findOrCreate.returns(mockResult);
    const result = await insertOTP(mobile, otp);
    console.log(result);
    expect(result).to.deep.equal({
      status: true,
      msg: 'OTP inserted successfully'
    });



  });

  // it('should update an existing record when mobile number exists', async () => {
  //   const mockResult = [{ otp: '123456', save: sinon.stub() }, false];
  //   let findOrCreateStub = sinon.stub(sequelize.models.mobil_user, 'findOrCreate');
  //   findOrCreateStub.returns(Promise.resolve(mockResult));

  //   const result = await insertOTP('1234567891', '654321');

  //   expect(mockResult[0].otp).to.equal('654321');
  //   expect(mockResult[0].updated_at).to.exist;
  //   expect(mockResult[0].save.calledOnce).to.be.true;

  //   expect(result).to.deep.equal({
  //     status: true,
  //     msg: 'OTP inserted successfully'
  //   });
  // });
});
describe('deactivateOTP', () => {
  let findOneStub;

  beforeEach(() => {
    findOneStub = sinon.stub(sequelize.models.mobil_user, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it('should return status true and msg logout successfully when mobile number is found', async () => {
    const mockResult = { updated_at: 'mock-date', save: sinon.stub() };
    findOneStub.returns(Promise.resolve(mockResult));

    const result = await deactivateOTP('1234567890');


    expect(result).to.deep.equal({ status: true, msg: 'logout  successfully' });
  });
  it('should return status false and msg Mobile number not found when mobile number is not in the database', async () => {
    const mockResult = null;
    findOneStub.returns(Promise.resolve(mockResult));
    const result = await deactivateOTP('1234567891');
    expect(result).to.deep.equal({ status: false, msg: 'Mobile number not found' });

  });
  it('Error while deactivating OTP ', async () => {
    const mockResult = {};
    findOneStub.returns(Promise.resolve(mockResult));
    const result = await deactivateOTP('1234567890');
    // assert.propertyVal(result, 'status', false);
    assert.strictEqual(result.msg, 'Error while deactivating OTP');

    // expect(result).to.deep.equal({ status: false, msg: 'Error while deactivating OTP' });

  });
});

describe('verifyOTP', () => {
  let findOneStub;

  beforeEach(() => {
    findOneStub = sinon.stub(sequelize.models.mobil_user, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it('should return status true and msg OTP verified successfully when mobile number and OTP are correct', async () => {
    const mockResult = { otp: '1234', updated_at: 'mock-date' };
    findOneStub.returns(Promise.resolve(mockResult));
    const result = await verifyOTP('1234567891', '1234');
    expect(result).to.deep.equal({ status: true, msg: 'OTP verified successfully', updated_at: 'mock-date' });
  });

  it('should return status false and msg OTP verification failed when OTP is incorrect', async () => {
    const mockResult = { otp: '1234' };
    findOneStub.returns(Promise.resolve(mockResult));
    const result = await verifyOTP('1234567891', '5678');

    // expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(result).to.deep.equal({ status: false, msg: 'OTP verification failed' });
  });

  it('should return status false and msg Mobile number not found when mobile number is not in the database', async () => {

    findOneStub.returns(Promise.resolve(null));
    const result = await verifyOTP('1234567891', '1234');

    // expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(result).to.deep.equal({ status: false, msg: 'Mobile number not found' });
  });

  it('should return status false and msg Error while verifying OTP when an error occurs', async () => {
    findOneStub.returns(new Error('Database error'));

    const result = await verifyOTP('1234567891', '1234');

    // expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(result).to.deep.equal({ status: false, msg: 'OTP verification failed' });
  });
  it('should return status false and msg Error while verifying OTP when an error occurs', async () => {
    findOneStub.returns(Promise.reject(new Error('Database error')));

    const result = await verifyOTP('1234567891', '1234');

    // expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(result).to.deep.equal({ status: false, msg: 'Error while verifying OTP' });
  });
  it('should return Mobile number not found', async () => {
    findOneStub.returns(Promise.resolve(null));

    const result = await verifyOTP('123456789111', '1234');

    // expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(result).to.deep.equal({ status: false, msg: 'Mobile number not found' });
  });

});

describe('', () => {
  let findOneStub;

  beforeEach(() => {
    findOneStub = sinon.stub(sequelize.models.mobil_user, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
  });
  it('should return status false and msg Mobile number not found when mobile number is not in the database', async () => {
    const mockResult = {
      updated_at: new Date(),
      save: () => { }

    };
    findOneStub.returns(Promise.resolve(mockResult));

    const result = await deactivateOTP('1234567891');

    expect(result).to.deep.equal({ status: true, msg: 'logout  successfully' });

  });
  it('should return status false and msg Mobile number not found when mobile number is not in the database', async () => {

    findOneStub.returns(Promise.resolve(null));

    const result = await deactivateOTP('12345678912');

    expect(result).to.deep.equal({ status: false, msg: 'Mobile number not found' });

  });
  it('Error while deactivating  from database', async () => {

    findOneStub.returns(Promise.reject(true));

    const result = await deactivateOTP('12345678912');

    expect(result).to.deep.equal({ status: false, msg: 'Error while deactivating OTP' });

  });


});
