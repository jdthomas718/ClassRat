module.exports = function(app) {
    var mongoose = require('mongoose'); // require mongoose (for mongodb integration
    var db = require('./app_api/models/db'); // handles database connection open/close
    
    var routesApi = require('./app_api/routes/index');
    app.use('/api', routesApi); // provide routes in API route index
    
    db(process.env.DB_URL, process.env.DB_USER, process.env.DB_PASS); // connect to database
              
    app.get('/api/hello', function(request, response) { // provide RESTful GET API at /hello
        response.send('Hello, World!'); // respond with string
    });
    
    app.listen(process.env.PORT, process.env.IP); // try to open port/ip and try to use Cloud9 Port/IP if none specified
    
    console.log('API running!');
}