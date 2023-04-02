// const List = require("../models/List.model");
const cacheMiddleware = require('../middlewares/cache');
const sequelize = require('../models');
const Sequelize = require('sequelize');
module.exports = function(router) {
   
  router.get('/brants', cacheMiddleware, async (req, res,next) => {
    
    try {
      const data = await  sequelize.models.brand.findAll(
        {
          
          attributes: ['id', ['name', 'value'], 'logo'],

        }
      );
      

      res.send(data);
    } catch (err) {
      next(err);
      // handleError(res, err);
    }
  });

  router.get('/modeinfo/:id', cacheMiddleware,async (req, res,next) => {
    try {
      // const data = await List.getModeinfo(req.params.id);
      const data = await  sequelize.models.modeinfo.findAll(
        {
          where: {
            brand_id: req.params.id
          },
          attributes: ['id', ['name', 'value']],
        }
      );
      res.send(data);
    } catch (err) {
      next(err);
    }
  });

  router.get('/yearofmake/:id',cacheMiddleware, async (req, res,next) => {
    try {
      const data =    await  sequelize.models.yearofmake.findAll(
        {
          where: {
            modeel_id: req.params.id
          },
          attributes: ['id',
           [Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('year'), '/', 1), 'value']
          ],
        }
      );
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
  router.get('/variants/:id',cacheMiddleware, async (req, res,next) => {
    try {
      const data = await sequelize.models.variant.findAll(
        {
          where: {
            year_make: req.params.id
          },
          attributes: ['id', ['name', 'value']],
        }
        );
        res.send(data);
      } catch (err) {
        next(err);
      }
    });

  
  // router.get('/partsinfo/:id',cacheMiddleware, async (req, res) => {
  //   try {
  //     const data = await List.getPartinfo(req.params.id);
  //     res.send(data);
  //   } catch (err) {
  //     handleError(res, err);
  //   }
  // });  
  

  // function handleError(res, err) {
  //   console.error(err);
  //   res.status(500).send({
  //     message: err.message || "Internal server error"
  //   });
  // }

  return router;
};
