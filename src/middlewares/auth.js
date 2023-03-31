var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
const auth = require('../models/auth.model');

module.exports = async function (req, res, next) {
    /*
     * Check if authorization header is set
     */
    if (req.headers.hasOwnProperty('authorization')) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */

            const token = req.headers['authorization'].split(" ")[1];
            const decodedToken = jwt.decode(token, { complete: true });

            const creationDate = new Date(decodedToken.payload.iat * 1000);
          
            try {
                const data = await auth.findByToken(token);
                const { refreshtokencount } = data[0];
                console.log(refreshtokencount);
               if(refreshtokencount==0){
                return res.status(401).json({
                    error: {
                        msg: 'authenticate token is invalid',
                        
                    }
                });
               }
            } catch (err) {
            
                return res.status(401).json({
                    error: {
                        msg: 'Failed to authenticate token!',
                        
                    }
                });
               
            }


            res.mobilenumber = jwt.verify(token, config.JWT_SECRET);
        } catch (err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!',
                   
                }
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            error: {
                msg: 'No token!' + req.headers['authorization']
            }
        });
    }
    next();
    return;
};
