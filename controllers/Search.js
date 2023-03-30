let PartDetail = require('../models/sequelizeModel/PartDetail.model');
let Variant = require('../models/sequelizeModel/Variant.model');
const cacheMiddleware = require('../middlewares/cache');

module.exports = function (router) {

    router.get('/partsinfo/:id?/:page?/:limit?', cacheMiddleware, async (req, res) => {
        try {
            const { id, limit: reqLimit, page: reqPage } = req.params;
            const whereClause = id ? { variant_id: id } : {};
            const limit = reqLimit ? parseInt(reqLimit) : 10;
            const page = reqPage ? parseInt(reqPage) : 1;
            const offset = (parseInt(page) - 1) * limit;
            const data = await PartDetail.findAndCountAll({
                where: whereClause,
                limit: limit,
                offset: offset,
            });


            res.send(data);
        } catch (err) {
            handleError(res, err);
        }
    }
    );







    // :id',cacheMiddleware, async (req, res) => {
    //     try {
    //         const data = await PartDetail.findAll({
    //             where: {
    //                 variant_id: req.params.id
    //             },

    //         });
    //         res.send(data);
    //     } catch (err) {
    //         handleError(res, err);
    //     }
    // }
    // );
    // get all parts info by partnumber
    router.get('/partsinfo/partnumber/:partnumber', cacheMiddleware, async (req, res) => {
        try {
            const data = await PartDetail.findAll({
                where: {
                    partnumber: req.params.partnumber
                },

            });
            res.send(data);
        } catch (err) {
            handleError(res, err);
        }
    }
    );
    // get all parts info by model id where parts table has only variant id 
    //  and variant table has model id  
    router.get('/partsinfo/model/:modelid', cacheMiddleware, async (req, res) => {
        try {
            const data = await PartDetail.findAll({
                where: {
                    variant_id: {
                        [Op.in]: sequelize.literal(`(SELECT id FROM variants WHERE model_id = ${req.params.modelid})`)
                    }
                },
            });
            res.send(data);
        } catch (err) {
            handleError(res, err);
        }
    }
    );

}


