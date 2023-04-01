const sequelize = require('../models');


async function insertOTP(mobile, otp) {
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
            const updated_at = result.updated_at;
            if(result.otp == otp){
                return {
                    status: true,
                    msg: 'OTP verified successfully',
                    updated_at
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
            
        }
    }

} 
async function deactivateOTP(mobile){
    try{
        const result = await sequelize.models.mobil_user.findOne({ where: { mobile: mobile } });
        if(result){
            
            result.updated_at = null;
            await result.save();
            return {
                status: true,
                msg: 'logout  successfully'
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
            msg: 'Error while deactivating OTP',
            error
        }
    }

}


module.exports = { insertOTP ,verifyOTP,deactivateOTP};

// module.exports = insertOTP;
