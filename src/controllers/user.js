// var jwt = require('jsonwebtoken');
// var config = require('../config/config.js');
// // const Auth = require("../models/auth.model.js");
// const { sendSms } = require('../service/sms.js');
// const { insertOTP, verifyOTP, deactivateOTP } = require('../service/otp');
// const sequelize = require('../models');

// let otplist = Array();



// module.exports = function (router) {


//     /**
//  * @swagger
//  * /create:
//  *   post:
//  *     summary: Create a new OTP
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: mobilenumber
//  *         description: The mobile number to send the OTP to
//  *         in: body
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             mobilenumber:
//  *               type: string
//  *     responses:
//  *       200:
//  *         description: The OTP was sent successfully
//  */
//     router.post('/create', async function (req, res) {
//          const otp = Math.floor(100000 + Math.random() * 900000);
//         const mobile = req.body.mobilenumber;
//         try {
            
//             await insertOTP(mobile, otp);
//         } catch (err) {
//             res.json({
//                 mobilenumber: req.body.mobilenumber,
//                 msg: 'error while inserting OTP into the database',
//                 err
//             });
//             return;
//         }
//         try {
//             const otpmsg = `${otp} is the OTP to login into your account.We don't ask for your OTP/bank info.Don't shate it with anyone`;
//             const result = await sendSms(mobile, process.env.SENDER_PHONE_NUMBER, otpmsg);
//             const { status, msg } = result;
//             // console.log({status});
//             if (status) {
//                 res.json({
//                     mobilenumber: req.body.mobilenumber,
//                     msg: 'otp is sent successfully'
//                 });
//             } else {
//                 res.json({
//                     mobilenumber: req.body.mobilenumber,
//                     msg: 'error while sending SMS'
//                 });
//             }
//         } catch (err) {
//             // console.log(err);
//             res.json({
//                 mobilenumber: req.body.mobilenumber,
//                 msg: 'error while sending SMS'
//             });
//         }
//     })
//     router.post('/login', async function (req, res) {
//         /*
//          * Check if the username and password is correct
//          */

//         /**
//     * @swagger
//     * /login:
//     *   post:
//     *     summary: Login with OTP
//     *     produces:
//     *       - application/json
//     *     parameters:
//     *       - name: mobilenumber
//     *         description: The mobile number used to create the OTP
//     *         in: body
//     *         required: true
//     *         schema:
//     *           type: object
//     *           properties:
//     *             mobilenumber:
//     *               type: string
//     *             otp:
//     *               type: number
//     *     responses:
//     *       200:
//     *         description: Login successful
//     *         schema:
//     *           type: object
//     *           properties:
//     *             id:
//     *               type: number
//     *             username:
//     *               type: string
//     *             jwt:
//     *               type: string
//     *             refreshToken:
//     *               type: string
    
//     */

//         // const loginwithOtp = otplist.find((obj) => obj.mobilenumber == req.body.mobilenumber);


//         const { mobilenumber, otp } = req.body;
//         const { status, msg,updated_at } = await verifyOTP(mobilenumber, otp);


//         if (status) {

//             const accessToken = jwt.sign({ mobilenumber ,updated_at }, config.JWT_SECRET)
//             res.json({
//                 jwt: accessToken,
//                 mobilenumber,
//                 msg


//             });

//             let test = jwt.verify(accessToken, config.JWT_SECRET);

         
//         } else {
//             /*
//              * If the username or password was wrong, return 401 ( Unauthorized )
//              * status code and JSON error message
//              */
//             res.status(401).json({
//                 error: {
//                     msg

//                 }
//             });
//         }
//     });
//     router.get('/logout', async function (req, res) {
//         if (!req.headers['authorization']) {
//             return res.status(401).send({ status: false, msg: 'No token provided.' });
//         }
//         const token = req.headers['authorization'].split(" ")[1];
//         const decodedToken = jwt.decode(token, { complete: true });
//         const mobilenumber = decodedToken.payload.mobilenumber;
//         const { status, msg } = await deactivateOTP(mobilenumber);
//         if(status){
//             res.json({ status, msg });
//         }else{
//             res.status(400).send(msg)
//         }
    
//     });

//     return router;
// };


const otpController = require('./authController');

module.exports = function (router) {
  router.post('/create', otpController.createOTP);
  router.post('/login', otpController.loginOTP);
  router.get('/logout', otpController.logoutOTP);
  return router;
};

