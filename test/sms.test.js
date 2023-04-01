const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sequelize = require('../src/models');

const { deactivateOTP } = require('../src/service/otp');


const { expect } = chai;
chai.use(chaiAsPromised);

describe('deactivateOTP', () => {
  let findOneStub;

  beforeEach(() => {
    findOneStub = sinon.stub(sequelize.models.mobil_user, 'findOne')
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it('should return status true and msg logout successfully when mobile number is found', async () => {
    const mockResult = { updated_at: 'mock-date', save: sinon.stub() };
    findOneStub.resolves(mockResult);

    const result = await deactivateOTP('1234567890');

    expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
    expect(mockResult.updated_at).to.be.null;
    expect(mockResult.save.calledOnce).to.be.true;
    expect(result).to.deep.equal({ status: true, msg: 'logout successfully' });
  });

//   it('should return status false and msg Mobile number not found when mobile number is not found', async () => {
//     findOneStub.resolves(null);

//     const result = await deactivateOTP('1234567890');

//     expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
//     expect(result).to.deep.equal({ status: false, msg: 'Mobile number not found' });
//   });

//   it('should return status false and msg Error while deactivating OTP when an error occurs', async () => {
//     const error = new Error('mock error');
//     findOneStub.rejects(error);

//     const result = await deactivateOTP('1234567890');

//     expect(findOneStub.calledOnceWith({ where: { mobile: '1234567890' } })).to.be.true;
//     expect(result).to.deep.equal({ status: false, msg: 'Error while deactivating OTP', error });
//   });
});
