var app = require('./src/routes/index');
var config = require('./src/config/config.js');

/*
 * Start server
 */
app.listen(config.PORT);
