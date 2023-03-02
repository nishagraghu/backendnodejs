const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 1800 });

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
 
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    
    res.setHeader('Content-Type', 'application/json');
    res.send(cachedResponse);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
}

module.exports = cacheMiddleware;
