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
  
  module.exports = swaggerOptions;
  