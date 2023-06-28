const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const { sendSms } = require('../service/sms.js');
const { insertOTP, verifyOTP, deactivateOTP } = require('../service/otp');

exports.createOTP = async function (req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mobile = req.body.mobilenumber;
  try {
   const data=  await insertOTP(mobile, otp);
   
  } catch (err) {
    console.log({  mobilenumber: req.body.mobilenumber,
        msg: 'error while inserting OTP into the database'})
    res.json({
      mobilenumber: req.body.mobilenumber,
      msg: 'error while inserting OTP into the database',
      
    });
    return;
  }
  try {
    const otpmsg = `${otp} is the OTP to login into your account.We don't ask for your OTP/bank info.Don't shate it with anyone`;
    const result = await sendSms(mobile, process.env.SENDER_PHONE_NUMBER, otpmsg);
    const { status, msg } = result;
    if (status) {
       
      res.json({
        mobilenumber: req.body.mobilenumber,
        msg: 'otp is sent successfully'
      });
    } else {
      res.json({
        mobilenumber: req.body.mobilenumber,
        msg: 'error while sending SMS'
      });
    }
  } catch (err) {
    res.json({
      mobilenumber: req.body.mobilenumber,
      msg: 'error while sending SMS'
    });
  }
}

exports.loginOTP = async function (req, res) {
  const { mobilenumber, otp } = req.body;
  const { status, msg, updated_at } = await verifyOTP(mobilenumber, otp);
  if (status) {
    const accessToken = jwt.sign({ mobilenumber, updated_at }, config.JWT_SECRET)
    res.json({
      jwt: accessToken,
      mobilenumber,
      msg
    });
  } else {
    res.status(401).json({
      error: {
        msg
      }
    });
  }
}

exports.logoutOTP = async function (req, res) {
  if (!req.headers['authorization']) {
    return res.status(401).send({ status: false, msg: 'No token provided.' });
  }
  const token = req.headers['authorization'].split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const mobilenumber = decodedToken.payload.mobilenumber;
  const { status, msg } = await deactivateOTP(mobilenumber);
  if (status) {
    res.json({ status, msg });
  } else {
    res.status(400).send(msg)
  }
}
