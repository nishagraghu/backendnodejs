var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
const sequelize = require('../models');
module.exports = async function (req, res, next) {
    if (req.headers.hasOwnProperty('authorization')) {
        try {
            const token = req.headers['authorization'].split(" ")[1];
            const decodedToken = jwt.decode(token, { complete: true });
            try {
                const result = await sequelize.models.mobil_user.findOne({ where: { mobile: decodedToken.payload.mobilenumber } });
                const timestamp1 = new Date(result.updated_at).getTime();
                const timestamp2 = new Date(decodedToken.payload.updated_at).getTime();
                if (timestamp1 !== timestamp2) {
                    return res.status(422).json({
                        error: {
                            msg: 'invalid token',
                        }
                    });
                }
            } catch (err) {
                return res.status(401).json({
                    error: {
                        msg: 'Failed to authenticate token!',
                        err
                    }
                });
            }
            res.mobilenumber = jwt.verify(token, config.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!',
                    err
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
};
