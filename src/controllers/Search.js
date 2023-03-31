const sequelize = require('../models');
const { Op } = require('sequelize');
const cacheMiddleware = require('../middlewares/cache');
const { check, validationResult } = require('express-validator');
module.exports = function (router) {


    router.get('/partsinfo/:id?/:page?/:limit?', cacheMiddleware, async (req, res) => {
        try {

            const { id, limit = 10, page = 1 } = req.params;
            const whereClause = id ? { variant_id: id } : {};
            const offset = (parseInt(page) - 1) * limit;
            const data = await sequelize.models.partdetail.findAndCountAll({
                where: whereClause,
                limit: parseInt(limit),
                offset: offset,
            });


            res.send(data);
        } catch (err) {
            console.log(err);
        }
    }
    );
    router.get('/partsinfobymodel/:modelid/:page?/:limit?', [
        check('id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Invalid variant ID'),
        check('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Invalid page number'),
        check('limit')  
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),
    ], cacheMiddleware, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { modelid, limit = 10, page = 1 } = req.params;

            const offset = (parseInt(page) - 1) * limit;
            const data = await sequelize.models.partdetail.findAndCountAll({
                where: {
                    variant_id: {
                        [Op.in]: sequelize.literal(`(SELECT variant.id FROM variant LEFT JOIN yearofmake ON variant.year_make=yearofmake.id WHERE modeel_id = ${modelid})`)
                    }
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
            res.send(data);
        } catch (err) {
            console.log(err);
        }
    }
    );
    return router;
}


