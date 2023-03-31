const sequelize = require('../models');


async function insertOTP(mobile, otp) {
    try {
        await sequelize.models.mobil_user.sync({ force: false });
        console.log('Table created successfully');
    } catch (error) {
        console.log('Error creating table', error);
    }
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

}

module.exports = { insertOTP };

// module.exports = insertOTP;
