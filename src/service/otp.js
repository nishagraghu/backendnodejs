const sequelize = require('../models');


async function insertOTP(mobile, otp) {
    try {
        await sequelize.models.mobil_user.sync({ force: false });
        console.log('Table created successfully');
    } catch (error) {
        console.log('Error creating table', error);
    }
    try{

    const [result, created] = await sequelize.models.mobil_user.findOrCreate({
        where: { mobile: mobile },
        defaults: {
            otp: otp,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }
    });
    if (created) {
        console.log('Record created successfully');
      } else {
        result.otp = otp;
        result.updated_at = new Date();
       
        await result.save();
        console.log('Record updated successfully');
      }
        return {
            status: true,
            msg: 'OTP inserted successfully'
        }
    } catch (error) {
        return {
            status: false,
            msg: 'Error while inserting OTP into the database',
            error
        }
    }

}
async function verifyOTP(mobile, otp){
    try{
        const result = await sequelize.models.mobil_user.findOne({ where: { mobile: mobile } });
        if(result){
            if(result.otp == otp){
                return {
                    status: true,
                    msg: 'OTP verified successfully'
                }
            }else{
                return {
                    status: false,
                    msg: 'OTP verification failed'
                }
            }
        }else{
            return {
                status: false,
                msg: 'Mobile number not found'
            }
        }
    }catch(error){
        return {
            status: false,
            msg: 'Error while verifying OTP',
            error
        }
    }

} 

module.exports = { insertOTP ,verifyOTP};

// module.exports = insertOTP;
