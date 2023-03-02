require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSms = async (toNumber, fromNumber, body) => {

    try {
        // const message = await client.messages.create({
        //     body: body,
        //     to: toNumber,
        //     from: fromNumber,
        //     forceDelivery: true,
        //     contentRetention: 'retain',
        //     addressRetention: 'retain',
        //     smartEncoded: true
        // });
        // console.log(`SMS sent with message ID ${message.sid}`);
        return {
            status: true,
            msg: ''

        }
    } catch (error) {
        return {
            status: false,
            msg: error

        }
    }
};

module.exports = { sendSms };
