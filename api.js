module.exports = function(app) {
  var mongoose = require('mongoose'); // require mongoose (for mongodb integration
  var fs = require('fs'); // necessary to read from files
  var db = require('./app_api/models/db'); // handles database connection open/close
  
  var routesApi = require('./app_api/routes/index');
  app.use('/api', routesApi); // provide routes in API route index

  fs.readFile('.config', 'utf8', function(err,data){
    if (err) {
      console.log(err);
    } else {
        var config = JSON.parse(data); // if read successful, parse JSON into object
        db(config.url, config.user, config.password); // connect to database
          
        app.get('/api/hello', function(request, response) { // provide RESTful GET API at /hello
            response.send('Hello, World!'); // respond with string
        });
        
        app.listen(config.port || process.env.PORT, config.ip || process.env.IP); // try to open port/ip and try to use Cloud9 Port/IP if none specified
        
        console.log('API running!');
    }
  });
}