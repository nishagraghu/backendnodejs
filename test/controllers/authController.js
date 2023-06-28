const sinon = require('sinon');
const OTPservice = require('../../src/service/otp');
const sendSmsservice = require('../../src/service/sms.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire = require('proxyquire');
const { expect } = chai;
chai.use(chaiAsPromised);
// const { createOTP } = require('../../src/controllers/authController');



describe('createOTP', () => {

    it('should insert an OTP and send an SMS', async () => {

        const addStub = sinon.stub().returns(5);
        const createOTP = proxyquire('../../src/controllers/authController', {
            '../../src/service/otp': { insertOTP: addStub },
        }).createOTP;
        const req = {
            body: {
                mobilenumber: '9999999999'
            }
        };
        const res = {
            json: sinon.spy()
        };
        const otp = 123456;
        const mobile = req.body.mobilenumber;
        const otpmsg = `${otp} is the OTP to login into your account. We don't ask for your OTP/bank info. Don't share it with anyone`;
        const status = true;
        const msg = 'otp is sent successfully';

        const result = await createOTP(req, res);


        // expect(insertOTPStub.calledWith(mobile)).to.be.true;
        // expect(sendSmsStub.calledWith(mobile, otpmsg)).to.be.true;
        expect(res.json.calledWith({ mobilenumber: '9999999999', msg: 'otp is sent successfully' })).to.be.true;
    });
    it('insert an OTP error', async () => {
        const req = {
            body: {
                mobilenumber: '9999999999'
            }
        };
        const res = {
            json: sinon.spy()
        };
        
        const addStub = sinon.stub().returns(Promise.reject(true));
        
        const createOTP = proxyquire('../../src/controllers/authController', {
            '../../src/service/otp': { insertOTP: addStub },
        }).createOTP;
        const otp = 123456;
        const mobile = req.body.mobilenumber;
        const otpmsg = `${otp} is the OTP to login into your account. We don't ask for your OTP/bank info. Don't share it with anyone`;
        const status = true;
        const msg = 'otp is sent successfully';

        const result = await createOTP(req, res);


        // expect(insertOTPStub.calledWith(mobile)).to.be.true;
        // expect(sendSmsStub.calledWith(mobile, otpmsg)).to.be.true;
        expect(res.json.calledWith({
            mobilenumber: '9999999999',
            msg: 'error while inserting OTP into the database'
          })).to.be.true;
    });
    it('error while sending SMS', async () => {
        const req = {
            body: {
                mobilenumber: '9999999999'
            }
        };
        const res = {
            json: sinon.spy()
        };
        
        const addStub = sinon.stub().returns(Promise.resolve(true));
        const smsStub = sinon.stub().returns(Promise.reject(true));
        
        const createOTP = proxyquire('../../src/controllers/authController', {
            '../../src/service/otp': { insertOTP: addStub },
            '../../src/service/sms': {sendSms: smsStub}
        }).createOTP;
        const otp = 123456;
        const mobile = req.body.mobilenumber;
        const otpmsg = `${otp} is the OTP to login into your account. We don't ask for your OTP/bank info. Don't share it with anyone`;
        const status = true;
        const msg = 'otp is sent successfully';

        const result = await createOTP(req, res);


        // expect(insertOTPStub.calledWith(mobile)).to.be.true;
        // expect(sendSmsStub.calledWith(mobile, otpmsg)).to.be.true;
        expect(res.json.calledWith({
            mobilenumber: '9999999999',
            msg: 'error while sending SMS'
          })).to.be.true;
    });
    // it('loginOTP', async () => {
    //     const req = {
    //         body: {
    //             mobilenumber: '9999999999'
    //         }
    //     };
    //     const res = {
    //         json: sinon.spy()
    //     };
        
    //     const addStub = sinon.stub().returns(Promise.resolve(true));  
    //     const smsStub = sinon.stub().returns(Promise.reject(true));

    //     const loginOTP  = proxyquire('../../src/controllers/authController', {
    //         '../../src/service/otp': { verifyOTP: addStub },
    //         '../../src/service/sms': {sendSms: smsStub}
    //     }).loginOTP ;
    //     const otp = 123456;
              
    //     const result = await loginOTP(req, res);


    //     // expect(insertOTPStub.calledWith(mobile)).to.be.true;
    //     // expect(sendSmsStub.calledWith(mobile, otpmsg)).to.be.true;
    //     // expect(res.json.calledWith({
    //     //     mobilenumber: '9999999999',
    //     //     msg: 'error while sending SMS'
    //     //   })).to.be.true;
    // });
     
     

});
