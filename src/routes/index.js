var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../config/swaggerOptions');



app.use(bodyParser.json());
/*
 * Add middleware. Because we defined the first parameter ( '/api' ), it will run
 * only for urls that starts with '/api/*'
 */

app.use('/api', require('../middlewares/auth'));
/*
 * Add the protected route '/hello-world' after '/api'
 * So now it is available on /api/hello-world
 */
app.use('/api', require('../controllers/List.js')(router));
app.use('/api', require('../controllers/helloWorld.js')(router));
app.use('/api', require('../controllers/Search.js')(router));


/*
 * Add the '/login' route handler
 */
app.use('/auth', require('../controllers/user.js')(router));
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use((req, res, next) => {
  res.status(404).send({
    error: "Sorry, that route doesn't exist"
  });
});




module.exports = app;
