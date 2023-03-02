var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cacheMiddleware = require('./middlewares/cache');


app.use(bodyParser.json());
/*
 * Add middleware. Because we defined the first parameter ( '/api' ), it will run
 * only for urls that starts with '/api/*'
 */
app.use('/api', require('./middlewares/auth.js'));
/*
 * Add the protected route '/hello-world' after '/api'
 * So now it is available on /api/hello-world
 */
app.use('/api', require('./controllers/List.js')(router));
app.use('/api', require('./controllers/helloWorld.js')(router));

/*
 * Add the '/login' route handler
 */
app.use('/',require('./controllers/user.js')(router));

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'My User Project CRUD',
        description: 'My User Project Application API',
        version: '1.0.0',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      host: 'localhost:8080',
      basePath: '/',
    },
    apis: ['controllers/*.js'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))




module.exports = app;
