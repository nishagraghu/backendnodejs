const List = require("../models/List.model");
const cacheMiddleware = require('../middlewares/cache');

module.exports = function(router) {
  router.get('/brants', cacheMiddleware, async (req, res) => {
    
    try {
      const data = await List.getAll();
      res.send(data);
    } catch (err) {
      handleError(res, err);
    }
  });

  router.get('/modeinfo/:id', cacheMiddleware,async (req, res) => {
    try {
      const data = await List.getModeinfo(req.params.id);
      res.send(data);
    } catch (err) {
      handleError(res, err);
    }
  });

  router.get('/yearofmake/:id',cacheMiddleware, async (req, res) => {
    try {
      const data = await List.getYearofMakeinfo(req.params.id);
      res.send(data);
    } catch (err) {
      handleError(res, err);
    }
  });
  router.get('/variants/:id',cacheMiddleware, async (req, res) => {
    try {
      const data = await List.getVariantinfo(req.params.id);
      res.send(data);
    } catch (err) {
      handleError(res, err);
    }
  });  
  router.get('/partsinfo/:id',cacheMiddleware, async (req, res) => {
    try {
      const data = await List.getPartinfo(req.params.id);
      res.send(data);
    } catch (err) {
      handleError(res, err);
    }
  });  
  

  function handleError(res, err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  }

  return router;
};
