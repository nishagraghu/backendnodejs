module.exports = function(router) {
    router.get('/home', function(req, res) {
        res.json({data: 'Hello World! ww '});
    });
   
    return router;
};
